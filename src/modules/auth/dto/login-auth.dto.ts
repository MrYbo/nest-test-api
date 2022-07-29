import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
  @ApiProperty({ description: '用户名' })
  username: string;

  @ApiProperty({ description: '用户密码' })
  password: string;
}
