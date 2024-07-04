import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { PicturesService } from './pictures.service';
import { Picture } from './picture.entity';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Controller('pictures')
export class PicturesController {
  constructor(private readonly picturesService: PicturesService) {}

  @Get('')
  async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return await this.picturesService.findAll(paginationQuery);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const picture = await this.picturesService.findOne(id);
    if (!picture) {
      throw new HttpException('Picture not found', HttpStatus.NOT_FOUND);
    }
    return picture;
  }

  @Post(':id/like')
  async likePicture(@Param('id') id: number) {
    await this.picturesService.likePicture(id);
    return {
      status: HttpStatus.OK,
      message: 'Success like',
    };
  }

  @Post('add')
  async addPictures(): Promise<Picture[]> {
    return await this.picturesService.addPictures();
  }
}
