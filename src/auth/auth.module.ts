import { forwardRef, Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtAuthGuard } from './guards/jwt-guard';
import { RolesGuard } from './guards/roles-guard';
import { JwtStrategy } from './guards/jwt-strategy';
import { RolesService } from 'src/roles/roles.service';
import { RolesModule } from 'src/roles/roles.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { EmailModule } from 'src/email/email.module';
// import { UsersService } from 'src/users/users.service';

@Global()
@Module({
  imports: [
    forwardRef(() => RolesModule),
    forwardRef(() => UsersModule),
    forwardRef(() => EmailModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async(configService: ConfigService) =>  ({
              secret: configService.get('JWTKEY'),
              signOptions: { expiresIn: '1d' },  
            }),
      
    }),
  ],
  providers: [AuthService, RolesGuard, JwtAuthGuard, JwtStrategy],
  controllers: [AuthController],
  exports:[AuthService]
})
export class AuthModule {}
