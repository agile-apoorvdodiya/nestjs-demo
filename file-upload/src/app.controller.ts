import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AppService } from './app.service';

const storageOptions = {
  storage: diskStorage({
    destination: 'uploads',
    filename: (req, file, callback) => {
      const name = file.originalname.split('.');
      const fileExtName = name[1];
      callback(null, `${name[0]}-${new Date().getTime()}.${fileExtName}`);
    },
  }),
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseInterceptors(FileInterceptor('file', storageOptions))
  @Post('users/upload/:id')
  async uploadUserDocument(@UploadedFile() file: any, @Req() req: any) {
    const response = await this.appService.saveDocumentDetails(
      req.params['id'],
      file,
      req.headers['authorization'],
    );

    return {
      status: HttpStatus.OK,
      success: true,
      message: 'file uploaded successfully.',
      file,
      data: response.data,
    };
  }
}
