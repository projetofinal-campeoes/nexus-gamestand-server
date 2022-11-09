import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class CreateBugReportDto {
    @IsString()
    @ApiProperty()
    page: string

    @IsString()
    @Length(1, 256)
    @ApiProperty()
    description: string
}
