# Test Plan

Manual QA checklist for the MVP. Update the **Status** column as features land — see
"Current implementation status" at the bottom for what's mergeable today.

Legend: ✅ testable now · 🚧 blocked on a pending feature · — not started

## Student ordering

| # | Scenario | Expected result | Status |
|---|---|---|---|
| 1 | Can student view the menu? | Menu items load with name, price, availability | 🚧 needs `GET /menu` |
| 2 | Can student place an order? | Cart → checkout → demo payment → order created, `orderId` + `pickupCode` returned | 🚧 needs `POST /orders` |
| 3 | Can an empty cart be submitted? | Checkout is blocked / disabled with an empty cart | 🚧 needs cart + checkout UI |
| 4 | Unavailable item in cart at checkout | Order creation rejects it or removes it, not silently accepted | 🚧 needs `POST /orders` + menu availability check |
| 5 | Order total shown to student matches server total | Client-displayed total equals `totalAmount` computed server-side (never trust a client-submitted total) | 🚧 needs `POST /orders` |

## Canteen operations (staff)

| # | Scenario | Expected result | Status |
|---|---|---|---|
| 6 | Does a new order appear for staff? | New order shows under "Placed" / "All" within one refresh/poll cycle | ✅ |
| 7 | Can staff move ORDERED → PREPARING? | "Start Cooking" succeeds, badge updates to "Cooking" | ✅ |
| 8 | Can staff move PREPARING → READY? | "Mark Ready" succeeds, badge updates to "Ready for Pickup" | ✅ |
| 9 | Can staff mark READY → COLLECTED? | "Mark Collected" succeeds, order drops out of the active filters | ✅ |
| 10 | Status filter tabs (All/Placed/Cooking/Ready) | Each tab shows only matching orders | ✅ |
| 11 | Order details modal | Shows items, student, pickup code, payment status, total | ✅ |

## Order lifecycle + pickup

| # | Scenario | Expected result | Status |
|---|---|---|---|
| 12 | Invalid transition: ORDERED → READY | Rejected with 400 and a clear error message, status unchanged | ✅ |
| 13 | Invalid transition: ORDERED → COLLECTED | Rejected, status unchanged | ✅ |
| 14 | Invalid transition: READY → PREPARING | Rejected, status unchanged | ✅ |
| 15 | Invalid transition: COLLECTED → READY (or any transition after COLLECTED) | Rejected, status unchanged | ✅ |
| 16 | Duplicate action: mark READY twice in a row | Second call rejected (already READY, next valid status is COLLECTED) | ✅ |
| 17 | Missing/unknown order (bad `orderId`) | `GET /orders/:orderId` and staff status/collect calls return 404 with a message, not a crash | ✅ |
| 18 | Does student see status change (READY)? | Student order-status page reflects READY within one poll interval (~5s) of staff marking it | ✅ (`/order/:orderId`) |
| 19 | Does READY trigger a notification? | Browser notification fires once on the ORDERED/PREPARING → READY transition (not on every poll) | ✅ — requires notification permission granted in-browser to verify visually |
| 20 | Pickup code visible to student | Pickup code shown on the order-status page at all stages, emphasized once READY | ✅ |
| 21 | Order collected — student view | Student sees a "collected" confirmation instead of the timeline once COLLECTED; polling stops | ✅ |

## Cross-cutting / resilience

| # | Scenario | Expected result | Status |
|---|---|---|---|
| 22 | What happens if the API is unreachable? | UI shows an inline error state, not a blank screen or unhandled crash | ✅ staff dashboard has this; verify on student page too |
| 23 | What happens if an item becomes unavailable after being added to cart? | Checkout surfaces this before payment, not after | 🚧 needs `POST /orders` + menu availability check |
| 24 | Refresh/poll doesn't duplicate requests or leak intervals | No console errors, no growing number of network calls over time (check dev tools on a long-lived tab) | ✅ |
| 25 | Mobile responsiveness | Staff dashboard and order-status page are usable on a phone-width viewport | — needs manual pass on both pages |

## Current implementation status (update as branches merge)

- `main` — canteen operations (staff dashboard + `/staff/*` backend). Merged.
- `feature/order-lifecycle` — `GET /orders/:orderId`, student order-status page, polling,
  browser notification, pickup code display. Pending merge.
- `feature/student-ordering` — project foundation only so far; menu, cart, checkout,
  `POST /orders`, `GET /menu` not yet built.

Scenarios 1-5 and 23 stay 🚧 until student ordering lands — track them here rather than
filing them as bugs.
