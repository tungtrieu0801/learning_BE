import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // ✅ ép kiểu dựa trên @Type trong DTO
      whitelist: true,  // ✅ bỏ field thừa
      forbidNonWhitelisted: true,
    })
  )
  // main.ts
  app.enableCors({
    origin: '*', // hoặc ['http://localhost:5173'] nếu muốn chỉ cho FE
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
