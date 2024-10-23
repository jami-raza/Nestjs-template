import { PartialType, PickType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  hasLoggedIn?: boolean;

  @IsOptional()
  lastLoggedIn?: Date;

  @IsOptional()
  image?: string;

  @IsOptional()
  deletedAt?: Date;

  @IsOptional()
  createdBy?: string;

  @IsOptional()
  updatedBy?: string;

  @IsOptional()
  deletedBy?: string;

  @IsOptional()
  customer?: string;
}
