import { ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";

export class UpdateClientDto {

    @ApiProperty({
        type:String,
        description: 'Enter full name'
    })
    fullName: string;

    @ApiProperty({
        type:String,
        description: 'Enter full name'
    })
    userName: string;

    @ApiProperty({
        type:String,
        description: 'Enter full name'
    })
    email: string;

    @ApiProperty({
        type:String,
        description: 'Enter full name'
    })
    company:string

    @ApiProperty({
        type:String,
        description: 'Enter full name'
    })
    role:string

    @ApiProperty({
        type:String,
        description: 'Enter full name'
    })
    password:string
    
    @ApiProperty({
        type:String,
        description: 'Enter full name'
    })
    confirmPassword:string

    // @ApiProperty({
    //     type:String
    // })
    // updatedAt?: Date
}