import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { hashSync } from 'bcryptjs';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import {
  UpdateUserAvatarDto,
  UpdateUserDto,
  UpdateUserPassword,
  UpdateUserSteam,
} from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
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

    return { ...newUser, password: undefined };
  }

  async findAll() {
    const allUsers = await this.prisma.user.findMany();

    return allUsers.map((user) => ({ ...user, password: undefined }));
  }

  async findOne(id: string) {
    const findOneUser = await this.prisma.user.findUnique({
      where: { id },
      include: {
        custom_games: true,
        friends: true,
        promotions: true,
        bug_report: true,
      },
    });
    return { ...findOneUser, password: undefined };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { username, email } = updateUserDto;

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        username,
        email,
      },
    });

    return { ...updatedUser, password: undefined };
  }

  async updatePassword(id: string, updateUserDto: UpdateUserPassword) {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: hashSync(updateUserDto.password, 10),
      },
    });

    return { ...updatedUser, password: undefined };
  }

  async updateUserAvatar(id: string, updateUserDto: UpdateUserAvatarDto) {
    const { avatar_url } = updateUserDto;

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        avatar_url,
      },
    });

    return { ...updatedUser, password: undefined };
  }

  async updateStatus(id: string) {
    const findUser = await this.prisma.user.findUnique({ where: { id } });

    const updatedUserStatus = await this.prisma.user.update({
      where: { id },
      data: {
        status: !findUser.status,
      },
    });

    return {
      user: {
        status: updatedUserStatus.status,
      },
    };
  }

  async updateSteamUser(id: string, updateUserDto: UpdateUserSteam) {
    const { steam_user } = updateUserDto;

    const updatedUserSteam = await this.prisma.user.update({
      where: { id },
      data: {
        steam_user,
      },
    });

    return {
      user: {
        steam_user: updatedUserSteam.steam_user,
      },
    };
  }

  async updateGamePass(id: string) {
    const findUser = await this.prisma.user.findUnique({ where: { id } });

    const updatedUserStatus = await this.prisma.user.update({
      where: { id },
      data: {
        gamepass: !findUser.gamepass,
      },
    });

    return {
      user: {
        gamepass: updatedUserStatus.gamepass,
      },
    };
  }

  async remove(id: string) {
    return !!(await this.prisma.user.delete({ where: { id } }));
  }
}
