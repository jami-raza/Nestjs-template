import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Repository } from 'typeorm';
import { Logger } from 'winston';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
// import { UpdateJobDto } from './dto/update-job.dto';
import { Job } from './entity/job.entity';
import { IJobList, IPagination } from './model/jobs.model';
import { jobsColumnsSearchMap } from './model/listColumns.model';

abstract class JobsService {
  constructor(
    protected jobRepository: Repository<Job>,
    @Inject(WINSTON_MODULE_PROVIDER) protected readonly logger: Logger,
  ) {}

  protected async createJob(createJobDto: CreateJobDto) {
    // if (customerID) {
    //   query.customer = customerID;
    // }
    const job = this.jobRepository.create(createJobDto);
    return await this.jobRepository.save(job);
  }

  protected async findAllJobs(
    options: IJobList
  ) {
    let limit = options.pagination.limit || 10;
    let offset = options.pagination.offset || 0;
    let sort = options.pagination.sort || 'DESC';
    let sortAttr = options.pagination.sortAttr || 'createdAt';
    let search = options.pagination.search || '';

    let query = this.jobRepository
      .createQueryBuilder('jobs')
      .limit(limit)
      .offset(offset)
      .orderBy(`jobs.${sortAttr}`, sort as 'ASC' |'DESC');

      jobsColumnsSearchMap.map((el, i) => {
        
        return query.orWhere(`CAST(jobs.${el} AS varchar) ILike :searchTerm`, {
          searchTerm: `%${search.trim()}%`,
        });
      });

    const jobs = await query.getMany();
    const jobsCount = await query.getCount();
    return {data: jobs, count: jobsCount};
  }

  protected async findOneById(id: string) {
    let query = this.jobRepository
      .createQueryBuilder('jobs')
      .where('jobs.id = :id', { id: id });
    
    const job = await query.getOne();

    return job;
  }

  protected async updateJob(id:string, updateJobDTO:UpdateJobDto){
    const findJob = await this.jobRepository.findOne({where:{id:id}})
    if(findJob){
      const updatedJob = await this.jobRepository.update(id,updateJobDTO)
      return await this.jobRepository.findOneOrFail({ where: { id: id } });

    } else {
      return new BadRequestException(['No jobs found'])
    }
  }

  protected async deleteJob(id:string){
    const removeJob = await this.jobRepository.softDelete(id);
    return removeJob
  }
  // protected async updateJob(
  //   id: string,
  //   updateJobDTO: UpdateJobDto,
  //   customerID?: string,
  // ) {
  //   let query = {
  //     relations: ['customer'],
  //   };
  //   if (customerID) {
  //     query['where'] = { id, customer: { id: customerID } };
  //   } else {
  //     query['where'] = { id };
  //   }
  //   const FindJob = await this.jobRepository.findOne(query);
  //   if (FindJob) {
  //     const updatedCrew = await this.jobRepository.update(id, updateJobDTO);
  //     // this.logger.info(userLogs.updated(updateUserDto.email)); // Log Info
  //     return this.jobRepository.findOneOrFail(query);
  //   } else {
  //     throw new BadRequestException(['No crew found']);
  //   }
  // }
}

@Injectable()
export class SuperAdminJobService extends JobsService {
  constructor(
    @InjectRepository(Job)
    protected readonly jobRepository: Repository<Job>,
    @Inject(WINSTON_MODULE_PROVIDER) protected readonly logger: Logger,
  ) {
    super(jobRepository, logger);
  }

  async create(createJobDto: CreateJobDto) {
    return await super.createJob(createJobDto);
  }

  async findAll(pagination?:IPagination) {
    return await super.findAllJobs({
      pagination:pagination
    });
  }

  async findOne(id: string) {
    return await super.findOneById(id);
  }

  async update(id:string, updateJobDTO:UpdateJobDto){
    return await super.updateJob(id,updateJobDTO)
  }

  async delete(id:string){
    return await super.deleteJob(id) 
  }
}

@Injectable()
export class AdminJobService extends JobsService {
  constructor(
    @InjectRepository(Job)
    protected readonly jobRepository: Repository<Job>,
    @Inject(WINSTON_MODULE_PROVIDER) protected readonly logger: Logger,
  ) {
    super(jobRepository, logger);
  }

  async create(createJobDto: CreateJobDto) {
    return await super.createJob(createJobDto);
  }

  async findAll(pagination?: IPagination) {
    return await super.findAllJobs({pagination:pagination});
  }

  async findOne(id: string) {
    return await super.findOneById(id);

  }

  
  // async update(id: string, updateJobDTO: UpdateJobDto) {
  //   return await super.updateJob(id, updateJobDTO);
  // }

}
