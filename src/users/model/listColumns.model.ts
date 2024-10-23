// import { ICustomer } from 'src/customer/model/customer.model';
import { Role } from 'src/roles/entity/role.entity';
import { IRole } from 'src/roles/model/role.model';
import { IUser, UserFeilds } from './user.model';

export type userRole = 'superadmin' | 'admin' | 'employee' | 'client';

/**
 * @param role: Enum of User Role
 * @param description: Select List of columns via role wise.
 */

export const userRoleViseColumns = (role: userRole) => {
  let userCommonColumns: IUser[] = [
    { id: 'user_id' },
    { name: 'userName' },
    { email: 'email' },
    { hasLoggedIn: 'has_user_logged_in' },
  ];
  let userSuperAdminColumns: IUser[] = [
    { createdAt: 'created_at' },
    { createdBy: 'created_by' },
  ];
  let userAdminCoumns: IUser[] = [
    { updatedAt: 'updated_at' },
    { updatedBy: 'updated_by' },
    { hasLoggedIn: 'has_user_logged_in' },
  ];
  let userEmployeeColumns: IUser[] = [];
  let userClientColumns: IUser[] = [];

  if (role === 'superadmin') {
    const mergeArr = [...userCommonColumns, ...userSuperAdminColumns];
    const columns = mergeArr.map((el, i) => {
      return `users.${Object.keys(el)} AS ${Object.values(el)}`;
    });
    return columns;
  } else if (role === 'admin') {
    const mergeArr = [...userCommonColumns, ...userAdminCoumns];
    const columns = mergeArr.map((el, i) => {
      return `users.${Object.keys(el)} AS ${Object.values(el)}`;
    });
    return columns;
  } else if (role === 'employee') {
    const mergeArr = [...userCommonColumns, ...userEmployeeColumns];
    const columns = mergeArr.map((el, i) => {
      return `users.${Object.keys(el)} AS ${Object.values(el)}`;
    });
    return columns;
  } else if (role === 'client') {
    const mergeArr = [...userCommonColumns, ...userClientColumns];
    const columns = mergeArr.map((el, i) => {
      return `users.${Object.keys(el)} AS ${Object.values(el)}`;
    });
    return columns;
  }
};

/**
 *
 * @param description: Select List of user customer columns.
 */

// let userColumnsCustomerSelect: ICustomer[] = [
//   { name: 'customername' },
//   { email: 'customer_email' },
// ];

/**
 *
 * @param description: Select List of user role columns.
 */

let userColumnsRoleSelect: IRole[] = [{ role: 'role_name' }];

/**
 *
 * @param description: Select List of user search columns.
 */

let userColumnsSearch: UserFeilds[] = ['email', 'name'];

/**
 *
 * @param description: Select List of user customer columns function.
 * @param return: customer.customerfield AS alias.
 */

// export const userColumnsCustomerSelectMap = userColumnsCustomerSelect.map(
//   (el, i) => {
//     return `customer.${Object.keys(el)} AS ${Object.values(el)}`;
//   },
// );

/**
 *
 * @param description: Select List of user role columns function.
 * @param return: role.roleField AS alias.
 */

export const usersColumnsRoleSelectMap = userColumnsRoleSelect.map((el, i) => {
  return `role.${Object.keys(el)} AS ${Object.values(el)}`;
});

/**
 *
 * @param description: Select List of user search columns function.
 * @param return: search field.
 */

export const usersColumnsSearchMap = userColumnsSearch.map((el, i) => {
  return `${el}`;
});
