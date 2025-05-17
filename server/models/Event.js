import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  tags: [{ type: String }],
  capacity: { type: Number, required: true },
  availableTickets: { type: Number, required: true },
  bookings: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // ← Add this
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

const Event = mongoose.model("Event", eventSchema);
export default Event;
