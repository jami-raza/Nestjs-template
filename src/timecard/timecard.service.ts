import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { CreateTimeCardBreakDto } from 'src/time-card_break/dto/createTimeCardBreak.dto';
import { TimeCardBreak } from 'src/time-card_break/entity/time-card_break.entity';
import { TimeCardBreakService } from 'src/time-card_break/time-card_break.service';
import { Brackets, Repository } from 'typeorm';
import { Logger } from 'winston';
import { CreateTimeCardDto } from './dto/createTimeCard.dto';
import { UpdateTimeCardDto } from './dto/updateTimeCard.dto';
import { Timecard } from './entity/timecard.entity';
import { ClientColumnSearchMap, CrewColumnSearchMap, EmployeeColumnSearchMap, JobColumnSearchMap, RanchColumnSearchMap, TimeCardColumnSearchMap } from './model/listColumns.model';
import { IFilters, IPagination, ITimeCardList } from './model/timecard.model';

@Injectable()
export class TimecardService {
    constructor(
        @InjectRepository(Timecard)
        protected timeCardRepository: Repository<Timecard>,
        protected timeCardBreakService: TimeCardBreakService,
        @Inject(WINSTON_MODULE_PROVIDER) protected readonly logger: Logger,
    ) { }
    async getAll(
        pagination: IPagination,
        filters: IFilters
    ) {
        let limit = pagination.limit || 10;
        let offset = pagination.offset || 0;
        let sort = pagination.sort || 'DESC';
        let sortAttr = pagination.sortAttr || 'lunchIn';
        let search = pagination.search || '';

        let query = this.timeCardRepository
            .createQueryBuilder("timecards")
            .limit(limit)
            .offset(offset)
            .orderBy(`timecards.${sortAttr}`, sort as 'ASC' | 'DESC')
            .leftJoinAndSelect("timecards.break", "break")
            .leftJoin("timecards.client", "client")
            .addSelect(["client.fullName", "client.id"])
            .leftJoin("timecards.job", "job")
            .addSelect(["job.name", "job.jobId"])
            .leftJoinAndSelect("timecards.employees", "employees")
            .leftJoin("timecards.ranch", "ranch")
            .addSelect(["ranch.name", "ranch.id"])
            .leftJoin("timecards.crew", "crew")
            .addSelect(["crew.name", "crew.id"])

        if (!isNaN(new Date(filters.fromDate).getTime()) &&
            isNaN(new Date(filters.toDate).getTime())
        ) {
            console.log("startDate")
            query.andWhere(`timecards.date > :fromDate`, {
                fromDate: new Date(filters.fromDate)
            })
        }

        else if (isNaN(new Date(filters.fromDate).getTime()) &&
            !isNaN(new Date(filters.toDate).getTime())
        ) {
            console.log("end Date")
            query.andWhere(`timecards.date < :toDate`, {
                toDate: new Date(filters.toDate)
            })
        }

        else if (!isNaN(new Date(filters.fromDate).getTime()) &&
            !isNaN(new Date(filters.toDate).getTime())
        ) {
            query.andWhere(`timecards.date > :fromDate`, {
                fromDate: new Date(filters.fromDate)
            })
            query.andWhere(`timecards.date < :toDate`, {
                toDate: new Date(filters.toDate)
            })
        }

        if (search) {

            query.andWhere(new Brackets((qb) => {
                EmployeeColumnSearchMap.map((el) => {
                    return qb.orWhere(`employees.${el} ILike :searchTerm`, {
                        searchTerm: `%${search.trim()}%`
                    })
                })
                RanchColumnSearchMap.map((el) => {
                    return qb.orWhere(`ranch.${el} ILike :searchTerm`, {
                        searchTerm: `%${search.trim()}%`
                    })

                })
                JobColumnSearchMap.map((el)=>{
                    return qb.orWhere(`job.${el} ILike :searchTerm`,{
                         searchTerm: `%${search.trim()}%`
                     })
                })
                TimeCardColumnSearchMap.map((el)=>{
                    return qb.orWhere(`CAST(timecards.${el} AS varchar) ILike :searchTerm`,{
                          searchTerm: `%${search.trim()}%`
                      })
                })
              CrewColumnSearchMap.map((el)=>{
                    return qb.orWhere(`crew.${el} ILike :searchTerm`,{
                         searchTerm: `%${search.trim()}%`
                })
                })

                ClientColumnSearchMap.map((el)=>{
                   return qb.orWhere(`client.${el} ILike :searchTerm`,{
                        searchTerm: `%${search.trim()}%`
                    })
            })

            }))

           

        }



       



        

       

        

        // {
        //     EmployeeColumnSearchMap.map((el)=>{
        //         return query.andWhere(`employees.${el} ILike :searchTerm`,{
        //             searchTerm: `%${search.trim()}%`
        //         })

        //     })

        //     RanchColumnSearchMap.map((el)=>{
        //         return query.andWhere(`ranch.${el} ILike :searchTerm`,{
        //             searchTerm: `%${search.trim()}%`
        //         })
        //     })

        // TimeCardColumnSearchMap.map((el)=>{
        //     return query.andWhere(`CAST(timecards.${el} AS varchar) ILike :searchTerm`,{
        //             searchTerm: `%${search.trim()}%`
        //         })
        // })

        // JobColumnSearchMap.map((el)=>{
        //     return query.orWhere(`job.${el} Ilike :searchTerm`,{
        //         searchTerm: `%${search.trim()}%`
        //     })
        // })

        // CrewColumnSearchMap.map((el)=>{
        //     return query.orWhere(`crew.${el} Ilike :searchTerm`,{
        //         searchTerm: `%${search.trim()}%`
        //     })
        // })

        // ClientColumnSearchMap.map((el)=>{
        //     return query.orWhere(`client.${el} Ilike :searchTerm`,{
        //         searchTerm: `%${search.trim()}%`
        //     })
        // })
        // }
        console.log(new Date(filters.fromDate))
        console.log(new Date(filters.toDate))


        // else if(isNaN(filters.fromDate.getTime()) &&
        //         isNaN(filters.toDate.getTime())
        // ){

        // }

        const timecard = await query.getRawMany()
        const timecardCount = await query.getCount()
        return { data: timecard, count: timecardCount }
    }

    async getTimeCardByEmployee(id: string) {
        let query = this.timeCardRepository
            .createQueryBuilder('timecards')
            .leftJoin("timecards.job", "job")
            .addSelect(["job.name", "job.id"])
            .leftJoin("timecards.client", "client")
            .addSelect(["client.fullName", "client.id"])
            .leftJoinAndSelect("timecards.employees", "employees")
            .leftJoin("timecards.ranch", "ranch")
            .addSelect(["ranch.name", "ranch.id"])
            .leftJoin("timecards.crew", "crew")
            .addSelect(["crew.name", "crew.id"])
            .leftJoinAndSelect("timecards.break", "break")
            .where("timecards.id = :id", { id: id })
        const timeCard = await query.getOne()
        return timeCard;
        // const check = await this.timeCardRepository.findOne({where:{employees:{id:id}}})
        // return check
    }


    async createTimeCard(createTimeCardDto: CreateTimeCardDto) {


        for (const iterator of createTimeCardDto.employees) {
            let query = {
                date: createTimeCardDto.date,
                crew: createTimeCardDto.crew,
                timeIn: createTimeCardDto.timeIn,
                timeOut: createTimeCardDto.timeOut,
                dayStartedAt: createTimeCardDto.dayStartedAt,
                lunchIn: createTimeCardDto.lunchIn,
                returnFromLunch: createTimeCardDto.returnFromLunch,
                client: createTimeCardDto.client,
                ranch: createTimeCardDto.ranch,
                job: createTimeCardDto.job,
                employees: iterator
            };
            const timeCard = this.timeCardRepository.create(query);
            // return await this.timeCardRepository.save(timeCard);
            const saveTimeCard = await this.timeCardRepository.save(timeCard);

            const Break = {
                timeCard: saveTimeCard.id,
                break1: createTimeCardDto.break1,
                returnFromBreak1: createTimeCardDto.returnFromBreak1,
                break2: createTimeCardDto.break2,
                returnFromBreak2: createTimeCardDto.returnFromBreak2,
                break3: createTimeCardDto.break3,
                returnFromBreak3: createTimeCardDto.returnFromBreak3,

            }
            const createTimeCardBreak = await this.timeCardBreakService.createBreak(Break)
            const updated = await this.timeCardRepository.update(saveTimeCard.id, { break: createTimeCardBreak.id })
        }
    }

    async updateCard(id: string, updateTimeCardDto: UpdateTimeCardDto) {
        for (const iterator of updateTimeCardDto.employees) {
            const updateDto = {
                date: updateTimeCardDto.date,
                crew: updateTimeCardDto.crew,
                timeIn: updateTimeCardDto.timeIn,
                timeOut: updateTimeCardDto.timeOut,
                dayStartedAt: updateTimeCardDto.dayStartedAt,
                lunchIn: updateTimeCardDto.lunchIn,
                returnFromLunch: updateTimeCardDto.returnFromLunch,
                client: updateTimeCardDto.client,
                ranch: updateTimeCardDto.ranch,
                job: updateTimeCardDto.job,
                employees: iterator
            }
            const findTimeCard = await this.timeCardRepository.findOne({ where: { id: id } })
            if (findTimeCard) {
                const updatedTimeCard = await this.timeCardRepository.update(id, updateDto)
                // return updatedTimeCard
            }

            const breakes = await this.timeCardBreakService.findBreakesByCardid(id);
            console.log(breakes);
            if (breakes) {
                // await this.timeCardBreakService.updateBreak(breakes.id,updateTimeCardBreak)
                const Break = {
                    // timeCard:findTimeCard.id,
                    break1: updateTimeCardDto.break1,
                    returnFromBreak1: updateTimeCardDto.returnFromBreak1,
                    break2: updateTimeCardDto.break2,
                    returnFromBreak2: updateTimeCardDto.returnFromBreak2,
                    break3: updateTimeCardDto.break3,
                    returnFromBreak3: updateTimeCardDto.returnFromBreak3,
                }
                return await this.timeCardBreakService.updateBreak(breakes.id, Break)
            }
        }
    }
    async deleteCard(id: string) {
        return await this.timeCardRepository.delete(id)
        // const timeCard = await this.timeCardRepository.findOne({where:{id}})
        // if(timeCard){
        //     const remove = await this.timeCardRepository.delete(id);
        //     return remove;
        // } else {
        //     console.log("not-found")
        // }

    }



}
