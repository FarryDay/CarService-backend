import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { setDefaultOptions } from 'date-fns';
import { ru } from 'date-fns/locale';
import { AppModule } from './app.module';
setDefaultOptions({ locale: ru });

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use(cookieParser());
  app.setGlobalPrefix('/api/');

  await app.listen(3001);
}
bootstrap().then();
