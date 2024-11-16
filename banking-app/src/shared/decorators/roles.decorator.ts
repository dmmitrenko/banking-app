import { createParamDecorator, ExecutionContext, SetMetadata } from '@nestjs/common';
import { Role } from 'src/domain/models/user.model';

export const ROLES_KEY = 'roles'
export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

export const GetUser = createParamDecorator(
    (data: string, ctx: ExecutionContext) => {
      const request = ctx.switchToHttp().getRequest();
      const user = request.user;
      return data ? user?.[data] : user; 
    },
  );
