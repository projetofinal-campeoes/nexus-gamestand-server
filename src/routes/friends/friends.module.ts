import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [FriendsController],
  providers: [FriendsService],
  imports: [PrismaModule],
})
export class FriendsModule {}
