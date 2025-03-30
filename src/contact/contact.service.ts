import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class ContactService {
  constructor(private readonly emailService: EmailService) {}

  contactUs(msgDetails: any) {
    const contactUs = { ...msgDetails, id: Date.now() };

    this.emailService.sendMessage(msgDetails);

    return contactUs;
  }

}
