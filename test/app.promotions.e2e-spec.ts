import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { useContainer } from 'class-validator';
import * as request from 'supertest';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import { mockedUserLogin0, mockedUserLogin1 } from './mocks/promotions';
import { promotionCreateData, promotionFakeUsers, promotionUpdatedData } from './mocks/promotions';

describe('PromotionsController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let token: string
  let promotion
  let alternativeToken: string
  let alternativePromotion

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get<PrismaService>(PrismaService);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await prisma.user.create({
        data: promotionFakeUsers[0],
    });
        await prisma.user.create({
        data: promotionFakeUsers[1],
    });

    await app.init();
  });

  describe('POST ---> /promotions', () => {
    it('Should be able to create a promotion', async () => {
        const loginResponse = await request(app.getHttpServer()).post('/login').send(mockedUserLogin1)
        token = loginResponse.body.token

        const { status, body } = await request(app.getHttpServer()).post('/promotions').send(promotionCreateData).set('Authorization', `Bearer ${token}`)
        promotion = body

        expect(status).toBe(201)
        expect(body).toHaveProperty('id')
        expect(body).toHaveProperty('shiny_meter')
        expect(body).toHaveProperty('userId')
    })

    it('Should not be able to create a promotion without token', async () => {
        const { status, body } = await request(app.getHttpServer()).post('/promotions').send(promotionCreateData)

        expect(status).toBe(401)
        expect(body).toHaveProperty('message')
    })
  })

  describe('GET ---> /promotions', () => {
    it('Should be able to list all promotion', async () => {
        const { status, body } = await request(app.getHttpServer()).get('/promotions').set('Authorization', `Bearer ${token}`)
        
        expect(status).toBe(200)
        expect(body).toHaveLength(1)
    })

    it('Should not be able to list all promotion without token', async () => {
        const { status, body } = await request(app.getHttpServer()).get('/promotions')
        
        expect(status).toBe(401)
        expect(body).toHaveProperty('message')
    })
  })

  describe('GET ---> /promotions/owned', () => {
    it('Should be able to list all owned promotion', async () => {
        const { status, body } = await request(app.getHttpServer()).get('/promotions/owned').set('Authorization', `Bearer ${token}`)
        
        expect(status).toBe(200)
        expect(body).toHaveLength(1)
    })

    it('Should not be able to list all owned promotion without token', async () => {
        const { status, body } = await request(app.getHttpServer()).get('/promotions/owned')
        
        expect(status).toBe(401)
        expect(body).toHaveProperty('message')
    })
  })

  describe('PATCH ---> /promotions/:id', () => {
    it('Should be able to update only owned promotion', async () => {
        const { status, body } = await request(app.getHttpServer()).patch(`/promotions/${promotion.id}`).send(promotionUpdatedData).set('Authorization', `Bearer ${token}`)

        expect(status).toBe(200)
        expect(body).toMatchObject({
            name: 'Left 4 Dead - Xbox',
            promo_url: 'www.steam.com',
            price: '14.9',
            description: 'Esta rolando promoção do Left 4 Dead na Steam, corre lá pegar!'
        })
    })

    it('Should not be able to update a promotion without token', async () => {
        const { status, body } = await request(app.getHttpServer()).patch(`/promotions/${promotion.id}`).send(promotionUpdatedData)

        expect(status).toBe(401)
        expect(body).toHaveProperty('message')
    })

    it('Should not be able to update not owned promotion', async () => {
        const loginResponse = await request(app.getHttpServer()).post('/login').send(mockedUserLogin0)
        alternativeToken = loginResponse.body.token
        
        const newPromotion = await request(app.getHttpServer()).post('/promotions').send(promotionCreateData).set('Authorization', `Bearer ${alternativeToken}`)
        alternativePromotion = newPromotion.body
        
        const { status, body } = await request(app.getHttpServer()).patch(`/promotions/${alternativePromotion.id}`).send(promotionUpdatedData).set('Authorization', `Bearer ${token}`)

        expect(status).toBe(401)
        expect(body).toHaveProperty('message')
    })
  })

  describe('POST ---> /promotions/:id/:rate', () => {
    it('Should be able to like a promotion', async () => {
        const { status } = await request(app.getHttpServer()).post(`/promotions/${promotion.id}/like`).set('Authorization', `Bearer ${token}`)

        expect(status).toBe(200)

        const { body } = await request(app.getHttpServer()).get('/promotions').set('Authorization', `Bearer ${token}`)
        expect(body[0].shiny_meter).toBe(1)
        expect(body[0].rate_log).toHaveLength(1)
    })

    it('Should be able to dislike a promotion', async () => {
        const { status } = await request(app.getHttpServer()).post(`/promotions/${promotion.id}/dislike`).set('Authorization', `Bearer ${alternativeToken}`)

        expect(status).toBe(200)
        
        const { body } = await request(app.getHttpServer()).get('/promotions').set('Authorization', `Bearer ${token}`)
        expect(body[0].shiny_meter).toBe(0)
        expect(body[0].rate_log).toHaveLength(2)
    })

    it('Should not be able to rate twice a promotion', async () => {
        const { status, body } = await request(app.getHttpServer()).post(`/promotions/${promotion.id}/like`).set('Authorization', `Bearer ${token}`)

        expect(status).toBe(409)
        
        expect(body).toHaveProperty('message')
    })

    it('Should not be able to rate a promotion without token', async () => {
        const { status, body } = await request(app.getHttpServer()).post(`/promotions/${promotion.id}/like`).send(promotionUpdatedData)

        expect(status).toBe(401)
        expect(body).toHaveProperty('message')
    })
  })

  describe('DELETE ---> /promotions/:id', () => {
    it('Should be able to delete only owned promotion', async () => {
        const { status } = await request(app.getHttpServer()).delete(`/promotions/${promotion.id}`).set('Authorization', `Bearer ${token}`)

        expect(status).toBe(204)
    })

    it('Should be able to delete only owned promotion without token', async () => {
        const { status, body } = await request(app.getHttpServer()).delete(`/promotions/${promotion.id}`)

        expect(status).toBe(401)
        expect(body).toHaveProperty('message')
    })

    it('Should not be able to delete not owned promotion', async () => {    
        const { status, body } = await request(app.getHttpServer()).delete(`/promotions/${alternativePromotion.id}`).set('Authorization', `Bearer ${token}`)

        expect(status).toBe(401)
        expect(body).toHaveProperty('message')
    })
  })
});