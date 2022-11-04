import { ApiProperty } from '@nestjs/swagger';
import { Custom_games } from '@prisma/client';

export class EntityCustomGame implements Custom_games {
    @ApiProperty()
    id: string;
  
    @ApiProperty()
    name: string;
  
    @ApiProperty()
    image_url: string | null;
  
    @ApiProperty()
    platform: string;

    @ApiProperty()
    userId: string;
}
