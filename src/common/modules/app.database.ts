import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export class AppDatabaseModule {
  private static factory(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: configService.get('database.host'),
      port: configService.get('database.port'),
      username: configService.get('database.username'),
      password: configService.get('database.password'),
      database: configService.get('database.database'),
      entities: [__dirname + '/../../modules/**/*.entity{.ts,.js}'],
      synchronize: true,
      // logging: true,
    };
  }

  static forRootAsync() {
    return TypeOrmModule.forRootAsync({
      useFactory: AppDatabaseModule.factory,
      inject: [ConfigService],
    });
  }
}
