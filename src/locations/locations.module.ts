import { forwardRef, Module } from '@nestjs/common';
import { AdminLocationService, SuperAdminLocationService } from './locations.service';
import { LocationsController } from './locations.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from './entity/location.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Location]),
  forwardRef(() => UsersModule),
],
  providers: [AdminLocationService, SuperAdminLocationService],
  controllers: [LocationsController]
})
export class LocationsModule {}
