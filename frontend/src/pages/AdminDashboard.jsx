import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Mail, Calendar, Briefcase } from 'lucide-react';
import NavBar from '../components/NavBar';
import { getAllUsers, getUserContactCount } from '../services/contactService';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [userCounts, setUserCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsersAndCounts();
  }, []);

  const fetchUsersAndCounts = async () => {
    try {
      const usersData = await getAllUsers();
      setUsers(usersData);
      
      const counts = {};
      for (const user of usersData) {
        const countData = await getUserContactCount(user._id);
        counts[user._id] = countData.count;
      }
      setUserCounts(counts);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  const totalUsers = users.length;
  const totalContacts = Object.values(userCounts).reduce((sum, count) => sum + count, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <Briefcase className="text-white" size={24} />
            </div>
            <h1 className="text-4xl font-bold text-primary">Admin Dashboard</h1>
          </div>
          <p className="text-neutral ml-15">Manage users and monitor system activity</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium mb-1">Total Users</p>
                <p className="text-4xl font-bold text-white">{totalUsers}</p>
              </div>
              <div className="w-14 h-14 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <Users className="text-white" size={28} />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium mb-1">Total Contacts</p>
                <p className="text-4xl font-bold text-white">{totalContacts}</p>
              </div>
              <div className="w-14 h-14 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <Mail className="text-white" size={28} />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium mb-1">Avg Contacts/User</p>
                <p className="text-4xl font-bold text-white">{totalUsers > 0 ? Math.round(totalContacts / totalUsers) : 0}</p>
              </div>
              <div className="w-14 h-14 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                <Calendar className="text-white" size={28} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <div className="px-6 py-4 bg-gradient-to-r from-primary to-blue-700 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <Users size={20} />
              User Management
            </h2>
            <p className="text-blue-100 text-sm mt-1">View and monitor all registered users</p>
          </div>

          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mb-4"></div>
              <p className="text-neutral">Loading users...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Contacts
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Joined Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {user.firstName} {user.lastName}
                            </div>
                            <div className="text-xs text-gray-500">ID: {user._id.slice(-6)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {userCounts[user._id] || 0} contacts
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700">
                          {new Date(user.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {users.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="text-gray-400" size={32} />
                  </div>
                  <p className="text-neutral text-lg">No users found</p>
                  <p className="text-gray-500 text-sm mt-2">Users will appear here once they register</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
