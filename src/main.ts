import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Important: Railway provides a PORT variable automatically
  const port = process.env.PORT || 3000;
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  app.useLogger(logger);
  // Use '0.0.0.0' to ensure Railway can route traffic to the container
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
