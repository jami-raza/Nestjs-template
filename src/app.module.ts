import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { IsUserAlreadyExistConstraint } from './users/constraints/validation_constraints';
import { RolesModule } from './roles/roles.module';
import {
  IsRoleAlreadyExistConstraint,
  IsRoleNotExistConstraint,
} from './roles/constraints/validation-constraints';
// import { CustomerModule } from './customer/customer.module';
// import { IsCustomerAlreadyExistConstraint } from './customer/constraints/duplicate-validation.constraints';
import { IsUserNotExistConstraint } from './users/constraints/not_exist_validation.constraint';
import { IsUserNotAdminConstraint } from './users/constraints/is_admin_validation.constraint';
import { join } from 'path';
// import { IsCustomerNotExistConstraint } from './customer/constraints/not-exist-validation.constraint';
import { ValidationModule } from './shared_modules/validation.module';
import { WinstonModule } from 'nest-winston';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { EmailModule } from './email/email.module';
import { EmployeesModule } from './employees/employees.module';
import { ClientsModule } from './clients/clients.module';
import { CrewsModule } from './crews/crews.module';
import { CrewMembersModule } from './crew_members/crew_members.module';
import { RanchesModule } from './ranches/ranches.module';
import { LocationsModule } from './locations/locations.module';
import { JobsModule } from './jobs/jobs.module';
import { TimecardModule } from './timecard/timecard.module';
import { TimeCardBreakModule } from './time-card_break/time-card_break.module';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import * as fs from 'fs';
// import { GatewayModule } from './gateway/gateway.module';
import { SocketModule } from './socket/socket.module';
import { GatewayModule } from './gateway/gateway.module';

const transportInfo = new winston.transports.DailyRotateFile({
  filename: './logs/info-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '10m',
  level: 'info',
});

const transportWarn = new winston.transports.DailyRotateFile({
  filename: './logs/warn-%DATE%.log',
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '10m',
  level: 'warn',
});

// transport.on('rotate', function(oldFilename, newFilename){
//   console.log(oldFilename,"Old file name a")
//   fs.unlink('./logs/info-2022-11-22-16.log',(err) => {
//     console.log(err,"FS Error")
//   })
// })

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),

      transports: [transportInfo, transportWarn],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: true,
        factories: [ 'src/db/seeding/factories/**/*{.ts,.js}' ],
        seeds:['src/db/seeding/seeds/**/*{.ts,.js}']
      }),
      inject: [ConfigService],
    }),

    UsersModule,
    AuthModule,
    RolesModule,
    // CustomerModule,
    CloudinaryModule,
    EmailModule,
    EmployeesModule,
    CrewsModule,
    CrewMembersModule,
    RanchesModule,
    LocationsModule,
    JobsModule,
    ClientsModule,
    TimecardModule,
    TimeCardBreakModule,
    GatewayModule,
    // SocketModule
    
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, JwtService, Logger, ...ValidationModule],
})
export class AppModule {}
