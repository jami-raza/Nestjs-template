import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';
import { IsUserAlreadyExist } from 'src/users/constraints/validation_constraints';
import { Period } from 'src/utils/enums/period';
// import { IsCustomerNotExist } from 'src/customer/constraints/not-exist-validation.constraint';

export class CreateEmployeeDto {
  @ApiProperty({
    type:String,
    description: 'This is a required property',
  })
  
  empId:string  

  @ApiProperty({
    type:String,
    description: 'This is a required property',
  })
  // @IsNotEmpty()
  company:string

  @ApiProperty({
    type:String,
    description: 'This is a required property',
    
  })
  // @IsNotEmpty()
  role:string

  @ApiProperty({
    type:String,
    description: 'This is a required property',
  })
  @IsNotEmpty()
  firstName:string

  @ApiProperty({
    type:String,
    description: 'This is a optional property',
  })
  // @IsNotEmpty()
  midName:string

  @ApiProperty({
    type:String,
    description: 'This is a optional property',
  })
  // @IsNotEmpty()
  lastName:string

  @ApiProperty({
    type:String,
    description: 'This is a required property',
  })
  // @IsNotEmpty()
  gender:string

  @ApiProperty({
    type:Number,
    description: 'This is a required property',
  })
  
  hourlyRate:number

  @ApiProperty({
    type: String,
    description: 'This is a required property',
  })

  dayStartedAt:string

  @ApiProperty({
    type:"enum",
    description: 'This is a required property',
  })
  // @IsNotEmpty()
  period:Period

  @ApiProperty({
    type:Number,
    description: 'This is a required property',
  })
 
  minWageRate:number

  @ApiProperty({
    type:String,
    description: 'This is a required property',
  })
  // @IsNotEmpty()
  overTime:string

  @ApiProperty({
    type:String,
    description: 'This is a required property',
  })
  // @IsNotEmpty()
  doubleTime:string


  @ApiProperty({
    type:Number,
    description: 'This is a required property',
  })
  
  mealTimeWageRate:number
  //
  // @ApiProperty({
  //   type: String,
  //   description: 'This is a required property',
  // })
  // @IsNotEmpty()
  // @MinLength(3)
  // name: string;


  // @ApiProperty({
  //   type: String,
  //   description: 'This is a required property',
  // })
  // @IsNotEmpty()
  // @IsEmail()
  // @IsUserAlreadyExist({
  //   message: 'User $value already exists. Choose another email.',
  // })
  // email: string;

  // @ApiProperty({
  //   description: 'Employee role',
  // })
  // @IsString()
  // role: string;

  // @ApiProperty({
  //   description: 'Employee gender',
  // })
  // @IsString()
  // gender: string;

  // @ApiProperty({
  //   description: 'Company Id',
  //   nullable: true,
  //   default: null,
  // })
  // @IsOptional()
  // @IsCustomerNotExist({ message: 'No Customer Found.' })
  // @IsUUID()
  // customer: string;

//   @ApiProperty({
//     description: 'Created By',
//     nullable: false,
//     default: '',
//     required: false,
//   })
//   @IsOptional()
//   createdBy: string;

//   @ApiProperty({
//     description: 'password',
//     nullable: false,
//     default: '',
//     required: false,
//   })
//   @IsOptional()
//   password: string;

//   @ApiProperty({
//     description: 'Profile Image',
//     nullable: false,
//     default: '',
//     required: false,
//     type: 'string',
//     format: 'binary',
//   })
//   @IsOptional()
//   file: any;
}
