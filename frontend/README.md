# Campus Canteen Frontend

React 19 and Vite frontend for the Campus Canteen ordering and pickup system.

## Run Locally

```bash
npm install
copy .env.example .env
npm run dev
```

For a local backend, set `VITE_API_BASE_URL=http://localhost:5000` in `.env`. The example file currently contains the deployed API base URL. The other supported variables identify the canteen:

```dotenv
VITE_API_BASE_URL=http://localhost:5000
VITE_CANTEEN_NAME=KJSCE Main Canteen
VITE_CANTEEN_ID=KJSCE-MAIN
```

Available scripts:

```bash
npm run dev       # Start Vite with hot reload
npm run build     # Create a production build in dist/
npm run preview   # Preview the production build
npm run lint      # Run ESLint
```

## Application Views

- `/` loads the menu, category filters, search, and cart button.
- `/cart` manages quantities and calculates the cart total.
- `/payment` is currently a payment-coming-soon placeholder.
- `/order/:orderId` displays the order timeline and pickup code, polls every five seconds, and can request a ready notification.
- `/staff` displays active orders, filters by status, shows order details, and advances orders through their allowed actions.

## Main Source Areas

- `src/App.jsx`: React Router route table.
- `src/pages/`: page-level views and page-specific styles.
- `src/components/`: order cards, details, status badges, timeline, pickup code, and ready banner.
- `src/context/`: in-memory cart provider and `useCart` hook.
- `src/hooks/`: order polling and browser notification behavior.
- `src/services/api.js`: fetch wrappers for menu, orders, and staff actions.

## Backend Dependency

The frontend expects an API base URL in `VITE_API_BASE_URL`. The current backend supports order lookup and staff order management. The frontend also calls `GET /menu` and defines `POST /orders`, but those routes are not currently mounted by the Express backend, so menu loading and order creation require a compatible deployed API or additional backend implementation.