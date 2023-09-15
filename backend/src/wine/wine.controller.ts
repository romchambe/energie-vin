import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { CreateWineDto } from './dtos/createWine.dto';
import { Wine } from './entities/wine.entity';
import { WineService, WineWithAverage } from './wine.service';
import { CreateReviewDto } from 'src/wine/dtos/createReview.dto';
import { Review } from 'src/wine/entities/review.entity';
import { ApiQuery } from '@nestjs/swagger';
import { ParseOptionalIntPipe } from 'src/utils/ParseOptionalIntPipe';


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

  @ApiQuery({
    name: "maxPrice",
    type: Number,
    required: false
  })
  @ApiQuery({
    name: "minPrice",
    type: Number,
    required: false
  })
  @Get('/wines')
  listWines(
    @Query('maxPrice', ParseOptionalIntPipe) maxPrice?: number,
    @Query('minPrice', ParseOptionalIntPipe) minPrice?: number
  ): Promise<WineWithAverage[]> {
    return this.wineService.listWines(maxPrice, minPrice)
  }

}
