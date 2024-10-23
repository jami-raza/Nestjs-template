import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { IsUserAlreadyExist } from 'src/users/constraints/validation_constraints';
import { Period } from 'src/utils/enums/period';
// import { IsCustomerNotExist } from 'src/customer/constraints/not-exist-validation.constraint';

export class UpdateEmployeeDto {

  @ApiProperty({
    type: String,
    description: 'Enter a role',
  })
  role?: string;

  @ApiProperty({
    type: String,
    description: 'Enter first name',
  })
  @MinLength(3)
  firstName?: string;

  @ApiProperty({
    type: String,
    description: 'Enter middle name',
  })
  // @MinLength(3)
  midName?: string;

  @ApiProperty({
    type: String,
    description: 'Enter last name',
  })
  // @MinLength(3)
  lastName?: string;

  @ApiProperty({
    description: 'Employee gender',
  })
  @IsString()
  gender?: string;

  @ApiProperty({
    type: Number,
    description: 'Enter Hourly Rate',
  })
  hourlyRate?: number;

  @ApiProperty({
    type:'time',
    description: 'Enter a date'
  })
  dayStartedAt?: string;

  @ApiProperty({
    type: String,
    description : 'Enter period'
  })
  period : Period;

  @ApiProperty({
    type: Number,
    description: 'Enter minimum wage rate'
  })
  minWageRate?: number;

  @ApiProperty({
    type : String,
    description: 'Enter over time'
  })
  overTime: string

  @ApiProperty({
    type: String,
    description: 'Enter double time'
  })
  doubleTime: string

  @ApiProperty({
    type: Number,
    description: 'Enter meal time wage rate'
  })
  mealTimeWageRate: number

}
