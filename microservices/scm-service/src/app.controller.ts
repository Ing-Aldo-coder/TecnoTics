import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'getProducts' })
  async getProducts() {
    return this.appService.getProducts();
  }

  @MessagePattern({ cmd: 'createProduct' })
  async createProduct(@Payload() data: any) {
    return this.appService.createProduct(data);
  }

  @MessagePattern({ cmd: 'processOrderStock' })
  async processOrderStock(@Payload() data: any) {
    return this.appService.processOrderStock(data);
  }
}
