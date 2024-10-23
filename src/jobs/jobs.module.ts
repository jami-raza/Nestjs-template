import { forwardRef, Module } from '@nestjs/common';
import { AdminJobService, SuperAdminJobService } from './jobs.service';
import { JobsController } from './jobs.controller';
import { Job } from './entity/job.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Job]),
  forwardRef(() => UsersModule),
],
  providers: [AdminJobService, SuperAdminJobService],
  controllers: [JobsController],
  exports:[AdminJobService, SuperAdminJobService]
})
export class JobsModule {}
