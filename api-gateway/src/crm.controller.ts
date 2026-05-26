import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('crm')
export class CrmController {
  constructor(@Inject('CRM_SERVICE') private readonly crmClient: ClientProxy) {}

  @Get('customers')
  getCustomers() {
    return this.crmClient.send({ cmd: 'getCustomers' }, {});
  }

  @Post('customers')
  createCustomer(@Body() data: any) {
    return this.crmClient.send({ cmd: 'createCustomer' }, data);
  }
}
