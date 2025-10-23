import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from './store/authStore';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import ContactList from './pages/ContactList';
import ContactEditor from './pages/ContactEditor';
import MergeContacts from './pages/MergeContacts';
import ShareContact from './pages/ShareContact';

function ProtectedRoute({ children }) {
  const { isAuthenticated, checkAuth } = useAuthStore();
  
  useEffect(() => {
    checkAuth();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function AdminRoute({ children }) {
  const { isAuthenticated, user, checkAuth } = useAuthStore();
  
  useEffect(() => {
    checkAuth();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/admin-login" replace />;
  }

  if (!user?.isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function App() {
  const { isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/contacts" 
          element={
            <ProtectedRoute>
              <ContactList />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/contacts/new" 
          element={
            <ProtectedRoute>
              <ContactEditor />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/contacts/:id/edit" 
          element={
            <ProtectedRoute>
              <ContactEditor />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/merge" 
          element={
            <ProtectedRoute>
              <MergeContacts />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/share" 
          element={
            <ProtectedRoute>
              <ShareContact />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/admin-dashboard" 
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
