import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Input from '../components/Input';
import Button from '../components/Button';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function AdminLogin() {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      setError('');
      const user = await login(data);
      if (user.isAdmin) {
        await Swal.fire({
          icon: 'success',
          title: 'Admin Login Successful!',
          text: 'Welcome to Admin Dashboard',
          timer: 2000,
          showConfirmButton: false,
          toast: true,
          position: 'top-end',
          timerProgressBar: true
        });
        
        navigate('/admin-dashboard');
      } else {
        setError('Admin access required');
        useAuthStore.getState().logout();
        
        Swal.fire({
          icon: 'error',
          title: 'Access Denied!',
          html: `<p style="font-size: 16px; color: #374151;">
            This account does not have admin privileges.<br><br>
            Please use the regular login for user access.
          </p>`,
          confirmButtonColor: '#1E3A8A',
          confirmButtonText: 'OK'
        });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      
      Swal.fire({
        icon: 'error',
        title: 'Admin Login Failed!',
        html: `<p style="font-size: 16px; color: #374151;">
          ${errorMessage === 'Invalid credentials' 
            ? 'The admin email or password you entered is incorrect.<br><br>Please check your credentials and try again.' 
            : errorMessage}
        </p>`,
        confirmButtonColor: '#1E3A8A',
        confirmButtonText: 'Try Again'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral via-gray-700 to-gray-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-neutral to-gray-700 p-8 text-white text-center">
            <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-neutral text-4xl font-bold">⚙️</span>
            </div>
            <h2 className="text-3xl font-bold mb-2">Admin Access</h2>
            <p className="text-gray-200">Secure administrative portal</p>
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                <p className="font-medium">Access Denied</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
              <p className="text-sm text-yellow-800 font-medium">⚠️ Restricted Access</p>
              <p className="text-xs text-yellow-700 mt-1">Only authorized administrators can access this area</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <Input
                label="Admin Email"
                type="email"
                placeholder="admin@example.com"
                {...register('email', { required: 'Email is required' })}
                error={errors.email?.message}
              />
              
              <Input
                label="Admin Password"
                type="password"
                placeholder="Enter admin password"
                {...register('password', { required: 'Password is required' })}
                error={errors.password?.message}
              />

              <Button type="submit" variant="primary" className="w-full py-3 text-lg font-semibold bg-neutral hover:bg-gray-700">
                Access Admin Panel
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <Link to="/" className="text-neutral hover:text-primary font-medium text-sm">
                ← Return to homepage
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-white text-sm">
          <p>For user access, please use the regular login</p>
          <Link to="/login" className="font-semibold hover:underline">
            User Login →
          </Link>
        </div>
      </div>
    </div>
  );
}
