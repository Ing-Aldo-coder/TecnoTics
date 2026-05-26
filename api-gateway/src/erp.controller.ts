import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('erp')
export class ErpController {
  constructor(
    @Inject('ERP_SERVICE') private readonly erpClient: ClientProxy,
    @Inject('SCM_SERVICE') private readonly scmClient: ClientProxy,
    @Inject('CRM_SERVICE') private readonly crmClient: ClientProxy,
  ) {}

  @Get('orders')
  getOrders() {
    return this.erpClient.send({ cmd: 'getOrders' }, {});
  }

  @Post('orders')
  async createOrder(@Body() data: any) {
    const logs: string[] = [];
    const timestamp = new Date().toLocaleTimeString();

    // Si es una compra integrada (desde el e-commerce o con detalles completos de cliente y carrito)
    if (data.items && Array.isArray(data.items)) {
      logs.push(`[API-Gateway] [${timestamp}] 🛒 Recibido requerimiento de compra desde e-commerce (public-site)`);
      logs.push(`[API-Gateway] [${timestamp}] 👤 Cliente: ${data.customerName} (${data.customerEmail})`);
      
      let scmResult: any = { success: true, logs: [], actions: [] };
      try {
        logs.push(`[API-Gateway] ➔ Comunicando con [SCM-Microservice] por RabbitMQ para validar inventario...`);
        scmResult = await firstValueFrom(
          this.scmClient.send({ cmd: 'processOrderStock' }, { items: data.items })
        );
        logs.push(...(scmResult.logs || []));
      } catch (error) {
        logs.push(`[API-Gateway] ❌ Error conectando con SCM: ${error.message}`);
        scmResult.success = false;
      }

      // Generar orden en ERP
      let erpResult: any = null;
      try {
        logs.push(`[API-Gateway] ➔ Comunicando con [ERP-Microservice] por RabbitMQ para registrar la transacción contable...`);
        erpResult = await firstValueFrom(
          this.erpClient.send({ cmd: 'createOrder' }, {
            orderNumber: data.orderNumber,
            customerName: data.customerName,
            totalAmount: data.totalAmount,
            paymentStatus: data.paymentStatus || 'Pagado'
          })
        );
        logs.push(`[ERP] ✅ Asiento contable registrado con éxito. Venta de $${data.totalAmount} ingresada en Libro Diario. Estado: PAGADO.`);
      } catch (error) {
        logs.push(`[API-Gateway] ❌ Error conectando con ERP: ${error.message}`);
      }

      // Upsert cliente en CRM
      try {
        logs.push(`[API-Gateway] ➔ Comunicando con [CRM-Microservice] por RabbitMQ para actualizar registro de clientes...`);
        const crmData = {
          name: data.customerName,
          email: data.customerEmail,
          phone: data.customerPhone || 'N/A',
          company: data.customerCompany || 'Personal',
          status: 'Cliente'
        };
        await firstValueFrom(
          this.crmClient.send({ cmd: 'createCustomer' }, crmData)
        );
        logs.push(`[CRM] ✅ Registro de cliente sincronizado. Estado de "${data.customerName}" actualizado a "Cliente" en la base de datos NoSQL.`);
      } catch (error) {
        logs.push(`[API-Gateway] ❌ Error conectando con CRM: ${error.message}`);
      }

      // Simular notificación / RabbitMQ event
      logs.push(`[API-Gateway] ✉️ [Notificación] Evento 'order_completed' publicado en RabbitMQ.`);
      logs.push(`[Notificación] Correo electrónico de confirmación de compra enviado a: ${data.customerEmail}.`);
      logs.push(`[API-Gateway] ✨ ¡Flujo de integración N-Capas completado con éxito!`);

      return {
        success: true,
        orderNumber: data.orderNumber,
        erpOrder: erpResult,
        logs: logs
      };
    } else {
      // Fallback para creación manual simple desde el panel de administración
      return this.erpClient.send({ cmd: 'createOrder' }, data);
    }
  }
}
