import { Message } from '../entity/Message';
import { Conversation } from '../entity/Conversation';
import { AppDataSource } from '../data-source';
import {
  SmsRequest,
  EmailRequest,
  SmsWebHookRequest,
  EmailWebHookRequest,
  ConvoType,
} from '../types/types';
import { In } from 'typeorm';

const conversationRepository = AppDataSource.getRepository(Conversation);
const messageRepository = AppDataSource.getRepository(Message);

export class MessageService {
  async sendSms(request: SmsRequest): Promise<Message | null> {
    // wrap in transaction
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // get conversation id or start a new conversation
      let conversationId: number | null = null;
      let conversationInstance = await conversationRepository.findOne({
        where: {
          participant_ids: In([request.to, request.from]),
        },
      });

      if (!conversationInstance) {
        const conversation = new Conversation();
        conversation.participant_ids = [request.to, request.from];
        conversation.type = request.type as ConvoType;
        conversation.created_at = new Date();
        conversation.updated_at = new Date();
        await conversationRepository.save(conversation);
        conversationId = conversation.id;
      } else {
        conversationId = conversationInstance.id;
      }

      const message = new Message();
      message.to = request.to;
      message.from = request.from;
      message.type = request.type as ConvoType;
      message.body = request.body;
      message.timestamp = request.timestamp;
      message.conversation_id = conversationId;
      message.created_at = new Date();
      message.updated_at = new Date();

      await messageRepository.save(message);

      // add the message id to the message_ids array in the conversation
      const convo = await conversationRepository.findOne({
        where: { id: conversationId },
      });
      convo.message_ids.push(message.id.toString());
      await conversationRepository.save(convo);

      await queryRunner.commitTransaction();
      return message;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async sendEmail(request: EmailRequest): Promise<Message | null> {
    // For now, treat email similar to SMS but with email type
    try {
      // Create a new conversation or find existing one
      let conversationId: number | null = null;
      let conversationInstance = await conversationRepository.findOne({
        where: {
          participant_ids: In([request.to, request.from]),
        },
      });

      if (!conversationInstance) {
        const conversation = new Conversation();
        conversation.participant_ids = [request.to, request.from];
        conversation.type = 'email';
        conversation.created_at = new Date();
        conversation.updated_at = new Date();
        await conversationRepository.save(conversation);
        conversationId = conversation.id;
      } else {
        conversationId = conversationInstance.id;
      }

      const message = new Message();
      message.to = request.to;
      message.from = request.from;
      message.type = request.type;
      message.body = request.body;
      message.timestamp = request.timestamp;
      message.conversation_id = conversationId;
      message.created_at = new Date();
      message.updated_at = new Date();

      await messageRepository.save(message);

      // Update conversation message_ids
      const convo = await conversationRepository.findOne({
        where: { id: conversationId },
      });
      if (convo) {
        convo.message_ids.push(message.id.toString());
        await conversationRepository.save(convo);
      }

      return message;
    } catch (error) {
      console.error('Failed to send email:', error);
      return null;
    }
  }

  async handleSmsEvent(request: SmsWebHookRequest): Promise<Message | null> {
    try {
      // Convert webhook request to internal message format
      const message = new Message();
      message.to = request.to;
      message.from = request.from;
      message.type = request.type as ConvoType;
      message.body = request.messageText;
      message.timestamp = request.createdAt;
      message.created_at = request.createdAt;
      message.updated_at = request.updatedAt;
      
      // Find or create conversation
      let conversationId: number | null = null;
      let conversationInstance = await conversationRepository.findOne({
        where: {
          participant_ids: In([request.to, request.from]),
        },
      });

      if (!conversationInstance) {
        const conversation = new Conversation();
        conversation.participant_ids = [request.to, request.from];
        conversation.type = 'sms';
        conversation.created_at = request.createdAt;
        conversation.updated_at = request.updatedAt;
        await conversationRepository.save(conversation);
        conversationId = conversation.id;
      } else {
        conversationId = conversationInstance.id;
      }

      message.conversation_id = conversationId;
      await messageRepository.save(message);

      // Update conversation message_ids
      const convo = await conversationRepository.findOne({
        where: { id: conversationId },
      });
      if (convo) {
        convo.message_ids.push(message.id.toString());
        await conversationRepository.save(convo);
      }

      return message;
    } catch (error) {
      console.error('Failed to handle SMS event:', error);
      return null;
    }
  }

  async handleEmailEvent(
    request: EmailWebHookRequest
  ): Promise<Message | null> {
    try {
      // Convert webhook request to internal message format
      const message = new Message();
      message.to = request.to;
      message.from = request.from;
      message.type = request.type;
      message.body = request.messageText;
      message.timestamp = request.createdAt;
      message.created_at = request.createdAt;
      message.updated_at = request.updatedAt;
      
      // Find or create conversation
      let conversationId: number | null = null;
      let conversationInstance = await conversationRepository.findOne({
        where: {
          participant_ids: In([request.to, request.from]),
        },
      });

      if (!conversationInstance) {
        const conversation = new Conversation();
        conversation.participant_ids = [request.to, request.from];
        conversation.type = 'email';
        conversation.created_at = request.createdAt;
        conversation.updated_at = request.updatedAt;
        await conversationRepository.save(conversation);
        conversationId = conversation.id;
      } else {
        conversationId = conversationInstance.id;
      }

      message.conversation_id = conversationId;
      await messageRepository.save(message);

      // Update conversation message_ids
      const convo = await conversationRepository.findOne({
        where: { id: conversationId },
      });
      if (convo) {
        convo.message_ids.push(message.id.toString());
        await conversationRepository.save(convo);
      }

      return message;
    } catch (error) {
      console.error('Failed to handle email event:', error);
      return null;
    }
  }

  async getAllConversations(): Promise<Conversation[] | null> {
    try {
      const conversations = await conversationRepository.find({
        order: { updated_at: 'DESC' }
      });
      return conversations;
    } catch (error) {
      console.error('Failed to get all conversations:', error);
      return null;
    }
  }

  async getMessagesByConvoId(id: string): Promise<Message[] | null> {
    try {
      const messages = await messageRepository.find({
        where: { conversation_id: parseInt(id) },
        order: { timestamp: 'ASC' }
      });
      return messages;
    } catch (error) {
      console.error('Failed to get messages by conversation id:', error);
      return null;
    }
  }
}
