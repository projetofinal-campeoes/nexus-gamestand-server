import { ApiProperty } from "@nestjs/swagger";

export class AuthEntity {
    @ApiProperty()
    email: String;

    @ApiProperty()
    password: String;
}
