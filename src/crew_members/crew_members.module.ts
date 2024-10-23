import { forwardRef, Module } from '@nestjs/common';
import { SuperAdminCrewMemberService, AdminCrewMemberService } from './crew_members.service';
import { CrewMembersController } from './crew_members.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { CrewMembers } from './entity/crew_member.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CrewMembers]), forwardRef(() => UsersModule)],
  providers: [SuperAdminCrewMemberService, AdminCrewMemberService],
  controllers: [CrewMembersController],
  exports:[SuperAdminCrewMemberService, AdminCrewMemberService]
})
export class CrewMembersModule {}
