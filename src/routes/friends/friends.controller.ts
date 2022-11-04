import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  HttpCode,
} from '@nestjs/common';
import { FriendsService } from './friends.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { Request } from 'express';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post()
  async create(@Body() createFriendDto: CreateFriendDto, @Req() req: Request) {
    const { id } = req.user;

    return await this.friendsService.create(createFriendDto, id);
  }

  @Get()
  async findAllFriendsByUser(@Req() req: Request) {
    const { id } = req.user;

    return await this.friendsService.findAllFriendsByUser(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.friendsService.findOne(id);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.friendsService.remove(id);
  }
}
