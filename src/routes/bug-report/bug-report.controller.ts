import { Controller, Get, Post, Body, Param, Delete, Req } from '@nestjs/common';
import { Request } from 'express';
import { BugReportService } from './bug-report.service';
import { CreateBugReportDto } from './dto/create-bug-report.dto';
import { HttpCode } from '@nestjs/common'
import { SkipThrottle } from '@nestjs/throttler';

@Controller('bug-report')
export class BugReportController {
  constructor(private readonly bugReportService: BugReportService) {}

  @SkipThrottle()
  @Post()
  create(@Body() createBugReportDto: CreateBugReportDto, @Req() request: Request) {
    return this.bugReportService.create(createBugReportDto, request.user.id);
  }

  @SkipThrottle()
  @Get()
  findAll() {
    return this.bugReportService.findAll();
  }

  @SkipThrottle()
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.bugReportService.remove(id);
  }
}
