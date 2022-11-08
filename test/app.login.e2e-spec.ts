import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { useContainer } from "class-validator";
import { AppModule } from "../src/app.module";
import { PrismaService } from "../src/prisma/prisma.service";
import * as request from 'supertest';
import { fakeUsersLogin, loginUser, loginUser3 } from "./mocks/login";
import { invalidCredentials } from "./mocks/user";

describe('Integration Tests: Login Routes', () => {
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
            data: fakeUsersLogin[0],
        });
        await prisma.user.create({
            data: fakeUsersLogin[1],
        });

        await app.init();
    })

    describe('POST ---> /login', () => {
        it('Should be able to login and return a valid Token', async () => {
            const { status, body } = await request(app.getHttpServer()).post('/login').send(loginUser);
            expect(body).toHaveProperty("token")
            expect(status).toBe(201)
        });

        it('Should not be able with invalid email/password', async () => {
            const { status, body } = await request(app.getHttpServer()).post('/login').send(invalidCredentials);
            expect(body).not.toHaveProperty("token")
            expect(status).toBe(401)
        });

        it('Should not be able with invalid email/password', async () => {
            const { status, body } = await request(app.getHttpServer()).post('/login').send(loginUser3);
            expect(body).not.toHaveProperty("token")
            expect(status).toBe(400)
            expect(body).toHaveProperty("message")
        });
    });
});