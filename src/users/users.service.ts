import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { hashSync } from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto):Promise<User> {
    const { username, email } = createUserDto;

    const uniqueUserName = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });
    const uniqueUserEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (uniqueUserName || uniqueUserEmail) {
      throw new BadRequestException('Username or Email is already being used');
    }

    const newUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashSync(createUserDto.password, 10),
      },
    });

    return newUser;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const {username, email} = updateUserDto

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data:{
        username,
        email,       
        password: hashSync(updateUserDto.password, 10)
      },
    });

    return {...updatedUser, password:undefined}
  }

  async updateStatus(id: string, updateUserDto: UpdateUserDto) {
    const {status} = updateUserDto
    const updatedUserStatus = await this.prisma.user.update({
      where: { id },
      data:{
       status
      },
    });

    return {user:{
      status: updatedUserStatus.status
    }}
  }

 async updateSteamUser(id: string, updateUserDto: UpdateUserDto) {
    const {steam_user} = updateUserDto

    const updatedUserSteam = await this.prisma.user.update({
      where: { id },
      data:{
        steam_user
      },
    });

    return {user:{
      steam_user: updatedUserSteam.steam_user
    }}
  }


  async updateGamePass(id: string, updateUserDto: UpdateUserDto) {
    const {gamepass} = updateUserDto
    const updatedGamePassUser = await this.prisma.user.update({
      where: { id },
      data:{
        gamepass
      },
    });

    return {user:{
      gamepass: updatedGamePassUser.gamepass
    }}
  } 

  async remove(id: string) {
   return !!await this.prisma.user.delete({ where: { id } });
   
  }
}