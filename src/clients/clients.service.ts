import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { UpdateEmployeeDto } from 'src/employees/dto/updateEmployee.dto';
import { Repository } from 'typeorm';
import { Logger } from 'winston';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientStatus } from './dto/update-client-status.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entity/client.entity';
import { IClientAll, IClientList, IPagination } from './model/client.model';
import { clientColumnsSearchMap } from './model/listColumns.model';

@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(Client)
        protected readonly clientRepository: Repository<Client>,
        @Inject(WINSTON_MODULE_PROVIDER) protected readonly logger: Logger
        ){}

        async createClient(createClientDto: CreateClientDto){
            const clientData = {...createClientDto};
            const client = this.clientRepository.create(clientData)
            return this.clientRepository.save(client)
        }

        async findAll (options: IClientList): Promise<IClientAll>{
            let limit = options.pagination.limit || 10;
            let offset = options.pagination.offset || 0;
            let sort = options.pagination.sort || 'DESC';
            let sortAttr = options.pagination.sortAttr || 'createdAt';
            let search = options.pagination.search || '';

            let query = this.clientRepository
             .createQueryBuilder('clients')
             .limit(limit)
             .offset(offset)
             .orderBy(`clients.${sortAttr}`, sort as 'ASC'|'DESC');
            

             clientColumnsSearchMap.map((el,i)=>{
                return query.orWhere(`clients.${el} ILike :searchTerm`,{
                    searchTerm: `%${search.trim()}%`,
                });
             });

             const clients = await query.getRawMany();
             const clientCount = await query.getCount();
             return {data:clients , count: clientCount }

            }
            async getAll(pagination?: IPagination){
                return await this.findAll({pagination: pagination})
            }

            async findOne(id:string) {
                const findClient =  await this.clientRepository.findOne({where:{id}})
                if(findClient){
                    return findClient
                } else {
                    throw new BadRequestException(["No Client Found"])
                }
            }
            async updateClient(id:string, updateClientDto:UpdateClientDto){
                const updateDto = {
                    fullName: updateClientDto.fullName,
                    userName: updateClientDto.userName,
                    email: updateClientDto.email,
                    company: updateClientDto.company,
                    role:updateClientDto.role,
                    password: updateClientDto.password,
                    confirmPassword: updateClientDto.confirmPassword,
                    updatedAt: new Date()
                }
                const findClient = await this.clientRepository.findOne({where:{id}})
                if(findClient){
                    // findClient.updatedAt = new Date();
                const client = await this.clientRepository.update(id, updateDto)
                    
                return await this.clientRepository.findOneOrFail({where:{id:id}})
                }else{
                    return new BadRequestException(['No user found'])
                }
            }
            async deleteClient(id:string){
                return await this.clientRepository.softDelete(id)
            }

            async updateStatus(id:string, updateStatusDTO:UpdateClientStatus){
                const updateDto = {
                    status: updateStatusDTO.status
                }
                const findClient = await this.clientRepository.findOne({where:{id}})
                if(findClient){
                    return await this.clientRepository.update(id,updateDto)
                }else{
                    return new BadRequestException(['No user found'])
                }
            }
}