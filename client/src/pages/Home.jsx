import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import EventCard from "../components/Events/EventCard";
import eventService from "../services/events";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/Ui/LoadingSpinner";
import CategoryFilter from "../components/Events/CategoryFilter";
import SearchBar from "../components/Events/SearchBar";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { user } = useAuth();
  const [featuredEvents, setFeaturedEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        setLoading(true);
        const data = await eventService.getEvents();
        const eventsArray = Array.isArray(data) ? data : data.events || [];
        setEvents(eventsArray);
        
        // Get 3 random featured events
        const shuffled = [...eventsArray].sort(() => 0.5 - Math.random());
        setFeaturedEvents(shuffled.slice(0, 3));
        
        setError(null);
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getEvents();
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

  const categories = ["all", ...new Set(events.map((event) => event.category))];

  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ backgroundColor: theme.palette.background.default }}
    >
      <main className="flex-grow">
        {/* Hero Section - Enhanced with gradient and CTA */}
        <section 
          className="py-20 px-4 text-center relative overflow-hidden"
          style={{
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' 
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: theme.palette.common.white
          }}
        >
          <div className="max-w-4xl mx-auto relative z-10">
            <h1 className="text-5xl font-bold mb-6 animate-fadeIn">
              Discover Amazing Events
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Find and book tickets for the best events in your area. Concerts,
              workshops, sports and more.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                onClick={() => navigate('/events')}
                sx={{
                  bgcolor: theme.palette.mode === 'dark' ? 'primary.light' : 'primary.main',
                  '&:hover': {
                    bgcolor: theme.palette.mode === 'dark' ? 'primary.dark' : 'primary.dark',
                  }
                }}
              >
                Browse All Events
              </Button>
              {!user && (
                <Button 
                  variant="outlined" 
                  color="secondary" 
                  size="large"
                  onClick={() => navigate('/register')}
                  sx={{
                    color: theme.palette.common.white,
                    borderColor: theme.palette.common.white,
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.1)',
                      borderColor: theme.palette.common.white
                    }
                  }}
                >
                  Join Now
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Featured Events Section */}
        {featuredEvents.length > 0 && (
          <section className="py-16 px-4 container mx-auto">
            <div className="text-center mb-12">
              <h2 
                className="text-3xl font-bold mb-4"
                style={{ color: theme.palette.text.primary }}
              >
                Featured Events
              </h2>
              <p 
                className="text-lg max-w-2xl mx-auto"
                style={{ color: theme.palette.text.secondary }}
              >
                Check out these hand-picked events you might love
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredEvents.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  onBook={() => handleBookSuccess(event._id)}
                  featured
                />
              ))}
            </div>
          </section>
        )}

        {/* Categories Section */}
        <section 
          className="py-16 px-4"
          style={{ 
            backgroundColor: theme.palette.mode === 'dark' 
              ? theme.palette.background.paper 
              : theme.palette.grey[100] 
          }}
        >
          <div className="container mx-auto">
            <h2 
              className="text-3xl font-bold text-center mb-12"
              style={{ color: theme.palette.text.primary }}
            >
              Popular Categories
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categories.filter(cat => cat !== 'all').map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "contained" : "outlined"}
                  onClick={() => setSelectedCategory(category)}
                  sx={{
                    textTransform: 'capitalize',
                    py: 2,
                    bgcolor: selectedCategory === category 
                      ? theme.palette.primary.main 
                      : 'transparent',
                    color: selectedCategory === category 
                      ? theme.palette.common.white 
                      : theme.palette.text.primary,
                    borderColor: theme.palette.mode === 'dark' 
                      ? theme.palette.grey[700] 
                      : theme.palette.grey[300],
                    '&:hover': {
                      borderColor: theme.palette.primary.main,
                      bgcolor: selectedCategory === category 
                        ? theme.palette.primary.dark 
                        : (theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)')
                    }
                  }}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="py-12 px-4 container mx-auto">
          <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>

          {/* Events Section */}
          <div>
            <h2
              className="text-2xl font-semibold mb-6"
              style={{ color: theme.palette.text.primary }}
            >
              {selectedCategory === "all"
                ? "All Events"
                : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Events`}
            </h2>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <LoadingSpinner />
              </div>
            ) : error ? (
              <div
                style={{
                  backgroundColor: theme.palette.error.light,
                  color: theme.palette.error.main,
                  border: `1px solid ${theme.palette.error.dark}`,
                }}
                className="px-4 py-3 rounded"
              >
                {error}
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="text-center py-12">
                <p
                  style={{ color: theme.palette.text.secondary }}
                  className="text-lg"
                >
                  No events found. Try adjusting your search or filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
        </section>

        {/* Testimonials Section */}
        <section 
          className="py-16 px-4"
          style={{ 
            backgroundColor: theme.palette.mode === 'dark' 
              ? theme.palette.background.default 
              : theme.palette.grey[50] 
          }}
        >
          <div className="container mx-auto">
            <h2 
              className="text-3xl font-bold text-center mb-12"
              style={{ color: theme.palette.text.primary }}
            >
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote: "Found amazing concerts through this platform. Booking is so easy!",
                  author: "Alex Johnson",
                  role: "Music Lover"
                },
                {
                  quote: "As an event organizer, this platform has helped me reach so many more people.",
                  author: "Sarah Williams",
                  role: "Event Organizer"
                },
                {
                  quote: "The variety of events is incredible. Something for everyone!",
                  author: "Michael Chen",
                  role: "Regular User"
                }
              ].map((testimonial, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-lg"
                  style={{
                    backgroundColor: theme.palette.background.paper,
                    boxShadow: theme.shadows[2]
                  }}
                >
                  <p 
                    className="text-lg italic mb-4"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    "{testimonial.quote}"
                  </p>
                  <p 
                    className="font-semibold"
                    style={{ color: theme.palette.text.primary }}
                  >
                    {testimonial.author}
                  </p>
                  <p 
                    className="text-sm"
                    style={{ color: theme.palette.text.secondary }}
                  >
                    {testimonial.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section 
          className="py-20 px-4 text-center"
          style={{
            background: theme.palette.mode === 'dark' 
              ? 'linear-gradient(135deg, #16213e 0%, #1a1a2e 100%)' 
              : 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
            color: theme.palette.common.white
          }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to Find Your Next Adventure?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of happy users discovering amazing events every day.
            </p>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              onClick={() => navigate(user ? '/events' : '/register')}
              sx={{
                bgcolor: theme.palette.common.white,
                color: theme.palette.primary.main,
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                }
              }}
            >
              {user ? 'Browse Events' : 'Get Started'}
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;