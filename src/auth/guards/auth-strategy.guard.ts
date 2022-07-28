import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { SELECT_AUTH_KEY } from '../../common/decorator/auth-strategy.decorator';
import { AuthStrategies } from '../../common/constants/constants';

@Injectable()
export class AuthStrategyGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  private static getAuthGuard(noAuth?: string): IAuthGuard {
    if (noAuth === 'local') {
      return new (AuthGuard('local'))();
    }
    return new (AuthGuard('jwt'))();
  }

  canActivate(context: ExecutionContext) {
    const auth = this.reflector.getAllAndOverride<string>(SELECT_AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (auth === AuthStrategies.NO) {
      return true;
    }

    const guard = AuthStrategyGuard.getAuthGuard(auth);
    return guard.canActivate(context);
  }
}
