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

### 📊 Dashboard Analytics
- Real-time contact statistics
- Total contacts count
- Contacts with email tracking
- Contacts with phone tracking
- Contacts with company info tracking
- Beautiful gradient stat cards

### 👤 User Features
- User registration and login with JWT authentication
- Persistent login (token saved for regular users)
- Auto-redirect to dashboard if already logged in
- Create, read, update, and delete contacts
- Rich contact fields: name, phone, email, company, job title, tags, avatar, notes
- Contact search and filtering
- Beautiful modern UI with gradient cards and animations

### 🔄 Contact Management
- Smart contact merging (combines duplicate contacts)
- Intelligent field preservation (keeps all non-empty fields)
- Bulk contact selection for merging
- Visual feedback with SweetAlert2 confirmations
- Delete contacts with confirmation dialogs

### 🔗 Sharing Features
- Generate QR codes for any contact
- Create shareable public URLs
- Copy URL to clipboard with visual feedback
- SMS sharing via native phone app (no backend SMS service needed)
- Share URLs include all contact details except private notes

### 👨‍💼 Admin Panel
- Separate admin login portal
- View all registered users
- Monitor contact counts per user
- System-wide analytics (total users, total contacts, averages)
- Admin tokens NOT persisted (must login each session)
- Light mode professional dashboard
- Admin badge in navigation bar

### 🔒 Security
- JWT authentication with 7-day expiration
- Bcrypt password hashing (10 rounds)
- Protected routes with auth middleware
- Admin-only route protection
- Helmet security headers
- Express rate limiting
- CORS enabled with proper configuration
- Auto-logout on token expiration

### 🎨 UI/UX
- Modern gradient backgrounds (blue-purple theme)
- Responsive design for all screen sizes
- Smooth animations and transitions
- Hover effects on interactive elements
- Toast notifications for success messages
- Modal alerts for confirmations and errors
- Loading states with spinners
- Empty states with helpful messages
- Lucide-react icons throughout
- Consistent color scheme (Primary: #1E3A8A, Neutral: #6B7280)

## Screenshots

### User Dashboard
- Modern analytics cards showing contact statistics
- Quick action cards with hover animations
- Gradient backgrounds and professional design

### Contact List
- Card-based layout with avatars
- Edit and delete actions with icons
- Tags display for easy categorization

### Merge Contacts
- Visual selection with purple borders
- Selected contacts highlighted with check marks
- Confirmation dialog before merging

### Share Contact
- QR code generation with preview
- Copy-to-clipboard with visual feedback
- SMS sharing opens native app

### Admin Dashboard
- Light mode professional interface
- User management table
- System statistics overview

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User/Admin login
- `GET /api/auth/me` - Get current user

### Contacts
- `GET /api/contacts` - Get user's contacts
- `POST /api/contacts` - Create contact
- `GET /api/contacts/:id` - Get single contact
- `PUT /api/contacts/:id` - Update contact
- `DELETE /api/contacts/:id` - Delete contact
- `POST /api/contacts/merge` - Merge multiple contacts
- `GET /api/contacts/:id/qr` - Generate QR code
- `GET /api/contacts/:id/share` - Get shareable contact
- `POST /api/contacts/:id/sms` - Send SMS (deprecated - use frontend SMS intent)

### Admin (Protected)
- `GET /api/admin/users` - Get all users
- `GET /api/admin/users/:id/contacts/count` - Get user's contact count

## Environment Variables

### Backend (.env)
```env
PORT=4000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=random_secure_secret_key_minimum_32_characters
ADMIN_EMAIL=prince@gmail.com
ADMIN_PASSWORD=123456
API_BASE_URL=http://localhost:4000
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:4000/api
```

## Project Structure Details

- **backend/src/config/** - Database connection
- **backend/src/models/** - Mongoose schemas (User, Contact, MergeLog)
- **backend/src/controllers/** - Business logic
- **backend/src/middlewares/** - Auth and admin verification
- **backend/src/routes/** - API route definitions
- **frontend/src/components/** - Reusable UI components
- **frontend/src/pages/** - Page components (routes)
- **frontend/src/services/** - API calls and auth logic
- **frontend/src/store/** - Zustand state management

## Key Features Implementation

### Persistent Login (Users Only)
- Regular users: Token saved to localStorage
- Admin users: Token NOT saved (session-based)
- Auto-redirect if valid token exists on login/register pages

### Smart Contact Merging
- Select 2+ contacts to merge
- All non-empty fields are preserved
- First contact's ID is kept as primary
- Merge log saved for tracking

### SMS Sharing
- Uses `sms:` URL scheme to open native SMS app
- Pre-fills message with contact URL
- No backend SMS service required (cost-free)

### SweetAlert2 Integration
- Success notifications (toast style, top-right)
- Error alerts (centered modal with custom HTML)
- Confirmation dialogs for destructive actions
- Auto-dismiss for success messages

## Development Notes

- Clean code without comments (as specified)
- ES6 modules throughout
- React hooks for state management
- Protected routes with higher-order components
- Axios interceptors for automatic token attachment
- Form validation with react-hook-form
- Responsive Tailwind classes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Author

**Prince** - [GitHub Profile](https://github.com/Prince200510)

## Repository

[https://github.com/Prince200510/IP_5th_Sem_Contact_App](https://github.com/Prince200510/IP_5th_Sem_Contact_App)
