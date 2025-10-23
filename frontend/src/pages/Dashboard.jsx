import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Users, UserPlus, GitMerge, Share2, TrendingUp, Mail, Phone, Building2 } from 'lucide-react';
import NavBar from '../components/NavBar';
import { getContacts } from '../services/contactService';

export default function Dashboard() {
  const { user } = useAuthStore();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const data = await getContacts();
      setContacts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setLoading(false);
    }
  };

  if (user?.isAdmin) {
    return <Navigate to="/admin-dashboard" replace />;
  }

  const totalContacts = contacts.length;
  const contactsWithEmail = contacts.filter(c => c.email).length;
  const contactsWithPhone = contacts.filter(c => c.primaryPhone).length;
  const contactsWithCompany = contacts.filter(c => c.company).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <NavBar />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Welcome back, {user?.firstName}!</h1>
          <p className="text-neutral text-lg">Manage your contacts efficiently</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-2xl shadow-lg text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <Users size={24} />
              </div>
              <TrendingUp className="text-blue-200" size={20} />
            </div>
            <p className="text-blue-100 text-sm font-medium mb-1">Total Contacts</p>
            <p className="text-4xl font-bold">{loading ? '...' : totalContacts}</p>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-green-700 p-6 rounded-2xl shadow-lg text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <Mail size={24} />
              </div>
              <TrendingUp className="text-green-200" size={20} />
            </div>
            <p className="text-green-100 text-sm font-medium mb-1">With Email</p>
            <p className="text-4xl font-bold">{loading ? '...' : contactsWithEmail}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-6 rounded-2xl shadow-lg text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <Phone size={24} />
              </div>
              <TrendingUp className="text-purple-200" size={20} />
            </div>
            <p className="text-purple-100 text-sm font-medium mb-1">With Phone</p>
            <p className="text-4xl font-bold">{loading ? '...' : contactsWithPhone}</p>
          </div>

          <div className="bg-gradient-to-br from-orange-600 to-orange-700 p-6 rounded-2xl shadow-lg text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <Building2 size={24} />
              </div>
              <TrendingUp className="text-orange-200" size={20} />
            </div>
            <p className="text-orange-100 text-sm font-medium mb-1">With Company</p>
            <p className="text-4xl font-bold">{loading ? '...' : contactsWithCompany}</p>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link to="/contacts" className="group">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 h-full flex flex-col">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="text-white" size={28} />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">My Contacts</h2>
              <p className="text-gray-600 flex-grow">View and manage all your contacts</p>
            </div>
          </Link>
          
          <Link to="/contacts/new" className="group">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 h-full flex flex-col">
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <UserPlus className="text-white" size={28} />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Add Contact</h2>
              <p className="text-gray-600 flex-grow">Create a new contact</p>
            </div>
          </Link>
          
          <Link to="/merge" className="group">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 h-full flex flex-col">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <GitMerge className="text-white" size={28} />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Merge Contacts</h2>
              <p className="text-gray-600 flex-grow">Combine duplicate contacts</p>
            </div>
          </Link>
          
          <Link to="/share" className="group">
            <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 h-full flex flex-col">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Share2 className="text-white" size={28} />
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">Share Contact</h2>
              <p className="text-gray-600 flex-grow">Share via QR, URL, or SMS</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
