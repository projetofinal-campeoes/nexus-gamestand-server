import { Controller, Get, Post, Body, Patch, Param, Delete, Req, HttpCode } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { Request } from 'express';
import { SkipThrottle } from '@nestjs/throttler';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('promotions')
@Controller('promotions')
export class PromotionsController {
  constructor(private readonly promotionsService: PromotionsService) { }

  @SkipThrottle()
  @Post()
  create(@Body() createPromotionDto: CreatePromotionDto, @Req() request: Request) {
    return this.promotionsService.create(createPromotionDto, request.user.id);
  }

  @SkipThrottle()
  @Get()
  findAll() {
    return this.promotionsService.findAll();
  }

  @SkipThrottle()
  @Get('/owned')
  getUserPromotions(@Req() request: Request) {
    return this.promotionsService.getUserPromotions(request.user.id);
  }

  @SkipThrottle()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePromotionDto: UpdatePromotionDto) {
    return this.promotionsService.update(id, updatePromotionDto);
  }

  @SkipThrottle()
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.promotionsService.remove(id);
  }

  @SkipThrottle()
  @Post(':id/:rate')
  @HttpCode(200)
  rate(@Param('id') id: string, @Param('rate') rate: string, @Req() request: Request) {
    return this.promotionsService.rate(id, rate, request.user.id);
  }
}
