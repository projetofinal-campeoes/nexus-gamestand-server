import { Controller, Post, Body, UseFilters } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from 'src/prisma-client-exception/prisma-client-exception.filter';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthEntity } from './entities/auth.entity';

@Controller('auth')
@ApiTags('auth')
@UseFilters(PrismaClientExceptionFilter)

export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  @ApiCreatedResponse({ type: AuthEntity })
  async create(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.login(createAuthDto);
  }
}
