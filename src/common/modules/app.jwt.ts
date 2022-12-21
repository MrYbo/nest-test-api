import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';

export class AppJwtModule {
  private static factory(configService: ConfigService): JwtModuleOptions {
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
