import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
    tableName: 'files',
    timestamps: false,
})
export class FileModel extends Model {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        field: 'filename',
    })
    filename: string;

    @Column({
        type: DataType.DATE,
        field: 'createdAt',
    })
    created_at: Date;

    @Column({
        type: DataType.TEXT({ length: 'long' }),
        field: 'content',
    })
    content: string;

    @Column({
        type: DataType.STRING({ length: 15 }),
        defaultValue: 'pending',
        field: 'status',
    })
    status: string;

    @Column({
        type: DataType.DATE,
        defaultValue: null,
        field: 'activeAt',
    })
    active_at: Date;

    @Column({
        type: DataType.DATE,
        defaultValue: null,
        field: 'inactiveAt',
    })
    inactive_at: Date;
}
