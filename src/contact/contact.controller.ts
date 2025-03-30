import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';

@Controller('contact')
export class ContactController {
    constructor(private emailService: EmailService) {}
    
    @Post()
    async contactUs(@Body() msgDetails: any) {
    await this.emailService.sendMessage(msgDetails);
    return { message: 'Message sent' };
    }
}
