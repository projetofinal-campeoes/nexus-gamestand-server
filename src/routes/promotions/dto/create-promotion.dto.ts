import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, Length } from "class-validator";

export class CreatePromotionDto {
    @IsString()
    @Length(1, 64)
    @ApiProperty()
    name: string;

    @IsNumber()
    @ApiProperty()
    price: number;

    @IsString()
    @ApiProperty()
    promo_url: string;

    @IsString()
    @Length(0, 256)
    @IsOptional()
    @ApiProperty({ nullable: true })
    description: string;
}
