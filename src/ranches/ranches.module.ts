import { forwardRef, Module } from '@nestjs/common';
import { AdminRanchService, SuperAdminRanchService } from './ranches.service';
import { RanchesController } from './ranches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ranch } from './entity/ranch.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Ranch]), forwardRef(() => UsersModule)],
  providers: [AdminRanchService, SuperAdminRanchService],
  controllers: [RanchesController],
  exports: [AdminRanchService, SuperAdminRanchService],
})
export class RanchesModule {}
