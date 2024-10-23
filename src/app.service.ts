import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { User_Role } from './roles/entity/role.entity';
import { RolesService } from './roles/roles.service';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  constructor(
    private roleService: RolesService,
    private authService: AuthService,
  ) {}
  async onApplicationBootstrap() {
    // console.log('Application Works');
    const createdRoles = await this.roleService.createMany();
    if (createdRoles == true) {
      
      const file = fs.createReadStream(
        join(process.cwd(), '/src/utils/roles.ts'),
      );
     
      // console.log(file, 'File');
      // console.log('Yes Roles are created');
    } else {
      const superAdminRole = await this.roleService.findByRole(
        User_Role.SuperAdmin,
      );
      // console.log(superAdminRole);

      const userFields = {
        name: 'superadmin',
        email: 'superadmin@gmail.com',
        password: '1111',
        customer: null,
        createdBy: '',
        file: '',
        role: superAdminRole.id as any,
      };
      const createdUser = await this.authService.create(userFields);
      // console.log(createdUser, 'as');
      // console.log(createdRoles)
      const roleMap = createdRoles.map((el) => {
        return {
          name: el.role,
          id: el.id
        }
      })
      const [SuperAdmin, Admin,Employee,Client] = roleMap
      const yourObject = { SuperAdmin,Admin,Employee,Client};
      
      // console.log(yourObject,"Usr - role")
       const updateFile = fs.writeFile(
        join(process.cwd(), '/src/utils/roles.ts'),
        `export const User_Role = ${JSON.stringify(yourObject)}`,
       function(err) {
        if(err) throw err;
       }
      );
    }
    // return createdRoles;
  }
  // getHello(): string {
  //   return 'Hello World!';
  // }
}
