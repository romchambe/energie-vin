import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWineDto } from './dtos/createWine.dto';
import { Wine } from './wine.entity';
import { Repository } from 'typeorm';
import { Price } from './price.entity';


@Injectable()
export class WineService {
  constructor(
    @InjectRepository(Wine)
    private readonly wineRepo: Repository<Wine>,
    @InjectRepository(Price)
    private readonly priceRepo: Repository<Price>,
  ) {
  }

  async createWine({ currentPrice, ...wineDto }: CreateWineDto): Promise<Wine> {
    const wine = await this.wineRepo.save(wineDto)
    const price = await this.priceRepo.save({ ...currentPrice, wine })

    return this.wineRepo.save({ ...wine, currentPriceId: price.id })
  }
}
