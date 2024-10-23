import { Role } from 'src/roles/entity/role.entity';
import { IRole } from 'src/roles/model/role.model';
import { IUser } from 'src/users/model/user.model';
import { ICrew, CrewFields } from './crew.model';

export type userRole = 'superadmin' | 'admin' | 'crew' | 'client';

/**
 * @param role: Enum of User Role
 * @param description: Select List of columns via role wise.
 */

export const crewRoleViseColumns = (role: userRole) => {
  
  let crewCommonColumns: ICrew[] = [
    { id: 'crew_id' },
    // { name: 'crewName' },
    
    
  ];
  let crewSuperAdminColumns: ICrew[] = [
    { createdAt: 'created_at' },
    // { createdBy: 'created_by' },
  ];
  // let crewAdminCoumns: ICrew[] = [
  //   { updatedAt: 'updated_at' },
  //   // { updatedBy: 'updated_by' },
  // ];
  let crewEmployeeColumns: ICrew[] = [];
  // let crewClientColumns: ICrew[] = [];

  if (role === 'superadmin') {
    const mergeArr = [...crewCommonColumns, ...crewSuperAdminColumns];
    const columns = mergeArr.map((el, i) => {
      return `crews.${Object.keys(el)} AS ${Object.values(el)}`;
    });
    return columns;
  } 
  // else if (role === 'admin') {
  //   const mergeArr = [...crewCommonColumns, ...crewAdminCoumns];
  //   const columns = mergeArr.map((el, i) => {
  //     return `crews.${Object.keys(el)} AS ${Object.values(el)}`;
  //   });
  //   return columns;
  // } else if (role === 'crew') {
  //   const mergeArr = [...crewCommonColumns, ...crewEmployeeColumns];
  //   const columns = mergeArr.map((el, i) => {
  //     return `crews.${Object.keys(el)} AS ${Object.values(el)}`;
  //   });
  //   return columns;
  // } else if (role === 'client') {
  //   const mergeArr = [...crewCommonColumns, ...crewClientColumns];
  //   const columns = mergeArr.map((el, i) => {
  //     return `crews.${Object.keys(el)} AS ${Object.values(el)}`;
  //   });
    // return columns;
  }




/**
 *
 * @param description: Select List of crew search columns.
 */

let crewColumnsSearch: CrewFields[] = ['name','crewId'];


/**
 *
 * @param description: Select List of user customer columns.
 */

 let crewColumnsSupervisorSelect: IUser[] = [
    { name: 'supervisor_name' },
    { email: 'supervisor_email' },
  ];




/**
 *
 * @param description: Select List of user customer columns.
 */

//  let crewColumnsCustomerSelect: ICustomer[] = [
//     { name: 'customername' },
//     { email: 'customer_email' },
//     { address: 'customer_address' },
//   ];




/**
 *
 * @param description: Select List of crew search columns function.
 * @param return: search field.
 */

export const crewColumnsSearchMap = crewColumnsSearch.map((el, i) => {
  return `${el}`;
});


/**
 *
 * @param description: Select List of user customer columns function.
 * @param return: customer.customerfield AS alias.
 */

//  export const crewColumnsCustomerSelectMap = crewColumnsCustomerSelect.map(
//     (el, i) => {
//       return `customer.${Object.keys(el)} AS ${Object.values(el)}`;
//     },
//   );


/**
 *
 * @param description: Select List of user customer columns function.
 * @param return: customer.customerfield AS alias.
 */

 export const crewColumnsSupervisorSelectMap = crewColumnsSupervisorSelect.map(
    (el, i) => {
      return `supervisor.${Object.keys(el)} AS ${Object.values(el)}`;
    },
  );