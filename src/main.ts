import dotenv = require('dotenv');

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

dotenv.config();

(async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const port = 4000;
  await app.listen(port);
  console.log(`Running server on PORT: ${port}`);
})()
