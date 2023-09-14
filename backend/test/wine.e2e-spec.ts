
import { INestApplication } from '@nestjs/common';
import { createNestTestApplication } from 'test/util';
import request from 'supertest'
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/core/app.module';

describe('Wine Controller - e2e', () => {
  let app: INestApplication;


  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = await createNestTestApplication(moduleFixture)
    await app.init();
  });


  describe('create wine', () => {
    it('creates a new wine ', () => {
      return request(app.getHttpServer())
        .post('/wines').send({
          name: 'toto',
          year: 2012,
          picture: 'https://xyz.com',
          currentPrice: { amount: 100 }
        })
        .expect(200)
        .then(({ body: { data } }) => {
          expect(data.name).toBe('toto')
          expect(data.id).toBeDefined()
        })
    });
  });
});
