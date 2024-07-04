import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Picture } from './picture.entity';
import { RandomImageService } from './random-image.service';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Injectable()
export class PicturesService {
  constructor(
    @InjectRepository(Picture)
    private readonly pictureRepository: Repository<Picture>,
    private readonly randomImageService: RandomImageService,
  ) {}

  async findAll(paginationQuery: PaginationQueryDto): Promise<Picture[]> {
    const { limit = 21, offset = 0 } = paginationQuery;
    return await this.pictureRepository.find({
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number): Promise<Picture> {
    const picture = await this.pictureRepository.findOne({ where: { id } });
    if (!picture) {
      throw new HttpException('Picture not found', HttpStatus.NOT_FOUND);
    }
    return picture;
  }

  async likePicture(
    id: number,
  ): Promise<{ status: HttpStatus; message: string }> {
    const picture = await this.findOne(id);
    picture.likes += 1;
    await this.pictureRepository.save(picture);

    return {
      status: HttpStatus.OK,
      message: 'Success like',
    };
  }

  async addPictures(): Promise<Picture[]> {
    const urls = await this.randomImageService.fetchRandomPictures();
    const pictures = urls.map((url) => this.pictureRepository.create({ url }));
    return await this.pictureRepository.save(pictures);
  }
}
