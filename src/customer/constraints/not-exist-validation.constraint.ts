// import { BadRequestException, Injectable } from '@nestjs/common';
// import {
//   registerDecorator,
//   ValidationOptions,
//   ValidatorConstraint,
//   ValidatorConstraintInterface,
//   ValidationArguments,
//   isUUID,
// } from 'class-validator';
// import { UserService } from 'src/users/users.service';
// import { SuperAdminCustomerService } from '../customer.service';

// @Injectable()
// @ValidatorConstraint({ async: true })
// export class IsCustomerNotExistConstraint
//   implements ValidatorConstraintInterface
// {
//   constructor(private superAdminCustomerService : SuperAdminCustomerService ) {}
//   async validate(id: string, args: ValidationArguments) {
//     if(isUUID(id)){
//       const customer = await this.superAdminCustomerService.findOne(id);
//     console.log(customer, 'Check Customer');
//     if (customer) {
//       return true;
//     }
//     return false;
//     } else{
//       throw new BadRequestException(['ID must be a valid UUID.']);
//     }
    
//   }
// }

// export function IsCustomerNotExist(validationOptions?: ValidationOptions) {
//   return function (object: Object, propertyName: string) {
//     registerDecorator({
//       target: object.constructor,
//       propertyName: propertyName,
//       options: validationOptions,
//       constraints: [],
//       validator: IsCustomerNotExistConstraint,
//     });
//   };
// }
