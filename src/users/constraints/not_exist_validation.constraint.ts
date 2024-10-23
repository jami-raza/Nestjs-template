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
import { SuperAdminService, UserService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';


@Injectable()
@ValidatorConstraint({ async: true })
export class IsUserNotExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private superAdminService: SuperAdminService) {}
  response: boolean;
    async validate(id: string, args: ValidationArguments) {
  
    const userRes = await this.superAdminService.findOneById(id)
      if(userRes){
        
        return true;
      } else{
        
        return false;
      }
      
  }
}

export function IsUserNotExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserNotExistConstraint,
    });
  };
}
