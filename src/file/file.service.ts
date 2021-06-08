import {Injectable, InternalServerErrorException} from '@nestjs/common';
import {Sequelize} from "sequelize-typescript";
import {FileModel} from "./file.model";
import {ProcessModel} from "../process/process.model";
import {InjectModel} from "@nestjs/sequelize";
import {EventEmitter2, OnEvent} from "@nestjs/event-emitter";
import * as XLSX from 'xlsx';
import {Transaction} from "sequelize";
import ISOLATION_LEVELS = Transaction.ISOLATION_LEVELS;
import * as nmi from 'node-machine-id';
import {ProcessStatus} from "../process/process.enums";

@Injectable()
export class FileService {
    constructor(
        private sequelize: Sequelize,
        private emitter: EventEmitter2,
        @InjectModel(FileModel) private file: typeof FileModel,
        @InjectModel(ProcessModel) private process: typeof ProcessModel,
    ) {
    }

    private generateUUID() {
        let dt = new Date().getTime();
        const uuid = 'xxxx-xxxx-xxxxxxx-xxxx'.replace(/[xy]/g, (c) => {
            const r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });

        return uuid;
    }

    async uploadFile(file: Express.Multer.File) {
        const book: XLSX.WorkBook = XLSX.read(file.buffer, {type: 'buffer'});

        const contentFileBase64 = Buffer.from(file.buffer).toString('base64')

        const transaction = await this.sequelize.transaction({
            autocommit: false,
            isolationLevel: ISOLATION_LEVELS.READ_COMMITTED
        });

        const newFile = this.file.build()
        newFile.filCreatedAt = new Date()
        newFile.filFilename = file.originalname
        newFile.filContent = contentFileBase64

        try {
            await newFile.save({
                transaction: transaction
            })

            const processTransaction = this.generateUUID();
            const nodeId = nmi.machineIdSync()

            const process = this.process.build();
            process.prcCreatedAt = new Date();
            process.prcTransaction = processTransaction || '';
            process.prcStatus = ProcessStatus.pending;
            process.prcNode = nodeId;
            process.prcProgress = 0.0;
            process.prcFilId = newFile.filId;
            process.prcFilename = newFile.filFilename;

            await process.save({
                transaction: transaction,
            });

            await transaction.commit();

            // Event emitter
            this.emitter.emit('newFile', {
                processId: process.prcId,
            });

            return {
                message: 'proceso creado exitosamente',
                transactionId: transaction,
            }
        } catch (err) {
            console.error(err.message);
            await transaction.rollback();
            return false;
        }
    }

    @OnEvent('newFile')
    private async parseFile(payload: any) {
        const processId = payload.processId;

        let process: any;

        try {
            process = await this.process.findByPk(processId);

            if (!process) {
                throw new InternalServerErrorException(
                    processId,
                    `Process ${processId} not found on database.`,
                );
            }

            process.status = ProcessStatus['in-progress'];
            process.startedAt = new Date();
            await process.save();

            const file = await this.file.findByPk(process.fileId);
            const workbook = XLSX.read(file.filContent, {
                type: 'base64',
                cellDates: true,
                cellNF: false,
            });
            const sheetName = workbook?.SheetNames[0];
            const sheet: XLSX.WorkSheet = workbook.Sheets[sheetName];

            const jsonData: XLSX.WorkSheet = XLSX.utils.sheet_to_json(sheet, {
                dateNF: 'YYYY-MM-DD',
            });

            /*const bulk: StudentDTO[] = this.prepareFile(jsonData, process.fileId);
            await this.insertBulk(bulk, process);*/
        } catch (err) {
            if (process) {
                process.status = ProcessStatus.failed;
                process.save();
            }
        }
    }
}