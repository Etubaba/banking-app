import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix(configService.get('app.global_url_prefix'));

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true }));
  app.enableCors({
    origin: configService.get('cors.origin'),
    methods: configService.get('cors.methods'),
  });

  const port = configService.get<number>('app.port');

  await app.listen(port, () => {
    console.log(`Listening at port ${port}`);
  });
}
bootstrap();
