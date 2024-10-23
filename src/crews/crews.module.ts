import { forwardRef, Module } from '@nestjs/common';
import { AdminCrewService, SuperAdminCrewService } from './crews.service';
import { CrewsController } from './crews.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Crew } from './entity/crew.entity';
import { UsersModule } from 'src/users/users.module';
import { CrewMembersModule } from 'src/crew_members/crew_members.module';
import { EmployeesModule } from 'src/employees/employees.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Crew]),
    forwardRef(() => UsersModule),
    forwardRef(() => CrewMembersModule),
    forwardRef(() => EmployeesModule),
  ],

  controllers: [CrewsController],
  exports: [SuperAdminCrewService, AdminCrewService],
  providers: [SuperAdminCrewService, AdminCrewService],
})
export class CrewsModule {}
