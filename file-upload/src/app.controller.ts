import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorResponseDto } from 'dto/errorResponseDto';
import { SuccessResponseDto } from 'dto/successResponseDto';
import { diskStorage } from 'multer';
import { AppService } from './app.service';
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";

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

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiHeader({
    name: 'authorization',
    description: 'jwt token for authorization',
  })
  @ApiParam({ name: 'id', type: String })
  @ApiUnauthorizedResponse({ type: ErrorResponseDto })
  @ApiNotFoundResponse({ type: ErrorResponseDto })
  @ApiOkResponse({ type: SuccessResponseDto })
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
