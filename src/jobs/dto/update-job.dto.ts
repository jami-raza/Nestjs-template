import { ApiProperty } from "@nestjs/swagger";
import { Level } from "src/utils/enums/level";
import { Paytype } from "src/utils/enums/paytype";

export class UpdateJobDto {
    @ApiProperty({
        type:String,
        description: 'This is a required Property'
    })
    jobId:string
    
    @ApiProperty({
        type:String,
        description: 'This is a required Property'
    })
    name:string

    @ApiProperty({
        type:'enum',
        description: 'This is a required Property'
    })
    level:Level

    @ApiProperty({
        type:'enum',
        description: 'This is a required Property'
    })
    paytype:Paytype

    @ApiProperty({
        type:Number,
        description: 'This is a required Property'
    })
    rate:number

    @ApiProperty({
        type:Number,
        description: 'This is a required Property'
    })
    commission:number
}