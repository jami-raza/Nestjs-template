// import { forwardRef, Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UsersModule } from 'src/users/users.module';
// import { SuperAdminService } from 'src/users/users.service';

// import { CustomerController } from './customer.controller';
// import { SuperAdminCustomerService, AdminCustomerService } from './customer.service';
// import { Customer } from './entity/customer.entity';


// @Module({
//   imports:[TypeOrmModule.forFeature([Customer]), forwardRef(() => UsersModule)],
//   controllers: [CustomerController],
//   providers: [SuperAdminCustomerService, AdminCustomerService],
//   exports:[SuperAdminCustomerService, AdminCustomerService]
// })
// export class CustomerModule {}
