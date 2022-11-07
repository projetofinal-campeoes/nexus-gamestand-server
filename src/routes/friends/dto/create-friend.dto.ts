import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateFriendDto {
  @IsString()
  @ApiProperty()
  username: string;
}
