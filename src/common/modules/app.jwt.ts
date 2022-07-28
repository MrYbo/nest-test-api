import { JwtModule } from '@nestjs/jwt';

export class AppJwtModule {
  private static factory() {
    return {
      secret: 'secret',
      signOptions: { expiresIn: '24h' },
    };
  }

  static registerAsync() {
    return JwtModule.registerAsync({
      useFactory: AppJwtModule.factory,
    });
  }
}
