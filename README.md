# Campus Canteen

Digital campus canteen ordering and pickup system built during AWS First Commit 2026.

The repository contains a React/Vite frontend and an Express backend. The backend currently persists orders in a local JSON file and supports student order tracking plus staff order management.

## Current Features

- Browse and search menu items by category.
- Add items to an in-memory cart, change quantities, or remove items.
- View an order's status, item details, total, and pickup code.
- Poll an order every five seconds until it is collected.
- Request a browser notification when an order becomes ready.
- View active orders in the staff dashboard and filter by status.
- Move orders through the controlled workflow: `ORDERED` -> `PREPARING` -> `READY` -> `COLLECTED`.

## Repository Layout

```text
backend/
	app.js                         Express app, middleware, and route mounting
	server.js                      HTTP server entry point
	config/env.js                  PORT and canteen configuration
	controllers/                   HTTP request handlers
	routes/                        Student and staff route definitions
	services/order.service.js      JSON-backed order and status logic
	data/orders.json               Local order data
	functions/                     Reserved function folders; currently empty

frontend/
	src/App.jsx                    Application routes
	src/pages/                     Menu, cart, payment, tracking, and staff views
	src/components/                Order and status UI components
	src/context/                   In-memory cart state
	src/hooks/                     Order polling and ready notifications
	src/services/api.js            Frontend API client
```

## Requirements

- Node.js 18 or newer
- npm

## Setup

Install dependencies independently for the two applications:

```bash
cd backend
npm install

cd ../frontend
npm install
```

### Backend configuration

Copy `backend/.env.example` to `backend/.env` when you need to override defaults:

```dotenv
PORT=5000
CANTEEN_ID=KJSCE-MAIN
```

Start the API from the `backend` directory:

```bash
npm run dev      # nodemon
# or
npm start        # node server.js
```

The API listens at `http://localhost:5000` by default.

### Frontend configuration

Copy `frontend/.env.example` to `frontend/.env` and point the API at the backend when running locally:

```dotenv
VITE_API_BASE_URL=http://localhost:5000
VITE_CANTEEN_NAME=KJSCE Main Canteen
VITE_CANTEEN_ID=KJSCE-MAIN
```

Start the frontend from the `frontend` directory:

```bash
npm run dev
```

Other frontend commands are `npm run build`, `npm run preview`, and `npm run lint`.

## Frontend Routes

| Path | View | Purpose |
| --- | --- | --- |
| `/` | Menu | Search and add available menu items |
| `/cart` | Cart | Adjust quantities and review the total |
| `/payment` | Payment | Shows the payment-coming-soon placeholder |
| `/order/:orderId` | Order status | Track status and display pickup code |
| `/staff` | Staff dashboard | Manage active orders |

## Backend API

All responses are JSON. CORS is enabled for the frontend.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | Health response |
| `GET` | `/orders/:orderId` | Return one order or `404` |
| `GET` | `/staff/orders` | Return orders in `ORDERED`, `PREPARING`, or `READY` states |
| `PATCH` | `/staff/orders/:orderId/status` | Advance an order with `{ "status": "PREPARING" }` or `{ "status": "READY" }` |
| `PATCH` | `/staff/orders/:orderId/collect` | Advance a `READY` order to `COLLECTED` |

Invalid statuses and invalid transitions return a client error. Unknown orders return `404`.

## Order Data

Orders in `backend/data/orders.json` contain:

- `orderId`
- `student.name` and `student.identifier`
- `items[]` with `itemId`, `name`, `quantity`, and `price`
- `totalAmount`
- `payment.method` and `payment.status`
- `status`, `pickupCode`, `createdAt`, and `updatedAt`

The service writes status changes directly to this JSON file. This is suitable for local development, not concurrent or production storage.

## Known Limitations

- The payment screen is a placeholder; no payment is processed.
- The frontend API client includes `GET /menu` and `POST /orders`, but the current Express app does not mount menu or order-creation routes. The existing menu and checkout flow therefore needs those backend endpoints, or a compatible deployed API, to work end to end.
- There is no authentication or staff authorization.
- The cart is held in React memory and is cleared on a full page reload.
- There are no automated tests yet. `npm run lint` currently reports hook-rule errors in the existing polling and staff-dashboard effects; `npm run build` succeeds.

## Development Notes

The root `package.json` only contains shared Tailwind dependencies and does not define application scripts. Run commands from `backend` or `frontend` as shown above. The root `docs/` directory and backend function folders are currently empty placeholders.
