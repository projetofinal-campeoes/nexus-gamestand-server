import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(6, 16)
  @ApiProperty()
  username: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  avatar_url: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @Length(4, 20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must have one letter UpperCase, one special Character, one Number 0-9',
  })
  @ApiProperty()
  password: string;

  @IsString()
  @ApiProperty()
  steam_user: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty()
  gamepass: boolean;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  status: boolean;
}
