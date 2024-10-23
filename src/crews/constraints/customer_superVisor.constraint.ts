import { BadRequestException, ExecutionContext, Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  isUUID,
} from 'class-validator';
import { SuperAdminCrewService } from '../crews.service';
import {AdminService, SuperAdminService} from '../../users/users.service'
import { AuthUser } from 'src/users/decorator/get_token.decorator';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsCustomerSupervisorConstraint
  implements ValidatorConstraintInterface
{
  
  constructor(private adminService: SuperAdminService) {}
  async validate(supervisor: string, args: ValidationArguments) {
    
    if(!isUUID(supervisor)){
      throw new BadRequestException(['Supervisor id must be a valid UUID.'])
    }
    const crew = await this.adminService.findOneById2(supervisor)
   
    if (crew) {
      return true;
    }
    return false;
  }
}

export function IsCustomerSupervisor(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCustomerSupervisorConstraint,
    });
  };
}
