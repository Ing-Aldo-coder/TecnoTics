import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'login' })
  async login(@Payload() data: any) {
    // Aquí iría la lógica real de validación contra la BD (TypeORM) y generación de JWT
    console.log('Login attempt with:', data);
    if (data.email === 'admin@tecnotics.com' && data.password === 'admin') {
      return { 
        status: 'success', 
        token: 'fake-jwt-token-for-now',
        user: { id: 1, role: 'ADMIN', email: data.email }
      };
    }
    return { status: 'error', message: 'Invalid credentials' };
  }

  @MessagePattern({ cmd: 'register' })
  async register(@Payload() data: any) {
    // Lógica de registro
    console.log('Register attempt with:', data);
    return {
      status: 'success',
      message: 'User registered successfully',
      user: { id: 2, email: data.email, role: 'USER' }
    };
  }
}
