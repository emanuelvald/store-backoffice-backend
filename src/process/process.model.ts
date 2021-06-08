import {Column, DataType, ForeignKey, Model, Table, BelongsTo} from "sequelize-typescript";
import {FileModel} from "../file/file.model";
import {ProcessStatusStrings} from "./process.enums";

@Table({
    tableName: 'process',
    timestamps: false
})
export class ProcessModel extends Model<ProcessModel> {

    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER,
        field: 'prc_id'
    })
    prcId: number;

    @Column({
        type: DataType.STRING,
        field: 'prc_transaction'
    })
    prcTransaction: string;

    @Column({
        type: DataType.DATE,
        field: 'prc_created_at'
    })
    prcCreatedAt: Date;

    @Column({
        type: DataType.DATE,
        field: 'prc_started_at'
    })
    prcStartedAt: Date;

    @Column({
        type: DataType.DATE,
        field: 'prc_completed_at'
    })
    prcCompletedAt: Date;

    @Column({
        type: DataType.STRING,
        field: 'prc_filename'
    })
    prcFilename: string;

    @Column({
        type: DataType.STRING,
        field: 'prc_status'
    })
    prcStatus: ProcessStatusStrings;

    @Column({
        type: DataType.STRING,
        field: 'prc_node'
    })
    prcNode: string;

    @Column({
        type: DataType.DOUBLE,
        field: 'prc_progress'
    })
    prcProgress: number;

    @ForeignKey(() => FileModel)
    @Column({
        type: DataType.INTEGER,
        field: 'fil_id'
    })
    prcFilId: number;

    @BelongsTo(() => FileModel)
    filId: FileModel;
}