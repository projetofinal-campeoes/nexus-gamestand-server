import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';

import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { PrismaClientExceptionFilter } from '../../prisma-client-exception/prisma-client-exception.filter';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
@UseFilters(PrismaClientExceptionFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

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
  @Get(':id')
  @ApiBearerAuth('defaultBearerAuth')
  @ApiCreatedResponse({ type: UserEntity })
  async findOne(@Param('id') id: string) {
    const findOneUser = await this.usersService.findOne(id);

    if (!findOneUser) {
      throw new NotFoundException('Invalid ID, user not found');
    }

    return findOneUser;
  }

  @SkipThrottle()
  @Patch(':id')
  @ApiBearerAuth('defaultBearerAuth')
  @ApiCreatedResponse({ type: UserEntity })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @SkipThrottle()
  @Patch('status/:id')
  @ApiBearerAuth('defaultBearerAuth')
  @ApiCreatedResponse({ type: UserEntity })
  async updateUserStatus(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updateStatus(id, updateUserDto);
  }

  @SkipThrottle()
  @Patch('steam/:id')
  @ApiBearerAuth('defaultBearerAuth')
  @ApiCreatedResponse({ type: UserEntity })
  async updateUserSteamName(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updateSteamUser(id, updateUserDto);
  }

  @SkipThrottle()
  @Patch('gamepass/:id')
  @ApiBearerAuth('defaultBearerAuth')
  @ApiCreatedResponse({ type: UserEntity })
  async updateUserGamepass(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.updateGamePass(id, updateUserDto);
  }

  @SkipThrottle()
  @Delete(':id')
  @ApiBearerAuth('defaultBearerAuth')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
