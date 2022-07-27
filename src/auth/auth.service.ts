import { Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 用户注册
   * @param createAuthDto
   */
  async register(registerAuthDto: RegisterAuthDto) {
    return await this.userService.create(registerAuthDto);
  }

  async findOne(username: string) {
    return await this.userService.userLogin(username);
  }

  async findById(id) {
    return await this.userService.findOne({ where: { id } });
  }

  async getToken(user: any) {
    const payload = { sub: user.id };
    return this.jwtService.sign(payload);
  }

  async verifyToken(token: string) {
    return this.jwtService.verify(token);
  }
}
