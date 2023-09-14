import { NestFactory } from '@nestjs/core';
import { AppModule } from './core/app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.use(helmet())
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    forbidUnknownValues: true,
  }))

  const config = new DocumentBuilder()
    .setTitle('Jeen API')
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/', app, document)
  await app.listen(3000);
}

bootstrap();
