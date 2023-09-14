import { Body, Controller, Post } from '@nestjs/common';
import { CreateWineDto } from './dtos/createWine.dto';
import { Wine } from './wine.entity';
import { WineService } from './wine.service';


@Controller('/wines')
export class WineController {
  constructor(private readonly wineService: WineService) { }

  @Post()
  createWine(@Body() dto: CreateWineDto): Promise<Wine> {
    return this.wineService.createWine(dto)
  }


}
