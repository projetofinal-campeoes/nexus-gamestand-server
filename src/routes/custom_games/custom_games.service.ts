import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCustomGameDto } from './dto/create-custom_game.dto';
import { UpdateCustomGameDto } from './dto/update-custom_game.dto';

@Injectable()
export class CustomGamesService {
  constructor(private prisma: PrismaService) { }

  async create(CreateCustomGameDto: CreateCustomGameDto) {
    const { name } = CreateCustomGameDto;

    const alreadyExistingName = await this.prisma.custom_games.findFirst({
      where: {
        name,
      },
    })

    if (alreadyExistingName) {
      throw new BadRequestException('This game already exists')
    }

    const newGame = await this.prisma.custom_games.create({
      data:CreateCustomGameDto,
    });
    return newGame;
  }

  async findAll() {
    return this.prisma.custom_games.findMany()
  }

  async findOne(id: string) {
    return this.prisma.custom_games.findUnique({where: { id }})
  }

  async update(id: string, updateCustomGameDto: UpdateCustomGameDto) {    
    return await this.prisma.custom_games.update({
      where: { id },
      data: UpdateCustomGameDto
    })
  }

  async delete(id: string) {
    const deleteById = await this.prisma.custom_games.findFirst({
      where: {
        id
      },
    })

    if (!deleteById) {
      throw new Error('Game does not exists!');
    }

    return !!await this.prisma.custom_games.delete({
      where: {
        id,
      }
    })
  }
}
