import { Router } from 'express';
import { messageRoutes } from './messageRoutes';
import auth from '../auth/auth';

const router = Router();

// API version prefix
const API_VERSION = 'v1';

// Mount routes
router.use(`/api/${API_VERSION}`, auth, messageRoutes);


// Default route
router.get('/', (_req, res) => {
  res.json({
    message: 'Welcome to Hatch Message API',
    version: '1.0.0',
    endpoints: {
      sendSms: `/api/${API_VERSION}/messages/send/sms`,
      sendEmail: `/api/${API_VERSION}/messages/send/email`,
      handleSmsEvent: `/api/${API_VERSION}/webhooks/sms`,
      handleEmailEvent: `/api/${API_VERSION}/webhooks/email`,
      getAllConversations: `/api/${API_VERSION}/conversations`,
      getConvoMessages: `/api/${API_VERSION}/conversations/:id/messages`,
    },
  });
});

export { router };
