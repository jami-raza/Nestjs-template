import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CloudinaryService } from './cloudinary.service';

@Controller('cloudinary')
@ApiTags('Upload')
export class CloudinaryController {

constructor(private cloudinaryService: CloudinaryService){}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        comment: { type: 'string' },
        outletId: { type: 'integer' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile2(@UploadedFile('file') file: Express.Multer.File) {
    // console.log(file);
    return await this.cloudinaryService.uploadImage(file)
  }
}
