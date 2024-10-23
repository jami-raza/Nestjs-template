import { Timecard } from "../entity/timecard.entity";

export interface ITimeCardAll {
    data: Timecard[];
    count: number
}

export enum Sort {
    ASC = 'ASC',
    DESC = 'DESC'
}

export enum SortAttr {
    id= 'id',
    date = 'date',
    crew = 'crew',
    timeIn = 'timeIn',
    timeOut = 'timeOut',
    dayStartedAt = 'dayStartedAt',
    lunchIn = 'lunchIn',
    returnFromLunch = 'returnFromLunch',
    client = 'client',
    ranch = 'ranch',
    employees = 'employees',
    break = 'break'
}

export interface IPagination {
    offset : number;
    limit : number;
    search : string;
    sortAttr: SortAttr;
    sort : Sort;
}

export interface IFilters {
    fromDate?: Date;
    toDate?: Date;
}

export interface ITimeCardList { 
    pagination : IPagination
}

export type TimeCardFields = 
| 'id'
| 'date'
| 'crew'
| 'timeIn'
| 'timeOut'
| 'dayStartedAt'
| 'lunchIn'
| 'returnFromLunch'
| 'client'
| 'ranch'
| 'employees'
| 'break'
