import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { RolesService } from './roles.service';

@ApiTags('Roles')
@ApiBearerAuth('defaultBearerAuth')
@Controller('roles')
export class RolesController {
  constructor(private readonly roleService: RolesService) {}
  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get(':id')
  @UsePipes(ValidationPipe)
  findOne(@Param('id') id: string) {
    return this.roleService.findById(id);
  }
}
