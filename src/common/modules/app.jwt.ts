import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

export class AppJwtModule {
  private static factory(configService: ConfigService) {
    return {
      secret: configService.get('jwt.secret'),
      signOptions: {
        expiresIn: configService.get('jwt.expiresIn'),
      },
    };
  }

  static registerAsync() {
    return JwtModule.registerAsync({
      useFactory: AppJwtModule.factory,
      inject: [ConfigService],
    });
  }
}
