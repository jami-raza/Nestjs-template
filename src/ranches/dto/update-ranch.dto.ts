import { ApiProperty, OmitType, PartialType } from "@nestjs/swagger";
import { CreateRanchDto } from "./create-ranch.dto";


export class UpdateRanchDTO {
    @ApiProperty({
        type:String,
        description: 'This is required property',
    })
    ranchNumber:string

    @ApiProperty({
        type: String,
        description: 'This is a required property'
    })
    name: string
}