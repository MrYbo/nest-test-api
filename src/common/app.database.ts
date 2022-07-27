import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

export class AppDatabase {
  private static factory(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '12345678',
      database: 'test',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
      // logging: true,
    };
  }

  static forRootAsync() {
    return TypeOrmModule.forRootAsync({
      useFactory: AppDatabase.factory,
    });
  }
}
