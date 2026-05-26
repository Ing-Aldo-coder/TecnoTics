import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Customer, CustomerSchema } from './customer.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://user:password@localhost:27017/tecnotics_crm?authSource=admin'),
    MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }])
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
