import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { logger } from './common/middleware/logger_middleware';
import { appSwagger } from './common/modules/app.swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  appSwagger(app);
  // 添加全局中间件
  app.use(logger);
  // 添加全局验证管道
  app.useGlobalPipes(new ValidationPipe());
  // // 添加全局异常捕获
  // app.useGlobalFilters(new HttpExceptionFilter());

  // 添加同一路由前缀
  app.setGlobalPrefix('api/v1');
  await app.listen(3000);
}
bootstrap();
