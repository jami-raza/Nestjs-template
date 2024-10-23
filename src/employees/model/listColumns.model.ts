// import { ICustomer } from 'src/customer/model/customer.model';
import { Role } from 'src/roles/entity/role.entity';
import { IRole } from 'src/roles/model/role.model';
import { IUser } from 'src/users/model/user.model';
import { IEmployee, EmployeeFields } from './employee.model';

 type userRole = 'superadmin' | 'admin' | 'employee' | 'client';

/**
 * @param role: Enum of User Role
 * @param description: Select List of columns via role wise.
 */

// export const employeeRoleViseColumns = (role: userRole) => {
  
//   let employeeCommonColumns: IEmployee[] = [
//     { id: 'employee_id' },
//     { empName: 'empName' },
//     { email: 'email' },
//     { role: 'role' },
    
//   ];
//   let employeeSuperAdminColumns: IEmployee[] = [
//     { createdAt: 'created_at' },
//     { createdBy: 'created_by' },
//   ];
//   let employeeAdminCoumns: IEmployee[] = [
//     { updatedAt: 'updated_at' },
//     { updatedBy: 'updated_by' },
//   ];
//   let employeeEmployeeColumns: IEmployee[] = [];
//   let employeeClientColumns: IEmployee[] = [];

//   if (role === 'superadmin') {
//     const mergeArr = [...employeeCommonColumns, ...employeeSuperAdminColumns];
//     const columns = mergeArr.map((el, i) => {
//       return `employees.${Object.keys(el)} AS ${Object.values(el)}`;
//     });
//     return columns;
//   } else if (role === 'admin') {
//     const mergeArr = [...employeeCommonColumns, ...employeeAdminCoumns];
//     const columns = mergeArr.map((el, i) => {
//       return `employees.${Object.keys(el)} AS ${Object.values(el)}`;
//     });
//     return columns;
//   } else if (role === 'employee') {
//     const mergeArr = [...employeeCommonColumns, ...employeeEmployeeColumns];
//     const columns = mergeArr.map((el, i) => {
//       return `employees.${Object.keys(el)} AS ${Object.values(el)}`;
//     });
//     return columns;
//   } else if (role === 'client') {
//     const mergeArr = [...employeeCommonColumns, ...employeeClientColumns];
//     const columns = mergeArr.map((el, i) => {
//       return `employees.${Object.keys(el)} AS ${Object.values(el)}`;
//     });
//     return columns;
//   }
// };



/**
 *
 * @param description: Select List of employee search columns.
 */

let employeeColumnsSearch: EmployeeFields[] = ['gender','lastName','midName','company','firstName','role','empId'];


/**
 *
 * @param description: Select List of user customer columns.
 */

//  let employeeColumnsCustomerSelect: ICustomer[] = [
//     { name: 'customername' },
//     { email: 'customer_email' },
//     { address: 'customer_address' },
//   ];


/**
 *
 * @param description: Select List of employee search columns function.
 * @param return: search field.
 */

export const employeeColumnsSearchMap = employeeColumnsSearch.map((el, i) => {
  return `${el}`;
});


/**
 *
 * @param description: Select List of user customer columns function.
 * @param return: customer.customerfield AS alias.
 */

//  export const employeeColumnsCustomerSelectMap = employeeColumnsCustomerSelect.map(
//     (el, i) => {
//       return `customer.${Object.keys(el)} AS ${Object.values(el)}`;
//     },
//   );