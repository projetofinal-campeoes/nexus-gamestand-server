import { ApiProperty } from "@nestjs/swagger";
import { Decimal } from "@prisma/client/runtime";
import { IsDecimal, IsOptional, IsString, Length } from "class-validator";

export class CreatePromotionDto {
    @IsString()
    @Length(1, 64)
    @ApiProperty()
    name: string;

    @IsDecimal()
    @ApiProperty()
    price: Decimal;

    @IsString()
    @ApiProperty()
    promo_url: string;

    @IsString()
    @Length(0, 256)
    @IsOptional()
    @ApiProperty({ nullable: true })
    description: string;
}
