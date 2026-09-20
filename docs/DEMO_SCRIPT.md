# Demo Script

## The pitch (30 seconds)

> Students queue twice at the canteen today — once to order, once to check if it's ready.
> Campus Canteen moves both online: order from your phone, get notified the instant it's
> ready, and only walk over once — to collect it.

## Golden test (what we're proving)

> Can a student place an order from their phone, can the canteen see it, can staff mark it
> PREPARING → READY, can the student see that it is ready without physically returning to
> the canteen, and can staff mark it COLLECTED?

## Full demo (once student ordering — menu, cart, checkout — is merged)

Two windows side by side: **staff dashboard** (laptop) and **student view** (phone or a
second browser window).

1. **Student:** open the app, browse the menu, add 1-2 items to the cart.
2. **Student:** checkout, go through the demo/sandbox UPI payment, confirm.
3. **Student:** land on the order confirmation screen — point out the order number and
   pickup code.
4. **Staff:** the new order appears on the dashboard under "Placed" — no refresh needed
   (or hit Refresh once) within a few seconds.
5. **Staff:** open the order, click "Start Cooking" — status moves to PREPARING.
6. **Student:** switch to the phone — status page now shows "Cooking" on the timeline.
7. **Staff:** click "Mark Ready".
8. **Student:** within ~5 seconds, the status page shows the "Your order is ready!" banner
   and (if notification permission was granted earlier) a browser notification pops up —
   this is the moment that sells the project.
9. **Student:** show the pickup code on screen.
10. **Staff:** click "Mark Collected".
11. **Student:** status page shows the "collected" confirmation.

## Partial demo (works today, before student ordering lands)

Uses the seeded orders in `backend/data/orders.json` (`ORD-00142` ORDERED, `ORD-00143`
PREPARING, `ORD-00144` READY) to show the same "staff acts → student sees it live" moment
without needing the ordering flow built yet.

1. Start the backend (`npm run dev` in `backend/`) and frontend (`npm run dev` in
   `frontend/`).
2. Open the staff dashboard at `/` in one window.
3. Open the student order-status page at `/order/ORD-00143` in another window (status:
   PREPARING).
4. On the staff dashboard, find `ORD-00143` and click "Mark Ready".
5. Switch to the student window — within 5 seconds the timeline advances to "Ready", the
   ready banner appears, and the pickup code (`4821`) is shown.
6. Back on staff, click "Mark Collected" — student window shows the collected confirmation
   on the next poll.

## If something breaks live

- Backend down / network hiccup: both the staff dashboard and student page show an inline
  error state instead of crashing — say so, restart the backend, hit Refresh.
- Notification permission not granted in the demo browser: the READY banner still appears
  on-page even without the OS-level notification — fall back to pointing at the banner.
- Out of time: skip straight to the "partial demo" sequence above — it's the shortest path
  through the golden test.
