import express from 'express';
import {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
  mergeContacts,
  shareContact,
  getSharedContact,
  getContactQR,
  sendContactSMS
} from '../controllers/contact.controller.js';
import { protect } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.get('/', protect, getContacts);
router.post('/', protect, createContact);
router.get('/:id', protect, getContact);
router.put('/:id', protect, updateContact);
router.delete('/:id', protect, deleteContact);
router.post('/merge', protect, mergeContacts);
router.post('/:id/share', protect, shareContact);
router.get('/:id/qr', protect, getContactQR);
router.post('/:id/sms', protect, sendContactSMS);

export default router;
