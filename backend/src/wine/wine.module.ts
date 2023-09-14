import { Module } from '@nestjs/common';
import { Wine } from './wine.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WineController } from './wine.controller';
import { WineService } from './wine.service';
import { DatabaseModule } from '../core/database.module';
import { Price } from './price.entity';
import { Review } from 'src/wine/review.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Wine, Price, Review]), DatabaseModule],
  controllers: [WineController],
  providers: [WineService],
})
export class WineModule { }
