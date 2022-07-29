import { IStrategyOptions, Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(username: string, password: string) {
    const user = await this.authService.findOne(username);
    if (!user) {
      throw new BadRequestException('用户名或者密码错误');
    }

    if (!compareSync(password, user.password)) {
      throw new BadRequestException('用户名或者密码错误');
    }
    return user;
  }
}
