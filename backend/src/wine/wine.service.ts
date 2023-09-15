import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWineDto } from './dtos/createWine.dto';
import { Wine } from './entities/wine.entity';
import { BaseEntity, Repository } from 'typeorm';
import { Price } from './entities/price.entity';
import { CreateReviewDto } from 'src/wine/dtos/createReview.dto';
import { Review } from 'src/wine/entities/review.entity';
import { average } from 'src/utils/math.util';

export type WineWithAverage = Omit<Wine, keyof BaseEntity> & {
  average: number
}

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
    console.log(price)
    return this.wineRepo.save({ ...wine, currentPrice: price })
  }

  async createReviewForWine(wineId: number, dto: CreateReviewDto): Promise<Review> {
    return this.reviewRepo.save({ ...dto, wine: { id: wineId } })
  }

  async listWines(maxPrice?: number, minPrice = 0): Promise<WineWithAverage[]> {
    const baseWineQuery = this.wineRepo.createQueryBuilder('wine')
      .leftJoinAndSelect('wine.reviews', 'rev')
      .leftJoinAndSelect('wine.currentPrice', 'price')
      .andWhere('price.amount >= :minPrice', { minPrice })

    const filteredWineQuery = !!maxPrice
      ? baseWineQuery
        .andWhere('price.amount <= :maxPrice', { maxPrice })
      : baseWineQuery

    const wines = await filteredWineQuery.getMany()

    const winesWithAverage = wines.map(
      ({ reviews, ...wine }) => ({
        ...wine,
        reviews,
        average: average(reviews.map(({ rating }) => rating))
      }))

    return winesWithAverage.sort(({ average: average1, }, { average: average2 }) => average2 - average1)
  }
}
