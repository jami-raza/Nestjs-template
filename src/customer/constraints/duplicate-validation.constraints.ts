// import { Injectable } from '@nestjs/common';
// import {
//   registerDecorator,
//   ValidationOptions,
//   ValidatorConstraint,
//   ValidatorConstraintInterface,
//   ValidationArguments,
// } from 'class-validator';
// import { SuperAdminCustomerService } from '../customer.service';

// @Injectable()
// @ValidatorConstraint({ async: true })
// export class IsCustomerAlreadyExistConstraint
//   implements ValidatorConstraintInterface
// {
//   constructor(private superAdminCustomerService: SuperAdminCustomerService) {}
//   async validate(admin: string, args: ValidationArguments) {
//     const customer = await this.superAdminCustomerService.findOneByAdmin(admin);
    
//     if (customer) {
//       return false;
//     }
//     return true;
//   }
// }

// export function IsCustomerAlreadyExist(validationOptions?: ValidationOptions) {
//   return function (object: Object, propertyName: string) {
//     registerDecorator({
//       target: object.constructor,
//       propertyName: propertyName,
//       options: validationOptions,
//       constraints: [],
//       validator: IsCustomerAlreadyExistConstraint,
//     });
//   };
// }
