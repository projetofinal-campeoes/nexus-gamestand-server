import { BadRequestException, NotFoundException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCustomGameDto } from './dto/create-custom_game.dto';
import { UpdateCustomGameDto } from './dto/update-custom_game.dto';

@Injectable()
export class CustomGamesService {
  constructor(private prisma: PrismaService) { }

  async create(CreateCustomGameDto: CreateCustomGameDto, id:string) {
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
      data:{...CreateCustomGameDto, userId:id},
    });
    return newGame;
  }

  async findAll() {
    return this.prisma.custom_games.findMany()
  }

  async findOne(id: string) {
  
    const game = await this.prisma.custom_games.findUnique({where: { id }})

    if(!game) {
      throw new NotFoundException('Game does not exists!');
    }

    return game
  }

  async update(id: string, updateCustomGameDto: UpdateCustomGameDto) {  
    const { name, image_url,platform } = updateCustomGameDto
    const game = await this.prisma.custom_games.findUnique({where: { id }})

    if(!game) {
      throw new NotFoundException('Game does not exists!');
    }
    
    await this.prisma.custom_games.update({
      where: { id },
      data: { name, image_url, platform }
    })

    const gameUpdate = await this.prisma.custom_games.findUnique({where: { id }})

    return gameUpdate
  }

  async delete(id: string) {
    const deleteById = await this.prisma.custom_games.findUnique({
      where: {
        id
      },
    })

    if (!deleteById) {
      throw new NotFoundException('Game does not exists!');
    }

    await this.prisma.custom_games.delete({
      where: {
        id,
      }
    })

    return deleteById
  }
}
