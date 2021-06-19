import {Column, DataType, Model, Table} from 'sequelize-typescript';

@Table({
    tableName: 'product',
    timestamps: false,
})
export class ProductModel extends Model {
    @Column({
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER,
        field: 'pro_id'
    })
    proId: number;

    @Column({
        type: DataType.STRING,
        field: 'pro_type'
    })
    type: string

    @Column({
        type: DataType.STRING,
        field: 'pro_sku'
    })
    proSku: string

    @Column({
        type: DataType.STRING,
        field: 'pro_name'
    })
    proName: string

    @Column({
        type: DataType.STRING,
        field: 'pro_short_description'
    })
    proShortDescription: string

    @Column({
        type: DataType.INTEGER,
        field: 'pro_stock'
    })
    proStock: number

    @Column({
        type: DataType.INTEGER,
        field: 'pro_sale_price'
    })
    proSalePrice: number

    @Column({
        type: DataType.INTEGER,
        field: 'pro_regular_price'
    })
    proRegularPrice: number

    @Column({
        type: DataType.TEXT,
        field: 'pro_categories'
    })
    proCategories: string

    @Column({
        type: DataType.STRING,
        field: 'pro_parent'
    })
    proParent: string

    @Column({
        type: DataType.STRING,
        field: 'pro_attribute_1_name'
    })
    proAttribute1Name: string

    @Column({
        type: DataType.STRING,
        field: 'pro_attribute_1_value'
    })
    pro_attribute_1_value: string

    @Column({
        type: DataType.STRING,
        field: 'pro_attribute_2_name'
    })
    proAttribute2Name: string

    @Column({
        type: DataType.STRING,
        field: 'pro_attribute_2_value'
    })
    pro_attribute_2_value: string
}