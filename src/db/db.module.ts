import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";

@Module({
    imports: [
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: 'localhost',
            port: 3307,
            username: 'root',
            password: 'root',
            database: 'store',
            models: [],
            autoLoadModels: false,
        })]
})

export class DbModule {}
