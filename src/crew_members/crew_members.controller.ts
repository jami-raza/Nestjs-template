import { BadRequestException, Controller, Delete, Get, Param, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { isUUID } from 'class-validator';
import { hasRoles } from 'src/auth/decorators/role.decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles-guard';
import { AuthUser } from 'src/users/decorator/get_token.decorator';
import { SuperAdminService } from 'src/users/users.service';
import { filterUserField } from 'src/users/utils/filter_users';
import { User_Role } from 'src/utils/roles';
import { AdminCrewMemberService, SuperAdminCrewMemberService } from './crew_members.service';

@ApiTags('CrewMembers')
@ApiBearerAuth('defaultBearerAuth')
@Controller('crew-members')
export class CrewMembersController {
    constructor(
        private readonly superAdminCrewMemberService: SuperAdminCrewMemberService,
        private readonly adminCrewMemberService: AdminCrewMemberService,
        private readonly superAdminService: SuperAdminService,
      ) {}

      @hasRoles('superadmin')
      @UseGuards(JwtAuthGuard, RolesGuard)
      @Get()
      async findAll() {
        // const userRole = authUser.role.role;
    
        // const adminUser = filterUserField(await this.superAdminService.findOneById(authUser.id))
        // console.log(adminUser, 'Company as');
        // if (userRole === User_Role.Admin.name) {
          // if (adminUser) {
          //   return await this.adminCrewMemberService.findCrewMembers(adminUser.customer as string)
          // } else {
          //   return 'No Company Admin Found';
          // }
        // } else {
          return await this.superAdminCrewMemberService.findCrewMembers();
        // }
      }

      // @Get(':id')
      // async getAll(
      //   @Param(':id') id:string
      // ){
      //   return await this.superAdminCrewMemberService.findMembers(id);
      // }
      
      @UseGuards(JwtAuthGuard)
      @Get('/crewMembers/:id')
      async findCrewMembers(@Param('id') id: string) {
        if (isUUID(id)) {
            return await this.superAdminCrewMemberService.findAllCrewMembersById(id);
        } else {
          throw new BadRequestException(['ID must be a UUID.']);
        }
      }      
      @UseGuards(JwtAuthGuard)
      @Put('crewMembers/delete/:id')
      async remove(@Param('id') id: string){
        if(isUUID(id)){
          return await this.superAdminCrewMemberService.findOne(id);
        }else{
          throw new BadRequestException(['ID must be a UUID.']);
        }
      }



}
