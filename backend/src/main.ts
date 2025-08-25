import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, { cors: true });
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    await app.listen(5000);
    console.log('Backend running on http://localhost:5000');
  } catch (err) {
    console.error('Error starting backend:', err);
  }
}
bootstrap();
