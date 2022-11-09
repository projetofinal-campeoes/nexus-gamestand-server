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
  errorShape,
  invalidFriend,
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
    it('Failed to add a user without authentication', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/friends')
        .send(addFriend)
        .set('Authorization', `Bearer`);

      expect(status).toBe(401);
      expect(body).toStrictEqual(errorShape);
    });

    it('Failed to add a invalid user', async () => {
      const userLoginResponse = await request(app.getHttpServer())
        .post('/login')
        .send(loginUser);

      const { status, body } = await request(app.getHttpServer())
        .post('/friends')
        .send(invalidFriend)
        .set('Authorization', `Bearer ${userLoginResponse.body.token}`);

      expect(status).toBe(404);
      expect(body).toStrictEqual(errorShape);
    });

    it('Should be not able to add own user', async () => {
      const ownUsername = { username: fakeUsers[0].username };

      const userLoginResponse = await request(app.getHttpServer())
        .post('/login')
        .send(loginUser);

      const { status, body } = await request(app.getHttpServer())
        .post('/friends')
        .send(ownUsername)
        .set('Authorization', `Bearer ${userLoginResponse.body.token}`);

      expect(status).toBe(400);
      expect(body).toStrictEqual(errorShape);
    });

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

    it('Should not be able to add a friend as already added', async () => {
      const userLoginResponse = await request(app.getHttpServer())
        .post('/login')
        .send(loginUser);

      const { status, body } = await request(app.getHttpServer())
        .post('/friends')
        .send(addFriend)
        .set('Authorization', `Bearer ${userLoginResponse.body.token}`);

      expect(status).toBe(400);
      expect(body).toStrictEqual(errorShape);
    });
  });

  describe('GET ---> /friends', () => {
    it('Failed to list a user with our list of friends without authentication', async () => {
      const { status, body } = await request(app.getHttpServer())
        .get('/friends')
        .set('Authorization', `Bearer`);

      expect(status).toBe(401);
      expect(body).toStrictEqual(errorShape);
    });

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
    it('Failed to list especific friend without authentication', async () => {
      const { status, body } = await request(app.getHttpServer())
        .get(`/friends/${fakeUsers[1].id}`)
        .set('Authorization', `Bearer`);

      expect(status).toBe(401);
      expect(body).toStrictEqual(errorShape);
    });

    it('Failed to list especific friend with invalid id', async () => {
      const invalidId = '26aa9ab6-af31-42ba-9a83-5e79c33380e4';
      const userLoginResponse = await request(app.getHttpServer())
        .post('/login')
        .send(loginUser);

      const { status, body } = await request(app.getHttpServer())
        .get(`/friends/${invalidId}`)
        .set('Authorization', `Bearer ${userLoginResponse.body.token}`);

      expect(status).toBe(404);
      expect(body).toStrictEqual(errorShape);
    });

    it('Failed to list especific user not friend', async () => {
      const userLoginResponse = await request(app.getHttpServer())
        .post('/login')
        .send(loginUser);

      const { status, body } = await request(app.getHttpServer())
        .get(`/friends/${fakeUsers[2].id}`)
        .set('Authorization', `Bearer ${userLoginResponse.body.token}`);

      expect(status).toBe(404);
      expect(body).toStrictEqual(errorShape);
    });

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
    it('Failed to delete a friend without authentication', async () => {
      const { status, body } = await request(app.getHttpServer())
        .delete(`/friends/${fakeUsers[1].id}`)
        .set('Authorization', `Bearer`);

      expect(status).toBe(401);
      expect(body).toStrictEqual(errorShape);
    });

    it('Failed to delete friend with invalid id', async () => {
      const invalidId = '26aa9ab6-af31-42ba-9a83-5e79c33380e4';
      const userLoginResponse = await request(app.getHttpServer())
        .post('/login')
        .send(loginUser);

      const { status, body } = await request(app.getHttpServer())
        .delete(`/friends/${invalidId}`)
        .set('Authorization', `Bearer ${userLoginResponse.body.token}`);

      expect(status).toBe(404);
      expect(body).toStrictEqual(errorShape);
    });

    it('Failed to delete user not friend', async () => {
      const userLoginResponse = await request(app.getHttpServer())
        .post('/login')
        .send(loginUser);

      const { status, body } = await request(app.getHttpServer())
        .delete(`/friends/${fakeUsers[2].id}`)
        .set('Authorization', `Bearer ${userLoginResponse.body.token}`);

      expect(status).toBe(404);
      expect(body).toStrictEqual(errorShape);
    });

    it('Should be able to delete a friend', async () => {
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
