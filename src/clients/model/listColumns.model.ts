import { ClientFields, IClient } from "./client.model";
export const clientColumn = ()=>{

}
let clientColumnsSearch: ClientFields[] = ['email','userName','fullName','company','role']





export const clientColumnsSearchMap = clientColumnsSearch.map((el,i)=>{
    return `${el}`;
})
