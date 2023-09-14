
import { INestApplication } from '@nestjs/common';
import { createNestTestApplication } from '../src/core/test.util';
import * as request from 'supertest'
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/core/app.module';

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
        .post('/api/wines').send({
          name: 'toto',
          year: 2012,
          picture: 'https://xyz.com',
          currentPrice: { amount: 100 }
        })
        .expect(201)
        .then(({ body }) => {
          expect(body.name).toBe('toto')
          expect(body.id).toBeDefined()
          expect(body.currentPriceId).toBeDefined()
        })
    });

    it('rejects the request if invalid data is provided', () => {
      return request(app.getHttpServer())
        .post('/api/wines').send({
          name: 'toto',
          year: 2012,
          picture: 'https://xyz.com',
          currentPrice: { amount: -100 }
        })
        .expect(400)
    });
  });
});
