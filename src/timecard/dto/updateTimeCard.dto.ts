import { ApiProperty } from "@nestjs/swagger";

export class UpdateTimeCardDto {
    @ApiProperty({
        type: 'timestamptz',
        description: 'This is a required property'
    })
    date:Date

    @ApiProperty({
        type: String,
        description: 'This is a required property'
    })
    crew:string

@ApiProperty({
    type: String,
    description: 'This is a required property'
})
    timeIn:string

@ApiProperty({
    type: String,
    description: 'This is a required property'
})
    timeOut:string

@ApiProperty({
    type: String,
    description: 'This is a required property'
})
dayStartedAt:string

@ApiProperty({
    type: String,
    description: 'This is a required property'
})
lunchIn:string

@ApiProperty({
    type: String,
    description: 'This is a required property'
})
returnFromLunch:string

@ApiProperty({
    type: String,
    description: 'This is a required property'
})
client:string 

@ApiProperty({
    type: String,
    description: 'This is a required property'
})
ranch:string

@ApiProperty({
    type: String,
    description: 'This is a required property'
})
job:string

@ApiProperty({
    type:String,
    description: 'This is a required property',
    isArray:true
})
employees: string[]

@ApiProperty({
    type: String,
    description: 'This is a required property'
})
break1:string

@ApiProperty({
    type: String,
    description: 'This is a required property'
})
returnFromBreak1:string

@ApiProperty({
    type: String,
    description: 'This is a required property'
})
break2?:string

@ApiProperty({
    type: String,
    description: 'This is a required property'
})
returnFromBreak2?:string

@ApiProperty({
    type: String,
    description: 'This is a required property'
})
break3?:string

@ApiProperty({
    type: String,
    description: 'This is a required property'
})
returnFromBreak3?:string

}