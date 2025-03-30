import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './email/email.service';
import { OrdersModule } from './orders/orders.module';
import { EmailModule } from './email/email.module';
import { ContactController } from './contact/contact.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/woodcraft'),
    AuthModule,
    ProductsModule,
    OrdersModule,
    EmailModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AppController, ContactController],
  providers: [AppService, EmailService],
})
export class AppModule {}
