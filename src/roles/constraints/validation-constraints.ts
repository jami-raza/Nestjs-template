import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { User_Role } from '../entity/role.entity';
import { RolesService } from '../roles.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsRoleAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private roleService: RolesService) {}
  async validate(role: User_Role, args: ValidationArguments) {
    // console.log(role, "Args")
    const existingRoles = Object.values(User_Role).map(el => el)
    if(existingRoles.includes(role)){
        const userRole = await this.roleService.findByRole(role);
    
    if (userRole) return false;
    return true;
    } else{
        return true;
    }
    
  }
}

export function IsRoleAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsRoleAlreadyExistConstraint,
    });
  };
}

export class IsRoleNotExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private roleService: RolesService) {}
  async validate(id: string, args: ValidationArguments) {
    // console.log(id, "Args")
  //  console.log("Check")
    const userRole = await this.roleService.findById(id);
    if(userRole){
      return true;
    } else{
      return false;
    }
    
  }
}

export function IsRoleNotExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsRoleNotExistConstraint,
    });
  };
}
