import { ApiProperty } from "@nestjs/swagger";
import { Promotions } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";

export class Promotion implements Promotions {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    price: Decimal;

    @ApiProperty()
    promo_url: string;

    @ApiProperty({ required: false, nullable: true })
    description: string | null;

    @ApiProperty({ required: false })
    shiny_meter: number;

    @ApiProperty({ required: false })
    userId: string;
}
