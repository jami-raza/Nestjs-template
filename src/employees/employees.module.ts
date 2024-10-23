import { forwardRef, Module } from '@nestjs/common';
import { AdminEmployeeService, SuperAdminEmployeeService } from './employees.service';
import { EmployeesController } from './employees.controller';
import { SuperAdminService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entity/employee.entity';
import { UsersModule } from 'src/users/users.module';
import { GatewayModule } from 'src/gateway/gateway.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    forwardRef(() => GatewayModule),

  ],
  providers: [SuperAdminEmployeeService,    AdminEmployeeService],
  controllers: [EmployeesController],
  exports:[SuperAdminEmployeeService,AdminEmployeeService]
})
export class EmployeesModule {}
