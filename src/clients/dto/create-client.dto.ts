import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { IsUserAlreadyExist } from "src/users/constraints/validation_constraints";

export class CreateClientDto {
    @ApiProperty({
        type: String,
        description: 'This is a required property'
    })
    fullName: string;

    @ApiProperty({
      type: String,
      description: 'This is a required property'  
    })
    userName: string

    @ApiProperty({
        type: String,
        description: 'This is a required property',
        required:true
    })
    @IsNotEmpty()
    @IsEmail()
    @IsUserAlreadyExist({
        message: 'User already exists'
    })
    email: string

    @ApiProperty({
        type: String,
        description: 'This is a required property'
    })
    company: string

    @ApiProperty({
        type: String,
        description: 'This is a required property'
    })
    role: string

    @ApiProperty({
        type: String,
        description: 'This is a required property',
        required: true
    })

    @IsNotEmpty()
    @MinLength(4)
    password: string
    @ApiProperty({
        type: String,
        description: 'This is a required property',
        required: true
    })
    
    @IsNotEmpty()
    @MinLength(4)
    confirmPassword: string
}