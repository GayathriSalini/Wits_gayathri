# 🚀 Women in Tech — Event Registration Platform

A full-stack event registration system built with **Next.js 14**, **Prisma ORM**, and **MongoDB Atlas**.

**Visit** `https://wits-gayathri.vercel.app/`

### 🔐 Default Admin Login

| Field | Value |
|---|---|
| **Username** | `admin` |
| **Password** | `admin123wits` |

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **Next.js 14** (App Router) | React framework with server & client components |
| **React 18** | UI library with hooks (`useState`, `useRouter`, `useSearchParams`) |
| **Tailwind CSS** | Utility-first CSS framework for styling |
| **Google Fonts (Inter)** | Modern typography |

### Backend
| Technology | Purpose |
|---|---|
| **Next.js API Routes** | RESTful API endpoints (`/api/register`) |
| **Prisma ORM** | Type-safe database client and schema management |
| **MongoDB Atlas** | Cloud-hosted NoSQL database |

### Dev Tools
| Tool | Purpose |
|---|---|
| **Node.js** | JavaScript runtime |
| **npm** | Package manager |
| **Prisma CLI** | Database schema push & client generation |

---

## 🏗 Architecture

```
┌──────────────────────────────────────────────────┐
│                    FRONTEND                       │
│                                                   │
│  Registration Page ──► API Route ──► MongoDB      │
│       (Client)          (Server)     (Cloud DB)   │
│                              │                    │
│  Success Page ◄──── URL Query Params              │
│       (Client)                                    │
│                                                   │
│  Admin Dashboard ──► Prisma Query ──► MongoDB     │
│   (Server Component)                              │
│                                                   │
│  Login Page ──► Client-side redirect ──► /admin   │
│       (Client)                                    │
└──────────────────────────────────────────────────┘
```

### Request Flow
1. **Registration**: User fills form → `POST /api/register` → Prisma saves to MongoDB → Redirect to `/success` with query params
2. **Success Page**: Reads `name`, `email`, `domain`, `regId`, `date` from URL search params and displays them
3. **Admin Dashboard**: Server Component fetches all registrations from MongoDB at render time → computes analytics → renders HTML
4. **Login**: Client-side form → redirects to `/admin` on submit

---

## 📁 Component Structure

```
e:\women\
├── prisma/
│   └── schema.prisma          # MongoDB data models (Registration, Admin, RateLimit)
├── src/
│   ├── app/
│   │   ├── layout.js          # Root layout — wraps all pages with Header + Footer
│   │   ├── globals.css        # Global styles & Tailwind config
│   │   ├── page.js            # Registration form (Client Component)
│   │   ├── success/
│   │   │   └── page.js        # Confirmation ticket (Client Component)
│   │   ├── admin/
│   │   │   └── page.js        # Analytics dashboard (Server Component)
│   │   ├── login/
│   │   │   └── page.js        # Login form (Client Component)
│   │   └── api/
│   │       └── register/
│   │           └── route.js   # POST endpoint — saves registration to DB
│   └── components/
│       ├── Header.js          # Dynamic nav bar — adapts per route
│       └── Footer.js          # Dynamic footer — adapts per route
├── .env                       # Environment variables (DB credentials, secrets)
├── .gitignore                 # Files excluded from version control
└── package.json               # Dependencies and scripts
```

---

## 🧠 State Management Approach

This project uses a **minimal, no-library** state management strategy:

| Pattern | Where Used | How |
|---|---|---|
| **React `useState`** | Registration form, Login form | Manages form field values, loading states, and error messages |
| **URL Search Params** | Success page | Registration data (`name`, `email`, `regId`, `date`) is passed via URL query string from the form redirect |
| **Server-Side Data Fetching** | Admin dashboard | Prisma queries run directly inside the Server Component — no client-side state needed |
| **Route-Based Conditional Rendering** | Header, Footer | `usePathname()` detects the current route to dynamically adjust navigation and styling |

> **Why no Redux/Zustand?** The app's data flows are simple and linear. Form data flows one-way (form → API → DB → dashboard), so React's built-in hooks are sufficient.

---

## 📊 Database Schema

```prisma
model Registration {
  id             String   @id @default(auto()) @map("_id") @db.ObjectId
  name           String
  email          String   @unique
  college        String
  yearOfStudy    String
  domain         String
  whyInterested  String
  registrationId String   @unique
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
}
```

---

## ⚡ Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
#    Create a .env file with:
#    MONGODB_URI="your-mongodb-connection-string"

# 3. Push schema to database
npx prisma db push

# 4. Generate Prisma client
npx prisma generate

# 5. Start development server
npm run dev
```

Visit `http://localhost:3000` to see the app.
Visit `https://wits-gayathri.vercel.app/`
---

## 📄 Pages Overview

| Route | Type | Description |
|---|---|---|
| `/` | Client Component | Registration form with validation |
| `/success` | Client Component | Confirmation ticket with dynamic user data |
| `/login` | Client Component | Admin login form |
| `/admin` | Server Component | Real-time analytics dashboard |

---

**Made by GAYATHRI** · © 2026 Women in Tech
