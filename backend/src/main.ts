import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, { cors: true });
    await app.listen(5000);
    console.log('Backend running on http://localhost:5000');
  } catch (err) {
    console.error('Error starting backend:', err);
  }
}
bootstrap();
