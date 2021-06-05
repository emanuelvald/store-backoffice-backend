import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {DbModule} from './db/db.module';
import {FileModule} from './file/file.module';
import {EventEmitterModule} from '@nestjs/event-emitter';

@Module({
    imports: [DbModule, FileModule, EventEmitterModule.forRoot()],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
