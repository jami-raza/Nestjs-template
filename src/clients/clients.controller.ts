import { BadRequestException, Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { isUUID } from 'class-validator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientStatus } from './dto/update-client-status.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Sort, SortAttr } from './model/client.model';

@Controller('clients')
export class ClientsController {
    constructor(
        private clientService: ClientsService,
    ){}
    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body() createClientDto:CreateClientDto,
    ){
        return await this.clientService.createClient(createClientDto)  

    }
    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiQuery({ name: 'offset', required: false, type: Number })
    @ApiQuery({ name: 'search', required: false, type: String })
    @ApiQuery({ name: 'sortAttr', required: false, type: 'enum', enum: SortAttr })
    @ApiQuery({ name: 'sort', required: false, type: 'enum', enum: Sort })
    async findAllClients(
        @Query('limit') limit?: number,
        @Query('offset') offset?: number,
        @Query('search') search?: string,
        @Query('sortAttr') sortAttr?: SortAttr,
        @Query('sort') sort?: Sort,

    ){
        return await this.clientService.getAll({
            limit,
            offset,
            search,
            sortAttr,
            sort,
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOneById(@Param('id') id:string){
        if(isUUID(id)){
            return await this.clientService.findOne(id)
        } else {
            throw new BadRequestException(['ID must be a UUID'])
        }
    
    }
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(
        @Param('id') id:string,
        @Body() updateClientDto: UpdateClientDto
    ){
        if(isUUID(id)){
            return this.clientService.updateClient(id, updateClientDto)
        } else{
            throw new BadRequestException(['ID must be a UUID'])
        } 
    }
    @UseGuards(JwtAuthGuard)
    @Put('delete/:id')
    async deleteClient(
        @Param('id') id: string
    ){
        
        if(isUUID(id)){
            return this.clientService.deleteClient(id)
        } else {
            throw new BadRequestException(['ID must be a UUID'])
        }

    }
    @UseGuards(JwtAuthGuard)
    @Put('status/:id')
    async updateStat(
        @Param('id') id: string ,
        @Body() updateStatusDTO:UpdateClientStatus
    ){
        if(isUUID(id)){
          await this.clientService.updateStatus(id,updateStatusDTO);
          return 'status updated successfully'
        } else {
            throw new BadRequestException(['ID must be a UUID'])
        }
    }
            
    
}
