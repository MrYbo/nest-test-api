import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

export class AppJwtModule {
  private static factory() {
    return {
      secret: 'secret',
      signOptions: { expiresIn: '2h' },
    };
  }

  static registerAsync() {
    return JwtModule.registerAsync({
      useFactory: AppJwtModule.factory,
    });
  }
}
