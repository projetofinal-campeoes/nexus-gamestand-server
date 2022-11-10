import { ApiProperty } from '@nestjs/swagger';
import { Friends } from '@prisma/client';

export class FriendEntity implements Friends {
  @ApiProperty()
  id: string;
  
  @ApiProperty()
  userId: string;

  @ApiProperty()
  friendId: string;

  @ApiProperty()
  friendName: string;

  @ApiProperty()
  friendAvatar: string;

  @ApiProperty()
  friendStatus: boolean;
}
