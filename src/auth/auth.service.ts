import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  AdminService,
  SuperAdminService,
  UserService,
} from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { ConfigService } from '@nestjs/config';
import { IUser } from '../users/model/user.model';
import { User } from 'src/entities';
import { RolesService } from 'src/roles/roles.service';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { userLogs } from 'src/utils/log-formatter/user.logs';
import { User_Role } from 'src/utils/roles';
import { filterUserField } from 'src/users/utils/filter_users';
import { ForgotPasswordDto } from './dto/forgotPassword.dto';
import { EmailService } from 'src/email/email.service';
import { CreateAdminDto } from 'src/users/dto/create-admin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly superAdminService: SuperAdminService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private roleService: RolesService,
    private adminService: AdminService,
    private emailService: EmailService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}
  public async superAdminValidate(
    email: string,
    pass: string,
    role: string,
  ): Promise<any> {
    const user = await this.adminService.findOneByEmail(email, role);
    // console.log(user);
    if (!user) {
      return null;
    }

    const match = await this.comparePassword(pass, user.password);
    // console.log(match, 'Match');
    if (!match) {
      return null;
    }

    const { password, ...result } = user;
    return result;
  }

  public async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.superAdminService.findOneByEmail(email);
    // console.log(user);
    if (!user) {
      return null;
    }

    const match = await this.comparePassword(pass, user.password);
    // console.log(match, 'Match');
    if (!match) {
      return null;
    }

    const { password, ...result } = user;
    return result;
  }

  /**
   * Admin and other users login endpoint
   * @param Iuser
   * @returns
   */

  public async Adminlogin(Iuser: IUser) {
    // console.log('Works');
    const valid = await this.validateUser(Iuser.email, Iuser.password);

    // console.log(valid, 'Valid');
    if (!valid) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    // console.log(valid, 'Valid');
    const token = await this.generateToken(Iuser);
    // console.log(token);
    const updateLoginUser = await this.superAdminService.updateUser(valid.id, {
      hasLoggedIn: true,
      lastLoggedIn: new Date(),
    });
    // console.log(updateLoginUser, 'Updated User Login');
    const user = (updateLoginUser as User)
      ? filterUserField(updateLoginUser as User)
      : updateLoginUser;
    return { user, token: token };
  }

  /**
   * Super Admin user login only.
   * @param user
   * @returns
   */

  public async SuperAdminlogin(user: IUser) {
    // console.log('Works');
    const valid = await this.superAdminValidate(
      user.email,
      user.password,
      User_Role.SuperAdmin.name,
    );

    // console.log(valid, 'Valid');
    if (!valid) {
      return new UnauthorizedException('Invalid Credentials');
    }
    // console.log(valid, 'Valid');
    const token = await this.generateToken(user);
    // console.log(token);
    return { ...valid, token: token };
  }

  public async create(user: CreateUserDto) {
    const pass = await this.hashPassword(user.password);
    
    const user_r = user.role;
    const userRole = await this.roleService.findById(user_r as any);
    if (userRole) {
      const newUser = await this.superAdminService.createUser(
        {
          ...user,
          password: pass,
        }
      
      );
      this.logger.info(userLogs.created('newUser'));
      return { user: newUser };
    }
    throw new BadRequestException(['No Such Role']);
  }

  // public async createAdmin(user: CreateAdminDto, file: string) {
  //   console.log("Works as admin")
  //   const pass = await this.hashPassword(user.password);
    
    
  //     const newUser = await this.superAdminService.createAdmin(
  //       {
  //         ...user,
  //         password: pass,
  //       },
  //       file,
  //     );
  //     this.logger.info(userLogs.created('newUser'));
  //     return { user: newUser };
    
   
  // }

  public async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.superAdminService.findOneByEmail(
      forgotPasswordDto.email,
    );
    if (!user) {
      throw new BadRequestException('Invalid email address');
    }

    function generateString(length: number) {
      const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength),
        );
      }

      return result;
    }

    const token = generateString(20);
    const hashToken = await this.hashPassword(token);
    await this.superAdminService.updateToken(user.id, hashToken);
    const mail = {
      to: forgotPasswordDto.email,
      subject: 'Password reset mail',
      from: 'career@fissionltd.com',
      text: 'Hello World from NestJS Sendgrid',
      html: `<p>http://localhost:3000?token=${token}&email=${user.email}</hp>`,
    };
    const sendMail = await this.emailService.send(mail);

    return 'Email sent successfully';
  }

  public async verifyToken(token: string, email: string){
    const user = await this.superAdminService.findOneByEmail(email)
    
    if(!user){
      throw new BadRequestException('Invalid email address')
    }

    const verifyToken = await this.comparePassword(token, user.passwordResetToken)

    if (!verifyToken){
      throw new BadRequestException('Invalid Token') 
    }

    

    const expiryAt = new Date(parseInt(user.resetTokenExpiryAt)).getTime()
    const newDateExpiry = new Date().getTime()

    // console.log(new Date(expiryAt), "Expiry At")
    // console.log(new Date(newDateExpiry), "ISO Expity At")

    if(expiryAt < newDateExpiry) {
      throw new BadRequestException('Token is expired')
    }

    return "Email and token are valid";
  }

  public async changePassword(password: string, email: string, token: string){
    await this.verifyToken(token, email);
    const user = await this.superAdminService.findOneByEmail(email)

    const hashPass = await this.hashPassword(password)

    await this.superAdminService.updatePass(hashPass, user.id)

    return "Updated Password Successfully."
  }

  public async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  private async generateToken(user: IUser) {
    const token = await this.jwtService.signAsync(user);
    return token;
  }

  private async comparePassword(enteredPassword: string, dbPassword: string) {
    // console.log(enteredPassword, dbPassword, 'Check Password');
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    // console.log(match, 'Match');
    return match;
  }

  async isTokenValid(bearerToken: string): Promise<boolean> {
    // console.log(bearerToken, 'Bearer')
    // console.log(process.env.JWTKEY)
    const verifyOptions = { secret: this.configService.get('JWTKEY') };
    let isValid: boolean = false;
    try {
      const payload = await this.jwtService.verifyAsync(
        bearerToken,
        verifyOptions,
      );
      const { username, typeid, iat, exp } = payload;

      let user: User = new User();

      if (payload) {
        return payload;
      }
      if (user && typeid < 3) {
        isValid = true;
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    }
    return isValid;
  }
}
