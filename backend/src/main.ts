import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With', 'Accept-Language', 'Content-Language', 'Access-Control-Allow-Origin'],
    exposedHeaders: ['Authorization'],
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Task Management API')
    .setDescription('API for managing tasks')
    .setVersion('1.0')
    .build();
  
  // @ts-ignore
  const document = SwaggerModule.createDocument(app, config);
  // @ts-ignore
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3001);
}
bootstrap();
