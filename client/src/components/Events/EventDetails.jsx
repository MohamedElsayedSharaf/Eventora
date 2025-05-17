import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import eventService from "../../services/events";
import Button from "../Ui/Button";

const EventDetails = () => {
  const { eventId } = useParams();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await eventService.getEventById(eventId);
        setEvent(res);
      } catch (err) {
        console.error("Failed to load event:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  const isBooked = user && event?.bookings?.includes(user._id);

  const handleBooking = async () => {
    try {
      await eventService.bookEvent(eventId);
      navigate("/congratulations");
    } catch (err) {
      console.error("Booking failed:", err);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (!event) return <p className="text-center">Event not found.</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md">
      {/* Image */}
      <div
        className="h-64 bg-cover bg-center rounded-xl mb-6"
        style={{
          backgroundImage: `url(${event.image || "/default-event.jpg"})`,
        }}
      ></div>

      {/* Event Info */}
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{event.name}</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{event.description}</p>
      
      <div className="space-y-2 text-gray-700 dark:text-gray-300">
        <p><strong>Category:</strong> {event.category}</p>
        <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
        <p><strong>Time:</strong> {event.time || "N/A"}</p>
        <p><strong>Venue:</strong> {event.location || "N/A"}</p>
        <p><strong>Price:</strong> {event.price ? `$${event.price}` : "Free"}</p>
        <p><strong>Total Bookings:</strong> {event.bookings?.length || 0}</p>
      </div>

      {/* Booking Button */}
      <div className="mt-6">
        {user ? (
          isBooked ? (
            <div className="text-green-600 font-semibold text-center">
              ✅ You’ve already booked this event.
            </div>
          ) : (
            <Button className="w-full" onClick={handleBooking}>
              Book Now
            </Button>
          )
        ) : (
          <Link to="/login">
            <Button className="w-full">Log in to book</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default EventDetails;
