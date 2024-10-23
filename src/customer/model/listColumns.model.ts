// import { Role } from 'src/roles/entity/role.entity';
// import { IRole } from 'src/roles/model/role.model';
// import { IUser } from 'src/users/model/user.model';
// import { ICustomer, CustomerFeilds } from './customer.model';

// export type userRole = 'superadmin' | 'admin' | 'employee' | 'client';

// /**
//  * @param role: Enum of User Role
//  * @param description: Select List of columns via role wise.
//  */

// export const customerRoleViseColumns = (role: userRole) => { 
//   console.log(role, 'User role Customer');
//   let customerCommonColumns: ICustomer[] = [
//     { id: 'customer_id' },
//     { name: 'customerName' },
//     { email: 'email' },
//     {address: 'address' },
//   ];
//   let customerSuperAdminColumns: ICustomer[] = [
//     { createdAt: 'created_at' },
//     { createdBy: 'created_by' },
//   ];
//   let customerAdminCoumns: ICustomer[] = [
//     { updatedAt: 'updated_at' },
//     { updatedBy: 'updated_by' },
//   ];
//   let customerEmployeeColumns: ICustomer[] = [];
//   let customerClientColumns: ICustomer[] = [];

//   if (role === 'superadmin') {
//     const mergeArr = [...customerCommonColumns, ...customerSuperAdminColumns];
//     const columns = mergeArr.map((el, i) => {
//       return `customers.${Object.keys(el)} AS ${Object.values(el)}`;
//     });
//     return columns;
//   } else if (role === 'admin') {
//     const mergeArr = [...customerCommonColumns, ...customerAdminCoumns];
//     const columns = mergeArr.map((el, i) => {
//       return `customers.${Object.keys(el)} AS ${Object.values(el)}`;
//     });
//     return columns;
//   } else if (role === 'employee') {
//     const mergeArr = [...customerCommonColumns, ...customerEmployeeColumns];
//     const columns = mergeArr.map((el, i) => {
//       return `customers.${Object.keys(el)} AS ${Object.values(el)}`;
//     });
//     return columns;
//   } else if (role === 'client') {
//     const mergeArr = [...customerCommonColumns, ...customerClientColumns];
//     const columns = mergeArr.map((el, i) => {
//       return `customers.${Object.keys(el)} AS ${Object.values(el)}`;
//     });
//     return columns;
//   }
// };

// /**
//  *
//  * @param description: Select List of customer default admin columns.
//  */

// let customerColumnsDefaultAdminSelect: IUser[] = [
//   { name: 'admin_name' },
//   { email: 'admin_email' },
// ];


// /**
//  *
//  * @param description: Select List of customer search columns.
//  */

// let customerColumnsSearch: CustomerFeilds[] = ['email', 'name', 'address'];

// /**
//  *
//  * @param description: Select List of customer customer columns function.
//  * @param return: customer.customerfield AS alias.
//  */

// export const customerColumnsDefaultAdminSelectMap =
// customerColumnsDefaultAdminSelect.map((el, i) => {
//     return `defaultAdmin.${Object.keys(el)} AS ${Object.values(el)}`;
//   });



// /**
//  *
//  * @param description: Select List of customer search columns function.
//  * @param return: search field.
//  */

// export const customerColumnsSearchMap = customerColumnsSearch.map((el, i) => {
//   return `${el}`;
// });
