import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  sendMail() {
    return {
      message:
        'Email service working',
    };
  }
}