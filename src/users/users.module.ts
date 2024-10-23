import { forwardRef, Logger, Module } from '@nestjs/common';
import { AdminService, SuperAdminService, UserService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { usersProviders } from './users.providers';
// import { CustomerModule } from 'src/customer/customer.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { EmployeesModule } from 'src/employees/employees.module';
import { RolesModule } from 'src/roles/roles.module';

@Module({
  imports: [
    // forwardRef(() => CustomerModule),
    forwardRef(() => EmployeesModule),
    forwardRef(() => CloudinaryModule),
    forwardRef(() => RolesModule)
    ,TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [AdminService, ...usersProviders, UserService, Logger, SuperAdminService],
  exports: [AdminService, UserService, SuperAdminService]
})
export class UsersModule {}
