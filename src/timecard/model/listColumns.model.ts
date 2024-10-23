import { TimeCardFields } from "./timecard.model";

let TimeCardColumnSearch:TimeCardFields[] = ['break','client','crew','dayStartedAt','employees','lunchIn','returnFromLunch','timeIn','timeOut']
let EmployeeColumnSearch = ['firstName']
let RanchColumnSearch = ['name']
let JobColumnSearch = ['name']
let CrewColumnSearch = ['name']
let ClientColumnSearch = ['fullName']

export const TimeCardColumnSearchMap = TimeCardColumnSearch.map((el)=>{
    return `${el}`;
})
export const EmployeeColumnSearchMap = EmployeeColumnSearch.map((el)=>{
    return  `${el}`
})
export const RanchColumnSearchMap = RanchColumnSearch.map((el)=>{
    return `${el}`;
})
export const JobColumnSearchMap = JobColumnSearch.map((el)=>{
    return `${el}`;
})
export const CrewColumnSearchMap = CrewColumnSearch.map((el)=>{
    return `${el}`;
})
export const ClientColumnSearchMap = ClientColumnSearch.map((el)=>{
    return `${el}`;
})
