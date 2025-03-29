import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class OrdersService {
  constructor(private readonly emailService: EmailService) {}

  // Example method to create an order
  createOrder(orderDetails: any) {
    // Here you would interact with your database to store the order
    // For example, order creation logic (saving to the DB)
    const createdOrder = { ...orderDetails, id: Date.now() }; // Mock order creation

    // Sending a confirmation email after order is created
    this.emailService.sendOrderConfirmation(orderDetails);

    return createdOrder;
  }

  // Additional business logic for handling orders can be added here
}
