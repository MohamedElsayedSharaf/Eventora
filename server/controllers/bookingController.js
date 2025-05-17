import Booking from '../models/Booking.js';
import Event from '../models/Event.js';
import asyncHandler from 'express-async-handler';

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
 const createBooking = async (req, res) => {
  const userId = req.user._id;
  const { eventId } = req.body;

  const event = await Event.findById(eventId);
  if (!event) return res.status(404).json({ message: 'Event not found' });

  if (event.bookings.includes(userId)) {
    return res.status(400).json({ message: 'Already booked' });
  }

  event.bookings.push(userId);
  await event.save();

  res.status(201).json({ message: 'Booking successful' });
};

// @desc    Get user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id })
    .populate('event', 'name date venue price image');
  res.json(bookings);
});

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private
const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id).populate('event');

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  if (booking.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized');
  }

  if (booking.status === 'cancelled') {
    res.status(400);
    throw new Error('Booking already cancelled');
  }

  // Update event availability
  const event = await Event.findById(booking.event._id);
  event.availableTickets += booking.tickets;
  await event.save();

  // Update booking status
  booking.status = 'cancelled';
  booking.cancelledAt = Date.now();
  await booking.save();

  res.json({ message: 'Booking cancelled' });
});

// @desc    Get all bookings (Admin)
// @route   GET /api/bookings
// @access  Private/Admin
const getBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({}).populate('user event');
  res.json(bookings);
});

export {
  createBooking,
  getMyBookings,
  cancelBooking,
  getBookings
};