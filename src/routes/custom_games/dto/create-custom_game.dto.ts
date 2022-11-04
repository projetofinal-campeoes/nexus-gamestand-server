import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateCustomGameDto {
  @IsString()
  @ApiProperty()
  id: string;

  @IsString()
  @Length(3, 30)
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  image_url: string | null;

  @IsString()
  @ApiProperty()
  platform: string;

  @IsString()
  @ApiProperty()
  userId: string;
}
