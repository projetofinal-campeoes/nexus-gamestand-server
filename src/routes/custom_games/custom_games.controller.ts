import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseFilters,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { PrismaClientExceptionFilter } from '../../prisma-client-exception/prisma-client-exception.filter';
import { CustomGamesService } from './custom_games.service';
import { CreateCustomGameDto } from './dto/create-custom_game.dto';
import { UpdateCustomGameDto } from './dto/update-custom_game.dto';
import { CustomGamesEntity } from './entities/custom_game.entity';

@Controller('custom_games')
@ApiTags('custom_games')
@UseFilters(PrismaClientExceptionFilter)
export class CustomGamesController {
  constructor(private readonly customGamesService: CustomGamesService) { }

  @Post()
  @ApiCreatedResponse({ type: CustomGamesEntity })
  async create(
    @Req() req: Request,
    @Body() createCustomGameDto: CreateCustomGameDto,
  ) {
    const { id } = req.user
    return await this.customGamesService.create(createCustomGameDto, id);
  }

  @Get('/games/:id')
  @ApiCreatedResponse({ type: CustomGamesEntity })
  async findOne(@Param('id') id: string) {
    return await this.customGamesService.findOne(id);
  }

  @Get('/users/')
  @ApiCreatedResponse({ type: CustomGamesEntity, isArray: true })
  async findAllGamesByUserId(@Req() req: Request) {
    const { id } = req.user;

    return await this.customGamesService.findAllGamesByUserId(id);
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: CustomGamesEntity })
  async update(
    @Param('id') id: string,
    @Body() updateCustomGameDto: UpdateCustomGameDto,
  ) {
    return await this.customGamesService.update(id, updateCustomGameDto);
  }

  @SkipThrottle()
  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    await this.customGamesService.delete(id);
  }
}
