import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { IsRoleAlreadyExist } from '../constraints/validation-constraints';
import { User_Role } from '../entity/role.entity';

export class CreateRoleDto {
  @IsNotEmpty()
  @ApiProperty({
    description: 'List of enums',
    isArray: false,
    enum: User_Role,
  })
  @IsEnum(User_Role, { each: true, message: 'Role $value not available.' })
  @IsString()
  @IsRoleAlreadyExist({
   message: 'Role $value already exists.'
  })
  role: User_Role;

  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  description: string;
}
