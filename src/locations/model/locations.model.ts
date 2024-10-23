export enum Sort {
    ASC = 'ASC',
    DESC = 'DESC'
}
export enum SortAttr {
    id = 'id',
    ranchNumber = 'ranchNumber',
    fieldName = 'fieldName',
    fieldId = 'fieldId',
    crop = 'crop',
    commission = 'commission',
    acres = 'acres',
    ranch = 'ranch',
    client = 'client',
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
export interface ILocationList{
    pagination:IPagination
}
export type LocationFields = 
| 'id'
| 'fieldName'
| 'fieldId'
| 'crop'
| 'commission'
| 'acres'
| 'ranch'
| 'client'
| 'createdAt'
| 'updatedAt'
| 'deletedAt'