import { Injectable, CanActivate, ExecutionContext, Inject, forwardRef } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { SuperAdminService, UserService} from '../../users/users.service'
import { map, Observable } from "rxjs";
import { User } from "src/entities";



@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,

        @Inject(forwardRef(() => SuperAdminService))
        private superAdminService: SuperAdminService
    ) { }

     canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        // console.log(roles, "Roles User")
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        // console.log(request)
        const user: User = request.user;
        // console.log(user, "User Roles Guard")
        // return true;
        return ( this.superAdminService.getOne(user.id)).pipe(
            map((user: User) => {
                const hasRole = () => roles.indexOf(user.role.role) > -1;
                let hasPermission: boolean = false;

                if (hasRole()) {
                    hasPermission = true;
                };
                return user && hasPermission;
            })
        )
       
        
        // return this.userService.findOne(user.id).pipe(
        //     map((user: User) => {
        //         const hasRole = () => roles.indexOf(user.role) > -1;
        //         let hasPermission: boolean = false;

        //         if (hasRole()) {
        //             hasPermission = true;
        //         };
        //         return user && hasPermission;
        //     })
        // )
    }
}