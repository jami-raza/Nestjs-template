import { Role, User_Role } from 'src/roles/entity/role.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import {define} from 'typeorm-seeding';
import {User} from '../../../users/entity/user.entity';

define(Role, () => {
    
    const roleEntity = new Role();
    roleEntity.role = User_Role.SuperAdmin; 
//   const email = 'superadmin@gmail.com';
  
  return roleEntity;
})