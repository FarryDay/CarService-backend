import { Injectable, OnModuleInit } from '@nestjs/common';
import { render } from '@react-email/components';
import * as nodemailer from 'nodemailer';
import { EmailTemplates } from './constants';
import { SendEmailOptions } from './types';

@Injectable()
export class EmailService implements OnModuleInit {
  private transporter: undefined | nodemailer.Transporter;

  public templates = EmailTemplates;

  onModuleInit() {
    this.transporter = nodemailer.createTransport({
      service: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    this.transporter.on('error', (e) => {
      throw new Error(e.message);
    });
  }

  async sendEmail(email: string, options: SendEmailOptions) {
    const emailHtml = await render(options.template);
    const data = {
      to: email,
      subject: options.subject,
      html: emailHtml,
    };

    await this.transporter.sendMail(data);
  }
}
