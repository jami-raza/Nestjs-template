import { Status } from "src/utils/enums/status";
import { Client } from "../entity/client.entity";

export interface IClient {
    id?: string;
    fullName?: string;
    userName?: string;
    email?: string;
    company?: string;
    role?: string;
    password?: string;
    confirmPassword?: string;
    status?: Status;
    createdAt?: Date;
    updatedAt?: Date|null;
    deletedAt?: Date;
}
export interface IClientAll{
    data: Client[];
    count: number;
}
export enum Sort{
    ASC = 'ASC',
    DESC = 'DESC',
}

export enum SortAttr {
    id = 'id',
    fullName = 'fullName',
    userName = 'userName',
    email = 'email',
    company = 'company',
    role = 'role',
    password = 'password',
    confirmPassword = 'confirmPassword',
    status = 'status',
    createdAt = 'createdAt',
    updatedAt = 'updatedAt',
    deletedAt = 'deletedAt'
}
export interface IPagination{
  offset: number;
  limit: number;
  search: string;
  sortAttr: SortAttr;
  sort: Sort;
}

export interface IClientList {
    customerId?: string;
    pagination: IPagination;
}

export type ClientFields = 
| 'id'
| 'fullName'
| 'userName'
| 'email'
| 'company'
| 'role'
| 'password'
| 'confirmPassword'
| 'status'
| 'createdAt'
| 'updatedAt'
| 'deletedAt';