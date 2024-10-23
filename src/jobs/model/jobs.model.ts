import { Job } from "../entity/job.entity";

export interface IJobAll {
    data: Job[];
    count: number;
  }
  
  export enum Sort {
    ASC = 'ASC',
    DESC = 'DESC'
  }
  
  export enum SortAttr {
        id= "id",
        jobId= "jobId",
        name= "name",
        level = "level",
        commission = "commission",
        rate = "rate",
        paytype = "paytype",
        createdAt= "createdAt",
        updatedAt= "updatedAt",
        deletedAt= "deletedAt",
  }
  
  export interface IPagination {
    offset: number;
    limit: number;
    search: string;
    sortAttr: SortAttr;
    sort: Sort;
  }
  
  export interface IJobList {
    pagination: IPagination;
  }
  
  export type JobFields =
  | 'id'
  | 'jobId'
  | 'name'
  | 'level'
  | 'commission'
  | 'rate'
  | 'paytype'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'