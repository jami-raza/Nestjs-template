// import { Customer } from "src/customer/entity/customer.entity";
import { Role } from "src/roles/entity/role.entity";
import { User } from "../entity/user.entity";

export const filterUsers = (users: User[]) => {
    const filter =  users.map(({password,...el}) => {
        return{
            
            ...el,
            role: el.role.role,
            // customer: el.customer ? (el.customer as Customer).id : el.customer
        }

    })
    
    return filter;
}

export const filterUserField = (user: User) => {
    if(user){
        const userF = user;
    delete userF.password;
    return {
        ...userF,
        role: userF.role.role,
        // customer: userF.customer ? (userF.customer as Customer).id : userF.customer
    }
    }
    
}