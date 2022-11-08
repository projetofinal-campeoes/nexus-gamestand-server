import { ApiProperty } from "@nestjs/swagger";

export class BugReport implements BugReport {
    @ApiProperty()
    id: string

    @ApiProperty()
    page: string

    @ApiProperty()
    description: string

    @ApiProperty({ required: false })
    userId: string
}
