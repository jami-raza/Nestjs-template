// import { Factory, Seeder } from "typeorm-seeding";
// import { Connection } from "typeorm";
// import { RolesService } from "src/roles/roles.service";
// import { Role, User_Role } from "src/roles/entity/role.entity";


// export default class InitialDatabaseSeed implements Seeder {
//     constructor(private roleService: RolesService){}
//   public async run(factory: Factory, connection: Connection): Promise<any> {
//     // const users = await factory(User)().createMany(15);
//     // const roles = [{role: 'superadmin', description: 'This is superadmin'}];
//     const roles = [
//         { role: User_Role.SuperAdmin, description: 'This is superadmin role' },
//         { role: User_Role.Admin, description: 'This is superadmin role' },
//         { role: User_Role.Employee, description: 'This is superadmin role' },
//         { role: User_Role.Client, description: 'This is superadmin role' },
//       ];
//     const roleCreate = await factory(Role)().createMany(roles)
//     // return await this.roleService.createMany()
//   }
// }