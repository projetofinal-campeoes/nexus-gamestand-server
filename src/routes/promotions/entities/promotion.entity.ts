import { ApiProperty } from "@nestjs/swagger";

export class Promotion {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    promo_url: string;

    @ApiProperty({ required: false, nullable: true })
    description: string | null;

    @ApiProperty({ required: false })
    shiny_meter: number;

    @ApiProperty({ required: false })
    userId: string;
}
