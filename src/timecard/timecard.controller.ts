import { BadRequestException, Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { isUUID } from 'class-validator';
import { hasRoles } from 'src/auth/decorators/role.decorators';
import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { CreateTimeCardBreakDto } from 'src/time-card_break/dto/createTimeCardBreak.dto';
import { CreateTimeCardDto } from './dto/createTimeCard.dto';
import { UpdateTimeCardDto } from './dto/updateTimeCard.dto';
import { Sort, SortAttr } from './model/timecard.model';
import { TimecardService } from './timecard.service';

@ApiTags('Timecard')
@ApiBearerAuth('defaultBearerAuth')
@Controller('timecard')
export class TimecardController {
    constructor(
        private timeCardService: TimecardService,
    ){}

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiQuery({ name: 'limit', required: false, type: Number })
    @ApiQuery({ name: 'offset', required: false, type: Number })
    @ApiQuery({ name: 'search', required: false, type: String })
    @ApiQuery({ name: 'sortAttr', required: false, type: 'enum', enum : SortAttr })
    @ApiQuery({ name: 'sort', required: false, type: 'enum', enum : Sort })
    @ApiQuery({ name: 'fromDate', required: false, type: Date})
    @ApiQuery({ name: 'toDate', required: false, type: Date})
    
    async getAll(
        @Query('limit') limit?:number,
        @Query('offset') offset?:number,
        @Query('search') search?:string,
        @Query('sortAttr') sortAttr?: SortAttr,
        @Query('sort') sort?: Sort,
        @Query('fromDate') fromDate?: Date,
        @Query('toDate') toDate?: Date
    ){
        return await this.timeCardService.getAll({
            limit,
            offset,
            search,
            sortAttr,
            sort
        },{fromDate,toDate});
    }

    @UseGuards(JwtAuthGuard)
    @Get('employee/:id')
    async getTimeCardByEmployeeId(
        @Param('id') id: string
    ){
        if(isUUID(id)){
            return await this.timeCardService.getTimeCardByEmployee(id)
        } else {
            throw new BadRequestException(['ID must be a uuid']) 
        }
    }
    
    // @Get(':id')
    // async getEmployeesByCrewId(id:string){
    //     return await this.timeCardService.getEmployees()
    // }

    @UseGuards(JwtAuthGuard)
    @Post()
    async create(
        @Body() createTimeCardDto:CreateTimeCardDto
    ){
        return await this.timeCardService.createTimeCard(createTimeCardDto)
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(
        @Param('id') id:string,
        @Body() updateTimeCardDto:UpdateTimeCardDto
    ){
        if(isUUID(id)){
            return await this.timeCardService.updateCard(id, updateTimeCardDto)
        } else {
            throw new BadRequestException(['ID must be a uuid']) 
        }
    }

    @Put('delete/:id')
    async delete(
        @Param('id') id:string
    ){
        if(isUUID(id)){
            return await this.timeCardService.deleteCard(id)
        } else {
            throw new BadRequestException(['ID must be a uuid']) 
        }
    }
   
}
