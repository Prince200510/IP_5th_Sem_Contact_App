import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Input from '../components/Input';
import Button from '../components/Button';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function Register() {
  const { register: registerUser, isAuthenticated, user } = useAuthStore();
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
      const user = await registerUser(data);
      
      await Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: `Welcome to Contact App, ${user.firstName}!`,
        timer: 2500,
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
        timerProgressBar: true
      });
      
      navigate('/dashboard');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed!',
        html: `<p style="font-size: 16px; color: #374151;">
          ${errorMessage === 'User already exists' 
            ? 'An account with this email already exists.<br><br>Please use a different email or try logging in.' 
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
        <div className="hidden md:flex flex-col justify-center p-12 bg-gradient-to-br from-primary to-blue-900 text-white">
          <div className="mb-8">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mb-4">
              <span className="text-primary text-3xl font-bold">C</span>
            </div>
            <h2 className="text-4xl font-bold mb-4">Join Contact App</h2>
            <p className="text-blue-100 text-lg leading-relaxed">
              Create your free account and start managing your contacts like a professional.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-xl">✓</span>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Unlimited Contacts</h4>
                <p className="text-blue-100 text-sm">Store and manage unlimited contacts with detailed information</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-xl">✓</span>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Smart Features</h4>
                <p className="text-blue-100 text-sm">Merge duplicates, share via QR codes, and organize with tags</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-xl">✓</span>
              </div>
              <div>
                <h4 className="font-semibold mb-1">Secure & Private</h4>
                <p className="text-blue-100 text-sm">Your data is encrypted and protected with JWT authentication</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-neutral hover:text-primary mb-6">
              <span className="mr-2">←</span> Back to home
            </Link>
            <h2 className="text-3xl font-bold text-primary mb-2">Create Account</h2>
            <p className="text-neutral">Fill in your details to get started</p>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
              <p className="font-medium">Registration Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="First Name"
                placeholder="John"
                {...register('firstName', { required: 'First name is required' })}
                error={errors.firstName?.message}
              />
              
              <Input
                label="Last Name"
                placeholder="Doe"
                {...register('lastName', { required: 'Last name is required' })}
                error={errors.lastName?.message}
              />
            </div>
            
            <Input
              label="Email Address"
              type="email"
              placeholder="john.doe@example.com"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              error={errors.email?.message}
            />
            
            <Input
              label="Password"
              type="password"
              placeholder="Minimum 6 characters"
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              error={errors.password?.message}
            />

            <Button type="submit" variant="primary" className="w-full py-3 text-lg font-semibold">
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-neutral">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
