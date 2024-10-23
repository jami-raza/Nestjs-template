import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Repository } from 'typeorm';
import { Logger } from 'winston';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
// import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './entity/location.entity';
import { locationClientSearchMap, locationColumnsSearchMap, locationRanchSearchMap } from './model/listColumns.model';
import { ILocationList, IPagination } from './model/locations.model';

abstract class LocationsService {
  constructor(
    protected locationRepository: Repository<Location>,
    @Inject(WINSTON_MODULE_PROVIDER) protected readonly logger: Logger,
  ) {}

  protected async createLocation(
    createLocationDto: CreateLocationDto,
    customerID?: string,
  ) {
    let query = createLocationDto;
    // if (customerID) {
    //   query.customer = customerID;
    // }
    const Location = this.locationRepository.create(query);
    return await this.locationRepository.save(Location);
  }

  protected async findAllLocations(
    options: ILocationList
  ) {
    let limit = options.pagination.limit || 10;
    let offset = options.pagination.offset || 0;
    let sort = options.pagination.sort || 'DESC';
    let sortAttr = options.pagination.sortAttr || 'createdAt';
    let search = options.pagination.search || '';

    let query = this.locationRepository
      .createQueryBuilder('locations')
      .limit(limit) 
      .offset(offset)
      .orderBy(`locations.${sortAttr}`, sort as 'ASC' | 'DESC')
      .leftJoin('locations.ranch','ranch')
      .addSelect(['ranch.name','ranch.id'])
      .leftJoin('locations.client', 'client')
      .addSelect(['client.fullName', 'client.id'])
      .select([
        'locations.id AS id',
        'locations.fieldId AS fieldId',
        'locations.fieldName AS fieldName',
        'locations.crop AS crop',
        'locations.commission AS commission',
        'locations.acres AS acres',
        'locations.createdAt AS createdAt',
        'locations.updatedAt AS updatedAt',
        'ranch.name AS ranch_name',
        'client.fullName AS clientName',
        'client.id AS client_id',

      ])
      // .innerJoin('locations.customer', 'customer')
      // .addSelect(['customer.name', 'customer.id']);

    // if (customerID) {
    //   query.where('locations.customer = :id', { id: customerID });
    // }
    locationColumnsSearchMap.map((el,i)=>{
     
      return query.orWhere(`locations.${el} ILike :searchTerm`, {
        searchTerm: `%${search}%`
      });
    });
    locationRanchSearchMap.map((el,i)=>{
     
      return query.orWhere(`ranch.${el} ILike :searchTerm`, {
        searchTerm: `%${search}%`
      });
    });
    locationClientSearchMap.map((el,i)=>{
     
      return query.orWhere(`client.${el} ILike :searchTerm`, {
        searchTerm: `%${search.trim()}%`
      });
    });
    const locations = await query.getRawMany();
    const locationCount = await query.getCount();
    return {data: locations, count: locationCount};
  }

  protected async findOneById(id: string) {
    let query = this.locationRepository
      .createQueryBuilder('locations')
      .leftJoinAndSelect('locations.client','client')
      // .innerJoin('locations.customer', 'customer')
      // .addSelect(['customer.name', 'customer.id'])
      .where('locations.id = :id', { id: id });
    // if (customerID) {
    //   query.andWhere('locations.customer = :customerId', { customerId: customerID })
    // }
    const Location = await query.getOne();

    return Location;
  }
  protected async updateLocation(id:string , updateLocationDTO:UpdateLocationDto){
    const updateDto = {
      ...updateLocationDTO,
      updatedAt: new Date()
    }
    const FindLocation = await this.locationRepository.findOne({where: {id:id}});
    if (FindLocation) {
      return await this.locationRepository.update(
        id,
        updateDto,
      );
  } else {
    return new BadRequestException(['No location found'])
  }
  }

  protected  async deleteLocation(id:string){
    const FindLocation = await this.locationRepository.findOne({where: {id:id}});
    if (FindLocation) {
      return await this.locationRepository.softDelete(id)
  } else {
    return new BadRequestException(['No location found'])
  }
  }
  // protected async updateJob(
  //   id: string,
  //   updateLocationDTO: UpdateLocationDto,
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
  //   const FindLocation = await this.locationRepository.findOne(query);
  //   if (FindLocation) {
  //     const updatedLocation = await this.locationRepository.update(
  //       id,
  //       updateLocationDTO,
  //     );
  //     // this.logger.info(userLogs.updated(updateUserDto.email)); // Log Info
  //     return this.locationRepository.findOneOrFail(query);
  //   } else {
  //     throw new BadRequestException(['No crew found']);
  //   }
  // }

}

@Injectable()
export class SuperAdminLocationService extends LocationsService {
  constructor(
    @InjectRepository(Location)
    protected readonly locationRepository: Repository<Location>,
    @Inject(WINSTON_MODULE_PROVIDER) protected readonly logger: Logger,
  ) {
    super(locationRepository, logger);
  }

  async create(createJobDto: CreateLocationDto) {
    return await super.createLocation(createJobDto);
  }

  async findAll(pagination?: IPagination) {
    return await super.findAllLocations({pagination:pagination});
  }

  async findOne(id: string) {
    return await super.findOneById(id);
  }
  async update(id:string, updateLocationDTO:UpdateLocationDto ){
    return await super.updateLocation(id, updateLocationDTO);
  }
  async delete(id:string){
    return await super.deleteLocation(id)
  }
  // async update(id: string, updateLocationDTO: UpdateLocationDto) {
  //   return await super.updateJob(id, updateLocationDTO);
  // }
}

@Injectable()
export class AdminLocationService extends LocationsService {
  constructor(
    @InjectRepository(Location)
    protected readonly jobRepository: Repository<Location>,
    @Inject(WINSTON_MODULE_PROVIDER) protected readonly logger: Logger,
  ) {
    super(jobRepository, logger);
  }

  async create(createLocationDto: CreateLocationDto) {
    return await super.createLocation(createLocationDto);
  }

  async findAll(pagination?:IPagination) {
    return await super.findAllLocations({pagination:pagination});
  }

  async findOne(id: string) {
    return await super.findOneById(id);
  }

  // async update(
  //   id: string,
  //   updateLocationDTO: UpdateLocationDto,
  //   // customerID: string,
  // ) {
  //   return await super.updateJob(id, updateLocationDTO);
  // }
}
