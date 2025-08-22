import { Router } from 'express';
import { MessageController } from '../controllers/MessageController';

const router = Router();
const messageController = new MessageController();

// POST /api/v1/messages/send/sms - Send a message to a user via SMS
router.post('/messages/send/sms', messageController.sendSms);

// POST /api/v1/messages/send/email - Send a message to a user via Email
router.post('/messages/send/email', messageController.sendEmail);

// POST /api/v1/webhooks/sms - Receive a message from a provider (SMS)
router.post('/webhooks/sms', messageController.handleSmsEvent);

// POST /api/v1/webhooks/email - Receive a message from a provider (Email)
router.post('/webhooks/email', messageController.handleEmailEvent);

// GET /api/v1/conversations - Get all conversations
router.get('/conversations', messageController.getAllConversations);

// GET /api/v1/conversations/:id/messages - Get messages for a conversation
router.get('/conversations/:id/messages', messageController.getConvoMessages);

export { router as messageRoutes };
