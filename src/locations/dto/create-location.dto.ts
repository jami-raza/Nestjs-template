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
import { Ranch } from 'src/ranches/entity/ranch.entity';
import { IsRanch } from '../constraints/isRanch.constraint';
import { Client } from 'src/clients/entity/client.entity';
// import { isUUID } from 'src/utils/validators/uuid.validator';


export class CreateLocationDto {
  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  @IsNotEmpty()
  @IsString()
  fieldName: string;

  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  @IsNotEmpty()
  @IsString()
  fieldId: string;

  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  @IsNotEmpty()
  @IsString()
  crop: string;

  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  @IsNotEmpty()
  @IsString()
  commission: string;

  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  @IsNotEmpty()
  @IsString()
  acres: string;

  
  // @ApiProperty({
  //   description: 'This is a required property',
  //   nullable: false,
    
  // })
  // @IsNotEmpty()
  // @IsUUID('all',{message:'Customer ID is not valid UUID.'})
  // @IsCustomerNotExist({message:'Customer Not Exist.'})
  // customer!: Customer | string;

  @ApiProperty({
    description: 'This is a required property',
    nullable: false,
    
  })
  @IsNotEmpty()
  @IsUUID('all',{message:'Ranch ID is not valid UUID.'})
  @IsRanch({message:'Ranch Not Found.'})
  ranch!: Ranch | string;

  @ApiProperty({
    nullable: false,
    description: 'This is required property',
  })
  @IsNotEmpty()
  @IsUUID('all',{message:'Location ID is not valid UUID.'})
  client!: Client | string
}
