
export const userLogs = {
  created: (email: string) => `User ${email} created successfully`,
  updated: (email: string) => `User ${email} updated successfully`,
  deleted: (email: string) => `User ${email} deleted successfully`,
  emailAlreadyExists: (email: string) => `User ${email} already exist`,
  roleNotFound: (role: string) => `Role ${role} not found`,
  adminCreateError: () => `Admin create only employees and clients`,
  noCompanyFound:() => `No company found`,
  superAdminWithoutCustomer:() => `Super admin cannot create employees and client without customer ID.`
};
