import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('auth/login')
  login(@Body() body: any) {
    return this.authClient.send({ cmd: 'login' }, body);
  }

  @Post('auth/register')
  register(@Body() body: any) {
    return this.authClient.send({ cmd: 'register' }, body);
  }
}
