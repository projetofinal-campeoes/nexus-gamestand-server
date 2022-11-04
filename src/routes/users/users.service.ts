import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hashSync } from 'bcryptjs';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
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

     
    const newUser = await this.prisma.user.create({ data:{
      ...createUserDto,
      password:hashSync(createUserDto.password, 10)
    }});

    return newUser
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    const findUser = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!findUser) {
      throw new NotFoundException('User not found, invalid ID');
    }

    return !!await this.prisma.user.delete({ where: { id } });
  }
}
