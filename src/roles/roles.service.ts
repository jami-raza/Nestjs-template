import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable } from 'rxjs';
import { In, Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role, User_Role } from './entity/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async create(role: CreateRoleDto) {
    const newRole = this.roleRepository.create(role);
    var abc: any = {};
    // console.log(abc.name);
    return this.roleRepository.save(newRole);
  }

  async findByRole(role: User_Role) {
    const userRole = await this.roleRepository.findOne({
      where: { role: role },
    });
    return userRole;
  }

  async findById(id: string) {
    const userRole = await this.roleRepository.findOne({ where: { id: id } });
    // console.log(userRole);
    if (userRole) return userRole;
    return false;
  }

  async createMany() {
    const roles = [
      { role: User_Role.SuperAdmin, description: 'This is superadmin role' },
      { role: User_Role.Admin, description: 'This is superadmin role' },
      { role: User_Role.Employee, description: 'This is superadmin role' },
      { role: User_Role.Client, description: 'This is superadmin role' },
    ];
    const findRoles = await this.roleRepository.find({
      where: { role: In(roles.map((el) => el.role)) },
    });
    
    if (findRoles.length !== 0) {
      // console.log('Roles are Found . ');
      return true;
    } else {
      const insertRoles = await this.roleRepository.create(roles);
      return await this.roleRepository.save(insertRoles);
    }
  }
}
