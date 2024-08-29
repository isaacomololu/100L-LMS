import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
// import { config } from 'dotenv';


async function bootstrap() {
  // await setupConfig();
  // const error = await setupConfig();
  // if (error) return logger.error(error);
  dotenv.config();
  // config();
  console.log('JWT_SECRET:', process.env.JWT_SECRET);

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  console.log('JWT_SECRET from ConfigService:', configService.get<string>('JWT_SECRET'));

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(3000);
}
bootstrap();

