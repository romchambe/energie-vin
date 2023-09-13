
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const entities = [`${__dirname}/../**/*.entity{.ts,.js}`]
        return {
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: configService.get('POSTGRES_USER'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DB'),
          entities,
          synchronize: configService.get('NODE_ENV') === 'dev'
        }
      }
    }),
  ],
})
export class DatabaseModule { }