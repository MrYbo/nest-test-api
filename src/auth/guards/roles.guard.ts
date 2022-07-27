import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '../../common/constants/role.enum';
import { ROLES_KEY } from '../../common/decorator/roles.decorator';
import { JwtAuthGuard } from './jwt-auth.guard';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext) {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    // const { authorization } = request.headers;
    // const token = authorization.split(' ')[1];
    // if (!token) {
    //   return false;
    // }
    const user = request.user;
    if (!user) {
      return false;
    }
    return requiredRoles.some((role) => user.role === role);
  }
}
