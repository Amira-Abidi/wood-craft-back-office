import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class OrdersService {
  constructor(private readonly emailService: EmailService) {}

  createOrder(orderDetails: any) {
    const createdOrder = { ...orderDetails, id: Date.now() };

    this.emailService.sendOrderConfirmation(orderDetails);

    return createdOrder;
  }

}
