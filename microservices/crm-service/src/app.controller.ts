import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'getCustomers' })
  async getCustomers() {
    return this.appService.getCustomers();
  }

  @MessagePattern({ cmd: 'createCustomer' })
  async createCustomer(@Payload() data: any) {
    return this.appService.createCustomer(data);
  }
}
