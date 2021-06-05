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
        type: DataType.INTEGER
    })
    id: number;

    @Column({
        type: DataType.STRING,
        field: 'transaction'
    })
    transaction: string;

    @Column({
        type: DataType.DATE,
        field: 'createdAt'
    })
    createdAt: Date;

    @Column({
        type: DataType.DATE,
        field: 'startedAt'
    })
    startedAt: Date;

    @Column({
        type: DataType.DATE,
        field: 'completedAt'
    })
    completedAt: Date;
    @Column({
        type: DataType.STRING,
        field: 'filename'
    })
    filename: string;

    @Column({
        type: DataType.STRING,
        field: 'status'
    })
    status: ProcessStatusStrings;

    @Column({
        type: DataType.STRING,
        field: 'node'
    })
    node: string;

    @Column({
        type: DataType.DOUBLE,
        field: 'progress'
    })
    progress: number;

    @ForeignKey(() => FileModel)
    @Column({
        type: DataType.INTEGER,
        field: 'file'
    })
    fileId: number;

    @BelongsTo(() => FileModel)
    file: FileModel;
}