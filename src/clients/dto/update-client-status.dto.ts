import { ApiProperty } from "@nestjs/swagger";
import { Status } from "src/utils/enums/status";

export class UpdateClientStatus {
    @ApiProperty({
        type: String,
    })
    status: Status
}