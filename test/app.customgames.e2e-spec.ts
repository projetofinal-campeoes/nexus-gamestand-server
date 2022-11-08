import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { useContainer } from 'class-validator';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import {
  accountTest,
  customGamesShape,
  customGameTest,
  loginTest,
  loginTest2,
  patchedGames,
} from './mocks/custom_games';

describe('Integration Tests: Custom Games Routes', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let customGame
  let token: string

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get<PrismaService>(PrismaService);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await prisma.user.create({
      data: accountTest,
    });
    await app.init();
  });

  describe('POST ---> /custom_games', () => {
    it('Should be able to create a custom game', async () => {
      const response = await request(app.getHttpServer())
        .post('/login')
        .send(loginTest);
        token = response.body.token
      const { status, body } = await request(app.getHttpServer())
        .post('/custom_games')
        .send(customGameTest[0])
        .set('Authorization', `Bearer ${token}`);
        customGame = body
      expect(status).toBe(201);
      expect(body).toStrictEqual(customGamesShape);
    });

    it('Should not be able to create a custom game without token', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/custom_games')
        .send(customGameTest[0])
        .set('Authorization', `Bearer`);

      expect(status).toBe(401);
      expect(body).toHaveProperty('message');
    });

    it('Should not be able to with the same custom game name', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/custom_games')
        .send(customGameTest[0])
        .set('Authorization', `Bearer ${token}`);

      expect(status).toBe(400);
      expect(body).toHaveProperty('message');
    });

    it('Should not be able to create a custom game with incorrect body', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/custom_games')
        .send(customGameTest[1])
        .set('Authorization', `Bearer ${token}`);

      expect(status).toBe(400);
      expect(body).toHaveProperty('message');
    });

    it('Should not be able to create a custom game name lower than 3 characters', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/custom_games')
        .send(customGameTest[1])
        .set('Authorization', `Bearer ${token}`);

      expect(status).toBe(400);
      expect(body).toHaveProperty('message');
    });

    it('Should not be able to create a custom game with invalid platform', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/custom_games')
        .send(customGameTest[2])
        .set('Authorization', `Bearer ${token}`);

      expect(status).toBe(400);
      expect(body).toHaveProperty('message');
    });
  });

  describe('GET ---> /custom_games/users', () => {
    it('Should not be able to show custom games by user with incorrect token', async () => {
      const { status, body } = await request(app.getHttpServer())
        .get('/custom_games/users')
        .set('Authorization', `Bearer`);

      expect(status).toBe(401);
      expect(body).toHaveProperty('message');
    });

    it('Should not be able to show custom games by user with incorrect email or password', async () => {
      const response = await request(app.getHttpServer())
        .post('/login')
        .send(loginTest2);
      const { status, body } = await request(app.getHttpServer())
        .get('/custom_games/users')
        .set('Authorization', `Bearer ${response.body.token}`);

      expect(status).toBe(401);
      expect(body).toHaveProperty('message');
    });

    it('Should be able to show all games from user by ID', async () => {
      const { status, body } = await request(app.getHttpServer())
        .get('/custom_games/users')
        .set('Authorization', `Bearer ${token}`);
      expect(status).toBe(200);
      expect(body).toHaveProperty('custom_games');
      expect(body.custom_games).toStrictEqual(
        expect.arrayContaining([customGamesShape]),
      );
    });

    it('Should be able to show game by game ID', async () => {
      const response = await request(app.getHttpServer())
        .get('/custom_games/users')
        .set('Authorization', `Bearer ${token}`);
      const { status, body } = await request(app.getHttpServer())
 tests/customgames
        .get(`/custom_games/games/${response.body.custom_games[0].id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(status).toBe(200);
      expect(body).toStrictEqual(customGamesShape);
    });
  });

  describe('PATCH ---> /custom_games', () => {
    it('Should not be able to update games with invalid token', async () => {
      const { status, body } = await request(app.getHttpServer())
        .get('/custom_games/users')
        .set('Authorization', `Bearer`);

      expect(status).toBe(401);
      expect(body).toHaveProperty('message');
    });

    it('Should be able to update games with valid token', async () => {
      const response = await request(app.getHttpServer())
        .get('/custom_games/users')
        .set('Authorization', `Bearer ${token}`);

      const { status, body } = await request(app.getHttpServer())
        .patch(`/custom_games/${response.body.custom_games[0].id}`).send(patchedGames)
        .set('Authorization', `Bearer ${token}`);

      expect(status).toBe(200);
      expect(body).toStrictEqual(customGamesShape)
      expect(body.name).toStrictEqual(patchedGames.name)
      expect(body.platform).toStrictEqual(patchedGames.platform)
    });

    it('Should not be able to update games with invalid name', async () => {

      const response = await request(app.getHttpServer())
        .get('/custom_games/users')
        .set('Authorization', `Bearer ${token}`);

      const { status, body } = await request(app.getHttpServer())
        .patch(`/custom_games/${response.body.custom_games[0].id}`).send(customGameTest[1])
        .set('Authorization', `Bearer ${token}`);

      expect(status).toBe(400);
      expect(body).toHaveProperty('message')
    });    
  });

  describe('DELETE ---> /custom_games/:id', () => {     
    it('Should not be able to delete games with invalid token', async () => {
      const { status, body } = await request(app.getHttpServer())
        .delete(`/custom_games/${customGame.id}`)
        .set('Authorization', `Bearer`);

      expect(status).toBe(401);
      expect(body).toHaveProperty('message');
    });

    it('Should be able to delete games with valid token', async () => {
      const { status, body } = await request(app.getHttpServer())
        .delete(`/custom_games/${customGame.id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(status).toBe(204);
      expect(body).toMatchObject({})
    });
  })
});
