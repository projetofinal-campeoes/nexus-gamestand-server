import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Patch,
  Post,
  Req,
  UseFilters,
} from '@nestjs/common';

import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { Request } from 'express';
import { PrismaClientExceptionFilter } from '../../prisma-client-exception/prisma-client-exception.filter';
import { CreateUserDto } from './dto/create-user.dto';
import {
  UpdateUserDto,
  UpdateUserPassword,
  UpdateUserSteam,
} from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
@UseFilters(PrismaClientExceptionFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @SkipThrottle()
  @Post()
  @ApiCreatedResponse({ type: UserEntity })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @SkipThrottle()
  @Get()
  @ApiCreatedResponse({ type: UserEntity, isArray: true })
  async findAll() {
    return await this.usersService.findAll();
  }

  @SkipThrottle()
  @Get('profile')
  @ApiBearerAuth('defaultBearerAuth')
  @ApiCreatedResponse({ type: UserEntity })
  async findOne(@Req() req: Request) {
    const { id } = req.user;
    const findOneUser = await this.usersService.findOne(id);

    if (!findOneUser) {
      throw new NotFoundException('Invalid ID, user not found');
    }

    return findOneUser;
  }

  @SkipThrottle()
  @Patch()
  @ApiBearerAuth('defaultBearerAuth')
  @ApiCreatedResponse({ type: UserEntity })
  async update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    const { id } = req.user;
    return await this.usersService.update(id, updateUserDto);
  }

  @SkipThrottle()
  @Patch('password')
  @ApiBearerAuth('defaultBearerAuth')
  @ApiCreatedResponse({ type: UserEntity })
  async updateUserPassword(
    @Req() req: Request,
    @Body() updateUserDto: UpdateUserPassword,
  ) {
    const { id } = req.user;
    return await this.usersService.updatePassword(id, updateUserDto);
  }

  @SkipThrottle()
  @Patch('status')
  @ApiBearerAuth('defaultBearerAuth')
  @ApiCreatedResponse({ type: UserEntity })
  async updateUserStatus(@Req() req: Request) {
    const { id } = req.user;
    return await this.usersService.updateStatus(id);
  }

  @SkipThrottle()
  @Patch('steam')
  @ApiBearerAuth('defaultBearerAuth')
  @ApiCreatedResponse({ type: UserEntity })
  async updateUserSteamName(
    @Req() req: Request,
    @Body() updateUserDto: UpdateUserSteam,
  ) {
    const { id } = req.user;
    return await this.usersService.updateSteamUser(id, updateUserDto);
  }

  @SkipThrottle()
  @Patch('gamepass')
  @ApiBearerAuth('defaultBearerAuth')
  @ApiCreatedResponse({ type: UserEntity })
  async updateUserGamepass(@Req() req: Request) {
    const { id } = req.user;
    return await this.usersService.updateGamePass(id);
  }

  @SkipThrottle()
  @Delete()
  @ApiBearerAuth('defaultBearerAuth')
  @HttpCode(204)
  async remove(@Req() req: Request) {
    const { id } = req.user;
    return await this.usersService.remove(id);
  }
}
