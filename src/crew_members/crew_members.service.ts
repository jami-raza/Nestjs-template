import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { In, Repository } from 'typeorm';
import { Logger } from 'winston';
import { CreateCrewMemberDto } from './dto/create_crewMember.dto';
import { CrewMembers } from './entity/crew_member.entity';

abstract class CrewMembersService {
  constructor(
    protected crewMemberRepository: Repository<CrewMembers>,
    @Inject(WINSTON_MODULE_PROVIDER) protected readonly logger: Logger,
  ) {}

  protected async createMembers(createCrewMembersDto: CreateCrewMemberDto[]) {
    const members = this.crewMemberRepository.create(createCrewMembersDto);
    return await this.crewMemberRepository.save(members);
  }

  protected async countByCustomer(id: string) {
    return await this.crewMemberRepository.count({
      relations: ['crew'],
      where: { crew: { id: id } },
    });
  }

  protected async findAllCrewMembers() {
    let query = this.crewMemberRepository
      .createQueryBuilder('crewMembers')
      .innerJoin('crewMembers.employee', 'employee')
      .innerJoin('crewMembers.crew', 'crew')
      // .innerJoin('crewMembers.name' , 'name')
      .addSelect(['crew.name'])
    const crewMembers = await query.getMany();
    return crewMembers;
  }
  protected async findAllCrewMembersByCrewId(id:string){
    let query = this.crewMemberRepository
    .createQueryBuilder('crewsMembers')
    .leftJoin('crewsMembers.crew', 'crew')
    .leftJoinAndSelect('crewsMembers.employee', 'employee')
    // .addSelect('crew.members')
    .where("crew.id = :id", {id: id})
  const crewMembers = await query.getMany();
  return crewMembers;
  }
  protected async checkCrewMembers(employeeIDS: string[]) {
    return await this.crewMemberRepository.find({
      relations:['employee'],
      
      where: { employee:{id: In(employeeIDS)} },

    });
  }
  protected async findOne(id: string){
    const deleteCrewMember =  await this.crewMemberRepository.softDelete(id);
    return deleteCrewMember;
  }

  protected async findMemberByCrew(id: string){
    return await this.crewMemberRepository.findOne({where:{employee:{id}}})
  }
  protected async findCrewMembersByCrewId(crewId: string){
    return await this.crewMemberRepository.find({where:{crew:{id:crewId}}})
  }
  protected async deleteCrewMember(crewId: string[]){
    return await this.crewMemberRepository.softDelete(crewId);
  }
  
  
}

@Injectable()
export class SuperAdminCrewMemberService extends CrewMembersService {
  constructor(
    @InjectRepository(CrewMembers)
    protected readonly crewMemberRepository: Repository<CrewMembers>,
    @Inject(WINSTON_MODULE_PROVIDER) protected readonly logger: Logger,
  ) {
    super(crewMemberRepository, logger);
  }

  async createMany(createCrewMembersDto: CreateCrewMemberDto[]) {
    return await super.createMembers(createCrewMembersDto);
  }

  async countMembers(id: string) {
    return await super.countByCustomer(id);
  }

  async findCrewMembers() {
    return await super.findAllCrewMembers();
  }

  async checkMembers(employeeIDS: string[]){
    return await super.checkCrewMembers(employeeIDS)
  }
  async findOne(id: string){
    return await super.findOne(id);
  }
  async findOneByCrewMember(id:string){
    return await super.findMemberByCrew(id)
  }
   async findCrewMembersByCrewId(crewId: string) {
    return await super.findCrewMembersByCrewId(crewId)
  }
  async findAllCrewMembersById(crewId:string){
    return await super.findAllCrewMembersByCrewId(crewId)
  }
  async deleteCrewMembers(id: string[]) {
    return await super.deleteCrewMember(id)
  }
  // async findMembers(id:string){
  //   return await super.findMembers(id)

  // }
 
}

@Injectable()
export class AdminCrewMemberService extends CrewMembersService {
  constructor(
    @InjectRepository(CrewMembers)
    protected readonly crewMemberRepository: Repository<CrewMembers>,
    @Inject(WINSTON_MODULE_PROVIDER) protected readonly logger: Logger,
  ) {
    super(crewMemberRepository, logger);
  }

  async createMany(createCrewMembersDto: CreateCrewMemberDto[]) {
    return await super.createMembers(createCrewMembersDto);
  }

  async countMembers(id: string) {
    return await super.countByCustomer(id);
  }

  async findCrewMembers() {
    return await super.findAllCrewMembers();
  }
  
}