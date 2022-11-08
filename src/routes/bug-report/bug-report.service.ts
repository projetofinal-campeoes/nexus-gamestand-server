import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBugReportDto } from './dto/create-bug-report.dto';

@Injectable()
export class BugReportService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBugReportDto: CreateBugReportDto, userId: string) {
    const createdReport = await this.prisma.bug_report.create({
        data: {
            ...createBugReportDto,
            userId
        }
    })

    return createdReport;
  }

  async findAll() {
    return await this.prisma.bug_report.findMany();
  }

  async remove(id: string) {
    await this.prisma.bug_report.delete({ 
        where: {
            id
        }
     })

    return null;
  }
}
