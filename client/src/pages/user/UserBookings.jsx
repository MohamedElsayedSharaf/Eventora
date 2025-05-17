// src/pages/user/UserBookings.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import bookingService from '../../services/booking';
import LoadingSpinner from '../../components/Ui/LoadingSpinner';

const UserBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await bookingService.getUserBookings(user._id);
        setBookings(data);
      } catch (error) {
        console.error('Failed to fetch bookings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user._id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        My Bookings
      </h1>

      {bookings.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            You haven't made any bookings yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map(booking => (
            <div 
              key={booking._id} 
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {booking.event.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {new Date(booking.event.date).toLocaleString()}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Tickets: {booking.tickets}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserBookings;