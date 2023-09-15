
import { INestApplication } from '@nestjs/common';
import { createNestTestApplication } from '../src/core/test.util';
import * as request from 'supertest'
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from 'src/core/app.module';
import { DataSource } from 'typeorm';
import { Wine } from 'src/wine/entities/wine.entity';
import { Price } from 'src/wine/entities/price.entity';

describe('Wine Controller - e2e', () => {
  let app: INestApplication
  let dataSource: DataSource

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    dataSource = moduleFixture.get(DataSource)
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
          currentPrice: { amount: 100, revisionDate: new Date().toISOString() }
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

  describe('create review', () => {
    let wine: Wine
    beforeAll(async () => {
      wine = await dataSource.manager.getRepository(Wine).create({ name: 'tata', year: 2021, picture: 'https://xyz.com' }).save()
      const price = await dataSource.manager.getRepository(Price).create({ amount: 1000, wine }).save()
      wine.currentPrice = price
      await wine.save()
    })
    it('creates a new review for a wine', () => {
      return request(app.getHttpServer())
        .post(`/api/wines/${wine.id}/review`).send({
          author: 'Parker',
          rating: 99,
        })
        .expect(201)
        .then(({ body }) => {
          expect(body.author).toBe('Parker')
        })
    });

    it('rejects the request if invalid data is provided', () => {
      return request(app.getHttpServer())
        .post(`/api/wines/${wine.id}/review`).send({
          author: 'Parker 2',
          rating: -1,
        })
        .expect(400)
    });
  });
});
