// import {
//   BadRequestException,
//   Body,
//   Controller,
//   Get,
//   Param,
//   Post,
//   Put,
//   Query,
//   UploadedFile,
//   UseGuards,
//   UseInterceptors,
//   UsePipes,
//   ValidationPipe,
// } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { ApiBearerAuth, ApiConsumes, ApiQuery, ApiTags } from '@nestjs/swagger';
// import { AuthService } from 'src/auth/auth.service';
// import { hasRoles } from 'src/auth/decorators/role.decorators';
// import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
// import { RolesGuard } from 'src/auth/guards/roles-guard';
// import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
// import { AuthUser } from 'src/users/decorator/get_token.decorator';
// import { UserRoleDto } from 'src/users/dto/user-role.dto';
// import { SuperAdminService } from 'src/users/users.service';
// import { filterUserField } from 'src/users/utils/filter_users';

// import { User_Role } from 'src/utils/roles';
// import { isUUID } from 'src/utils/validators/uuid.validator';
// import { SuperAdminCustomerService, AdminCustomerService } from './customer.service';
// import { CreateCustomerDto } from './dto/create-customer.dto';
// import { FindCustomerDto } from './dto/findById.dto';
// import { UpdateCustomerDto } from './dto/update-customer.dto';
// import { Sort, SortAttr } from './model/customer.model';
// import { filterCustomers } from './utils/format_customer';

// @ApiTags('Customers')
// @ApiBearerAuth('defaultBearerAuth')
// @Controller('customer')
// export class CustomerController {
//   constructor(
//     private readonly superAdminCustomerService: SuperAdminCustomerService,
//     private readonly adminCustomerService: AdminCustomerService,
//     private authService: AuthService,
//     private cloudinaryService: CloudinaryService,
//     private superAdminService: SuperAdminService,
//   ) {}

//   @hasRoles('superadmin')
//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Post()
//   @ApiConsumes('multipart/form-data')
//   @UseInterceptors(FileInterceptor('file'))
//   async create(
//     @Body() createCustomerDto: CreateCustomerDto,
//     @UploadedFile('file') file: Express.Multer.File,
//     @AuthUser() authUser,
//   ) {

//     const profileImage = file
//       ? await this.cloudinaryService.uploadImage(file)
//       : { secure_url: '' };
//     const adminFields = {
//       name: createCustomerDto.adminName,
//       email: createCustomerDto.adminEmail,
//       password: createCustomerDto.adminPassword,
//       customer: null,
//       createdBy: authUser.email,
//       file: '',
//       role: User_Role.Admin.id as UserRoleDto,
    
//     };

    
//     const createUser = await this.authService.create(
//       adminFields
//     );
//     const createdCustomer = await this.superAdminCustomerService.create(
//       createCustomerDto,
//       createUser.user.id,
//       profileImage.secure_url,
//       authUser.email
//     );
//     const updateAdmin = await this.superAdminService.updateUser(
//       createUser.user.id,
//       { customer: createdCustomer.id },
//     );

//     return createdCustomer;
//   }

//   @hasRoles('superadmin')
//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Get()
//   @ApiQuery({ name: 'limit', required: false, type: Number })
//   @ApiQuery({ name: 'offset', required: false, type: Number })
//   @ApiQuery({ name: 'search', required: false, type: String })
//   @ApiQuery({ name: 'sortAttr', required: false, type: 'enum', enum: SortAttr })
//   @ApiQuery({ name: 'sort', required: false, type: 'enum', enum:  Sort})
//   async findAll(
//     @AuthUser() authUser,
//     @Query('limit') limit?: number,
//     @Query('offset') offset?: number,
//     @Query('search') search?: string,
//     @Query('sortAttr') sortAttr?: SortAttr,
//     @Query('sort') sort?: Sort,
    
//   ) {
//     const customers = await this.superAdminCustomerService.findAll(authUser.role.role,{
//       limit,
//       offset,
//       search,
//       sortAttr,
//       sort,
//     })
//     return customers;
//   }


//   @hasRoles('superadmin')
//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Get('/findByAdmin/:adminId')
//   async findOne(@Param('adminId') adminId: string) {
//     console.log(adminId, 'ID');
//     return await this.superAdminCustomerService.findOneByAdmin(adminId);
//   }


//   @hasRoles('superadmin')
//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Get(':id')
//   async findOneById(@Param('id') id: string, @AuthUser() authUser) {
    
//     if (isUUID(id)) {
//       // const userRole = authUser.role.role;
//       // const adminUser = filterUserField(await this.superAdminService.findOneById(authUser.id))
//       // if (userRole === User_Role.Admin.name) {
//         // if (adminUser) {
//         //   return await this.adminCustomerService.findOne(adminUser.customer as string, adminUser.id )
//         // } else {
//         //   return 'No Company User Found';
//         // }
//       // } else {
//         return await this.superAdminCustomerService.findOne(id)
//       // }
//     } else {
//       throw new BadRequestException(['ID must be a UUID.']);
//     }
    
//   }

//   @hasRoles('admin', 'superadmin')
//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Put(':id')
//   async update(
//     @Param('id') id: string,
//     @Body() updateCustomerDto: UpdateCustomerDto,
//     @AuthUser() authUser,
//   ) {
//     const userRole = authUser.role.role;
    
//     if (userRole === User_Role.Admin.name) {
//       const companyID = await this.superAdminCustomerService.findOneByAdmin(authUser.id);
//       if(companyID){
//         return await this.superAdminCustomerService.update(companyID.id, updateCustomerDto)
//       }
//     } else {
//       return await this.superAdminCustomerService.update(id, updateCustomerDto)
//     }
//   }

//   @hasRoles('admin', 'superadmin')
//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Put('delete/:id')
//   async remove(@Param('id') id: string, @AuthUser() authUser) {
//     const userRole = authUser.role.role;
//     if (userRole === User_Role.Admin.name) {
//       const companyID = await this.superAdminCustomerService.findOneByAdmin(authUser.id);
//       if(companyID){
//         return await this.superAdminCustomerService.delete(companyID.id)
//       }
//     } else{
//       return await this.superAdminCustomerService.delete(id)
//     }
    
//   }
// }
