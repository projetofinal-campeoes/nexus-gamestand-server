import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { useContainer } from 'class-validator';
import * as request from 'supertest';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from '../src/app.module';
import { mockedUserLogin1 } from './mocks/bug_report';
import { bugReportCreateData, bugReportFakeUsers } from './mocks/bug_report';

describe('BugReportController (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;
  let token: string
  let report

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get<PrismaService>(PrismaService);

    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    await prisma.user.create({
        data: bugReportFakeUsers[0],
    });
        await prisma.user.create({
        data: bugReportFakeUsers[1],
    });

    await app.init();
  });

  describe('POST ---> /bug-report', () => {
    it('Should be able to create a bug report', async () => {
        const loginResponse = await request(app.getHttpServer()).post('/login').send(mockedUserLogin1)
        token = loginResponse.body.token

        const { status, body } = await request(app.getHttpServer()).post('/bug-report').send(bugReportCreateData).set('Authorization', `Bearer ${token}`)
        report = body

        expect(status).toBe(201)
        expect(body).toHaveProperty('id')
        expect(body).toHaveProperty('page')
        expect(body).toHaveProperty('userId')
    })

    it('Should not be able to create a bug report without token', async () => {
        const { status, body } = await request(app.getHttpServer()).post('/bug-report').send(bugReportCreateData)

        expect(status).toBe(401)
        expect(body).toHaveProperty('message')
    })
  })

  describe('GET ---> /bug-report', () => {
    it('Should be able to list all bug reports', async () => {
        const { status, body } = await request(app.getHttpServer()).get('/bug-report').set('Authorization', `Bearer ${token}`)
        
        expect(status).toBe(200)
        expect(body).toHaveLength(1)
    })

    it('Should not be able to list all bug reports without token', async () => {
        const { status, body } = await request(app.getHttpServer()).get('/bug-report')
        
        expect(status).toBe(401)
        expect(body).toHaveProperty('message')
    })
  })

  describe('DELETE ---> /promotions/:id', () => {
    it('Should be able to delete a bug report', async () => {
        const { status } = await request(app.getHttpServer()).delete(`/bug-report/${report.id}`).set('Authorization', `Bearer ${token}`)

        expect(status).toBe(204)
    })

    it('Should be able to delete a bug report without token', async () => {
        const { status, body } = await request(app.getHttpServer()).delete(`/bug-report/${report.id}`)

        expect(status).toBe(401)
        expect(body).toHaveProperty('message')
    })
  })
});