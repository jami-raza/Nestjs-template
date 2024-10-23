import { User } from '../entity/user.entity';

export interface IUser {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  passwordResetToken?: string;
  resetTokenExpiryAt?: string;
  hasLoggedIn?: string;
  lastLoggedIn?: string;
  status?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
}

export interface IUserAll {
  data: User[];
  count: number;
}

export enum Sort {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum SortAttr {
  id = 'id',
  name = 'name',
  email = 'email',
  hasLoggedIn = 'hasLoggedIn',
  lastLoggedIn = 'lastLoggedIn',
  status = 'status',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  deletedAt = 'deletedAt',
  createdBy = 'createdBy',
  updatedBy = 'updatedBy',
  deletedBy = 'deletedBy',
}

export interface IPagination {
  offset: number;
  limit: number;
  search: string;
  sortAttr: SortAttr;
  sort: Sort;
}

export interface ICusomterList {
  customerId?: string;
  pagination: IPagination;
}

export enum EnumUserFeilds {
  id = 'id',
  name = 'name',
  email = 'email',
  password = 'password',
  passwordResetToken = 'passwordResetToken',
  resetTokenExpiryAt = 'resetTokenExpiryAt',
  hasLoggedIn = 'hasLoggedIn',
  lastLoggedIn = 'lastLoggedIn',
  status = 'status',
  image = 'image',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  deletedAt = 'deletedAt',
  createdBy = 'createdBy',
  updatedBy = 'updatedBy',
  deletedBy = 'deletedBy',
}

export type UserFeilds =
  | 'id'
  | 'name'
  | 'email'
  | 'password'
  | 'passwordResetToken'
  | 'resetTokenExpiryAt'
  | 'hasLoggedIn'
  | 'lastLoggedIn'
  | 'status'
  | 'image'
  | 'createdAt'
  | 'updatedAt'
  | 'deletedAt'
  | 'createdBy'
  | 'updatedBy'
  | 'deletedBy';
