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
        field: 'fil_id'
    })
    filId: number;

    @Column({
        type: DataType.STRING,
        field: 'fil_filename',
    })
    filFilename: string;

    @Column({
        type: DataType.DATE,
        field: 'fil_created_at',
    })
    filCreatedAt: Date;

    @Column({
        type: DataType.TEXT({ length: 'long' }),
        field: 'fil_content',
    })
    filContent: string;

    @Column({
        type: DataType.STRING({ length: 15 }),
        defaultValue: 'pending',
        field: 'fil_status',
    })
    filStatus: string;

    @Column({
        type: DataType.DATE,
        defaultValue: null,
        field: 'fil_active_at',
    })
    filActiveAt: Date;

    @Column({
        type: DataType.DATE,
        defaultValue: null,
        field: 'fil_inactive_at',
    })
    filInactiveAt: Date;
}
