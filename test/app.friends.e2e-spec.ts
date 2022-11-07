import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { useContainer } from "class-validator";
import { AppModule } from "src/app.module";
import { PrismaService } from "src/prisma/prisma.service";
import * as request from 'supertest';

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

        //   await prisma.user.create({
        //     data: fakeUsers[0],
        //   });
        //   await prisma.user.create({
        //     data: fakeUsers[1],
        //   });

        await app.init();
    });

    describe('POST ---> /login', () => {
        it('Should be able to login and return a valid Token', async () => {
            const { status, body } = await request(app.getHttpServer()).post('/login').send();
            expect(body).toHaveProperty("token")
            expect(status).toBe(201)
        });

        it('Should not be able with invalid email/password', async () => {
            const { status, body } = await request(app.getHttpServer()).post('/login').send();
            expect(body).not.toHaveProperty("token")
            expect(status).toBe(401)
        });

        it('Should not be able with invalid email/password', async () => {
            const { status, body } = await request(app.getHttpServer()).post('/login').send();
            expect(body).not.toHaveProperty("token")
            expect(status).toBe(400)
            expect(body).toHaveProperty("message")
        });
    });
})