import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { useContainer } from 'class-validator';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import {
  emailAlreadyUsed,
  fakeUsers,
  mockedUserLogin0,
  mockedUserLogin1,
  userCreateTest,
  userNameAlreadyUsed,
  userShape,
} from './mocks/user/index';

describe('AppController (e2e)', () => {
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

  describe('GET ---> /users', () => {
    it('Should be able to returns a list of users', async () => {
      const { status, body } = await request(app.getHttpServer()).get('/users');
      expect(status).toBe(200);
      expect(body).toStrictEqual(expect.arrayContaining([userShape]));
    });
  });

  describe('GET ---> /users/:id', () => {
    it('Failed to get a user with without authentication', async () => {
      const { status, body } = await request(app.getHttpServer())
        .get(`/users/${fakeUsers[0].id}`)
        .set('Authorization', `Bearer `);

      expect(status).toBe(401);
    });

    it('Failed to return a user with id different from the logged in user', async () => {
      const userLoginResponse = await request(app.getHttpServer())
        .post('/login')
        .send(mockedUserLogin0);

      const { status, body } = await request(app.getHttpServer())
        .get(`/users/100`)
        .set('Authorization', `Bearer ${userLoginResponse.body.token}`);

      expect(status).toBe(401);
    });

    it('Return a user by their id', async () => {
      const userLoginResponse = await request(app.getHttpServer())
        .post('/login')
        .send(mockedUserLogin0);

      const { status, body } = await request(app.getHttpServer())
        .get(`/users/${fakeUsers[0].id}`)
        .set('Authorization', `Bearer ${userLoginResponse.body.token}`);

      expect(status).toBe(200);
      expect(body).toStrictEqual(userShape);
      expect(body.id).toEqual(fakeUsers[0].id);
    });
  });

  describe('POST ---> /users', () => {
    it('Should be able to create a user', async () => {
      const beforeCount = await prisma.user.count();

      const { status, body } = await request(app.getHttpServer())
        .post('/users')
        .send(userCreateTest);

      const afterCount = await prisma.user.count();

      expect(status).toBe(201);
      expect(afterCount - beforeCount).toBe(1);
    });

    it('Failed to create a user with an username already being used', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/users')
        .send(userNameAlreadyUsed);

      expect(status).toBe(400);
    });

    it('Failed to create a user with an email already being used', async () => {
      const { status, body } = await request(app.getHttpServer())
        .post('/users')
        .send(emailAlreadyUsed);

      expect(status).toBe(400);
    });
  });

  describe('PATCH ---> /users/:id', () => {
    it('Failed to delete a user with without authentication', async () => {
      const { status, body } = await request(app.getHttpServer())
        .patch(`/users/${fakeUsers[1].id}`)
        .set('Authorization', `Bearer `);

      expect(status).toBe(401);
    });

    it('Failed to update a user with id different from the logged in user', async () => {
      const userLoginResponse = await request(app.getHttpServer())
        .post('/login')
        .send(mockedUserLogin1);

      const { status, body } = await request(app.getHttpServer())
        .patch(`/users/100`)
        .set('Authorization', `Bearer ${userLoginResponse.body.token}`);

      expect(status).toBe(401);
    });

    it('Should be able to update username, email and  password from user', async () => {
      const newValues = {
        username: 'newMath',
        email: 'newmath@email.com',
        password: '321@Teste',
      };

      const userLoginResponse = await request(app.getHttpServer())
        .post('/login')
        .send(mockedUserLogin0);

      const { status, body } = await request(app.getHttpServer())
        .patch(`/users/${fakeUsers[0].id}`)
        .set('Authorization', `Bearer ${userLoginResponse.body.token}`)
        .send(newValues);

      expect(body.username).toBe('newMath');
      expect(body.email).toBe('newmath@email.com');
      expect(status).toBe(200);
    });
  });

  describe('PATCH ---> /users/status/:id', () => {
    it('Shoul not be able to update status from user without authentication', async () => {
      const { status, body } = await request(app.getHttpServer())
        .patch(`/users/${fakeUsers[1].id}`)
        .set('Authorization', `Bearer `);

      expect(status).toBe(401);
    });

    it('Shoul not be able to update status from a user with id different from the logged in user', async () => {
      const newStatus = { status: false };

      const userLoginResponse = await request(app.getHttpServer())
        .post('/login')
        .send(mockedUserLogin1);

      const { status, body } = await request(app.getHttpServer())
        .patch(`/users/status/100`)
        .set('Authorization', `Bearer ${userLoginResponse.body.token}`)
        .send(newStatus);

      expect(status).toBe(401);
    });

    it('Should be able to update status from user', async () => {
      const newStatus = { status: false };

      const userLoginResponse = await request(app.getHttpServer())
        .post('/login')
        .send(mockedUserLogin1);

      const { status, body } = await request(app.getHttpServer())
        .patch(`/users/status/${fakeUsers[1].id}`)
        .set('Authorization', `Bearer ${userLoginResponse.body.token}`)
        .send(newStatus);

      expect(body.user).toHaveProperty('status');
      expect(body.user.status).toBe(false);
      expect(status).toBe(200);
    });
  });

  describe('PATCH ---> /users/steam/:id', () => {
    it('Shoul not be able to update steam_user from user without authentication', async () => {
      const { status, body } = await request(app.getHttpServer())
        .patch(`/users/${fakeUsers[1].id}`)
        .set('Authorization', `Bearer `);

      expect(status).toBe(401);
    });

    it('Shoul not be able to update steam_user from a user with id different from the logged in user', async () => {
      const newSteamUser = { steam_user: 'luwny new steam' };

      const userLoginResponse = await request(app.getHttpServer())
        .post('/login')
        .send(mockedUserLogin1);

      const { status, body } = await request(app.getHttpServer())
        .patch(`/users/steam/100`)
        .set('Authorization', `Bearer ${userLoginResponse.body.token}`)
        .send(newSteamUser);

      expect(status).toBe(401);
    });

    it('Should be able to update steam_user from user', async () => {
      const newSteamUser = { steam_user: 'luwny new steam' };

      const userLoginResponse = await request(app.getHttpServer())
        .post('/login')
        .send(mockedUserLogin1);

      const { status, body } = await request(app.getHttpServer())
        .patch(`/users/steam/${fakeUsers[1].id}`)
        .set('Authorization', `Bearer ${userLoginResponse.body.token}`)
        .send(newSteamUser);

      expect(body.user).toHaveProperty('steam_user');
      expect(body.user.steam_user).toBe('luwny new steam');
      expect(status).toBe(200);
    });
  });

  describe('PATCH ---> /users/gamepass/:id', () => {
    it('Shoul not be able to update gamepass from user without authentication', async () => {
      const { status, body } = await request(app.getHttpServer())
        .patch(`/users/${fakeUsers[1].id}`)
        .set('Authorization', `Bearer `);

      expect(status).toBe(401);
    });

    it('Shoul not be able to update gamepass from a user with id different from the logged in user', async () => {
      const newGamepass = { gamepass: false };

      const userLoginResponse = await request(app.getHttpServer())
        .post('/login')
        .send(mockedUserLogin1);

      const { status, body } = await request(app.getHttpServer())
        .patch(`/users/gamepass/100`)
        .set('Authorization', `Bearer ${userLoginResponse.body.token}`)
        .send(newGamepass);

      expect(status).toBe(401);
    });

    it('Should be able to update gamepass from user', async () => {
      const newGamepass = { gamepass: false };

      const userLoginResponse = await request(app.getHttpServer())
        .post('/login')
        .send(mockedUserLogin1);

      const { status, body } = await request(app.getHttpServer())
        .patch(`/users/gamepass/${fakeUsers[1].id}`)
        .set('Authorization', `Bearer ${userLoginResponse.body.token}`)
        .send(newGamepass);

      expect(body.user).toHaveProperty('gamepass');
      expect(body.user.gamepass).toBe(false);
      expect(status).toBe(200);
    });
  });

  describe('DELETE ---> /users/:id', () => {
    it('Failed to delete a user with without authentication', async () => {
      const { status, body } = await request(app.getHttpServer())
        .delete(`/users/${fakeUsers[1].id}`)
        .set('Authorization', `Bearer `);

      expect(status).toBe(401);
    });

    it('Failed to delete a user with id different from the logged in user', async () => {
      const userLoginResponse = await request(app.getHttpServer())
        .post('/login')
        .send(mockedUserLogin1);

      const { status, body } = await request(app.getHttpServer())
        .delete(`/users/100`)
        .set('Authorization', `Bearer ${userLoginResponse.body.token}`);

      expect(status).toBe(401);
    });

    it('Should be able to delete a user', async () => {
      const userLoginResponse = await request(app.getHttpServer())
        .post('/login')
        .send(mockedUserLogin1);

      const { status, body } = await request(app.getHttpServer())
        .delete(`/users/${fakeUsers[1].id}`)
        .set('Authorization', `Bearer ${userLoginResponse.body.token}`);

      expect(status).toBe(204);
    });
  });
});
