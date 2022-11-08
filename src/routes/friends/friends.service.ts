import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateFriendDto } from './dto/create-friend.dto';

@Injectable()
export class FriendsService {
  constructor(private prisma: PrismaService) {}

  async create({ username }: CreateFriendDto, id: string) {
    const user = await this.prisma.user.findFirst({
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
    const friends = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        friends: true,
      },
    });
    return { ...friends, password: undefined };
  }

  async findOne(id: string, userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: { friends: true },
    });

    if (!user.friends.find((friend) => friend.friendId === id)) {
      throw new NotFoundException(
        "Friend not found or the user's not your friend",
      );
    }

    const friend = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    return { ...friend, password: undefined };
  }

  async remove(id: string, userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: { friends: true },
    });

    const friend = await this.prisma.friends.findFirst({
      where: {
        friendId: id,
      },
    });

    if (!friend || !user.friends.find((friend) => friend.friendId === id)) {
      throw new NotFoundException(
        "Friend not found or the user's not your friend",
      );
    }

    await this.prisma.friends.delete({
      where: {
        id: friend.id,
      },
    });

    return true;
  }
}
