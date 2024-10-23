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
  import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
  // import { UpdateLocationDto } from './dto/update-location.dto';
  import { AdminLocationService, SuperAdminLocationService } from './locations.service';
import { Sort, SortAttr } from './model/locations.model';
  
  @ApiTags('locations')
  @ApiBearerAuth('defaultBearerAuth')
  @Controller('locations')
  export class LocationsController {
    constructor(
      private readonly superAdminLocationService: SuperAdminLocationService,
      private readonly adminLocationService: AdminLocationService,
      private readonly superAdminService: SuperAdminService,
    ) {}
  
    @hasRoles('superadmin')
    // @UseGuards(JwtAuthGuard, RolesGuard)
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(@Body() createLocationDto: CreateLocationDto) {
      // console.log(authUser, 'Auth User');
      // // console.log(createCrewDto)
      // if (authUser.role.id === User_Role.Admin.id) {
      //   console.log(authUser, 'Auth User ');
      //   const adminCustomer = filterUserField(
      //     await this.superAdminService.findOneById(authUser.id),
      //   );
  
      //   const location = await this.adminLocationService.create(
      //     createLocationDto,
      //     // adminCustomer.customer as string,
      //   );
      //   return location;
      // } else {
        const location = await this.superAdminLocationService.create(createLocationDto);
  
        return location;
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
        //   return await this.adminLocationService.findAll(adminUser.customer as string);
        // } else {
        //   return 'No Company Admin Found';
        // }
      // } else {
        return await this.superAdminLocationService.findAll({
          limit,
          offset,
          search,
          sortAttr,
          sort
        });
      // }
    }
  
    @hasRoles('superadmin')
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
        //     return await this.adminLocationService.findOne(
        //       id,
        //       // adminUser.customer as string,
        //     );
        //   } else {
        //     return 'No Company User Found';
        //   }
        // } else {
          return await this.superAdminLocationService.findOne(id);
        // }
      } else {
        throw new BadRequestException(['ID must be a UUID.']);
      }
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() updateLocationDTO: UpdateLocationDto,
    ){
      if (isUUID(id)) {
        return await this.superAdminLocationService.update(id, updateLocationDTO);
      }else{
        throw new BadRequestException(["not valid"])
      }
    }


    @UseGuards(JwtAuthGuard)
  @Put('delete/:id')
    async delete(
      @Param('id') id: string,
    ){
      if (isUUID(id)) {
        return await this.superAdminLocationService.delete(id);
      }else{
        throw new BadRequestException(["not valid"])
      }
    }
  
    // @hasRoles('superadmin')
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Put(':id')
    // async update(
    //   @Param('id') id: string,
    //   @Body() updateLocationDTO: UpdateLocationDto,
    //   @AuthUser() authUser,
    // ) {
    //   if (isUUID(id)) {
    //     // const userRole = authUser.role.role;
    //     // const adminUser = filterUserField(
    //     //   await this.superAdminService.findOneById(authUser.id),
    //     // );
    //     // if (userRole === User_Role.Admin.name) {
    //     //   if (adminUser) {
    //     //     return await this.adminLocationService.update(
    //     //       id,
    //     //       updateLocationDTO,
    //     //       // adminUser.customer as string,
    //     //     );
    //     //   } else {
    //     //     return 'No Company Location Found';
    //     //   }
    //     // } else {
    //       return await this.superAdminLocationService.update(id, updateLocationDTO);
    //     // }
    //   } else {
    //     throw new BadRequestException(['ID must be a UUID.']);
    //   }
    // }
  
  }
  