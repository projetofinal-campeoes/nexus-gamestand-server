import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFriendDto } from './dto/create-friend.dto';

@Injectable()
export class FriendsService {
  constructor(private prisma: PrismaService) {}

  async create({ username }: CreateFriendDto, id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.id === id) {
      throw new BadRequestException('Cannot add own user');
    }

    const friendExists = await this.prisma.friends.findFirst({
      where: {
        friendId: user.id,
      },
    });

    if (friendExists) {
      throw new BadRequestException('Friend already exists');
    }

    await this.prisma.friends.create({
      data: {
        userId: id,
        friendId: user.id,
        friendName: user.username,
      },
    });

    return {
      message: `${user.username} has been added to friend list`,
    };
  }

  async findAllFriendsByUser(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        friends: true,
      },
    });
  }

  async findOne(id: string) {
    const friend = this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!friend) {
      throw new NotFoundException('Friend not found');
    }

    return friend;
  }

  async remove(id: string) {
    const friend = await this.prisma.friends.findFirst({
      where: {
        friendId: id,
      },
    });

    if (!friend) {
      throw new NotFoundException('Friend not found');
    }

    await this.prisma.friends.delete({
      where: {
        id: friend.id,
      },
    });

    return true;
  }
}
