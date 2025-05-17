import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/Ui/LoadingSpinner';
import Modal from '../components/Ui/Modal';
import EventForm from '../components/Admin/AdminEvent';
import DataTable from '../components/Admin/DataTable';
import eventService from '../services/events';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admin = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const data = await eventService.getEvents();
        setEvents(data);
        setError(null);
      } catch (err) {
        setError('Failed to load events');
        toast.error('Failed to load events');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleCreate = () => {
    setCurrentEvent(null);
    setIsModalOpen(true);
  };

  const handleEdit = (event) => {
    setCurrentEvent(event);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await eventService.deleteEvent(id);
        setEvents(events.filter(event => event._id !== id));
        toast.success('Event deleted successfully');
      } catch (err) {
        toast.error('Failed to delete event');
        console.error(err);
      }
    }
  };

  const handleSubmit = async (eventData) => {
    try {
      setIsSubmitting(true);
      let updatedEvent;

      if (currentEvent) {
        // Update existing event
        updatedEvent = await eventService.updateEvent(currentEvent._id, eventData);
        setEvents(events.map(event => 
          event._id === currentEvent._id ? updatedEvent : event
        ));
        toast.success('Event updated successfully');
      } else {
        // Create new event
        updatedEvent = await eventService.createEvent(eventData);
        setEvents([...events, updatedEvent]);
        toast.success('Event created successfully');
      }

      setIsModalOpen(false);
    } catch (err) {
      toast.error(`Failed to ${currentEvent ? 'update' : 'create'} event`);
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded max-w-4xl mx-auto my-8">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Event Management
        </h1>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md shadow-sm"
        >
          Create New Event
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <DataTable
          events={events}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentEvent ? 'Edit Event' : 'Create Event'}
      >
        <EventForm
          event={currentEvent}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default Admin;