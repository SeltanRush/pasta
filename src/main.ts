import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwaggerDocumentation(app);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
}

const setupSwaggerDocumentation = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .setTitle('pasta')
    .setDescription('The pasta API desciption')
    .setVersion('0.1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};

bootstrap();
