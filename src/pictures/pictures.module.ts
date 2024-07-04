import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PicturesService } from './pictures.service';
import { PicturesController } from './pictures.controller';
import { Picture } from './picture.entity';
import { RandomImageService } from './random-image.service';

@Module({
  imports: [TypeOrmModule.forFeature([Picture])],
  providers: [PicturesService, RandomImageService],
  controllers: [PicturesController],
})
export class PicturesModule {}
