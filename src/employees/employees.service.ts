import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { MyGateway } from 'src/gateway/gateway';
import { Brackets, getRepository, In, Like, Repository } from 'typeorm';
import { Logger } from 'winston';
import { CreateEmployeeDto } from './dto/createEmployee.dto';
import { UpdateEmployeeDto } from './dto/updateEmployee.dto';
import { Employee } from './entity/employee.entity';
import {
  IEmployeeAll,
  IEmployeeList,
  IPagination,
} from './model/employee.model';
import {
  // employeeColumnsCustomerSelectMap,
  employeeColumnsSearchMap,
  // employeeRoleViseColumns,
  // userRole,
} from './model/listColumns.model';

@Injectable()
abstract class EmployeesService {
  constructor(
    protected employeeRepository: Repository<Employee>,
    @Inject(WINSTON_MODULE_PROVIDER) protected readonly logger: Logger,
    protected gateway: MyGateway
  ) {}

  protected async createEmployee(
    createEmployeeDto: CreateEmployeeDto,
  ) {
    const userData = { ...createEmployeeDto };
    const checkIfEmpIdexists = await this.employeeRepository.findOne({where:{empId:userData.empId}})
    if(checkIfEmpIdexists){
      throw new BadRequestException("Employee with this id already exists")
    } else{
      const employee = this.employeeRepository.create(userData);

     await this.employeeRepository.save(employee);
     this.gateway.onNewMessage("Employee created successfully");
    }
    
  }

  protected async findAll(
    options: IEmployeeList,
  ): Promise<IEmployeeAll> {
    let limit = options.pagination.limit || 10;
    let offset = options.pagination.offset || 0;
    let sort = options.pagination.sort || 'DESC';
    let sortAttr = options.pagination.sortAttr || 'createdAt';
    let search = options.pagination.search || '';
    
    let query = this.employeeRepository
      .createQueryBuilder('employees')
      .limit(limit)
      .offset(offset)
      .orderBy(`employees.${sortAttr}`, sort as 'ASC' | 'DESC');

    // if (options.customerId) {
    //   query.where(
    //     new Brackets((qb) => {
    //       qb.where('employees.customer = :customerId', {
    //         customerId: options.customerId,
    //       });
    //     }),
    //   );
    //   query.andWhere(
    //     new Brackets((qb) => {
    //       employeeColumnsSearchMap.map((el, i) => {
    //         return qb.orWhere(`employees.${el} ILike :searchTerm`, {
    //           searchTerm: `%${search}%`,
    //         });
    //       });
    //     }),
    //   );
    // } 
    // else {
      employeeColumnsSearchMap.map((el, i) => {
        return query.orWhere(`employees.${el} ILike :searchTerm`, {
          searchTerm: `%${search.trim()}%`,
        });
      });
    // }

    const eployees = await query.getRawMany();
    const employeeCount = await query.getCount();

    return { data: eployees, count: employeeCount , message: "employees fetched successfully" };
  }

  protected async findOneById(
    id: string,
  )/*: Promise<Employee>*/ {
    // console.log(id, 'Customer ID');
    // let query = {
    //   relations: ['customer'],
    // };
    // if (customerID) {
    //   query['where'] = { id, customer: { id: customerID } };
    // } 
    // else {
      // query['where'] = { id };
    // }
    const check = await this.employeeRepository.findOne({where:{id}});
    // console.log(check, 'Ceck');
    return check;
  }

  // protected async checkEmployeesByCustomer(IDS: string[]) {
  //   return await this.employeeRepository.find({
  //     relations: ['customer'],
  //     where: { id: In(IDS), customer: { id: customerID } },
  //   });
  // }

  async UpdateEmployee(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const FindEmployee = await this.employeeRepository.findOne({
      where: { id: id },
    });
    if (FindEmployee) {
      // console.log("created")

      const employee = this.employeeRepository.update(id, updateEmployeeDto);

       await this.employeeRepository.findOneOrFail({ where: { id: id } });
       this.gateway.onNewMessage("Employee updated successfully")
    } else {
      return new BadRequestException(['No user found']);
    }
  }

  async deleteEmp(id: string) {
    const deleteEmp = await this.employeeRepository.softDelete(id);
    return deleteEmp;
  }
  protected async findSupervisor(id:string){
    return await this.employeeRepository.findOne({where:{id}})
  }
  protected async findByMember(id: string){
    const found =  await  this.employeeRepository.exist({where:{id}})
      return found
    // if(found){
    //   return true
    // }
    // else{
    //   return false
    // }
  }
}

@Injectable()
export class SuperAdminEmployeeService extends EmployeesService {
  constructor(
    @InjectRepository(Employee)
    protected readonly userRepository: Repository<Employee>,
    @Inject(WINSTON_MODULE_PROVIDER) protected readonly logger: Logger,
    protected gateway: MyGateway
  ) {
    super(userRepository, logger, gateway );
  }

  async create(createEmployeeDto: CreateEmployeeDto) {

    return super.createEmployee(createEmployeeDto);
  }

  async getAll(pagination?:IPagination) /*: Promise<IEmployeeAll>*/ {
    return await super.findAll(
      {pagination:pagination}
      // {
      // }
      // role,
    );
  }

  getOne(id: string) {
    return super.findOneById(id);
  }

  
   findEmployeeByRole(role:string){
    const employeeByRole =  this.employeeRepository
    .createQueryBuilder("employee")
    .where("employee.role = :role", {role:role})
    .getMany()
    // const employeeByRole = await this.employeeRepository.find({where:[{role: Like(`%${role}%`)}]})
    if(employeeByRole){
      return employeeByRole;
    } else {
      throw new BadRequestException(['No Employee with given role found'])
    }
  }
  // async checkEmployees(ids: string[]) {
  //   return await super.checkEmployeesByCustomer(ids);
  // }
 async findByMember(id:string){
    return await super.findByMember(id)
  }
  async findSupervisor(id:string){
    return await super.findSupervisor(id)
  }
  async deleteEmployee(id:string){
    return await super.deleteEmp(id)
  }
  
}

@Injectable()
export class AdminEmployeeService extends EmployeesService {
  constructor(
    @InjectRepository(Employee)
    protected readonly userRepository: Repository<Employee>,
    @Inject(WINSTON_MODULE_PROVIDER) protected readonly logger: Logger,
    protected gateway : MyGateway
  ) {
    super(userRepository, logger, gateway);
  }

  async create(createEmployeeDto: CreateEmployeeDto) {
    return super.createEmployee(createEmployeeDto);
  }

  getAll(
    // role: userRole,
    pagination?: IPagination,
  ): Promise<IEmployeeAll> {
    return super.findAll(
      {
        pagination,
      },
      // role,
    );
  }

  getOne(id: string) {
    return super.findOneById(id);
  }
}
