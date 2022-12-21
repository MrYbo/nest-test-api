import {
  ExtractJwt,
  Strategy,
  StrategyOptions,
  VerifyCallbackWithRequest,
} from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../jwt.payload.interface';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('jwt.secret'),
    } as StrategyOptions);
  }

  // 当使用了 jwt 时，会自动调用这个方法解析 token，解析成功之后，会将返回的对象绑定到 req.user 上
  async validate(req: Request, payload: JwtPayload) {
    // payload 为 token 解析之后的对象
    const user = await this.authService.findById(payload.sub);
    if (!user) {
      return false;
    }
    return user;
  }
}
