# Contact App

A modern fullstack contact management application with real-time analytics, JWT authentication, QR code sharing, and beautiful UI powered by React and Node.js.

**Repository**: [https://github.com/Prince200510/IP_5th_Sem_Contact_App](https://github.com/Prince200510/IP_5th_Sem_Contact_App)

## Project Structure

```
contact app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Contact.js
│   │   │   └── MergeLog.js
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── contact.controller.js
│   │   │   └── admin.controller.js
│   │   ├── middlewares/
│   │   │   ├── auth.middleware.js
│   │   │   └── admin.middleware.js
│   │   ├── routes/
│   │   │   ├── auth.routes.js
│   │   │   ├── contact.routes.js
│   │   │   └── admin.routes.js
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── NavBar.jsx
    │   │   ├── Input.jsx
    │   │   ├── Button.jsx
    │   │   └── QRImage.jsx
    │   ├── pages/
    │   │   ├── Landing.jsx
    │   │   ├── Register.jsx
    │   │   ├── Login.jsx
    │   │   ├── AdminLogin.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── AdminDashboard.jsx
    │   │   ├── ContactList.jsx
    │   │   ├── ContactEditor.jsx
    │   │   ├── MergeContacts.jsx
    │   │   └── ShareContact.jsx
    │   ├── services/
    │   │   ├── api.js
    │   │   ├── auth.js
    │   │   └── contactService.js
    │   ├── store/
    │   │   └── authStore.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── package.json
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── vite.config.js
    └── .env
```

## Tech Stack

### Backend
- **Node.js + Express** - REST API server
- **MongoDB + Mongoose** - Database
- **bcrypt** - Password hashing
- **jsonwebtoken** - JWT authentication (7-day expiration)
- **qrcode** - QR code generation
- **helmet** - Security headers
- **express-rate-limit** - API rate limiting
- **cors** - Cross-origin resource sharing

### Frontend
- **Vite + React 18** - Fast build tool and UI library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Zustand** - Lightweight state management
- **Tailwind CSS v3** - Utility-first styling
- **react-hook-form** - Form validation
- **qrcode.react** - QR code components
- **jwt-decode** - Token decoding
- **lucide-react** - Modern icon library
- **sweetalert2** - Beautiful alert modals

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas cloud)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/Prince200510/IP_5th_Sem_Contact_App.git
cd IP_5th_Sem_Contact_App
```

**2. Backend Setup**
```bash
cd backend
npm install
```

Create `backend/.env` file:
```env
PORT=4000
MONGO_URI=mongodb+srv://your_mongodb_connection_string
JWT_SECRET=your_secure_random_secret_key
ADMIN_EMAIL=prince@gmail.com
ADMIN_PASSWORD=123456
API_BASE_URL=http://localhost:4000
```

Start backend server:
```bash
npm start
```

**3. Frontend Setup**
```bash
cd frontend
npm install
```

Create `frontend/.env` file:
```env
VITE_API_BASE_URL=http://localhost:4000/api
```

Start frontend development server:
```bash
npm run dev
```

**4. Access Application**
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:4000`

### Default Credentials

**Admin Login:**
- Email: `prince@gmail.com`
- Password: `123456`

**Test User:** Create your own account via registration

## Features

### User Features
- ✅ User registration and login with JWT
- ✅ Token persistence across page reloads
- ✅ Auto-login if valid token exists
- ✅ Create, read, update, delete contacts
- ✅ Rich contact fields (name, phone, email, company, job title, tags, notes, etc.)
- ✅ Merge duplicate contacts with intelligent field preservation
- ✅ Generate QR codes for contacts
- ✅ Share contacts via public URL
- ✅ Send contact via SMS (Twilio)
- ✅ Private notes (not shown in shared contacts)
- ✅ Responsive UI for mobile and desktop

### Admin Features
- ✅ Single admin account (pre-configured)
- ✅ View all registered users
- ✅ See contact count per user
- ✅ No access to private contact details

### Security Features
- ✅ JWT tokens (7-day expiration)
- ✅ Bcrypt password hashing
- ✅ Protected routes with middleware
- ✅ Admin-only routes
- ✅ Helmet security headers
- ✅ Rate limiting
- ✅ CORS enabled

## Color Theme

The app uses a minimal two-color palette plus white:
- **Primary**: #1E3A8A (Deep Professional Blue)
- **Neutral**: #6B7280 (Grey)
- **Background**: White

## API Documentation

See `backend/README.md` for complete API endpoint documentation.

## Development Notes

- No code comments included (as per specification)
- Production-ready with error handling
- JWT automatically attached to requests
- Token validation on protected routes
- Admin auto-created on first server start
- Merge feature keeps all non-empty fields
- Share URLs valid for 30 days
- QR codes generated server-side

## License

MIT
