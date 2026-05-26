import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CrmController } from './crm.controller';
import { ScmController } from './scm.controller';
import { ErpController } from './erp.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://user:password@localhost:5672'],
          queue: 'auth_queue',
          queueOptions: { durable: false },
        },
      },
      {
        name: 'CRM_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://user:password@localhost:5672'],
          queue: 'crm_queue',
          queueOptions: { durable: false },
        },
      },
      {
        name: 'SCM_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://user:password@localhost:5672'],
          queue: 'scm_queue',
          queueOptions: { durable: false },
        },
      },
      {
        name: 'ERP_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://user:password@localhost:5672'],
          queue: 'erp_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [AppController, CrmController, ScmController, ErpController],
  providers: [AppService],
})
export class AppModule {}
