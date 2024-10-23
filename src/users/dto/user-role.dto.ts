import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';
import { User_Role } from 'src/roles/entity/role.entity';


export class UserRoleDto {

 
  id?:string; 
  role?: User_Role;
  description?: string;
}
