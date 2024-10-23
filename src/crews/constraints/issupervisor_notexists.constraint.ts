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
import {AdminService} from '../../users/users.service'
import { AuthUser } from 'src/users/decorator/get_token.decorator';
import { SuperAdminEmployeeService } from 'src/employees/employees.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsSupervisorNotExistConstraint
  implements ValidatorConstraintInterface
{
  
  constructor(private crewAdminService: SuperAdminEmployeeService) {}
  async validate(supervisor: string, args: ValidationArguments) {
    
    if(!isUUID(supervisor)){
      throw new BadRequestException(['Supervisor id must be a valid UUID.'])
    }
    const crew = await this.crewAdminService.findSupervisor(supervisor)
   
    if (!crew) {
      return false;
    }
    return true;
  }
}

export function IsSupervisorNotExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsSupervisorNotExistConstraint,
    });
  };
}
