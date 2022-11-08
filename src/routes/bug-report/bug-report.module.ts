import { Module } from '@nestjs/common';
import { BugReportService } from './bug-report.service';
import { BugReportController } from './bug-report.controller';
import { PrismaService } from '../../prisma/prisma.service';
import { MiddlewareConsumer } from '@nestjs/common/interfaces';
import { ensureAuthMiddleware } from '../../common/middlewares/ensureAuth.middleware';

@Module({
  controllers: [BugReportController],
  providers: [BugReportService, PrismaService]
})
export class BugReportModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(ensureAuthMiddleware)
            .forRoutes(BugReportController);
    }
}
