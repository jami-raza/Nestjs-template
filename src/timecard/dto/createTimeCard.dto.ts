import { ApiProperty } from "@nestjs/swagger";

export class CreateTimeCardDto {
    @ApiProperty({
        type: Date,
        default: new Date(),
        description: 'This is a required property',
    })
    date: Date

    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    crew: string

    @ApiProperty({
        type: String,
        description: 'This is a required property',
        // default: new Date()
    })
    timeIn: string

    @ApiProperty({
        type: String,
        description: 'This is a required property',
        // default: new Date()
    })
    timeOut: string

    @ApiProperty({
        type: String,
        description: 'This is a required property',
        // default: new Date()
    })
    dayStartedAt: string

    @ApiProperty({
        type: String,
        description: 'This is a required property',
        // default: new Date()
    })
    lunchIn: string

    @ApiProperty({
        type: String,
        description: 'This is a required property',
        default: new Date()
    })
    returnFromLunch: string

    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    client: string

    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    ranch: string 

    @ApiProperty({
        type: String,
        description: 'This is a required property',
    })
    job: string

    @ApiProperty({
        type:String,
        description: 'This is a required property',
        isArray:true
    })
    employees: string[]
    // @ApiProperty({
    //     type : String,
    //     description: 'This is a required property'
    // })
    // break: string

    @ApiProperty({
        nullable:true,
        description: 'This is a required property'
    })
    break1?: string 

    @ApiProperty({
        nullable:true,
        description: 'This is a required property'
    })
    returnFromBreak1?: string
    
    @ApiProperty({
        nullable:true,
        description: 'This is a required property'
    })
    break2?: string

    @ApiProperty({
        nullable:true,
        description: 'This is a required property'
    })
    returnFromBreak2?: string

    @ApiProperty({
        nullable:true,
        description: 'This is a required property'
    })
    break3?: string

    @ApiProperty({
        nullable:true,
        description: 'This is a required property'
    })
    returnFromBreak3?: string

}