// src/routes/UserRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import UserProfile from './UserProfile';
import UserBookings from './UserBookings';
import UserSettings from './UserSettings';

const UserRoutes = () => {
  const { user } = useAuth();

  // If not logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route path="profile" element={<UserProfile />} />
      <Route path="bookings" element={<UserBookings />} />
      <Route path="settings" element={<UserSettings />} />
    </Routes>
  );
};

export default UserRoutes;