import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateIf,
  isUUID,
  IsArray
} from 'class-validator';
import { User } from 'src/entities';
import {IsCrewSupervisorAlreadyExist} from '../constraints/duplicate.contraint'
// import { IsCustomerSupervisor } from '../constraints/customer_supervisor.constraint';
import { IsCustomerMembersVisor } from '../constraints/customer_members.constraint';
import { Client } from 'src/clients/entity/client.entity';
import { Employee } from 'src/employees/entity/employee.entity';

export class UpdateCrewDTO {
    @ApiProperty({
        type: String,
        description: 'This is a optional property',
      })
      @IsNotEmpty()
      @IsString()
      name: string;

      @ApiProperty({
        nullable: false
      })
      @IsNotEmpty()
      // @IsUUID('all',{message:'not valid uuid'})
      crewId: string
      
      @ApiProperty({
        description: 'This is a required property',
        nullable: false,
        
      })
      @IsNotEmpty()
      @IsUUID('all',{message:'Customer ID is not valid UUID.'})
      client: string;
    
      @ApiProperty({
        description: 'This is a required property',
        nullable: false
      })
      @IsNotEmpty()
      @IsUUID('all',{message: 'Supervisor Id is not a valid UUID.'})
      // @ValidateIf(o => isUUID(o.customer))
      // @ValidateIf(o => isUUID(o.supervisor))
      // @IsCustomerSupervisor({message:'This super visor is not linked to this customer.'})
      supervisor: Employee | string;

      @ApiProperty({
        type: String,
        description: 'This is a required property',
        nullable: false,
        isArray: true
      })
      @IsArray()
      @IsUUID('all', {each: true})
      members!: string[]


    
}