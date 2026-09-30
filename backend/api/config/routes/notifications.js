import express from 'express';
const router = express.Router();
import * as controller from '../../controllers/notificationController.js';

router.get('/', controller.getNotifications);
router.post('/', controller.createNotification);
router.patch('/:id/read', controller.markAsRead);
router.delete('/:id', controller.deleteNotification);

export default router;