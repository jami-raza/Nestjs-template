// import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// import { Type } from 'class-transformer';
// import {
//   IsEmail,
//   IsEnum,
//   IsNotEmpty,
//   IsNumber,
//   IsString,
//   IsUUID,
//   MinLength,
// } from 'class-validator';
// import { IsUserAlreadyExist } from 'src/users/constraints/validation_constraints';
// import {
//   IsRoleNotExist,
//   IsRoleNotExistConstraint,
// } from 'src/roles/constraints/validation-constraints';
// import { User } from 'src/entities';
// import { IsCustomerAlreadyExist } from '../constraints/duplicate-validation.constraints';
// import { IsUserNotExist } from 'src/users/constraints/not_exist_validation.constraint';
// import { IsUserNotAdmin } from 'src/users/constraints/is_admin_validation.constraint';
// import { UserRoleDto } from 'src/users/dto/user-role.dto';

// export class CreateCustomerDto {
//   @ApiProperty({
//     type: String,
//     description: 'This is a optional property',
//   })
//   name: string;

//   @ApiProperty({
//     type: String,
//     description: 'This is a required property',
//   })
//   @IsNotEmpty()
//   @IsEmail()
//   email: string;

//   @ApiProperty({
//     type: String,
//     description: 'This is a required property',
//   })
//   contact: string;

//   @ApiProperty({
//     type: String,
//     description: 'This is a required property',
//   })
//   address: string;

//   @ApiProperty({
//     type: String,
//     description: 'This is a required property',
//     required: true,
//   })
//   @IsNotEmpty()
//   @MinLength(3)
//   adminName: string;

//   @ApiProperty({
//     type: String,
//     description: 'This is a required property',
//     required: true,
//   })
//   @IsNotEmpty()
//   @IsEmail()
//   @IsUserAlreadyExist({
//     message: 'User $value already exists. Choose another email.',
//   })
//   adminEmail: string;

//   @ApiProperty({
//     type: String,
//     description: 'This is a required property',
//     required: true,
//   })
//   @IsNotEmpty()
//   @MinLength(4)
//   adminPassword: string;

//   @ApiProperty({
//     description: 'Company Profile Image',
//     nullable: false,
//     default: '',
//     required: false,
//     type: 'string',
//     format: 'binary',
//   })
//   file: any;

//   // @ApiProperty({
//   //   description: 'List of enums',
//   // })
//   // @IsString()
//   // @IsUUID()
//   // @IsRoleNotExist({ message: 'No Role Found.' })
//   // role: UserRoleDto;

//   // @ApiProperty({
//   //   type: String,
//   //   description: 'This is a required property',
//   // })
//   // @IsCustomerAlreadyExist({ message: 'Customer already exists.' })
//   // @IsUserNotExist({ message: 'Admin Not Exist.' })
//   // @IsUserNotAdmin({ message: 'User is not admin.' })
//   // defaultAdmin: string | User;
// }
