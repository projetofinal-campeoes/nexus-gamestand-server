import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateCustomGameDto {
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
  @Length(3, 20)
  @ApiProperty()
  platform: string;

  @ApiProperty()
  userId: string;
}
