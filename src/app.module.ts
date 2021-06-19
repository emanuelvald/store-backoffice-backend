import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {DatabaseModule} from './database/database.module';
import {FileModule} from './file/file.module';
import {EventEmitterModule} from '@nestjs/event-emitter';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [DatabaseModule, EventEmitterModule.forRoot(), ConfigModule.forRoot({ isGlobal: true })],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
