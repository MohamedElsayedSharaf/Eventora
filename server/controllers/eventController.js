import Event from '../models/Event.js';
import asyncHandler from 'express-async-handler';

// @desc    Create new event
// @route   POST /api/events
// @access  Private/Admin
const createEvent = asyncHandler(async (req, res) => {
  const {
    name,
    description,
    category,
    date,
    venue,
    price,
    image,
    tags,
    capacity
  } = req.body;

  const event = await Event.create({
    name,
    description,
    category,
    date,
    venue,
    price,
    image,
    tags,
    capacity,
    availableTickets: capacity,
    createdBy: req.user._id
  });

  res.status(201).json(event);
});

// @desc    Get all events
// @route   GET /api/events
// @access  Public
const getEvents = asyncHandler(async (req, res) => {
  const { category, search } = req.query;
  const query = {};
  
  if (category) query.category = category;
  if (search) query.name = { $regex: search, $options: 'i' };

  const events = await Event.find(query);
  res.json(events);
});

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
const getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  res.json(event);
});

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private/Admin
const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  const updatedEvent = await Event.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updatedEvent);
});

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private/Admin
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404);
    throw new Error('Event not found');
  }

  await event.remove();
  res.json({ message: 'Event removed' });
});

export {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent
};