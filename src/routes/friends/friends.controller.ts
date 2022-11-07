import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Req,
  HttpCode,
  UseFilters,
} from '@nestjs/common';
import { FriendsService } from './friends.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { Request } from 'express';
import { PrismaClientExceptionFilter } from 'src/prisma-client-exception/prisma-client-exception.filter';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { FriendEntity } from './entities/friend.entity';

@Controller('friends')
@ApiTags('friends')
@UseFilters(PrismaClientExceptionFilter)
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post()
  @ApiBearerAuth('defaultBearerAuth')
  @ApiCreatedResponse({ type: FriendEntity })
  async create(@Body() createFriendDto: CreateFriendDto, @Req() req: Request) {
    const { id } = req.user;

    return await this.friendsService.create(createFriendDto, id);
  }

  @Get()
  @ApiBearerAuth('defaultBearerAuth')
  @ApiCreatedResponse({ type: FriendEntity, isArray: true })
  async findAllFriendsByUser(@Req() req: Request) {
    const { id } = req.user;

    return await this.friendsService.findAllFriendsByUser(id);
  }

  @Get(':id')
  @ApiBearerAuth('defaultBearerAuth')
  @ApiCreatedResponse({ type: FriendEntity })
  async findOne(@Param('id') id: string) {
    return await this.friendsService.findOne(id);
  }

  @Delete(':id')
  @ApiBearerAuth('defaultBearerAuth')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    await this.friendsService.remove(id);
  }
}