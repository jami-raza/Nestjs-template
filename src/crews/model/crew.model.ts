import { Crew } from '../entity/crew.entity';

export interface ICrew {
  id?: string;
  crewId?: string;
  client?: number;
  supervisor?: string;
  name?: string;
  members?:string[]
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  
}

export interface ICrewAll {
  data: Crew[];
  count: number;
}

export enum Sort {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum SortAttr {
  id = 'id',
  crewId = 'crewId',
  client = 'client',
  supervisor = 'supervisor',
  name = 'name',
  members='members',
  status = 'status',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  deletedAt = 'deletedAt',
}

export interface IPagination {
  offset: number;
  limit: number;
  search: string;
  sortAttr: SortAttr;
  sort: Sort;
}

export interface ICrewList {
  customerId?: string;
  pagination: IPagination;
}

export type CrewFields =
  | 'id'
  | 'crewId'
  | 'client'
  | 'supervisor'
  | 'name'
  | 'members'
  | 'status'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt';
  
