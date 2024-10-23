// import { BadRequestException, Inject, Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
// import { AuthService } from 'src/auth/auth.service';
// import { User_Role } from 'src/utils/roles';
// import { isUUID } from 'src/utils/validators/uuid.validator';
// import { Repository } from 'typeorm';
// import { Logger } from 'winston';
// import { CreateCustomerDto } from './dto/create-customer.dto';
// import { FindCustomerDto } from './dto/findById.dto';
// import { UpdateCustomerDto } from './dto/update-customer.dto';
// import { Customer } from './entity/customer.entity';
// import { ICusomterList, ICustomerAll, IPagination } from './model/customer.model';
// import { customerColumnsDefaultAdminSelectMap, customerColumnsSearchMap, customerRoleViseColumns, userRole } from './model/listColumns.model';

// abstract class CustomerService {
//   constructor(
//     protected customerRepository: Repository<Customer>,
//     @Inject(WINSTON_MODULE_PROVIDER) protected readonly logger: Logger,
//   ) {}

//   protected async createCustomer(
//     createCustomerDto: CreateCustomerDto,
//     userID: string,
//     image: string,
//     createdUser: string,
//   ) {
//     const customerFields = {
//       name: createCustomerDto.name,
//       email: createCustomerDto.email,
//       address: createCustomerDto.address,
//       contact: createCustomerDto.contact,
//       defaultAdmin: userID,
//       image: image,
//       createdBy: createdUser,
//     };
//     const newCustomer = this.customerRepository.create(customerFields);
//     return this.customerRepository.save(newCustomer);
//   }

//   protected async findOneByAdminID(adminID: string) {
//     console.log(adminID, 'ADmin ID');
//     const customer = await this.customerRepository.findOne({
//       relations: { defaultAdmin: true },
//       where: { defaultAdmin: { id: adminID } },
//     });
//     return customer;
//   }

//   protected async findAllCustomers(options: ICusomterList, role: userRole): Promise<ICustomerAll>  {
//     let limit = options.pagination.limit || 10;
//     let offset = options.pagination.offset || 0;
//     let sort = options.pagination.sort || 'DESC';
//     let sortAttr = options.pagination.sortAttr || 'createdAt';
//     let search = options.pagination.search || '';
//     console.log(sort, 'Sercice sort');
//     console.log(sortAttr, 'Sercice attr');
//     let query = this.customerRepository
//       .createQueryBuilder('customers')
//       .select(customerRoleViseColumns(role))
//       .leftJoin('customers.defaultAdmin', 'defaultAdmin')
//       .addSelect(customerColumnsDefaultAdminSelectMap)
//       .limit(limit)
//       .offset(offset)
//       .orderBy(`customers.${sortAttr}`, sort as 'ASC' | 'DESC')
//       customerColumnsSearchMap.map((el, i) => {
//         return query.orWhere(`customers.${el} ILike :searchTerm`, {
//           searchTerm: `%${search}%`,
//         });
//       });
//       // .where('customers.name ILike :searchTerm', {
//       //   searchTerm: `%${search}%`,
//       // })
//       // .orWhere('customers.email ILike :searchTerm', {
//       //   searchTerm: `%${search}%`,
//       // })
//       // .orWhere('customers.address ILike :searchTerm', {
//       //   searchTerm: `%${search}%`,
//       // })
//       // .orWhere('customers.contact ILike :searchTerm', {
//       //   searchTerm: `%${search}%`,
//       // });

    
    

//     const customers = await query.getRawMany();
//     const customerCount = await query.getCount();

//     return { data: customers, count: customerCount };
    

//   }

//   protected async findOneById(id: string, adminID?: string) {
//     console.log(id, 'Customer ID UUID CUStomer service');

//     let query = {
//       relations: ['defaultAdmin'],
//     };
//     if (adminID) {
//       query['where'] = { id, defaultAdmin: { id: adminID } };
//     } else {
//       query['where'] = { id };
//     }

//     const customer = await this.customerRepository.findOne(query);
//     return customer;
//   }
//   protected async findOneById2(id: string) {
//     console.log(id, 'Customer ID UUID CUStomer service');

//     // let query = {
//     //   relations: ['defaultAdmin'],
//     // };
//     // if (adminID) {
//     //   query['where'] = { id, defaultAdmin: { id: adminID } };
//     // } else {
//     //   query['where'] = { id };
//     // }

//     const customer = await this.customerRepository.findOne({where:{id}});
//     return customer;
//   }

//   protected async updateCustomer(
//     id: string,
//     updateCustomerDto: UpdateCustomerDto,
//   ) {
//     const updateCustomer = await this.customerRepository.update(
//       id,
//       updateCustomerDto,
//     );
//     return await this.customerRepository.findOneOrFail({ where: { id: id } });
//   }

//   protected async deleteCustomer(id: string) {
//     const deleteCus = await this.customerRepository.softDelete(id);
//     return deleteCus;
//   }
// }

// @Injectable()
// export class SuperAdminCustomerService extends CustomerService {
//   constructor(
//     @InjectRepository(Customer)
//     protected readonly customerRepository: Repository<Customer>,
//     @Inject(WINSTON_MODULE_PROVIDER) protected readonly logger: Logger,
//   ) {
//     super(customerRepository, logger);
//   }

//   async create(
//     createCustomerDto: CreateCustomerDto,
//     userID: string,
//     image: string,
//     createdUser: string,
//   ) {
//     return super.createCustomer(createCustomerDto, userID, image, createdUser);
//   }

//   async findOneByAdmin(adminID: string) {
//     return super.findOneByAdminID(adminID);
//   }

//   async findAll(role: userRole, pagination?: IPagination):Promise<ICustomerAll> {
//     return super.findAllCustomers({pagination}, role);
//   }

//   async findOne(adminID: string) {
//     return super.findOneById(adminID);
//   }
//  findOneById2(id: string){
//     return this.findOneById2(id)
//   }

//   async update(id: string, updateCustomerDto: UpdateCustomerDto) {
//     return super.updateCustomer(id, updateCustomerDto);
//   }

//   async delete(id: string) {
//     return super.deleteCustomer(id);
//   }
// }

// @Injectable()
// export class AdminCustomerService extends CustomerService {
//   constructor(
//     @InjectRepository(Customer)
//     protected readonly customerRepository: Repository<Customer>,
//     @Inject(WINSTON_MODULE_PROVIDER) protected readonly logger: Logger,
//   ) {
//     super(customerRepository, logger);
//   }

//   async findOne(id: string, adminID: string) {
//     return super.findOneById(id, adminID);
//   }

//   async update(id: string, updateCustomerDto: UpdateCustomerDto) {
//     return super.updateCustomer(id, updateCustomerDto);
//   }
// }
