import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'getOrders' })
  async getOrders() {
    return this.appService.getOrders();
  }

  @MessagePattern({ cmd: 'createOrder' })
  async createOrder(@Payload() data: any) {
    return this.appService.createOrder(data);
  }
}
