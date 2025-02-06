import { MailerService } from '@nestjs-modules/mailer';
import { Controller, Get } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(
    private readonly emailService: EmailService,
    private readonly mailerService: MailerService,
  ) {}

  @Get()
  async test() {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'farrydaygg@gmail.com',
        pass: 'fyne obmr rhdl ewlf',
      },
    });

    const mailOptions = {
      from: 'farrydaygg@gmail.com',
      to: 'mokrushin29@yandex.ru',
      subject: 'Hello World!',
      html: `
        <h1>Hello?</h1>
        <p>How are you?</p>
      `,
    };

    await transporter.sendMail(mailOptions);
  }
}
