# Campus Canteen

Digital campus canteen ordering and pickup system built during AWS First Commit 2026.

Students order from their phone, skip the double queue, and get notified the moment their
food is ready — see `TECH_FREEZE.md` for the full frozen spec (stack, data model, API
contract, team roles) and `docs/` for user flow, test plan, demo script, and bug tracking.

## Order lifecycle

```text
ORDERED → PREPARING → READY → COLLECTED
```

## Architecture

```text
React + Vite (Student UI, Staff UI)
        │  HTTPS
        ▼
   API Gateway HTTP API   (local dev: Express on :5000)
        │
        ▼
     AWS Lambda            (local dev: Express routes/controllers)
        │
        ▼
      DynamoDB             (local dev: backend/data/orders.json)
```

Locally the backend runs as a plain Express server against a JSON file so the whole team can
develop without AWS access set up yet; it maps 1:1 onto the Lambda + API Gateway + DynamoDB
architecture for deployment later.

## Getting started

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Runs on `http://localhost:5000`.

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Runs on `http://localhost:5173`. `VITE_API_BASE_URL` in `.env` should point at the backend
above.

### Routes (local dev)

- `/` — staff dashboard
- `/order/:orderId` — student order-status page (try `/order/ORD-00142`, `ORD-00143`, or
  `ORD-00144` against the seed data in `backend/data/orders.json`)

## Team / module ownership

| Module | Owner |
|---|---|
| Student Ordering | Mann |
| Canteen Operations | Manasvi |
| Order Lifecycle + Pickup | Laksh |
| UX / QA / Documentation | Menaka |

Shared contracts (order schema, statuses, API endpoints, DynamoDB structure, env var names)
live in `TECH_FREEZE.md` — don't change them without discussing with the team first.

## Git workflow

```text
main
├── feature/student-ordering
├── feature/canteen-operations
├── feature/order-lifecycle
└── feature/ux-qa
```

`branch → code → test locally → commit → push → pull request → review → merge`. No direct
pushes to `main`.
