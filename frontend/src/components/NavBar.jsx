import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Button from './Button';

export default function NavBar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-primary text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to={user?.isAdmin ? "/admin-dashboard" : "/dashboard"} className="text-2xl font-bold">
          Contact App
        </Link>
        {user && (
          <div className="flex items-center gap-4">
            <span className="text-sm">
              {user.isAdmin && <span className="bg-yellow-500 text-gray-900 px-2 py-1 rounded text-xs font-semibold mr-2">ADMIN</span>}
              {user.firstName} {user.lastName}
            </span>
            <Button variant="secondary" onClick={handleLogout}>Logout</Button>
          </div>
        )}
      </div>
    </nav>
  );
}
