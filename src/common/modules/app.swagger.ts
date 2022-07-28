import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function appSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('blog api')
    .setDescription('The blog API description')
    .addBearerAuth()
    .setVersion('3.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-dos', app, document);
}
