import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { IsUserAlreadyExist } from 'src/users/constraints/validation_constraints';
import {
  IsRoleNotExist,
  IsRoleNotExistConstraint,
} from 'src/roles/constraints/validation-constraints';
import { CreateRoleDto } from 'src/roles/dto/create-role.dto';
import { UserRole } from '../entity/user.entity';
import { UserRoleDto } from './user-role.dto';
// import { Customer } from 'src/customer/entity/customer.entity';
// import { IsCustomerNotExist } from 'src/customer/constraints/not-exist-validation.constraint';

export class CreateAdminDto {
  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsNotEmpty()
  @MinLength(4)
  password: string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })
  @IsNotEmpty()
  @IsEmail()
  @IsUserAlreadyExist({
    message: 'User $value already exists. Choose another email.',
  })
  email: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'List of enums',
  })
  @IsString()
  @IsUUID()
  @IsRoleNotExist({ message: 'No Role Found.' })
  role: string;

  // @ApiProperty({
  //   description: 'Company Id',
  //   nullable: true,
  //   default: null,
  // })
  // @IsOptional()
  // @IsCustomerNotExist({ message: 'No Customer Found.' })
  // customer: Customer | string;

  @ApiProperty({
    description: 'Created By',
    nullable: false,
    default: '',
    required: false,
  })
  @IsOptional()
  createdBy: string;

  @ApiProperty({
    description: 'Profile Image',
    nullable: false,
    default: '',
    required: false,
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  file: any;
}
