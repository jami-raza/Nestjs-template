import { Body, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Repository } from 'typeorm';
import { Logger } from 'winston';
import { CreateTimeCardBreakDto } from './dto/createTimeCardBreak.dto';
import { TimeCardBreak } from './entity/time-card_break.entity';

@Injectable()
export class TimeCardBreakService {
    constructor(
        @InjectRepository(TimeCardBreak)
        protected readonly timeCardBreakRepository: Repository<TimeCardBreak>,
        @Inject(WINSTON_MODULE_PROVIDER) protected readonly logger: Logger
    ){}

    async createBreak( createTimeCardBreakDto: CreateTimeCardBreakDto){
        const timeCardBreak = this.timeCardBreakRepository.create(createTimeCardBreakDto)
        return await this.timeCardBreakRepository.save(timeCardBreak)
    }

    async findBreakesByCardid(cardId:string){
        return await this.timeCardBreakRepository.findOne({where:{timeCard:{id:cardId}}})
    }
    async updateBreak(id:string, Break:any){
        return await this.timeCardBreakRepository.update(id, Break)
    }
    // async deleteBreakes(breakId:string){
    //     return await this.timeCardBreakRepository.softDelete(breakId)
    // }
}
