import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {ProductModel} from "../product/product.model";
import {ProcessModel} from "../process/process.model";
import {FileModel} from "../file/file.model";

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME_DEVELOPMENT,
            models: [FileModel, ProcessModel, ProductModel],
            autoLoadModels: Boolean(process.env.DB_AUTOLOADMODELS),
        })]
})

export class DatabaseModule {
}