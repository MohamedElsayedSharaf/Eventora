// src/services/bookings.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getUserBookings = async (userId) => {
  const response = await axios.get(`${API_URL}/bookings/user/${userId}`);
  return response.data;
};

const cancelBooking = async (bookingId) => {
  const response = await axios.delete(`${API_URL}/bookings/${bookingId}`);
  return response.data;
};

export default {
  getUserBookings,
  cancelBooking,
};