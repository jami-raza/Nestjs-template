import { RanchFields } from "./ranches.model";

let ranchColumnsSearch: RanchFields[] = ['name','ranchNumber'];


export const ranchColumnsSearchMap = ranchColumnsSearch.map((el,i)=>{
    return `${el}`
});