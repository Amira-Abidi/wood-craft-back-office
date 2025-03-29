import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { EmailModule } from '../email/email.module'; // Import EmailModule

@Module({
  imports: [EmailModule],  // Importing the EmailModule if you are sending emails
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
