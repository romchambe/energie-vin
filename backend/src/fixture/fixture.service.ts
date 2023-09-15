import { Injectable } from '@nestjs/common';
import { randomPositiveInt } from 'src/utils/math.util';
import { Wine } from 'src/wine/entities/wine.entity';
import { WineService } from 'src/wine/wine.service';

const wineFactory = () => ({
  name: `Chateau ${randomPositiveInt(1000)}`,
  year: 1800 + randomPositiveInt(222),
  picture: 'https://www.cave-fraisse.fr/2296-pdt_540/demi-bouteille-vin-rouge-bourgogne-hautes-cotes-de-beaune-.jpg',
  currentPrice: { amount: randomPositiveInt(500) * 10 }
})

const reviewFactory = (index) => ({
  author: `Parker ${index}`,
  rating: randomPositiveInt(100)
})


@Injectable()
export class FixtureService {
  constructor(
    private readonly wineSevice: WineService
  ) {
  }

  async createWineWithRelations(): Promise<Wine> {
    const wine = await this.wineSevice.createWine(wineFactory())

    const numberOfReviews = randomPositiveInt(5)

    await Promise.all(
      new Array(numberOfReviews)
        .fill(null)
        .map(
          (val, index) => this.wineSevice.createReviewForWine(wine.id, reviewFactory(index))
        )
    )

    return wine
  }
}
