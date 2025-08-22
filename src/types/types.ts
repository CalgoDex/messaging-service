export type SmsType = 'sms' | 'mms';

export type ConvoType = 'sms' | 'email';

export type EmailType = 'email';

export interface SmsRequest {
  to: string;
  from: string;
  type: SmsType;
  body: string;
  attachments?: string[];
  timestamp: Date;
}

export interface EmailRequest {
  to: string;
  from: string;
  type: EmailType;
  body: string;
  attachments?: string[];
  timestamp: Date;
}

export interface SmsWebHookRequest {
  from: string;
  to: string;
  type: SmsType;
  messaging_provider_id: string;
  body: string;
  attachments?: string[];
  timestamp: Date;
}

export interface EmailWebHookRequest {
  from: string;
  to: string;
  xillio_id: string;
  body: string;
  attachments?: string[];
  timestamp: Date;
}
