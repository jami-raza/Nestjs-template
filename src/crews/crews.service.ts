import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Brackets, Repository } from 'typeorm';
import { Logger } from 'winston';
import { CreateCrewDto } from './dto/create-crew.dto';
import { Crew } from './entity/crew.entity';
import { SuperAdminCrewMemberService } from '../crew_members/crew_members.service';
import { UpdateCrewDTO } from './dto/update-crew.dto';
import { crewColumnsSearchMap, crewColumnsSupervisorSelectMap, crewRoleViseColumns, userRole } from './model/listColumns.model';
import { ICrewAll, ICrewList, IPagination } from './model/crew.model';
import { CrewMembers } from 'src/crew_members/entity/crew_member.entity';

abstract class CrewsService {
  constructor(
    protected crewRepository: Repository<Crew>,
    protected crewMemberService: SuperAdminCrewMemberService,
    @Inject(WINSTON_MODULE_PROVIDER) protected readonly logger: Logger,

  ) {}

  protected async createCrew(
    createCrewDTO: CreateCrewDto,
  ) {
    let query = {
      crewId: createCrewDTO.crewId, 
      name: createCrewDTO.name,
      client: createCrewDTO.client,
      supervisor: createCrewDTO.supervisor
    };
    // if (customerID) {
    //   query.customer = customerID;
    // }
    const crew = this.crewRepository.create(query);
     
    const saveCrew =  await this.crewRepository.save(crew);
    const crewMember = createCrewDTO.members.map((el)=>{
      return {
        crew: saveCrew.id,
        employee: el,
      }
    }) 
    const createCrewMember = await this.crewMemberService.createMany(crewMember) 
    return createCrewMember
  }

  

  protected async findOneBySupervisor(id: string) {
    return await this.crewRepository.findOne({
      relations: ['supervisor'],
      where: { supervisor: { id: id } },
    });
  }

  protected async findAllCrews(options: ICrewList): Promise<ICrewAll>{
    let limit = options.pagination.limit || 10;
    let offset = options.pagination.offset || 0;
    let sort = options.pagination.sort || 'DESC';
    let sortAttr = options.pagination.sortAttr || 'createdAt';
    let search = options.pagination.search || '';

    let query = this.crewRepository
      .createQueryBuilder('crews')
      .take(limit)
      .skip(offset)
      .orderBy(`crews.${sortAttr}`, sort as 'ASC' | 'DESC')
      // .select(crewRoleViseColumns(role))
      .leftJoin('crews.client', 'client')
      .addSelect('client.fullName')
      // .addSelect(crewColumnsCustomerSelectMap)
      .leftJoin('crews.supervisor', 'supervisor')
      .addSelect(['supervisor.firstName'])
      // .addSelect(crewColumnsSupervisorSelectMap)
      
      .leftJoin('crews.members', 'members')
      .addSelect(['members.id'])
      .leftJoin('members.employee','employee')
      .addSelect(['employee.firstName'])
      // .select([
      //   'crews.id AS id',
      //   'crews.crewId AS crewId',
      //   'crews.name AS name',
      //   'crews.status AS status',
      //   'crews.createdAt AS createdAt',
      //   'client.id AS clientId',
      //   'client.fullName AS clientName',
      //   'supervisor.id AS supervisorId',
      //   'supervisor.firstName AS supervisorName',
        
      // ])
      
      
    // if (options.customerId) {
    //   query.where("crews.client = :id", {id: options.customerId})
    //   query.andWhere(
    //     new Brackets((qb) => {
    //       crewColumnsSearchMap.map((el, i) => {
    //         return qb.orWhere(`crews.${el} ILike :searchTerm`, {
    //           searchTerm: `%${search}%`,
    //         });
    //       });
    //     }),
    //   );
    // } else{
      crewColumnsSearchMap.map((el, i) => {
        return query.orWhere(`crews.${el} ILike :searchTerm`,{
          searchTerm: `%${search.trim()}%`,
        });
      });

    const crews = await query.getMany();
    const crewCount = await query.getCount();

    return {data: crews, count: crewCount};
  }

  protected async findOneById(id: string) {
    let query = this.crewRepository
      .createQueryBuilder('crews')
      .leftJoin('crews.supervisor', 'supervisor')
      .addSelect(['supervisor.firstName','supervisor.id'])
      .leftJoinAndSelect('crews.client','client')
      // .leftJoinAndMapMany('crews.members',CrewMembers,'members','members.crew = crews.id')
      .leftJoinAndSelect('crews.members','members')
      .leftJoin('members.employee','employee')
      .addSelect(['employee.firstName','employee.id'])
      // .loadRelationCountAndMap('crews.members', 'crews.members')
      .where("crews.id = :id", {id: id})

    const crew = await query.getOne();
    return crew;
  }

  protected async findAllCrewMembers(id: string){
    let query = this.crewRepository
    .createQueryBuilder('crews')
    .leftJoinAndSelect('crews.members', 'members')
    .leftJoin('members.employee','employee')
    .addSelect(['employee.firstName','employee.id'])
    .where("crews.id = :id", {id: id})
  // if (customerID) {
  //   query.andWhere(qb => {
  //     qb.where("crews.client = :id", {id: customerID})
  //   })    //andWhere("crews.customer = :id", {id: customerID})
  // }
  const crewMembers = await query.getOne();

  return crewMembers;
  }


  protected async updateCrew(
    id: string,
    updateCrewDTO: UpdateCrewDTO,
    customerID?: string,
  ) {
    // let query = {
    //   relations: ['supervisor', 'customer']
    // }
    // if(customerID){
    //   query['where'] = {id, customer:{id: customerID}}
    // }else{
    //   query['where'] = {id}
    // }
    // const FindCrew = await this.crewRepository.findOne(query)
    // if(FindCrew){ 
    //   const updatedCrew = await this.crewRepository.update(id, updateCrewDTO);
    //   return updatedCrew
    //   // this.logger.info(userLogs.updated(updateUserDto.email)); // Log Info
    //   // return this.crewRepository.findOneOrFail(query);
    // }
  
    const FindCrew = await this.crewRepository.findOne({where:{id:id}});

    if(FindCrew){

      const members = await this.crewMemberService.findCrewMembersByCrewId(id)
      if(members.length>0){
        const memberIds = members.map(member => member.id)
        await this.crewMemberService.deleteCrewMembers(memberIds)
      }

      const membersOption = updateCrewDTO.members.map((el)=>{
        return{
          employee:el,
          crew: id
        }
      })

      const createCrewMembers = await this.crewMemberService.createMany(membersOption)
      
      const crewOption =  {
        name:updateCrewDTO.name,
        crewId:updateCrewDTO.crewId,
        client:updateCrewDTO.client,
        supervisor:updateCrewDTO.supervisor
      }

      const updatedCrew = await this.crewRepository.update(id,crewOption)
      return await this.crewRepository.findOneOrFail({where:{id:id}})
    }
     else{
      throw new BadRequestException(['No crew found'])
    }
  }

  protected async deleteCrew(id:string){
    return await this.crewRepository.softDelete(id)
  }
}

@Injectable()
export class SuperAdminCrewService extends CrewsService {
  constructor(
    @InjectRepository(Crew)
    protected readonly crewRepository: Repository<Crew>,
    protected crewMemberService: SuperAdminCrewMemberService,
    @Inject(WINSTON_MODULE_PROVIDER) protected readonly logger: Logger,
  ) {
    super(crewRepository,crewMemberService ,logger);
  }

  async create(createCrewDTO: CreateCrewDto) {
    return await super.createCrew(createCrewDTO);
  }

  async findBySupervisor(id: string) {
    return await super.findOneBySupervisor(id);
  }

  async findAll( pagination?: IPagination) {
    return await super.findAllCrews({pagination: pagination});
  }

  async findOne(id: string){
    return await super.findOneById(id)
  }
  
  async findCrewMembers(id: string){
    return await super.findAllCrewMembers(id);
  }

  async update(id: string,
    updateCrewDTO: UpdateCrewDTO){
      return await super.updateCrew(id, updateCrewDTO)
  }
  async deleteCrews(id:string){
    return await super.deleteCrew(id)
  }
}

@Injectable()
export class AdminCrewService extends CrewsService {
  constructor(
    @InjectRepository(Crew)
    protected readonly crewRepository: Repository<Crew>,
    protected crewMemberService: SuperAdminCrewMemberService,
    @Inject(WINSTON_MODULE_PROVIDER) protected readonly logger: Logger,
  ) {
    super(crewRepository,crewMemberService ,logger);
  }

  async create(createCrewDTO: CreateCrewDto) {
    return await super.createCrew(createCrewDTO);
  }

  async findBySupervisor(id: string) {
    return await super.findOneBySupervisor(id);
  }

  async findAll(role: userRole, pagination?: IPagination) {
    return await super.findAllCrews({
      // customerId: customerID, 
      pagination: pagination
    });
  }

  async findOne(id: string) {
    return await super.findOneById(id);
  }
  async findCrewMembers(id: string) {
    return await super.findAllCrewMembers(id);
  }

  async update(id: string,
    updateCrewDTO: UpdateCrewDTO,
    // customerID?: string
    ){
      return await super.updateCrew(id, updateCrewDTO)
  }
  
}
