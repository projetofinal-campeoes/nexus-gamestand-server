import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  IsUrl,
  Length,
  Matches,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Length(6, 16)
  @ApiProperty()
  username: string;

  @IsEmail()
  @ApiProperty()
  email: string;
}

export class UpdateUserAvatarDto {
  @IsUrl()
  @ApiProperty()
  avatar_url: string;
}

export class UpdateUserPassword {
  @IsString()
  @Length(4, 20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must have one letter UpperCase, one special Character, one Number 0-9',
  })
  @ApiProperty()
  password: string;
}

export class UpdateUserSteam {
  @IsString()
  @MinLength(3)
  @ApiProperty()
  steam_user: string;
}
