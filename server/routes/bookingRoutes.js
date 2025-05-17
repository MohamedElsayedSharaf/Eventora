import express from 'express';
import {
  createBooking,
  getMyBookings,
  cancelBooking,
  getBookings
} from '../controllers/bookingController.js';
import { protect, allowedTo } from '../controllers/authController.js';

const router = express.Router();

router.route('/')
  .post(protect, createBooking)
  .get(protect, allowedTo('admin'), getBookings);

router.route('/mybookings').get(protect, getMyBookings);
router.route('/:id/cancel').put(protect, cancelBooking);

export default router;