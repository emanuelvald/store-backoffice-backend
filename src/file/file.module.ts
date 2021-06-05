import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {ProcessModel} from "../process/process.model";
import {FileModel} from "./file.model";

@Module({
  imports: [
    SequelizeModule.forFeature([
      FileModel,
      ProcessModel,
    ])],
  controllers: [FileController],
  providers: [FileService]
})
export class FileModule {}
