import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get all events
const getEvents = async () => {
  const response = await axios.get(`${API_URL}/events`);
  return response.data;
};

// Get single event
const getEventById = async (id) => {
  const response = await axios.get(`${API_URL}/events/${id}`);
  return response.data;
};

// Book event
const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user || !user.token) throw new Error('User not authenticated');
  return {
    Authorization: `Bearer ${user.token}`,
  };
};

const bookEvent = async (eventId) => {
  const response = await axios.post(
    `${API_URL}/bookings`,
    { eventId },
    { headers: getAuthHeaders() }
  );
  return response.data;
};
// Create event (admin only)
const createEvent = async (eventData) => {
  const response = await axios.post(`${API_URL}/events`, eventData, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  });
  return response.data;
};

// Update event (admin only)
const updateEvent = async (id, eventData) => {
  const response = await axios.put(`${API_URL}/events/${id}`, eventData, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  });
  return response.data;
};

// Delete event (admin only)
const deleteEvent = async (id) => {
  const response = await axios.delete(`${API_URL}/events/${id}`, {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  });
  return response.data;
};

const eventService = {
  getEvents,
  getEventById,
  bookEvent,
  createEvent,
  updateEvent,
  deleteEvent,
};

export default eventService;