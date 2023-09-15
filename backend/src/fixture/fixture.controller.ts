import { Controller, Get, } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FixtureService } from 'src/fixture/fixture.service';
import { Wine } from 'src/wine/entities/wine.entity';


@Controller('/fixtures')
export class FixtureController {
  constructor(
    private readonly fixtureService: FixtureService,
    private readonly configService: ConfigService
  ) { }

  @Get('/create-wine')
  createWineWithRelations(): Promise<Wine> {
    return this.configService.get('NODE_ENV') === 'dev' || this.configService.get('NODE_ENV') === 'test'
      ? this.fixtureService.createWineWithRelations()
      : null
  }
}
