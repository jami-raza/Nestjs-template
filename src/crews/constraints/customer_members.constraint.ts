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
import {SuperAdminEmployeeService} from '../../employees/employees.service'

@Injectable()
@ValidatorConstraint({ async: true })
export class IsCustomerMembersConstraint
  implements ValidatorConstraintInterface
{
  constructor(private superAdminEmployeeService: SuperAdminEmployeeService) {}
  async validate(members: string[], args: ValidationArguments) {
    
    const member = members.map(el => isUUID(el) ? 'true' : 'false')
    if(member.includes('false')){
      
      throw new BadRequestException(['All members must contain a valid UUID.'])
    } 
    else{
      for (const el of members) {
        const crewMemberexists =   await this.superAdminEmployeeService.findByMember(el) 
        if(!crewMemberexists){
          return false
       } 
      }
       
       
      // const crewMemberexists =  this.superAdminEmployeeService.findByMember()
    }
    return true
    // const crew = await this.superAdminEmployeeService.checkEmployees(members, args.object['customer'])
    
    // if (crew.length === members.length) {
    //   return true;
    // }
    
  }
}

export function IsCustomerMembersVisor(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCustomerMembersConstraint,
    });
  };
}
