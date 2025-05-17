
---

# Backend README (Node.js + Express)

```markdown
# EventBook Backend

This is the backend API for the EventBook booking app built with Node.js, Express, and MongoDB.

## Features

- User authentication (JWT)
- Event CRUD operations
- Booking management with conflict checks
- Admin endpoints
- RESTful API

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for auth
- dotenv for environment variables

## Prerequisites

- Node.js (>=14.x)
- MongoDB (local or cloud instance)

## Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/eventbook-backend.git
cd eventbook-backend

API Endpoints
POST /api/auth/register - Register user

POST /api/auth/login - Login user

GET /api/events - List events

POST /api/events - Create event (admin)

POST /api/bookings - Book an event
