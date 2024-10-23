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
  ValidateNested
} from 'class-validator';
import { IsUserAlreadyExist } from 'src/users/constraints/validation_constraints';
import {
  IsRoleNotExist,
  IsRoleNotExistConstraint,
} from 'src/roles/constraints/validation-constraints';
import { User } from 'src/entities';
import {IsCrewSupervisorAlreadyExist} from '../constraints/duplicate.contraint'
// import { IsCustomerSuperVisor } from '../constraints/customer_superVisor.constraint';
// import { IsCustomerMembersVisor } from '../constraints/customer_members.constraint';
import { IsValidUUID } from 'src/utils/constraints/uuid.constraint';
import { Client } from 'src/clients/entity/client.entity';
import { Employee } from 'src/employees/entity/employee.entity';
import { IsCustomerMembersVisor } from '../constraints/customer_members.constraint';
import { IsCustomerMembersVisorAlreadyExist } from '../constraints/isemployee_alreadyexists.constraint';
import { IsSupervisorNotExist } from '../constraints/issupervisor_notexists.constraint';
// import { isUUID } from 'src/utils/validators/uuid.validator';


export class CreateCrewDto {
  
  @ApiProperty({
    type: String,
    description: 'This is a required property'
  })
  crewId: string;

  @ApiProperty({
    type: String,
    description: 'This is a optional property',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'This is a required property',
    nullable: false,
    
  })
  @IsNotEmpty()
  @IsUUID('all',{message:'Client ID is not valid UUID.'})
  client: string;

  @ApiProperty({
    description: 'This is a required property',
    nullable: false
  })
  @IsNotEmpty()
  @IsUUID('all',{message: 'Supervisor Id is not a valid UUID.'})
  // @ValidateIf(o => isUUID(o.customer))
  @ValidateIf(o => isUUID(o.supervisor))
  @IsSupervisorNotExist({message: "supervisor not exists"})
  // @IsCrewSupervisorAlreadyExist({message:'Supervisor already exist.'})
  // @IsCustomerSuperVisor({message:'This super visor is not linked to this customer.'})
  // supervisor: Employee | string;
  supervisor:  string;

  @ApiProperty({
    type: String,
    description: 'This is a required property',
    nullable: false,
    isArray: true
  })
  // @ValidateIf(o => isUUID(o.customer))
  // @IsUUID()
  @IsCustomerMembersVisor({message: 'Employee not exist .'})
  // @IsCustomerMembersVisorAlreadyExist({message: 'Employee already exists'})
  members: string[]

}
