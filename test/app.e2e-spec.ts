import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { useContainer } from 'class-validator';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from './../src/prisma/prisma.service';
import {
  emailAlreadyUsed,
  fakeUsers,
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
      expect(body).toHaveLength(2);
      expect(body[0].id).toEqual(fakeUsers[0].id);
      expect(body[1].id).toEqual(fakeUsers[1].id);
    });
  });

  describe('GET ---> /users/:id', () => {
    it('Return a user by their id', async () => {
      const { status, body } = await request(app.getHttpServer()).get(
        `/users/${fakeUsers[0].id}`,
      );

      expect(status).toBe(200);
      expect(body).toStrictEqual(userShape);
      expect(body.id).toEqual(fakeUsers[0].id);
    });

    it('Fails to return non existing user', async () => {
      const { status, body } = await request(app.getHttpServer()).get(
        `/users/100`,
      );
      expect(status).toBe(404);
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
  });

  it('Failed to create a user with an email already being used', async () => {
    const { status, body } = await request(app.getHttpServer())
      .post('/users')
      .send(emailAlreadyUsed);

    expect(status).toBe(400);
  });

  describe('DELETE ---> /users/:id', () => {
    it('Should be able to delete a user', async () => {
      const { status, body } = await request(app.getHttpServer()).delete(
        `/users/${fakeUsers[0].id}`,
      );

      expect(status).toBe(204);
    });

    it('Failed to delete a user with an invalid ID', async () => {
      const { status, body } = await request(app.getHttpServer()).delete(
        '/users/100',
      );

      expect(status).toBe(404);
    });
  });
});