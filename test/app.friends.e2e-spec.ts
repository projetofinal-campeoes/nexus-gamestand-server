import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { useContainer } from 'class-validator';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import {
  userShape,
  friendsShape,
  loginUser,
  fakeUsers,
  userWithFriendsShape,
  addFriend,
} from './mocks/friends';

describe('Integration Tests: Friends Route', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get<PrismaService>(PrismaService);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await prisma.user.create({
      data: fakeUsers[0],
    });
    await prisma.user.create({
      data: fakeUsers[1],
    });

    await app.init();
  });

  describe('POST ---> /friends', () => {
    it('Should be able to add a new friend', async () => {
      const userLoginResponse = await request(app.getHttpServer())
        .post('/login')
        .send(loginUser);

      const { status, body } = await request(app.getHttpServer())
        .post('/friends')
        .send(addFriend)
        .set('Authorization', `Bearer ${userLoginResponse.body.token}`);

      expect(status).toBe(201);
      expect(body).toHaveProperty('message');

      const response = await request(app.getHttpServer())
        .get('/friends')
        .set('Authorization', `Bearer ${userLoginResponse.body.token}`);
      expect(response.body.friends).toHaveLength(1);
    });
  });

  describe('GET ---> /friends', () => {
    it('Should be able to returns the user with our list of friends', async () => {
      const userLoginResponse = await request(app.getHttpServer())
        .post('/login')
        .send(loginUser);

      const { status, body } = await request(app.getHttpServer())
        .get('/friends')
        .set('Authorization', `Bearer ${userLoginResponse.body.token}`);
      expect(status).toBe(200);
      expect(body).toStrictEqual(userWithFriendsShape);
      expect(body).not.toHaveProperty('password');
      expect(body.friends).toStrictEqual(
        expect.arrayContaining([friendsShape]),
      );
    });
  });

  describe('GET ---> /friends/:id', () => {
    it('Should be able to returns especific friend', async () => {
      const userLoginResponse = await request(app.getHttpServer())
        .post('/login')
        .send(loginUser);

      const { status, body } = await request(app.getHttpServer())
        .get(`/friends/${fakeUsers[1].id}`)
        .set('Authorization', `Bearer ${userLoginResponse.body.token}`);
      expect(status).toBe(200);
      expect(body).toStrictEqual(userShape);
      expect(body).not.toHaveProperty('password');
    });
  });

  describe('DELETE ---> /friends/:id', () => {
    it('Should be able to delete a especific friend', async () => {
      const userLoginResponse = await request(app.getHttpServer())
        .post('/login')
        .send(loginUser);

      const { status, body } = await request(app.getHttpServer())
        .delete(`/friends/${fakeUsers[1].id}`)
        .set('Authorization', `Bearer ${userLoginResponse.body.token}`);

      expect(status).toBe(204);
      expect(body).toEqual({});
    });
  });
});
