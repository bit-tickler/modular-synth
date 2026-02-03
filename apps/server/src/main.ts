import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { getLucia } from './auth/lucia';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
      'http://localhost:5174',
      'http://127.0.0.1:5174',
    ],
    credentials: true,
  });

  // Initialize Lucia BEFORE any routes run
  const prisma = app.get(PrismaService);
  getLucia(prisma);

  await app.listen(3000);
  console.log('✅ NestJS + Lucia ready on http://localhost:3000');
}

bootstrap()
  .then(() => {
    console.log('🚀 Application bootstrap completed');
  })
  .catch((error) => {
    console.error('❌ Error during application bootstrap:', error);
  });
