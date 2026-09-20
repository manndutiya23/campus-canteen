# Bugs

Log format: one row per bug. Keep it short — link to a screenshot or paste the exact error
instead of describing it in prose. Severity: **Blocker** (breaks the demo path) /
**Major** (breaks a feature) / **Minor** (cosmetic, edge case).

| ID | Date | Found by | Area | Severity | Description | Status |
|---|---|---|---|---|---|---|
| BUG-001 | 2026-09-20 | Laksh | Frontend lint | Minor | `eslint-plugin-react-hooks`'s `set-state-in-effect` rule flags the standard "call an async fetch function directly inside `useEffect`" pattern used in `StaffDashboard.jsx` and `usePollOrderStatus.js`. App works correctly in the browser (verified) and `vite build` succeeds — this is a lint-rule strictness issue, not a runtime bug. Needs a team decision: relax the rule in `eslint.config.js`, or restructure the fetch calls to satisfy it. | Open |

## How to file one

1. Reproduce it twice — a flake isn't a bug report yet.
2. Note the exact steps, the order/orderId involved, and what you expected vs. saw.
3. Check `TEST_PLAN.md` first — if it's already tracked there as 🚧 pending a feature
   (e.g. menu/checkout not built yet), it's not a bug, don't duplicate it here.
4. Add a row above with the next `BUG-NNN` id.
