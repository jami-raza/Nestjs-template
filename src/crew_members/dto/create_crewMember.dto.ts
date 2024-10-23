import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsUUID,
} from 'class-validator';
import { Crew } from 'src/crews/entity/crew.entity';
import { Employee } from 'src/employees/entity/employee.entity';



export class CreateCrewMemberDto {


  @ApiProperty({
    description: 'This is a required property',
    nullable: false
  })
  @IsUUID()
  crew: Crew | string;

  @ApiProperty({
    description: 'This is a required property',
    nullable: false
  })
  @IsUUID()
  @IsNotEmpty()
 
  employee: string | Employee;

  





  
}
