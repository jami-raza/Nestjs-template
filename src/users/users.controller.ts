import { AdminService, SuperAdminService, UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
  Patch,
  Delete,
  Headers,
  UnauthorizedException,
  UseGuards,
  Req,
  BadRequestException,
  Put,
  Inject,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { RolesGuard } from 'src/auth/guards/roles-guard';
import { hasRoles } from 'src/auth/decorators/role.decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { AuthUser } from './decorator/get_token.decorator';
// import { SuperAdminCustomerService } from 'src/customer/customer.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { userLogs } from 'src/utils/log-formatter/user.logs';
// import { Customer } from 'src/customer/entity/customer.entity';
import { filterUserField, filterUsers } from './utils/filter_users';
import { User_Role } from 'src/utils/roles';
import { request } from 'http';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { isUUID } from 'src/utils/validators/uuid.validator';
import { SuperAdminEmployeeService } from 'src/employees/employees.service';
import { IUserAll, Sort, SortAttr } from './model/user.model';
import { RolesService } from 'src/roles/roles.service';

@ApiTags('Users')
@ApiBearerAuth('defaultBearerAuth')
@Controller('users')
export class UsersController {
  constructor(
    private authService: AuthService,
    private adminService: AdminService,
    private superAdminService: SuperAdminService,
    // private superAdminCustomerService: SuperAdminCustomerService,
    private cloudinaryService: CloudinaryService,
    private employeeSuperAdminService: SuperAdminEmployeeService,
    private roleService: RolesService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  @hasRoles('admin', 'superadmin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createUserDto: CreateUserDto,
    @AuthUser() authUser,
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    const userRole = authUser && authUser.role.role; // Get Login User Role
    const createRole: any = createUserDto.role; // Get User Create Role
    // console.log(authUser, 'Req user customer');
    // Check If User is Admin role
    if (userRole === User_Role.Admin.name) {
      // const company = await this.customerService.findOneByAdmin(req.user.id); // Find company by login user
      // Check If login admin has company
      const userAdmin = await this.superAdminService.findOneById(authUser.id);
      // console.log(userAdmin, 'Admin User');
      // Check If login admin create user by  superadmin
      
      if (createRole === User_Role.SuperAdmin.id) {
        this.logger.warn(userLogs.adminCreateError()); // log error
        // Throw error if create user role admin or superadmin
        throw new BadRequestException([userLogs.adminCreateError()]);
      }

      // Create user company override with login admin company
      // createUserDto.customer = userAdmin.customer;
      // Check If profile image is empty or has value
      const profileImage = file
        ? await this.cloudinaryService.uploadImage(file)
        : { secure_url: '' };

      if (createRole === User_Role.Employee.id) {
        const employeeData = {
          name: createUserDto.name,
          email: createUserDto.email,
          role: '',
          gender: '',
          // customer: userAdmin.customer as string,
          password: '1111',
          createdBy: authUser.email,
          file: '',
        };
        // const addEmployee = await this.employeeSuperAdminService.create(
        //   employeeData,
        //   profileImage.secure_url,
        // );
      }

      // If all set create user successfully
      return this.authService.create(
        { ...createUserDto, createdBy: authUser.email },
      );
    } else {
      // Check If login user has role superadmin and (create user company null and role is employee or client)
      // if (
      //   createRole !== User_Role.Admin.id &&
      //   createUserDto.customer == (null || undefined) &&
      //   userRole === User_Role.SuperAdmin.name
      // ) {
      //   this.logger.warn(userLogs.superAdminWithoutCustomer()); // log error
      //   // Throw error If login user has role superadmin and (create user company null and role is employee or client)
      //   throw new BadRequestException([userLogs.superAdminWithoutCustomer()]);
      // }
      // Check if superadmin create superadmin
      if (createRole === User_Role.SuperAdmin.id) {
        this.logger.warn(userLogs.adminCreateError()); // log error
        // Throw error if create user role admin or superadmin
        throw new BadRequestException('Superadmin cannot create superadmin');
      }
      // Check If profile image is empty or has value
      const profileImage = file
        ? await this.cloudinaryService.uploadImage(file)
        : { secure_url: '' };

      // if (createRole === User_Role.Employee.id) {
      //   const employeeData = {
      //     name: createUserDto.name,
      //     email: createUserDto.email,
      //     role: '',
      //     gender: '',
      //     // customer: createUserDto.customer as string,
      //     password: '123',
      //     createdBy: authUser.email,
      //     file: '',
      //   };
      //   const addEmployee = await this.employeeSuperAdminService.create(
      //     employeeData,
      //     profileImage.secure_url,
      //   );
      // }

      // If all set and login user role superadmin
      return this.authService.create(
        { ...createUserDto, createdBy: authUser.email }
      );
    }
  }

  @hasRoles('admin', 'superadmin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  @ApiQuery({ name: 'search', required: false, type: String })
  @ApiQuery({ name: 'sortAttr', required: false, type: 'enum', enum: SortAttr })
  @ApiQuery({ name: 'sort', required: false, type: 'enum', enum:  Sort})
  async findAll(
    @AuthUser() authUser,
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    @Query('search') search?: string,
    @Query('sortAttr') sortAttr?: SortAttr,
    @Query('sort') sort?: Sort,
  ) {
    const userRole = authUser.role.role;
    // console.log(authUser.id, 'customerID');
 

    // const adminUser = filterUserField(
    //   await this.superAdminService.findOneById(authUser.id),
    // );
    // console.log(adminUser, 'Company as');
    // if (userRole === User_Role.Admin.name) {
    //   return await this.adminService.getAll(userRole,adminUser.customer as string, {
    //     limit,
    //     offset,
    //     search,
    //     sortAttr,
    //     sort,
    //   });
    // } else {
      return await this.superAdminService.getAll(userRole,{
        limit,
        offset,
        search,
        sortAttr,
        sort,
      });
    
  }

  @hasRoles('admin', 'superadmin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @AuthUser() authUser) {
    // console.log(isUUID(id), 'Validator');
    if (isUUID(id)) {
      // const userRole = authUser.role.role;
      // const adminUser = filterUserField(
      //   await this.superAdminService.findOneById(authUser.id),
      // );
      // if (userRole === User_Role.Admin.name) {
      //   if (adminUser) {
      //     return filterUserField(
      //       await this.adminService.findOneById(
      //         id,
      //         adminUser.customer as string,
      //       ),
      //     );
      //   } else {
      //     return 'No Company User Found';
      //   }
      // } 
      // else {
        // return await this.superAdminService.getOneById(id)
        // return filterUserField(await this.superAdminService.getOneById(id));
      // }
      return await this.superAdminService.getOneById2(id)
    } else {
      throw new BadRequestException(['ID must be a UUID.']);
    }
  }

  @hasRoles('admin', 'superadmin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @AuthUser() authUser,
  ) {
    if (isUUID(id)) {
      // const userRole = authUser.role.role;
      // const adminUser = filterUserField(
      //   await this.superAdminService.findOneById(authUser.id),
      // );
      // if (userRole === User_Role.Admin.name) {
      //   if (adminUser) {
          // return await this.adminService.updateUser(
          //   id,
          //   { ...updateUserDto, updatedBy: authUser.email },
          // )
            // adminUser.customer as string,
          // );
        // } else {
        //   return 'No Company User Found';
        // }
        return this.superAdminService.updateUser(id, {
          ...updateUserDto,
          updatedBy: authUser.email,
        });
      } 
      else {
      throw new BadRequestException(['ID must be a UUID.']);
       
      }
    } 
  

  @hasRoles('admin', 'superadmin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('delete/:id')
  async remove(@Param('id') id: string, @AuthUser() authUser) {
    // Check If id is valid UUID
    if (isUUID(id)) {
      // const userRole = authUser.role.role;
      // const company = await this.superAdminCustomerService.findOneByAdmin(id);
      // console.log(company, 'Find Company By Admin');
      // if (company) {
      //   // Delete id is admin in any company
      //   throw new BadRequestException([
      //     `This user is admin in company ${company.name}.`,
      //   ]);
      // } else {
        // if (userRole === User_Role.Admin.name) {
          // console.log(authUser, 'Auth User');
          // Check if login user is admin and find their company
          // const adminCompany = filterUserField(
          //   await this.superAdminService.findOneById(authUser.id),
          // );
          // console.log(adminCompany, 'Admin Company');
          // if (adminCompany) {
            // Find company user company id
            // const adminUser = await this.adminService.findOneById(
            //   id,
              // adminCompany.customer as string,
            // );

            // Check if login user is default admin in any company
            // if (adminUser) {
            //   const deleteUser = await this.superAdminService.deleteUser(id);
            //   return 'true';
            // } else {
            //   throw new BadRequestException(['No User Found.']);
            // }
          // } else {
          //   throw new BadRequestException([
          //     'Company default admin can delete user.',
          //   ]);
          // }
          const deleteUser = await this.superAdminService.deleteUser(id);
          return 'true';
        } else {
      throw new BadRequestException(['ID must be a UUID.']);
          
        }
      }
    
    }
