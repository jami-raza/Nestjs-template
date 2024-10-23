import { ExecutionContext, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { map, Observable } from 'rxjs';
import { Role } from 'src/roles/entity/role.entity';
import { AdminService, SuperAdminService, UserService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';


@Injectable()
@ValidatorConstraint({ async: true })
export class IsUserNotAdminConstraint
  implements ValidatorConstraintInterface
{
  constructor(private superAdminService: SuperAdminService) {}
  response: boolean;
    async validate(id: string, args: ValidationArguments) {
      console.log(id, "Validation ID")
    const userRes = await this.superAdminService.findOneById(id)
    
    if(userRes){
        const userRole = (userRes.role as Role).role
        console.log("User Role Res", userRole)
        if(userRole === 'admin'){
            return true;
        }else{
            return false;
        }
        
      } 
      
  }
}

export function IsUserNotAdmin(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserNotAdminConstraint,
    });
  };
}
