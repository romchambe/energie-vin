import { Module } from '@nestjs/common';
import { Wine } from './entities/wine.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WineController } from './wine.controller';
import { WineService } from './wine.service';
import { DatabaseModule } from '../core/database.module';
import { Price } from './entities/price.entity';
import { Review } from 'src/wine/entities/review.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wine, Price, Review]), DatabaseModule],
  controllers: [WineController],
  providers: [WineService],
  exports: [WineService]
})
export class WineModule { }
