# Travel Guide API

NestJS REST API with Mongoose. Implements catalog entities (Destination, Tour, Hotel, Room) with CRUD and pagination, and read-only Trip and Booking endpoints.

## Setup

```bash
npm install
cp .env.example .env   # set MONGODB_URI and PORT if needed
npm run start:dev
```

Base URL: `http://localhost:3001/api` (or `PORT` from env).

## Endpoints

| Resource     | GET (list) | GET (one) | POST | PATCH | DELETE |
|-------------|------------|-----------|------|-------|--------|
| Destinations| ✅ pagination, `continent`, `country` | ✅ by id or `by-slug/:slug` | Admin | Admin | Admin |
| Tours       | ✅ pagination, `destinationId`, `minDays`, `maxPrice` | ✅ by id or `by-slug/:slug` | Admin | Admin | Admin |
| Hotels      | ✅ pagination, `destinationId`, `minRating` | ✅ by id or `by-slug/:slug` | Admin | Admin | Admin |
| Rooms       | ✅ `GET /rooms/hotel/:hotelId` + pagination, `minCapacity`, `maxPrice` | ✅ by id | Admin | Admin | Admin |
| Trips       | ✅ pagination, `userId`, `status` (read-only) | ✅ by id | — | — | — |
| Bookings    | ✅ pagination, `userId`, `tripId`, `status` (read-only) | ✅ by id | — | — | — |

Catalog write actions (POST/PATCH/DELETE) are protected with `AdminGuard`; ensure the request carries an authenticated user with `role: 'admin'` (e.g. via your auth middleware setting `request.user.id` or `request.user.sub`).

## Models (summary)

- **Destination**: name, slug, continent, country, tags, summary, heroImage, gallery, bestTimeToVisit, idealTripLength (min/max days).
- **Tour**: destination refs, title, slug, durationDays, groupSize, priceFrom, highlights, inclusions, exclusions, itinerary (per-day items).
- **Hotel**: destination ref, name, slug, rating, amenities, location, gallery.
- **Room**: hotel ref, name, capacity, bedType, pricePerNight, inventory.
- **Trip**: user ref, title, startDate, endDate, status (draft | booked | completed | canceled), itinerary items.
- **Booking**: user ref, trip ref, productType (tour | hotel | other), productId, price, currency, status (pending | confirmed | canceled), paymentId.
