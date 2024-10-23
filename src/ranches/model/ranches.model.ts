export enum Sort {
    ASC = 'ASC',
    DESC = 'DESC'
}
export enum SortAttr {
    id = 'id',
    ranchNumber = 'ranchNumber',
    name = 'name',
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
export interface IRanchList{
    pagination:IPagination
}
export type RanchFields = 
| 'id'
| 'ranchNumber'
| 'name'
| 'createdAt'
| 'updatedAt'
| 'deletedAt'