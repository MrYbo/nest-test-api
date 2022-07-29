import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CurrentUser } from '../../common/decorator/current-user.decorator';
import { AuthStrategy } from '../../common/decorator/auth-strategy.decorator';
import { AuthStrategies } from '../../common/constants/constants';

@Controller()
@ApiTags('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: '用户注册' })
  @AuthStrategy(AuthStrategies.NO)
  async register(@Body() registerAuthDto: RegisterAuthDto) {
    return await this.authService.register(registerAuthDto);
  }

  @Post(['login', 'admin/login'])
  @ApiOperation({ summary: '用户登录' })
  @AuthStrategy(AuthStrategies.LOCAL)
  async login(@Body() loginAuthDto: LoginAuthDto, @Req() req) {
    const token = await this.authService.getToken(req.user);
    return { token, type: 'bearer' };
  }

  @Get('me')
  @ApiOperation({ summary: '获取当前用户信息' })
  async me(@CurrentUser() user) {
    return user;
  }
}
