import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json, raw } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });
  // Stripe webhook needs raw body for signature verification; other routes use JSON
  app.use((req: any, res: any, next: any) => {
    if (req.originalUrl === '/api/stripe/webhook') {
      return raw({ type: 'application/json' })(req, res, (err?: any) => {
        if (err) return next(err);
        req.rawBody = req.body;
        next();
      });
    }
    return json()(req, res, next);
  });
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
