import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from 'class-validator';


export class ForgotPasswordDto {

    @ApiProperty({
        type: String,
        description: 'This is a required property',
      })
    @IsEmail()
    email: string;
}