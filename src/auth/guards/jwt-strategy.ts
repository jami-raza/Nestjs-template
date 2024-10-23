import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SuperAdminService, UserService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(configServ: ConfigService, private superAdminService: SuperAdminService) {
        super({
             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
             ignoreExpiration: false,
             secretOrKey: configServ.get('JWTKEY'),
        });
    }

    async validate(payload: any) {
        
        // check if user in the token actually exist
        // console.log(payload, "Payload ")
        const user = await this.superAdminService.findOneByEmail(payload.email);
        // console.log(user, "User")
        if (!user) {
            throw new UnauthorizedException('You are not authorized to perform the operation');
        }
        
        return user;
    }
    // async validate(payload: any) {
    //     console.log(payload, "Payload")
    //     return { ...payload};
    //   }
}