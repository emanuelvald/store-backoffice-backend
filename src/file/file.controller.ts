import {
    Controller,
    Get,
    Post,
    Param,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import {FileService} from './file.service';
import {FileInterceptor} from "@nestjs/platform-express";

@Controller('file')
export class FileController {
    constructor(private readonly fileParserService: FileService) {
    }

    @Get('upload/status/:transactionId')
    getUploadStatus(@Param('transactionId') transactionId: number) {
        return transactionId
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return this.fileParserService.uploadFile(file)
    }
}
