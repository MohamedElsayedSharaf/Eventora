import { Link,  useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import eventService from "../../services/events";
import Button from "../Ui/Button";
import { useTheme } from "@emotion/react";

const EventCard = ({ event, onBook }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isBooked = user ? event.bookings?.includes(user._id) : false;

  const handleBooking = async () => {
    try {
      await eventService.bookEvent(event._id);
      onBook(event._id);
      navigate("/congratulations");
    } catch (err) {
      console.error("Booking failed:", err);
    }
  };

  return (
    <div
      style={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderRadius: "1rem",
        boxShadow: theme.shadows[5],
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s",
      }}
      className="hover:scale-[1.02]"
    >
      {/* Image */}
      <div
        className="h-48 bg-cover bg-center"
        style={{
          backgroundImage: `url(${event.image || "/default-event.jpg"})`,
        }}
      ></div>

      {/* Header */}
      <div
        style={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          padding: "1rem",
        }}
      >
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: theme.palette.text.primary,
          }}
        >
          {event.name}
        </h3>
        <p
          style={{ color: theme.palette.text.secondary, fontSize: "0.875rem" }}
        >
          {event.category}
        </p>
      </div>

      {/* Details */}
      <div
        style={{
          padding: "1rem",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          color: theme.palette.text.secondary,
          fontSize: "0.875rem",
        }}
      >
        <p>{event.description}</p>
        <p>
          📍 <strong>Location:</strong> {event.location || "N/A"}
        </p>
        <p>
          🗓️ <strong>Date:</strong>{" "}
          {event.date ? new Date(event.date).toLocaleDateString() : "N/A"}
        </p>
        <p>
          🕒 <strong>Time:</strong> {event.time || "N/A"}
        </p>
        <p>
          👥 <strong>Bookings:</strong> {event.bookings?.length || 0}
        </p>
      </div>

      {/* Footer / Button */}
      <div
        style={{
          borderTop: `1px solid ${theme.palette.divider}`,
          marginTop: "auto",
          padding: "1rem",
        }}
      >
        {user ? (
          <button
            onClick={handleBooking}
            disabled={isBooked}
            style={{
              width: "100%",
              padding: "0.5rem 1rem",
              borderRadius: "1rem",
              fontWeight: "600",
              color: "white",
              backgroundColor: isBooked
                ? theme.palette.action.disabled
                : theme.palette.primary.main,
              cursor: isBooked ? "not-allowed" : "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={(e) => {
              if (!isBooked)
                e.currentTarget.style.backgroundColor =
                  theme.palette.primary.dark;
            }}
            onMouseLeave={(e) => {
              if (!isBooked)
                e.currentTarget.style.backgroundColor =
                  theme.palette.primary.main;
            }}
          >
            {isBooked ? "You Booked This Event" : "Book Now"}
          </button>
        ) : (
          <Link to="/congratulations">
            <Button>Book now</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default EventCard;
