import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { IUser } from 'src/users/model/user.model';
import { AuthService } from './auth.service';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
// import { AuthService } from './auth/auth.service';
// import { LocalAuthGuard } from './auth/local-auth.guard';

@ApiTags('Admin auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  // @UseGuards(AuthGuard('local'))
  @Post('superAdmin/login')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string'},
        password: { type: 'string'},
      },
    },
  })
  async superAdminLogin(@Body() user: IUser) {
    // console.log(user);
    return await this.authService.SuperAdminlogin(user);
  }

  @Post('user/login')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' },
      },
    },
  })
  async userLogin(@Body() user: IUser) {
    // console.log(user);
    return await this.authService.Adminlogin(user);
  }


  @Post('forgotPassword')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
   return await this.authService.forgotPassword(forgotPasswordDto)
  }

  @Post('verifyToken')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        token: { type: 'string' },
      },
    },
  })
  async verifyToken(@Body() body: {email: string, token: string}){
    // console.log(body, "Email Check")
    return await this.authService.verifyToken(body.token, body.email)
  } 


  @Post('changePassword')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        token: { type: 'string' },
        password:{ type: 'string'}
      },
    },
  })
  async changePassword(@Body() body: {email: string, token: string, password: string}){
    return this.authService.changePassword(body.password, body.email, body.token)
  }
}
