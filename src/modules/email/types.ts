import { EmailTemplates } from './constants';

export type EmailTemplatesType = typeof EmailTemplates;

export type SendEmailOptions = {
  subject: string;
  template: keyof EmailTemplatesType;
};
