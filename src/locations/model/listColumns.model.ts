import { LocationFields } from "./locations.model";

let locationColumnsSearch = ['fieldId', 'fieldName', 'commission', 'acres', 'crop'];
let locationRanchSearch = ['name']
let locationClientSearch = ['fullName']

export const locationColumnsSearchMap = locationColumnsSearch.map((el, i) => {
    return `${el}`
});
export const locationRanchSearchMap = locationRanchSearch.map((el, i) => {
    return `${el}`
});
export const locationClientSearchMap = locationClientSearch.map((el, i) => {
    return `${el}`
});