import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';
import { EmailModule } from '../email/email.module';
import { ContactService } from './contact.service';

@Module({
  imports: [EmailModule],
  controllers: [ContactController],
  providers: [ContactService],
})
export class ContactModule {}