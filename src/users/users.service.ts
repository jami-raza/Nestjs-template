import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';
import { Brackets, Repository } from 'typeorm';
import { from, map, Observable } from 'rxjs';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { userLogs } from 'src/utils/log-formatter/user.logs';
import { CreateAdminDto } from './dto/create-admin.dto';
import {
  ICusomterList,
  IPagination,
  IUser,
  IUserAll,
} from './model/user.model';
import {
  // userColumnsCustomerSelectMap,
  userRole,
  userRoleViseColumns,
  usersColumnsRoleSelectMap,
  usersColumnsSearchMap,
} from './model/listColumns.model';

abstract class UsersService {
  constructor(
    protected userRepository: Repository<User>,
    @Inject(WINSTON_MODULE_PROVIDER) protected readonly logger: Logger,
  ) {}
  create(createUserDto: CreateUserDto) {
    const userData = {  ...createUserDto };
    const newUser = this.userRepository.create(userData);
    return this.userRepository.save(newUser);
  }

  // createAdmin(createAdminDto: CreateAdminDto, file: string){
  //   const userData = {image: file, ...createAdminDto}
  //   const newUser = this.userRepository.create({role: createAdminDto.role});
  //   return this.userRepository.save(newUser);
  // }

  /**
   * Get all users
   * @param options
   * @returns
   */

  protected async findAll(
    options: ICusomterList,
    role: userRole,
  ): Promise<IUserAll> {
    let limit = options.pagination.limit || 10;
    let offset = options.pagination.offset || 0;
    let sort = options.pagination.sort || 'DESC';
    let sortAttr = options.pagination.sortAttr || 'createdAt';
    let search = options.pagination.search || '';
    // console.log(sort, 'Sercice sort');
    // console.log(sortAttr, 'Sercice attr');
    let query = this.userRepository
      .createQueryBuilder('users')
      .select(userRoleViseColumns(role))
      // .leftJoin('users.customer', 'customer')
      // .addSelect(userColumnsCustomerSelectMap)
      .leftJoin('users.role', 'role')
      .addSelect(usersColumnsRoleSelectMap)
      .limit(limit)
      .offset(offset)
      .orderBy(`users.${sortAttr}`, sort as 'ASC' | 'DESC');

    // if (options.customerId) {
    //   query.where(
    //     new Brackets((qb) => {
    //       qb.where('users.customer = :customerId', {
    //         customerId: options.customerId,
    //       });
    //     }),
    //   );
    //   query.andWhere(
    //     new Brackets((qb) => {
    //       usersColumnsSearchMap.map((el, i) => {
    //         return qb.orWhere(`users.${el} ILike :searchTerm`, {
    //           searchTerm: `%${search}%`,
    //         });
    //       });
          
    //     }),
    //   );
    // } else {
    //   usersColumnsSearchMap.map((el, i) => {
    //     return query.orWhere(`users.${el} ILike :searchTerm`, {
    //       searchTerm: `%${search}%`,
    //     });
    //   });
    // }

    usersColumnsSearchMap.map((el, i) => {
      return query.orWhere(`users.${el} ILike :searchTerm`, {
        searchTerm: `%${search}%`,
      });
    });

    const users = await query.getRawMany();
    const usersCount = await query.getCount();

    return { data: users, count: usersCount };
  }

  // Get Single User By ID
  /**
   * Get user by id
   * @param id
   * @returns
   */
  public findOne(id: string) {
    const resultUser = from(
      this.userRepository.findOne({ where: { id }, relations: ['role'] }),
    ).pipe(
      map((user: User) => {
        // console.log(user, 'Check');
        return user;
      }),
    );

    return resultUser;
  }

  /**
   * Get User By ID
   * @param id
   * @returns
   */

  public async findOneById(id: string)  {
    // console.log(id, 'Customer ID, Line Noe ');
    let query = {
      relations: ['role'],
    };
    // if (customerID) {
      // query['where'] = { id, customer: { id: customerID } };
    // } else {
    //   query['where'] = { id };
    // }
    const check = await this.userRepository.findOne({where: {id}});
    // console.log(check, 'Ceck');
    return check;
    
  }

  public async findOneById2(id: string)  {
    // console.log(id, 'Customer ID, Line Noe ');
    let query = {
      relations: ['role'],
    };
    // if (customerID) {
      // query['where'] = { id, customer: { id: customerID } };
    // } else {
    //   query['where'] = { id };
    // }
    const check = await this.userRepository.findOne({where: {id}});
    // console.log(check, 'Ceck');
    return check;
    
  }

  // protected async findAllByCustomer(id: string) {
  //   return await this.userRepository.find({
  //     relations: ['customer'],
  //     where: { customer: { id: id } },
  //   });
  // }

  /**
   * Update User
   * @param id
   * @param updateUserDto
   * @returns
   */

  protected async update(
    id: string,
    updateUserDto: UpdateUserDto,
    // customerID?: string,
  ) {
    let query = {
      relations: ['role', 'customer'],
    };
    // if (customerID) {
      // query['where'] = { id, customer: { id: customerID } };
    // } else {
    //   query['where'] = { id };
    // }
    const FindUser = await this.userRepository.findOne(query);
    if (FindUser) {
      const updatedUser = await this.userRepository.update(id, updateUserDto);
      this.logger.info(userLogs.updated(updateUserDto.email)); // Log Info
      return this.userRepository.findOneOrFail(query);
    } else {
      return new BadRequestException(['No user found']);
    }
  }

  /**
   * Find user by email address
   * @param email
   * @returns
   */

  public async findOneByEmail(email: string, role?: string): Promise<User> {
    let query = {
      relations: ['role'],
    };
    if (role) {
      query['where'] = { email: email, role: { role: role } };
    } else {
      query['where'] = { email: email };
    }
    return await this.userRepository.findOne(query);
  }

  /**
   * Soft delete user
   * @param id
   * @returns
   */

  protected async delete(id: string) {
    const deleteUser = await this.userRepository.softDelete(id);
    this.logger.info(userLogs.updated(id.toString())); // Log Info
    return deleteUser;
  }

  protected async updateRecoveryToken(userID: string, token: string) {
    const date = new Date();
    const newDate = date.setHours(date.getHours() + 1);

    return await this.userRepository.update(userID, {
      passwordResetToken: token,
      resetTokenExpiryAt: `${newDate}`,
    });
  }

  protected async updatedPassword(password: string, userID: string) {
    return await this.userRepository.update(userID, {
      password: password,
      resetTokenExpiryAt: '',
      passwordResetToken: '',
    });
  }
}

@Injectable()
export class SuperAdminService extends UsersService {
  constructor(
    @InjectRepository(User) protected readonly userRepository: Repository<User>,
    @Inject(WINSTON_MODULE_PROVIDER) protected readonly logger: Logger,
  ) {
    super(userRepository, logger);
  }

  /**
   * Get all users
   * @param pagination
   * @returns
   */

  getAll(role: userRole, pagination?: IPagination): Promise<IUserAll> {
    return super.findAll(
      {
        pagination: pagination,
      },
      role,
    );
  }

  /**
   * Get single user
   * @param id
   * @returns
   */
  getOne(id: string) {
    return super.findOne(id);
  }

  /**
   * Get user By ID
   * @param id
   * @returns
   */

  getOneById(id: string) {
    return super.findOneById(id);
  } 
  
  /**
  * Get user By ID
  * @param id
  * @returns
  */

 getOneById2(id: string) {
   return super.findOneById2(id);
 }

  /**
   * Get user by email
   * @param email
   * @returns
   */
  getOneByEmail(email: string) {
    return super.findOneByEmail(email);
  }

  /**
   * Create User
   * @param createUserDto
   * @returns
   */
  createUser(createUserDto: CreateUserDto) {
    return super.create(createUserDto);
  }

  /**
   * Create a new admin user
   * @param createAdminDto
   * @param file
   * @returns
   */

  // createAdmin(createAdminDto: CreateAdminDto, file: string) {
  //   return super.createAdmin(createAdminDto, file);
  // }

  /**
   * Update User
   * @param id
   * @param updateUserDto
   * @returns
   */
  updateUser(id: string, updateUserDto: UpdateUserDto) {
    return super.update(id, updateUserDto);
  }

  /**
   * Delete User
   * @param id
   */
  async deleteUser(id: string) {
    super.delete(id);
  }

  /**
   * Update User Password Reset Token
   */

  async updateToken(userID: string, token: string) {
    super.updateRecoveryToken(userID, token);
  }

  /**
   * Update User Password
   */

  async updatePass(password: string, userID: string) {
    super.updatedPassword(password, userID);
  }
}

@Injectable()
export class AdminService extends UsersService {
  constructor(
    @InjectRepository(User) protected readonly userRepository: Repository<User>,
    @Inject(WINSTON_MODULE_PROVIDER) protected readonly logger: Logger,
  ) {
    super(userRepository, logger);
  }

  /**
   * Get all users by specific admin or company
   * @param customerId
   * @param pagination
   * @returns
   */

  getAll(
    role: userRole,
    customerId: string,
    pagination?: IPagination,
  ): Promise<IUserAll> {
    return super.findAll(
      {
        customerId: customerId,
        pagination: pagination,
      },
      role,
    );
  }

  findOneById(id: string){
    return super.findOneById(id);
  }

  findOneByEmail(email: string, role: string): Promise<User> {
    return super.findOneByEmail(email, role);
  }

  updateUser(id: string, updateUserDto: UpdateUserDto) {
    return super.update(id, updateUserDto);
  }
}

@Injectable()
export class UserService extends UsersService {
  constructor(
    @InjectRepository(User) protected readonly userRepository: Repository<User>,
    @Inject(WINSTON_MODULE_PROVIDER) protected readonly logger: Logger,
  ) {
    super(userRepository, logger);
  }
}
