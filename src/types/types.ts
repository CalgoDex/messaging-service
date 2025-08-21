export type SmsType = 'sms' | 'mms';

export type EmailType = 'email';

export type ConvoType = 'sms' | 'mms' | 'email';

export interface SmsRequest {
  to: string;
  from: string;
  type: SmsType;
  body: string;
  attachments?: string[]; // array of attachment urls
  timestamp: Date;
}

export interface EmailRequest {
  to: string;
  from: string;
  type: EmailType;
  body: string;
  attachments?: string[]; // array of attachment urls
  timestamp: Date;
}

export interface SmsWebHookRequest {
  id: string;
  to: string;
  from: string;
  type: SmsType;
  messageText: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface EmailWebHookRequest {
  id: string;
  to: string;
  from: string;
  type: EmailType;
  messageText: string;
  createdAt: Date;
  updatedAt: Date;
}
