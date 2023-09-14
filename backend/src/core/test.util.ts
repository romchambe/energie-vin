import { INestApplication, ValidationPipe } from "@nestjs/common";
import { TestingModule } from "@nestjs/testing";

export const createNestTestApplication = async (module: TestingModule): Promise<INestApplication> => {
  return module.createNestApplication()
    .setGlobalPrefix('api')
    .useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }));
}