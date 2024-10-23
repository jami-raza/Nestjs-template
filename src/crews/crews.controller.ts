import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { hasRoles } from 'src/auth/decorators/role.decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles-guard';
import { AuthUser } from 'src/users/decorator/get_token.decorator';
import { isUUID } from 'src/utils/validators/uuid.validator';
import { SuperAdminCrewService, AdminCrewService } from './crews.service';
import { CreateCrewDto } from './dto/create-crew.dto';
import { SuperAdminCrewMemberService } from '../crew_members/crew_members.service';
import { User_Role } from 'src/utils/roles';
import { SuperAdminService } from 'src/users/users.service';
import { filterUserField } from 'src/users/utils/filter_users';
import { filterCrews } from './utils/filter_crews';
import { UpdateCrewDTO } from './dto/update-crew.dto';
import { SuperAdminEmployeeService } from 'src/employees/employees.service';
import { AddMembersCrewDto } from './dto/add-crewMembers.dto';
import { Employee } from 'src/employees/entity/employee.entity';
import { Sort, SortAttr } from './model/crew.model';

@ApiTags('Crews')
@ApiBearerAuth('defaultBearerAuth')
@Controller('crews')
export class CrewsController {
  constructor(
    private readonly superAdminCrewService: SuperAdminCrewService,
    private readonly superAdminCrewMemberService: SuperAdminCrewMemberService,
    private readonly superAdminService: SuperAdminService,
    private readonly adminCrewService: AdminCrewService,
    private readonly superAdminEmployeeService: SuperAdminEmployeeService,
  ) {}

  @hasRoles('superadmin')
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCrewDto: CreateCrewDto) {
    // console.log(authUser, 'Auth User');
    // // console.log(createCrewDto)
    // if (authUser.role.id === User_Role.Admin.id) {
    //   // console.log(authUser, 'Auth User ');
    //   // const adminCustomer = filterUserField(
    //   //   await this.superAdminService.findOneById(authUser.id),
    //   // );

    //   const crew = await this.adminCrewService.create(
    //     createCrewDto,
    //     // adminCustomer.customer as string,
    //   );
    //   const crewMem = createCrewDto.members.map((el) => {
    //     return {
    //       employee: el,
    //       crew: crew.id,
    //     };
    //   });
    //   const crewMembers = await this.superAdminCrewMemberService.createMany(
    //     crewMem,
    //   );
    //   return crewMembers;
    // } else {
      const crew = await this.superAdminCrewService.create(createCrewDto);
      // const crewMem = createCrewDto.members.map((el) => {
      //   return {
      //     employee: el,
      //     crew: crew.id,
      //   };
      // });
      // const crewMembers = await this.superAdminCrewMemberService.createMany(
      //   crewMem,
      // );
      return crew;
    // }
  }

  @hasRoles('superadmin')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'sortAttr', required: false, type: 'enum', enum: SortAttr })
  @ApiQuery({ name: 'sort', required: false, type: 'enum', enum: Sort })
  async findAll(
    // @AuthUser() authUser,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    @Query('search') search?: string,
    @Query('sortAttr') sortAttr?: SortAttr,
    @Query('sort') sort?: Sort,
  ) {
    // const userRole = authUser.role.role;

    // const adminUser = filterUserField(
    //   await this.superAdminService.findOneById(authUser.id),
    // );
    // console.log(adminUser, 'Company as');
    // if (userRole === User_Role.Admin.name) {
    //   if (adminUser) {
    //     return await this.adminCrewService.findAll(
    //       userRole,
    //       // adminUser.customer as string,
    //       {
    //         limit,
    //         offset,
    //         search,
    //         sortAttr,
    //         sort,
    //       }
    //     );
    //   } else {
    //     return 'No Company Admin Found';
    //   }
    // } else {
      return await this.superAdminCrewService.findAll({
        limit,
        offset,
        search,
        sortAttr,
        sort,
      });
    // }
  }

  @hasRoles('superadmin')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    // console.log(isUUID(id), 'Validator');
    if (isUUID(id)) {
      // const userRole = authUser.role.role;
      // const adminUser = filterUserField(
      //   await this.superAdminService.findOneById(authUser.id),
      // );
      // if (userRole === User_Role.Admin.name) {
      //   if (adminUser) {
      //     return await this.adminCrewService.findOne(
      //       id,
      //       // adminUser.customer as string,
      //     );
      //   } else {
      //     return 'No Company User Found';
      //   }
      // } else {
        return await this.superAdminCrewService.findOne(id);
      // }
    } else {
      throw new BadRequestException(['ID must be a UUID.']);
    }
  }

  @hasRoles('superadmin')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get('/crewMembers/:id')
  async findCrewMembers(@Param('id') id: string) {
    // console.log(isUUID(id), 'Validator');
    if (isUUID(id)) {
      // const userRole = authUser.role.role;
      // const adminUser = filterUserField(
      //   await this.superAdminService.findOneById(authUser.id),
      // );
      // if (userRole === User_Role.Admin.name) {
      //   if (adminUser) {
      //     return await this.adminCrewService.findCrewMembers(
      //       id,
      //       // adminUser.customer as string,
      //     );
      //   } else {
      //     return 'No Company User Found';
      //   }
      // } else {
        return await this.superAdminCrewService.findCrewMembers(id);
      // }
    } else {
      throw new BadRequestException(['ID must be a UUID.']);
    }
  }

  // @hasRoles('superadmin')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCrewDTO: UpdateCrewDTO,
  ) {
    if (isUUID(id)) {
      // const userRole = authUser.role.role;
      // const adminUser = filterUserField(
      //   await this.superAdminService.findOneById(authUser.id),
      // );
      // if (userRole === User_Role.Admin.name) {
      //   if (adminUser) {
      //     return await this.adminCrewService.update(
      //       id,
      //       updateCrewDTO,
      //       // adminUser.customer as string,
      //     );
      //   } else {
      //     return 'No Company User Found';
      //   }
      // } else {
        return await this.superAdminCrewService.update(id, updateCrewDTO);
      // }
    } else {
      throw new BadRequestException(['ID must be a UUID.']);
    }
  }

  @hasRoles('superadmin')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Put('/addCrewMembers/:id')
  async addCrewMembers(
    @Param('id') id: string,
    @Body() addCrewMembersDto: AddMembersCrewDto,
    // @AuthUser() authUser,
  ) {
    if (isUUID(id)) {
      // const userRole = authUser.role.role;
      // const adminUser = filterUserField(
      //   await this.superAdminService.findOneById(authUser.id),
      // );

      // if (userRole === User_Role.Admin.name) {
      //   if (adminUser) {
      //     const crewObj = await this.adminCrewService.findOne(
      //       id,
      //       // adminUser.customer as string,
      //     );
      //     if (crewObj) {
      //       // const crewMemberCheck =
      //       //   await this.superAdminEmployeeService.checkEmployees(
      //       //     addCrewMembersDto.members,
      //           // adminUser.customer as string,
      //         // );
      //       // console.log(crewMemberCheck, 'crewMemberCheck');
      //       // console.log(crewObj.customer, 'crewMemberCheck ID');
      //       // if (crewMemberCheck.length === addCrewMembersDto.members.length) {
      //         // If all Conditions are pass

      //         const existingMembers =
      //           await this.superAdminCrewMemberService.checkMembers(
      //             addCrewMembersDto.members,
      //           );
      //         let skipExistingMembers = addCrewMembersDto.members.filter(
      //           (o1) =>
      //             !existingMembers.some(
      //               (o2) => o1 === (o2.employee as Employee).id,
      //             ),
      //         );

      //         const crewMem = skipExistingMembers.map((el) => {
      //           return {
      //             employee: el,
      //             crew: id,
      //           };
      //         });
      //         const crewMembers =
      //           await this.superAdminCrewMemberService.createMany(crewMem);

      //         return await this.superAdminCrewMemberService.findCrewMembers();
      //       } else {
      //         throw new BadRequestException([
      //           'No employees are linked to this customer.',
      //         ]);
      //       }
      //     } else {
      //       throw new BadRequestException(['No Crew Found.']);
      //     }
      //   } 
      //   else {
      //     return 'No Company User Found';
      //   }
      // } else {
      //   const crewObj = await this.superAdminCrewService.findOne(id);
      //   if (crewObj) {
      //     const crewMemberCheck =
      //       await this.superAdminEmployeeService.checkEmployees(
      //         addCrewMembersDto.members,
      //         (crewObj.customer as Customer).id,
      //       );
      //     console.log(crewMemberCheck, 'crewMemberCheck');
      //     console.log(crewObj.customer, 'crewMemberCheck ID');
      //     if (crewMemberCheck.length === addCrewMembersDto.members.length) {
      //       // If all Conditions are pass

      //       const existingMembers =
      //         await this.superAdminCrewMemberService.checkMembers(
      //           addCrewMembersDto.members,
      //         );
      //       let skipExistingMembers = addCrewMembersDto.members.filter(
      //         (o1) =>
      //           !existingMembers.some(
      //             (o2) => o1 === (o2.employee as Employee).id,
      //           ),
      //       );

      //       const crewMem = skipExistingMembers.map((el) => {
      //         return {
      //           employee: el,
      //           crew: id,
      //         };
      //       });
      //       const crewMembers =
      //         await this.superAdminCrewMemberService.createMany(crewMem);

      //       return await this.superAdminCrewMemberService.findCrewMembers();
      //     } else {
      //       throw new BadRequestException([
      //         'No employees are linked to this customer.',
      //       ]);
      //     }
      //   } else {
      //     throw new BadRequestException(['No Crew Found.']);
      //   }
      // }
      const existingMembers =
              await this.superAdminCrewMemberService.checkMembers(
                addCrewMembersDto.members,
              );
            let skipExistingMembers = addCrewMembersDto.members.filter(
              (o1) =>
                !existingMembers.some(
                  (o2) => o1 === (o2.employee as Employee).id,
                ),
            );

            const crewMem = skipExistingMembers.map((el) => {
              return {
                employee: el,
                crew: id,
              };
            });
            const crewMembers =
              await this.superAdminCrewMemberService.createMany(crewMem);

            return await this.superAdminCrewMemberService.findCrewMembers();
            
    } else {
      throw new BadRequestException(['ID must be a UUID.']);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put('/deleteCrew/:id')
  async deleteCrew (
    @Param('id') id:string
  ){
    return await this.superAdminCrewService.deleteCrews(id)

  }
  


 
}
  

