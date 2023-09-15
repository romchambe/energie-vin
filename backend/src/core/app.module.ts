import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database.module';
import { WineModule } from '../wine/wine.module';
import { FixtureModule } from 'src/fixture/fixture.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    WineModule,
    FixtureModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
