
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
        const database = configService.get('NODE_ENV') === 'test' ?
          configService.get('POSTGRES_DB_TEST') :
          configService.get('POSTGRES_DB')

        return {
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: configService.get('POSTGRES_USER'),
          password: configService.get('POSTGRES_PASSWORD'),
          database,
          entities,
          synchronize: configService.get('NODE_ENV') === 'dev' || configService.get('NODE_ENV') === 'test'
        }
      }
    }),
  ],
})
export class DatabaseModule { }