import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { PrismaClientExceptionFilter } from '../../prisma-client-exception/prisma-client-exception.filter';
import { CreateLoginDto } from './dto/create-login.dto';
import { AuthEntity } from './entities/auth.entity';
import { LoginService } from './login.service';

@Controller('login')
@ApiTags('sessions')
@UseFilters(PrismaClientExceptionFilter)
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @ApiCreatedResponse({ type: AuthEntity })
  async create(@Body() createLoginDto: CreateLoginDto) {
    return await this.loginService.login(createLoginDto);
  }
}
