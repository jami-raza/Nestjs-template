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
import { CreateRanchDto } from './dto/create-ranch.dto';
import { UpdateRanchDTO } from './dto/update-ranch.dto';
import { Sort, SortAttr } from './model/ranches.model';
// import { UpdateRanchDto } from './dto/update-ranch.dto';
import { AdminRanchService, SuperAdminRanchService } from './ranches.service';

@ApiTags('Ranches')
@ApiBearerAuth('defaultBearerAuth')
@Controller('ranches')
export class RanchesController {
  constructor(
    private readonly superAdminRanchService: SuperAdminRanchService,
    private readonly adminRanchService: AdminRanchService,
    private readonly superAdminService: SuperAdminService,
  ) {}

  @hasRoles('superadmin')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createRanchDto: CreateRanchDto) {
    // console.log(authUser, 'Auth User');
    // console.log(createCrewDto)
    // if (authUser.role.id === User_Role.Admin.id) {
    //   // console.log(authUser, 'Auth User ');
    //   const adminCustomer = filterUserField(
    //     await this.superAdminService.findOneById(authUser.id),
    //   );

    //   const ranch = await this.adminRanchService.create(
    //     createRanchDto,
    //     // adminCustomer.customer as string,
    //   );
    //   return ranch;
    // } 
    // else {
      const ranch = await this.superAdminRanchService.create(createRanchDto);

      return ranch;
    // }
  }

  @hasRoles('superadmin')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiQuery({name: 'limit' , required: false, type:Number})
  @ApiQuery({name: 'offset' , required: false, type:Number})
  @ApiQuery({name: 'search' , required: false, type:String})
  @ApiQuery({name: 'sortAttr' , required: false, type:'enum', enum: SortAttr})
  @ApiQuery({name: 'sort' , required: false, type:'enum', enum: Sort})
  async findAll(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number, 
    @Query('search') search?: string,
    @Query('sortAttr') sortAttr?: SortAttr,
    @Query('sort') sort?: Sort 
  ) {
    // const userRole = authUser.role.role;

    // const adminUser = filterUserField(
    //   await this.superAdminService.findOneById(authUser.id),
    // );
    // console.log(adminUser, 'Company as');
    // if (userRole === User_Role.Admin.name) {
      // if (adminUser) {
      //   return await this.adminRanchService.findAll(
      //     adminUser.customer as string,
      //   );
      // } else {
      //   return 'No Company Admin Found';
      // }
    // } else {
      return await this.superAdminRanchService.findAll({
        limit,
        offset,
        search,
        sortAttr,
        sort
      });
    // }
  }

  // @hasRoles('admin', 'superadmin')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(
    @Param('id') id: string,
    ) {
    if (isUUID(id)) {
      // console.log(id, 'ID Ranch')
      // const userRole = authUser.role.role;
      // const adminUser = filterUserField(
      //   await this.superAdminService.findOneById(authUser.id),
      // );
      // if (userRole === User_Role.Admin.name) {
      //   if (adminUser) {
      //     return await this.adminRanchService.findOne(
      //       id,
      //       // adminUser.customer as string,
      //     );
      //   } else {
      //     return 'No Company User Found';
      //   }
      // } else {  
        return await this.superAdminRanchService.findOne(id);
      // }
    } else {
      throw new BadRequestException(['ID must be a UUID.']);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id:string,
    @Body() updateRanchDTO:UpdateRanchDTO
  ){
    if(isUUID(id)){
      return await this.superAdminRanchService.update(id,updateRanchDTO);
    } else{
      throw new BadRequestException(['ID must be a UUID'])
    }

  }

  @UseGuards(JwtAuthGuard)
  @Put('/delete/:id')
  async deleteRanch(
    @Param('id') id:string
  ){
    return await this.superAdminRanchService.deleteRanches(id);
  }

  // @hasRoles('admin', 'superadmin')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Put(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateRanchDTO: UpdateRanchDto,
  //   @AuthUser() authUser,
  // ) {
  //   if (isUUID(id)) {
  //     // const userRole = authUser.role.role;
  //     // const adminUser = filterUserField(
  //     //   await this.superAdminService.findOneById(authUser.id),
  //     // );
  //     // if (userRole === User_Role.Admin.name) {
  //     //   if (adminUser) {
  //     //     return await this.adminRanchService.update(
  //     //       id,
  //     //       updateRanchDTO,
  //     //       // adminUser.customer as string,
  //     //     );
  //     //   } else {
  //     //     return 'No Company Ranch Found';
  //     //   }
  //     // } else {
  //       return await this.superAdminRanchService.update(id, updateRanchDTO);
  //     // }
  //   } else {
  //     throw new BadRequestException(['ID must be a UUID.']);
  //   }
  // }
 
}
