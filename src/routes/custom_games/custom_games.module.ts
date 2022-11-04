import { Module } from '@nestjs/common';
import { CustomGamesService } from './custom_games.service';
import { CustomGamesController } from './custom_games.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CustomGamesController],
  providers: [CustomGamesService],
  imports: [PrismaModule]
})
export class CustomGamesModule {}
