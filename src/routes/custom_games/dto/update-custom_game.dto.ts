import { PartialType } from '@nestjs/swagger';
import { CreateCustomGameDto } from './create-custom_game.dto';

export class UpdateCustomGameDto extends PartialType(CreateCustomGameDto) { }
