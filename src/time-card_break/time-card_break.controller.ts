import { Body, Controller, Post } from '@nestjs/common';
import { CreateTimeCardBreakDto } from './dto/createTimeCardBreak.dto';
import { TimeCardBreakService } from './time-card_break.service';

@Controller('time-card-break')
export class TimeCardBreakController {
    constructor(
        private timeCardBreakService: TimeCardBreakService,
    ){}
    // @Post()
    // async create(
    //     @Body() createTimeCardBreakDto: CreateTimeCardBreakDto,
    // ){
    //     return await this.timeCardBreakService.createBreak(createTimeCardBreakDto)
    // }

}
