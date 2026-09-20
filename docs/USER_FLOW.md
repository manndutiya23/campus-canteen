# User Flow

Reference: `TECH_FREEZE.md` (frozen spec) in the repo root.

## Student

```text
Open menu
 ↓
Select food, add to cart
 ↓
Checkout
 ↓
Demo/sandbox payment (UPI, always SUCCESS for MVP)
 ↓
Order created — receive orderId + pickupCode
 ↓
Leave the canteen
 ↓
Order status page polls GET /orders/{orderId} every 5s
 ↓
Status: ORDERED → PREPARING → READY
 ↓
"Your order is ready!" banner + browser notification (if permitted)
 ↓
Return to canteen, show pickup code
 ↓
Staff marks COLLECTED
```

**Screens:**

1. Menu (browse, add to cart) — Dev 1
2. Cart / Checkout — Dev 1
3. Demo payment confirmation — Dev 1
4. Order confirmation (orderId + pickupCode) — Dev 1
5. Order status page (`/order/:orderId`) — Dev 3
   - Status timeline (Placed → Cooking → Ready → Collected)
   - READY banner + pickup code, emphasized once READY
   - Collected confirmation state

## Staff

```text
Open staff dashboard (`/`)
 ↓
See active orders (ORDERED, PREPARING, READY), filterable by status
 ↓
Open an order → view details (items, student, pickup code)
 ↓
ORDERED → "Start Cooking" → PREPARING
 ↓
PREPARING → "Mark Ready" → READY
 ↓
Student shows pickup code
 ↓
READY → "Mark Collected" → COLLECTED
```

**Screens:**

1. Staff dashboard, order cards, status filter — Dev 2
2. Order details modal — Dev 2

## States and edge cases to cover in UI

- **Loading** — while the initial fetch is in flight (menu, staff orders, order status).
- **Empty** — no active orders on the staff dashboard for the selected filter.
- **Error** — API unreachable or non-2xx response (shown inline, not a blank screen).
- **Not found** — a mistyped or stale `orderId` on the student status page.
- **Terminal state** — once an order is COLLECTED, polling stops and the student sees a
  simple confirmation instead of the timeline/banner.
