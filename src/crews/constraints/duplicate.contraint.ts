import { BadRequestException, Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  isUUID,
} from 'class-validator';
import { SuperAdminCrewService } from '../crews.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsCrewSupervisorAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private superAdminCrewService: SuperAdminCrewService) {}
  async validate(supervisor: string, args: ValidationArguments) {
    
    if(!isUUID(supervisor)){
      throw new BadRequestException(['Supervisor id must be a valid UUID.'])
    }
    const crew = await this.superAdminCrewService.findBySupervisor(supervisor);
    console.log("Already Super visor")
    if (crew) {
      return false;
    }
    return true;
  }
}

export function IsCrewSupervisorAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCrewSupervisorAlreadyExistConstraint,
    });
  };
}
