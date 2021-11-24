import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { auth } from 'express-openid-connect';
import { config as setConfig } from 'dotenv';

setConfig();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    auth({
      issuerBaseURL: process.env['OAUTH_DOMAIN'],
      baseURL: process.env['HOST_URL'],
      clientID: process.env['OAUTH_CLIENT_ID'],
      clientSecret: process.env['OAUTH_CLIENT_SECRET'],
      secret: process.env['APP_SECRET'],
      authRequired: false,
      auth0Logout: true,
      authorizationParams: {
        response_type: 'code',
        scope: 'openid profile email',
      },
    }),
  );

  await app.listen(3000);
}
bootstrap();
