import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  app.use(cookieParser());
  app.setGlobalPrefix('/api');
  app.useGlobalPipes(new ValidationPipe());


  const config = new DocumentBuilder()
    .setTitle('Bookshop API')
    .setDescription('The Bookshop API description')
    .setVersion('1.0')
    .addTag('Bookshop')
    .addBearerAuth()

    .build();


  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/ui', app, document);

  await app.listen(8000);
}
bootstrap();
