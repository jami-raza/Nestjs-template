import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entity/client.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Client])
  ],
  providers: [ClientsService],
  controllers: [ClientsController],
  exports: [ClientsService]
})
export class ClientsModule {}
