import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustomGamesService } from './custom_games.service';
import { CreateCustomGameDto } from './dto/create-custom_game.dto';
import { UpdateCustomGameDto } from './dto/update-custom_game.dto';

@Controller('custom-games')
export class CustomGamesController {
  constructor(private readonly customGamesService: CustomGamesService) {}

  @Post()
  async create(@Body() createCustomGameDto: CreateCustomGameDto) {
    return this.customGamesService.create(createCustomGameDto);
  }

  @Get()
  async findAll() {
    return this.customGamesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customGamesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCustomGameDto: UpdateCustomGameDto) {
    return this.customGamesService.update(+id, updateCustomGameDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.customGamesService.delete(id);
  }
}
