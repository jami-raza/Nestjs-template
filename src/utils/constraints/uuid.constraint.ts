import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { isUUID } from '../validators/uuid.validator';


@Injectable()
@ValidatorConstraint({ async: true })
export class IsValidUUIDConstraint
  implements ValidatorConstraintInterface
{
  constructor() {}
  async validate(uuid: string, args: ValidationArguments) {
    // console.log(uuid, "Customer UUID")
    // const validate = isUUID(uuid)
    // console.log(validate,"Validate")
    // if(validate){
    //     return false;
    // } 
    return await false;
  }
}

export function IsValidUUID(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidUUIDConstraint,
    });
  };
}
