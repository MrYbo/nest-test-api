import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginAuthDto } from './dto/login-auth.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorator/current-user.decorator';

@Controller()
@ApiTags('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: '用户注册' })
  async register(@Body() registerAuthDto: RegisterAuthDto) {
    const user = await this.authService.register(registerAuthDto);
    return user;
  }

  @Post(['login', 'admin/login'])
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: '用户登录' })
  async login(@Body() loginAuthDto: LoginAuthDto, @Req() req) {
    const token = await this.authService.getToken(req.user);
    return { token, type: 'bearer' };
  }

  @Get('me')
  @ApiOperation({ summary: '获取当前用户信息' })
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user) {
    return user;
  }
}
