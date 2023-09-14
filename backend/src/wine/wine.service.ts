import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWineDto } from './dtos/createWine.dto';
import { Wine } from './wine.entity';
import { Repository } from 'typeorm';
import { Price } from './price.entity';
import { CreateReviewDto } from 'src/wine/dtos/createReview.dto';
import { Review } from 'src/wine/review.entity';


@Injectable()
export class WineService {
  constructor(
    @InjectRepository(Wine)
    private readonly wineRepo: Repository<Wine>,
    @InjectRepository(Price)
    private readonly priceRepo: Repository<Price>,
    @InjectRepository(Review)
    private readonly reviewRepo: Repository<Review>,
  ) {
  }

  async createWine({ currentPrice, ...wineDto }: CreateWineDto): Promise<Wine> {
    const wine = await this.wineRepo.save(wineDto)
    const price = await this.priceRepo.save({ ...currentPrice, wine })

    return this.wineRepo.save({ ...wine, currentPriceId: price.id })
  }

  async createReviewForWine(wineId: number, dto: CreateReviewDto): Promise<Review> {
    return this.reviewRepo.save({ ...dto, wine: { id: wineId } })
  }
}
