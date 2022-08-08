import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.payload.interface';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ms = require('ms');

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async register(registerAuthDto: RegisterAuthDto) {
    let user = await this.userService.findOne({
      where: { username: registerAuthDto.username },
    });
    if (user) {
      throw new ConflictException('用户已存在');
    }
    user = await this.userService.create(registerAuthDto);
    return user;
  }

  async findOne(username: string) {
    return await this.userService.userLogin(username);
  }

  async findById(id) {
    return await this.userService.findOne({ where: { id } });
  }

  async getToken(user: any): Promise<string> {
    const payload: JwtPayload = { sub: user.id };
    const token = this.jwtService.sign(payload);
    const oauthKey = ['oauth', token].join(':');
    const expiresIn = this.configService.get('jwt.expiresIn');
    await this.redis.setex(
      oauthKey,
      ms(expiresIn) / 1000,
      JSON.stringify(user),
    );
    return token;
  }
}
