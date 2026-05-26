import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://user:password@localhost:5672'],
        queue: 'auth_queue',
        queueOptions: {
          durable: false
        },
      },
    },
  );
  
  await app.listen();
  console.log('Auth Microservice is listening via RabbitMQ');
}
bootstrap();
