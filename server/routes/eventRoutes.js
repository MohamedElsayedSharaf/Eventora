import express from 'express';
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent
} from '../controllers/eventController.js';
import { protect, allowedTo } from '../controllers/authController.js';

const router = express.Router();

router.route('/')
  .get(getEvents)
  .post(protect, allowedTo('admin'), createEvent);

router.route('/:id')
  .get(getEventById)
  .put(protect, allowedTo('admin'), updateEvent)
  .delete(protect, allowedTo('admin')   , deleteEvent);

export default router;