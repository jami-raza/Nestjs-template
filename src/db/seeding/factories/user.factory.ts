import { CreateUserDto } from 'src/users/dto/create-user.dto';
import {define} from 'typeorm-seeding';
import {User} from '../../../users/entity/user.entity';

define(User, () => {
    
    const user = new User();
  const name = 'superadmin'; 
  const email = 'superadmin@gmail.com';
  
  return user;
})