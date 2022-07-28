import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
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

  async getToken(user: any) {
    const payload = { sub: user.id };
    return this.jwtService.sign(payload);
  }

  async verifyToken(token: string) {
    return this.jwtService.verify(token);
  }
}
