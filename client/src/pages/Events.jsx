import React, { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { useAuth } from "../context/AuthContext";
import eventService from "../services/events";
import LoadingSpinner from "../components/Ui/LoadingSpinner";
import EventCard from "../components/Events/EventCard";
import SearchBar from "../components/Events/SearchBar";
import CategoryFilter from "../components/Events/CategoryFilter";

const Events = () => {
  const { user } = useAuth();
  const theme = useTheme();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await eventService.getEvents();
        const fetchedEvents = Array.isArray(data) ? data : data?.events || [];
        setEvents(fetchedEvents);
        setError(null);
      } catch (err) {
        setError("Failed to load events. Please try again later.");
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBookSuccess = (eventId) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event._id === eventId
          ? { ...event, bookings: [...(event.bookings || []), user._id] }
          : event
      )
    );
  };

  const categories = ["all", ...new Set(events.map((e) => e.category))];

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        paddingTop: "2.5rem",
        paddingBottom: "2.5rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: theme.palette.text.primary,
            }}
          >
            Upcoming Events
          </h1>
          <p
            style={{
              marginTop: "0.5rem",
              fontSize: "1.125rem",
              color: theme.palette.text.secondary,
            }}
          >
            Discover and book tickets for amazing experiences
          </p>
        </div>

        {/* Filters */}
        <div
          style={{
            marginBottom: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          className="md:flex-row md:flex flex text-white"
        >
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder="Search events..."
          />
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        {/* Results Header */}
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            color: theme.palette.text.primary,
            marginBottom: "1.5rem",
          }}
        >
          {selectedCategory === "all"
            ? "All Events"
            : `${selectedCategory} Events`}
          <span
            style={{
              marginLeft: "0.5rem",
              fontWeight: "normal",
              fontSize: "0.875rem",
              color: theme.palette.text.secondary,
            }}
          >
            ({filteredEvents.length} found)
          </span>
        </h2>

        {/* Events Section */}
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 256,
            }}
          >
            <LoadingSpinner size="large" />
          </div>
        ) : error ? (
          <div
            style={{
              backgroundColor: theme.palette.error.light,
              border: `1px solid ${theme.palette.error.main}`,
              color: theme.palette.error.dark,
              padding: "1rem",
              borderRadius: 8,
            }}
          >
            {error}
          </div>
        ) : filteredEvents.length === 0 ? (
          <div style={{ textAlign: "center", padding: "3rem 0" }}>
            <p
              style={{
                color: theme.palette.text.secondary,
                fontSize: "1.125rem",
              }}
            >
              No events found. Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {filteredEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                onBook={() => handleBookSuccess(event._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
