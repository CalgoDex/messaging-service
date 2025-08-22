import { Request, Response } from 'express';
import { MessageService } from '../services/messageService';
import {
  EmailType,
  SmsWebHookRequest,
  EmailWebHookRequest,
} from '../types/types';

export class MessageController {
  private messageService: MessageService;

  constructor() {
    this.messageService = new MessageService();
  }

  sendSms = async (req: Request, res: Response): Promise<void> => {
    try {
      const message = await this.messageService.sendSms(req.body);
      res.status(200).json({
        success: true,
        data: message,
        message: 'SMS sent successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to send SMS',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  sendEmail = async (req: Request, res: Response): Promise<void> => {
    try {
      const message = await this.messageService.sendEmail(req.body);
      res.status(200).json({
        success: true,
        data: message,
        message: 'Email sent successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to send email',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  handleSmsEvent = async (req: Request, res: Response): Promise<void> => {
    try {
      const { from, to, type, body, timestamp, messaging_provider_id } =
        req.body;
      if (!from || !to || !type || !body || !timestamp) {
        res.status(400).json({
          success: false,
          message: 'SMS event is required',
        });
        return;
      }

      const smsEventPayload = {
        from,
        to,
        type,
        body,
        timestamp,
        messaging_provider_id,
      };

      await this.messageService.handleSmsEvent(
        smsEventPayload as SmsWebHookRequest
      );

      res.status(200).json({
        success: true,
        message: 'SMS event handled successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to process SMS event',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  handleEmailEvent = async (req: Request, res: Response): Promise<void> => {
    try {
      const { from, to, body, timestamp, xillio_id } = req.body;
      if (!from || !to || !body || !timestamp) {
        res.status(400).json({
          success: false,
          message: 'Email event is required',
        });
        return;
      }

      const emailEventPayload = {
        from,
        to,
        type: 'email' as EmailType,
        body,
        timestamp,
        xillio_id,
      };

      await this.messageService.handleEmailEvent(
        emailEventPayload as EmailWebHookRequest
      );
      res.status(200).json({
        success: true,
        message: 'Email event handled successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to process email event',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  getAllConversations = async (req: Request, res: Response): Promise<void> => {
    try {
      const conversations = await this.messageService.getAllConversations();
      res.status(200).json({
        success: true,
        data: conversations,
        message: 'Conversations retrieved successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to get all conversations',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  getConvoMessages = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const messages = await this.messageService.getMessagesByConvoId(id);
      res.status(200).json({
        success: true,
        data: messages,
        message: 'Messages retrieved successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to get messages by conversation id',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };
}

