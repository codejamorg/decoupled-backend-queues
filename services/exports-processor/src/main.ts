import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(envs.PORT, () => {
    const logger = new Logger('Main');
    logger.log(`Application running on port ${envs.PORT} 🚀`);
  });
}
bootstrap();
