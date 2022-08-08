import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppDatabaseModule } from './common/modules/app.database';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { AuthController } from './modules/auth/auth.controller';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { RolesGuard } from './modules/auth/guards/roles.guard';
import { AuthStrategyGuard } from './modules/auth/guards/auth-strategy.guard';
import { AppConfigModule } from './common/modules/app.config';
import { TaskRunner } from './tasks/task.runner';
import { AppRedisModule } from './common/modules/app.redis';

@Module({
  imports: [
    AppConfigModule.footRoot(),
    AppDatabaseModule.forRootAsync(),
    AppRedisModule.forRootAsync(),
    // 文件上传
    MulterModule.register({ dest: 'uploads' }),

    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AuthStrategyGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    TaskRunner,
  ],
})
export class AppModule {
  // 添加局部中间件
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(AuthController);
  }
}
