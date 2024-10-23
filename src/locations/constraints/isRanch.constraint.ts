import { BadRequestException, ExecutionContext, Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  isUUID,
} from 'class-validator';
import {AdminRanchService} from '../../ranches/ranches.service'
import {AdminService} from '../../users/users.service'
import { AuthUser } from 'src/users/decorator/get_token.decorator';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsRanchConstraint
  implements ValidatorConstraintInterface
{
  
  constructor(private adminRanchService: AdminRanchService) {}
  async validate(id: string, args: ValidationArguments) {
    
    if(!isUUID(id)){
      throw new BadRequestException(['Ranch id must be a valid UUID.'])
    }
    const ranch = await this.adminRanchService.findOne(id)
   console.log(ranch, 'Ranch Find')
    if (ranch) {
      return true;
    }
    return false;
  }
}

export function IsRanch(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsRanchConstraint,
    });
  };
}
