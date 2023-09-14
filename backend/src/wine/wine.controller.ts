import { Body, Controller, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CreateWineDto } from './dtos/createWine.dto';
import { Wine } from './wine.entity';
import { WineService } from './wine.service';
import { CreateReviewDto } from 'src/wine/dtos/createReview.dto';
import { Review } from 'src/wine/review.entity';


@Controller('/wines')
export class WineController {
  constructor(private readonly wineService: WineService) { }

  @Post()
  createWine(@Body() dto: CreateWineDto): Promise<Wine> {
    return this.wineService.createWine(dto)
  }

  @Post('/:wineId/review')
  createReview(
    @Param('wineId', ParseIntPipe) wineId: number,
    @Body() dto: CreateReviewDto
  ): Promise<Review> {
    return this.wineService.createReviewForWine(wineId, dto)
  }
}
