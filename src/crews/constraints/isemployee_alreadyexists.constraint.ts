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
import { SuperAdminCrewMemberService } from 'src/crew_members/crew_members.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsCustomerMembersAlreadyExistConstraint
  implements ValidatorConstraintInterface
{
  constructor(private superAdminCrewService: SuperAdminCrewMemberService) {}
  async validate(members: string[], args: ValidationArguments) {
    console.log(members);
    const member = members.map(el => isUUID(el) ? 'true' : 'false')
    console.log(member);
    if(member.includes('false')){
      
      throw new BadRequestException(['All members must contain a valid UUID.'])
    } 
    else{
      for (const el of members) {
        const crewMemberexists = await this.superAdminCrewService.findOneByCrewMember(el) 
        console.log(crewMemberexists);
        if(crewMemberexists){
          return false
       } 
      }
    return true
  }
}
}
export function IsCustomerMembersVisorAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCustomerMembersAlreadyExistConstraint,
    });
  };
}
