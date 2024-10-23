// import { Customer } from "src/customer/entity/customer.entity";
import { Employee } from "src/employees/entity/employee.entity";
import { User } from "src/entities";
import { Crew } from "../entity/crew.entity";


export const filterCrews = (crews: Crew[]) => {
    const filter =  crews.map((el) => {
        return{
            
            ...el,
            //changed .email to .id
            supervisor: el.supervisor ? (el.supervisor as Employee) : el.supervisor,
            // customer: el.customer ? (el.customer as Customer).id : el.customer
        }

    })
    
    return filter;
}

export const filterCrewField = (crew: Crew) => {
    if(crew){
        const crewF = crew;
    
    return {
        ...crewF,
        supervisor: crewF.supervisor ? (crewF.supervisor as Employee) : crewF.supervisor,
        // customer: crewF.customer ? (crewF.customer as Customer).id : crewF.customer
    }
    }
    
}