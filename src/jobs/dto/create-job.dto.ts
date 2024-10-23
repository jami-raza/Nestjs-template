import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MinLength,
  ValidateIf,
  isUUID,
  ValidateNested,
  Validate
} from 'class-validator';
import { IsUserAlreadyExist } from 'src/users/constraints/validation_constraints';
import {
  IsRoleNotExist,
  IsRoleNotExistConstraint,
} from 'src/roles/constraints/validation-constraints';
import { User } from 'src/entities';
// import { Customer } from 'src/customer/entity/customer.entity';
import { IsValidUUID } from 'src/utils/constraints/uuid.constraint';
// import { IsCustomerNotExist } from 'src/customer/constraints/not-exist-validation.constraint';
import { validate } from 'uuid';
import { Level } from 'src/utils/enums/level';
import { Paytype } from 'src/utils/enums/paytype';
// import { isUUID } from 'src/utils/validators/uuid.validator';


export class CreateJobDto {

  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  @IsNotEmpty()
  @IsString()
  jobId: string;

  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: "enum",
    description: 'This is a optional property'
  })
 level: Level

  @ApiProperty({
    type: "enum",
    description: 'This is a optional property'
  })
  paytype: Paytype

  @ApiProperty({
    type: Number || null,
    description: 'This is a optional property',
  })
  // @IsNotEmpty()
  // @IsString()
  // @IsNumber()
  rate: number | null;

  @ApiProperty({
    type: Number || null,
    description: 'This is a optional property',
  })
  // @IsNotEmpty()
  // @IsString()
  // @IsNumber()
  commission: number | null;

  
  // @ApiProperty({
  //   description: 'This is a required property',
  //   nullable: false,
    
  // })
  // @IsNotEmpty()
  // @IsUUID('all',{message:'Customer ID is not valid UUID.'})
  
  // @IsCustomerNotExist({message:'Customer Not Exist.'})
  // customer!: Customer | string;

}
