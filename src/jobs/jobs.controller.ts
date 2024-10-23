import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { isUUID } from 'class-validator';
import { hasRoles } from 'src/auth/decorators/role.decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles-guard';
import { AuthUser } from 'src/users/decorator/get_token.decorator';
import { SuperAdminService } from 'src/users/users.service';
import { filterUserField } from 'src/users/utils/filter_users';
import { User_Role } from 'src/utils/roles';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
// import { UpdateJobDto } from './dto/update-job.dto';
import { AdminJobService, SuperAdminJobService } from './jobs.service';
import { Sort, SortAttr } from './model/jobs.model';

@ApiTags('jobs')
@ApiBearerAuth('defaultBearerAuth')
@Controller('jobs')
export class JobsController {
  constructor(
    private readonly superAdminJobService: SuperAdminJobService,
  ) {}

  // @hasRoles('superadmin')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createJobDto: CreateJobDto) {
    // console.log(authUser, 'Auth User');
    // // console.log(createCrewDto)
    // if (authUser.role.id === User_Role.Admin.id) {
    //   console.log(authUser, 'Auth User ');
    //   const adminCustomer = filterUserField(
    //     await this.superAdminService.findOneById(authUser.id),
    //   );

    //   const job = await this.adminJobService.create(
    //     createJobDto,
    //     // adminCustomer.customer as string,
    //   );
    //   return job;
    // } else {
      const job = await this.superAdminJobService.create(createJobDto);

      return job;
    // }
  }

  // @hasRoles('superadmin')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'sortAttr', required: false, type: 'enum', enum:SortAttr  })
  @ApiQuery({ name: 'sort', required: false, type: 'enum', enum: Sort })
  
  async findAll(
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
      // if (adminUser) {
      //   return await this.adminJobService.findAll(adminUser.customer as string);
      // } else {
      //   return 'No Company Admin Found';
      // }
    // } else {
      return await this.superAdminJobService.findAll({
        limit,
        offset,
        search,
        sortAttr,
        sort
      });
    // }
  }

  // @hasRoles('superadmin')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (isUUID(id)) {
      // const userRole = authUser.role.role;
      // const adminUser = filterUserField(
      //   await this.superAdminService.findOneById(authUser.id),
      // );
      // if (userRole === User_Role.Admin.name) {
      //   if (adminUser) {
      //     return await this.adminJobService.findOne(
      //       id,
      //       // adminUser.customer as string,
      //     );
      //   } else {
      //     return 'No Company User Found';
      //   }
      // } else {
        return await this.superAdminJobService.findOne(id);
      // }
    } else {
      throw new BadRequestException(['ID must be a UUID.']);
    }
  }

  // @hasRoles('superadmin')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Put(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateJobDTO: UpdateJobDto,
  //   @AuthUser() authUser,
  // ) {
  //   if (isUUID(id)) {
  //     // const userRole = authUser.role.role;
  //     // const adminUser = filterUserField(
  //     //   await this.superAdminService.findOneById(authUser.id),
  //     // );
  //     // if (userRole === User_Role.Admin.name) {
  //     //   if (adminUser) {
  //     //     return await this.adminJobService.update(
  //     //       id,
  //     //       updateJobDTO,
  //     //       // adminUser.customer as string,
  //     //     );
  //     //   } else {
  //     //     return 'No Company Job Found';
  //     //   }
  //     // } else {
  //       return await this.superAdminJobService.update(id, updateJobDTO);
  //     // }
  //   } else {
  //     throw new BadRequestException(['ID must be a UUID.']);
  //   }
  // }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id:string,
    @Body() updateJobDto:UpdateJobDto
  ){
    if(isUUID(id)){
      return await this.superAdminJobService.update(id, updateJobDto);
    } else {
      throw new BadRequestException(['Id must be a uuid'])
    }
  }

  @Put('delete/:id')
  async delete(
    @Param('id') id:string
  ){
    if(isUUID(id)){
      return await this.superAdminJobService.delete(id);
    } else {
      throw new BadRequestException(['Id must be a uuid'])
    }
  }
}
