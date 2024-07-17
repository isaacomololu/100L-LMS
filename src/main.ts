import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupConfig } from './common/config';
import { logger } from './common';


async function bootstrap() {
  await setupConfig();
  // const error = await setupConfig();
  // if (error) return logger.error(error);

  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
