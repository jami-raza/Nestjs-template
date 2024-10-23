import { JobFields } from "./jobs.model"

let jobsColumnSearch:JobFields[] = ['name',"level", 'paytype']

export const jobsColumnsSearchMap = jobsColumnSearch.map((el)=>{
    return `${el}`;
})