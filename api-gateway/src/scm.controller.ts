import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('scm')
export class ScmController {
  constructor(@Inject('SCM_SERVICE') private readonly scmClient: ClientProxy) {}

  @Get('products')
  getProducts() {
    return this.scmClient.send({ cmd: 'getProducts' }, {});
  }

  @Post('products')
  createProduct(@Body() data: any) {
    return this.scmClient.send({ cmd: 'createProduct' }, data);
  }
}
