import { Employee } from '../entity/employee.entity';

export interface IEmployee {
  id?: string;
  empId?: number;
  company?: string;
  role?: string;
  firstName?: string;
  midName?: string;
  lastName?: string;
  gender?: string;
  hourlyRate?: number;
  dayStartedAt?: Date;
  period?: string;
  minWageRate?: number;
  overTime?: number;
  doubleTime?: number;
  mealTimeWageRate?: number;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
}

export interface IEmployeeAll {
  data: Employee[];
  count: number;
  message:string;
}

export enum Sort {
  ASC = 'ASC',
  DESC = 'DESC',
}
 
export enum SortAttr {
  id = 'id',
  empId = 'empId',
  company = 'company',
  role = 'role',
  firstName = 'firstName',
  midName = 'midName',
  lastName = 'lastName',
  gender = 'gender',
  hourlyRate = 'hourlyRate',
  dayStartedAt = 'dayStartedAt',
  period = 'period',
  minWageRate = 'minWageRate',
  overTime = 'overTime',
  doubleTime = 'doubleTime',
  mealTimeWageRate = 'mealTimeWageRate',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  deletedAt = 'deletedAt'

}

export interface IPagination {
  offset: number;
  limit: number;
  search: string;
  sortAttr: SortAttr;
  sort: Sort;
}

export interface IEmployeeList {
  customerId?: string;
  pagination: IPagination;
}

export type EmployeeFields =
  | 'id'
  | 'empId'
  | 'company'
  | 'role'
  | 'firstName'
  | 'midName'
  | 'lastName'
  | 'gender'
  | 'hourlyRate'
  | 'dayStartedAt'
  | 'period'
  | 'minWageRate'
  | 'overTime'
  | 'doubleTime'
  | 'mealTimeWageRate'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
  
