import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'abidiamira709@gmail.com',
        pass: 'zurd dimn jcms zhdz',
      },
    });
  }

  async sendOrderConfirmation(orderDetails: any) {
    const userMailOptions = {
      from: 'abidiamira709@gmail.com',
      to: orderDetails.user.email,
      subject: 'Order Confirmation',
      text: `Hello ${orderDetails.user.fullName},\n\nYour order has been confirmed. Details:\n\n` +
            `${orderDetails.products.map(product => `${product.name} x ${product.quantity}`).join('\n')}\n\n` +
            `Total Price: ${orderDetails.totalPrice}\n\nThank you for shopping with us!`,
    };
  
    const adminMailOptions = {
      from: 'abidiamira709@gmail.com',
      to: 'abidiamira709@gmail.com', // Admin email address
      subject: 'New Order Received',
      text: `A new order has been placed. Details:\n\n` +
            `Name: ${orderDetails.user.fullName}\n` +
            `Email: ${orderDetails.user.email}\n` +
            `Phone: ${orderDetails.user.phoneNumber}\n` +
            `Location: ${orderDetails.user.location}\n\n` +
            `Products:\n` +
            `${orderDetails.products.map(product => `${product.name} x ${product.quantity}`).join('\n')}\n\n` +
            `Total Price: ${orderDetails.totalPrice}`,
    };
  
    // Send email to user
    await this.transporter.sendMail(userMailOptions);
    // Send email to admin
    await this.transporter.sendMail(adminMailOptions);
  }  
}
