import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';

@Controller('orders')
export class OrdersController {
  constructor(private emailService: EmailService) {}

  @Post()
  async createOrder(@Body() orderDetails: any) {
    await this.emailService.sendOrderConfirmation(orderDetails);
    return { message: 'Order confirmed and emails sent' };
  }
}
