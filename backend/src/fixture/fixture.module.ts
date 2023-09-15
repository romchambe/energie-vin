import { Module } from '@nestjs/common';
import { DatabaseModule } from '../core/database.module';
import { FixtureService } from 'src/fixture/fixture.service';
import { FixtureController } from 'src/fixture/fixture.controller';
import { WineModule } from 'src/wine/wine.module';

@Module({
  imports: [
    DatabaseModule,
    WineModule
  ],
  controllers: [FixtureController],
  providers: [FixtureService],
})
export class FixtureModule { }
