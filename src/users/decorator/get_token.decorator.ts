import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { User } from '../entity/user.entity';


export const AuthUser = createParamDecorator(async (data: any, ctx: ExecutionContext) => {
    
  const request = ctx.switchToHttp().getRequest();
  const userId = await request.user.id;
  console.log(userId, "User Id")
  return request.user as User;
});