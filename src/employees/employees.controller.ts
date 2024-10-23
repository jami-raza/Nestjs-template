import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Header,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { hasRoles } from 'src/auth/decorators/role.decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { RolesGuard } from 'src/auth/guards/roles-guard';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { MyGateway } from 'src/gateway/gateway';
import { AuthUser } from 'src/users/decorator/get_token.decorator';
import { SuperAdminService } from 'src/users/users.service';
import { filterUserField } from 'src/users/utils/filter_users';
import { User_Role } from 'src/utils/roles';
import { isUUID } from 'src/utils/validators/uuid.validator';
import { CreateEmployeeDto } from './dto/createEmployee.dto';
import { UpdateEmployeeDto } from './dto/updateEmployee.dto';
import {
  SuperAdminEmployeeService,
  AdminEmployeeService,
} from './employees.service';
import { Employee } from './entity/employee.entity';
import { Sort, SortAttr } from './model/employee.model';

@ApiTags('Employees')
@ApiBearerAuth('defaultBearerAuth')
@Controller('employees')
export class EmployeesController {
  constructor(
    private employeeSuperAdminService: SuperAdminEmployeeService,
    // private readonly gateway: MyGateway,
    // private employeeAdminService: AdminEmployeeService,
    // private superAdminService: SuperAdminService,
    // private cloudinaryService: CloudinaryService,
    // private authService: AuthService,
  ) {}

  @hasRoles('superadmin')
  @UseGuards(JwtAuthGuard)
  @Post()

  // @ApiConsumes('multipart/form-data')
  // @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createEmployeeDto: CreateEmployeeDto,
    // @AuthUser() authUser
  ) {
      // const userRole = authUser && authUser.role.role; // Get Login User Role
// console.log(createEmployeeDto,"createEmployee")
      // console.log(authUser, 'Req user customer');
      // Check If User is Admin role
      // if (userRole === User_Role.Admin.name) {
        // Check If login admin has company
        // const userAdmin = filterUserField(
        //   await this.superAdminService.findOneById(authUser.id),
        // );
        // console.log(userAdmin, 'Admin User');

        // Create user company override with login admin company
        // createEmployeeDto.customer = userAdmin.customer as string;
        // Check If profile image is empty or has value
        // const profileImage = file
        //   ? await this.cloudinaryService.uploadImage(file)
        //   : { secure_url: '' };

        // const userFields = {
        //   empId:createEmployeeDto.empId,
        //   company:createEmployeeDto.company,
        //   role:createEmployeeDto.role,
        //   firstName:createEmployeeDto.firstname,
        //   midName:createEmployeeDto.midName,
        //   lastName:createEmployeeDto.lastName,
        //   gender:createEmployeeDto.gender,
        //   hourlyRate:createEmployeeDto.hourlyRate,
        //   dayStartedAt:createEmployeeDto.dayStartedAt,
        //   period:createEmployeeDto.period,
        //   minWageRate:createEmployeeDto.minWageRate,
        //   overTime:createEmployeeDto.overTime,
        //   doubleTime:createEmployeeDto.doubleTime,
        //   mealTimeWageRate:createEmployeeDto.mealTimeWageRate,


          // name: createEmployeeDto.name,
          // email: createEmployeeDto.email,
          // password: createEmployeeDto.password,
          // // customer: userAdmin.customer,
          // createdBy: authUser.email,
          // file: profileImage.secure_url,
          // role: User_Role.Employee.id as any,
        // };

        // const addUser = await this.authService.create(
        //   userFields
        // );

        

        // If all set create user successfully
        return await this.employeeSuperAdminService.create(
          { ...createEmployeeDto});
          
      } 
      // else {
      //   const profileImage = file
      //     ? await this.cloudinaryService.uploadImage(file)
      //     : { secure_url: '' };

      //   const userFields = {
      //     empId:createEmployeeDto.empId,
      //     company:createEmployeeDto.company,
      //     role:createEmployeeDto.role,
      //     firstName:createEmployeeDto.firstname,
      //     midName:createEmployeeDto.midName,
      //     lastName:createEmployeeDto.lastName,
      //     gender:createEmployeeDto.gender,
      //     hourlyRate:createEmployeeDto.hourlyRate,
      //     dayStartedAt:createEmployeeDto.dayStartedAt,
      //     period:createEmployeeDto.period,
      //     minWageRate:createEmployeeDto.minWageRate,
      //     overTime:createEmployeeDto.overTime,
      //     doubleTime:createEmployeeDto.doubleTime,
      //     mealTimeWageRate:createEmployeeDto.mealTimeWageRate,
      //   };

        // const addUser = await this.authService.create(
        //   userFields,
        // );

        // If all set create user successfully
        // return await this.employeeSuperAdminService.create(
        //   { ...CreateEmployeeDto }
          
        // );
      
  
  

  @hasRoles('superadmin')
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
    //     return await this.employeeAdminService.getAll( userRole,
    //       // adminUser.customer as string,
    //       {
    //         limit,
    //         offset,
    //         search,
    //         sortAttr,
    //         sort,
    //       },
    //     );
    //   } else {
    //     return 'No Company Users Found';
    //   }
    // } else {
      return await this.employeeSuperAdminService.getAll({
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
  @Get(':id')
  async findOne(@Param('id') id: string) {
    // console.log(isUUID(id), 'Validator');
    if (isUUID(id)) {      
        return await this.employeeSuperAdminService.getOne(id);
    } else {
      throw new BadRequestException(['ID must be a UUID.']);
    }
  }

  // @UseGuards(JwtAuthGuard,RolesGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto
  ){
      if(isUUID(id)) {
        return await this.employeeSuperAdminService.UpdateEmployee(id, updateEmployeeDto)
      } else {
        throw new BadRequestException(['ID must be a UUID'])
      }
  }

  @Put('delete/:id')
  async deleteEmployee(
    @Param('id') id: string
  ){
    return await this.employeeSuperAdminService.deleteEmployee(id)
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('getByRole/:role')
   getEmployeeByRole(
    @Param('role') role:string
  ) {
    return this.employeeSuperAdminService.findEmployeeByRole(role)
  }
}

