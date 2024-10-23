import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Brackets, Repository } from 'typeorm';
import { Logger } from 'winston';
import { CreateRanchDto } from './dto/create-ranch.dto';
import { UpdateRanchDTO } from './dto/update-ranch.dto';
// import { UpdateRanchDto } from './dto/update-ranch.dto';
import { Ranch } from './entity/ranch.entity';
import { ranchColumnsSearchMap } from './model/listColumns.model';
import { IPagination, IRanchList } from './model/ranches.model';

abstract class RanchesService {
  constructor(
    protected ranchRepository: Repository<Ranch>,
    @Inject(WINSTON_MODULE_PROVIDER) protected readonly logger: Logger,
  ) {}

  protected async createRanch(
    createRanchDto: CreateRanchDto,
    customerID?: string,
  ) {
    let query = createRanchDto;
    // if (customerID) {
    //   query.customer = customerID;
    // }
    const ranch = this.ranchRepository.create(query);
    return await this.ranchRepository.save(ranch);
  }

  protected async findAllRanches(
    options: IRanchList
  ) {
    let limit = options.pagination.limit || 10;
    let offset = options.pagination.offset || 0;
    let sort = options.pagination.sort || 'DESC';
    let sortAttr = options.pagination.sortAttr || 'createdAt';
    let search = options.pagination.search || '';

    let query = this.ranchRepository
      .createQueryBuilder('ranches')
      .limit(limit)
      .offset(offset)
      .orderBy(`ranches.${sortAttr}`, sort as 'ASC' | 'DESC')



      ranchColumnsSearchMap.map((el,i)=>{
        return query.orWhere(`ranches.${el} ILike :searchTerm`, {
          searchTerm: `%${search.trim()}%`
        });
      });

      const ranches = await query.getRawMany();
      const ranchCount = await query.getCount();
      
      return {data: ranches, count: ranchCount};
      // .innerJoin('ranches.customer', 'customer')
      // .addSelect(['customer.name', 'customer.id']);

    // if (customerID) {
    //   query.where('ranches.customer = :id', { id: customerID });
    // }
    
  }

  protected async findOneById(id: string) {
    // console.log(id, 'ID Ranch')
    let query = this.ranchRepository
      .createQueryBuilder('ranches')
      // .innerJoin('ranches.customer', 'customer')
      // .addSelect(['customer.name', 'customer.id'])
      .where('ranches.id = :id', { id: id })
      
    // if (customerID) {
    //   query.andWhere('ranches.customer = :customerId', { customerId: customerID })
      
    // }
    const ranch = await query.getOne();
    return ranch;
  }

  protected async updateRanch(id:string,updateRanchDTO:UpdateRanchDTO){
    const updateDto = {
      ranchNumber: updateRanchDTO.ranchNumber,
      name : updateRanchDTO.name,
      updatedAt: new Date()

    }
    const FindRanch = await this.ranchRepository.findOne({where:{id:id}})

    if(FindRanch){
      const ranch = await this.ranchRepository.update(id,updateDto)
      return await this.ranchRepository.findOneOrFail({where:{id:id}})
    } else {
      return new BadRequestException(['No ranch Found'])
    }
  }

  protected async deleteRanch(id:string){
    return await this.ranchRepository.softDelete(id)
  }

  // protected async updateJob(
  //   id: string,
  //   // updateRanchDTO: UpdateRanchDto,
  //   customerID?: string,
  // ) {
  //   let query = {
  //     relations: ['customer'],
  //   };
  //   // if (customerID) {
  //   //   query['where'] = { id, customer: { id: customerID } };
  //   // } else {
  //     query['where'] = { id };
  //   // }
  //   const FindRanch = await this.ranchRepository.findOne(query);
  //   if (FindRanch) {
  //     const updatedRanch = await this.ranchRepository.update(
  //       id,
  //       updateRanchDTO,
  //     );
  //     // this.logger.info(userLogs.updated(updateUserDto.email)); // Log Info
  //     return this.ranchRepository.findOneOrFail(query);
  //   } else {
  //     throw new BadRequestException(['No crew found']);
  //   }
  // }
}

@Injectable()
export class SuperAdminRanchService extends RanchesService {
  constructor(
    @InjectRepository(Ranch)
    protected readonly jobRepository: Repository<Ranch>,
    @Inject(WINSTON_MODULE_PROVIDER) protected readonly logger: Logger,
  ) {
    super(jobRepository, logger);
  }

  async create(createJobDto: CreateRanchDto) {
    return await super.createRanch(createJobDto);
  }

  async findAll(pagination?: IPagination) {
    return await super.findAllRanches({pagination:pagination});
  }

  async findOne(id: string) {
    return await super.findOneById(id);
  }

  async update(id:string, updateRanchDTO:UpdateRanchDTO){
    return await super.updateRanch(id,updateRanchDTO)

  } 

  async deleteRanches(id:string){
    return await super.deleteRanch(id)
  }

  // async update(id: string, updateRanchDTO: UpdateRanchDto) {
  //   return await super.updateJob(id, updateRanchDTO);
  // }
}

@Injectable()
export class AdminRanchService extends RanchesService {
  constructor(
    @InjectRepository(Ranch)
    protected readonly jobRepository: Repository<Ranch>,
    @Inject(WINSTON_MODULE_PROVIDER) protected readonly logger: Logger,
  ) {
    super(jobRepository, logger);
  }

  async create(createRanchDto: CreateRanchDto) {
    return await super.createRanch(createRanchDto);
  }

  async findAll(pagination?:IPagination) {
    return await super.findAllRanches({pagination:pagination});
  }

  async findOne(id: string) {
    // console.log(id, 'ID Ranch')
    return await super.findOneById(id);
  }

  // async update(id: string, updateRanchDTO: UpdateRanchDto) {
  //   return await super.updateJob(id, updateRanchDTO);
  // }
}
