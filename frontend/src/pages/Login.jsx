import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Input from '../components/Input';
import Button from '../components/Button';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function Login() {
  const { login, isAuthenticated, user } = useAuthStore();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    if (isAuthenticated && user && !user.isAdmin) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const onSubmit = async (data) => {
    try {
      setError('');
      const user = await login(data);
      
      await Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: `Welcome back, ${user.firstName}!`,
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
        timerProgressBar: true
      });
      
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed';
      setError(errorMessage);
      
      Swal.fire({
        icon: 'error',
        title: 'Login Failed!',
        html: `<p style="font-size: 16px; color: #374151;">
          ${errorMessage === 'Invalid credentials' 
            ? 'The email or password you entered is incorrect.<br><br>Please check your credentials and try again.' 
            : errorMessage}
        </p>`,
        confirmButtonColor: '#1E3A8A',
        confirmButtonText: 'Try Again'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-blue-800 to-blue-900 flex items-center justify-center px-4 py-12">
      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-0 bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-neutral hover:text-primary mb-6">
              <span className="mr-2">←</span> Back to home
            </Link>
            <h2 className="text-3xl font-bold text-primary mb-2">Welcome Back</h2>
            <p className="text-neutral">Sign in to access your contacts</p>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
              <p className="font-medium">Login Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              placeholder="your.email@example.com"
              {...register('email', { required: 'Email is required' })}
              error={errors.email?.message}
            />
            
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register('password', { required: 'Password is required' })}
              error={errors.password?.message}
            />

            <Button type="submit" variant="primary" className="w-full py-3 text-lg font-semibold">
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-neutral">
              Don't have an account?{' '}
              <Link to="/register" className="text-primary font-semibold hover:underline">
                Create Account
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-neutral mb-3">Need admin access?</p>
            <Link to="/admin-login">
              <Button variant="secondary" className="w-full">
                Admin Login
              </Button>
            </Link>
          </div>
        </div>

        <div className="hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-primary to-blue-900 text-white">
          <div className="mb-8">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-4">
              <span className="text-primary text-3xl font-bold">C</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">Contact App</h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              Your professional contact management solution. Access your contacts anywhere, anytime.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-xl">📇</span>
              </div>
              <div>
                <h4 className="font-semibold mb-1">All Your Contacts</h4>
                <p className="text-blue-100 text-sm">Access and manage all your contacts in one secure place</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-xl">🔄</span>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Smart Merging</h4>
                <p className="text-blue-100 text-sm">Automatically merge duplicate contacts and keep data clean</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-xl">🔐</span>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Secure Access</h4>
                <p className="text-blue-100 text-sm">Protected with JWT authentication and encryption</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
