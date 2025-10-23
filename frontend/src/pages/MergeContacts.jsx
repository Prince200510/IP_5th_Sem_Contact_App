import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GitMerge, CheckCircle2 } from 'lucide-react';
import Swal from 'sweetalert2';
import NavBar from '../components/NavBar';
import Button from '../components/Button';
import { getContacts, mergeContacts } from '../services/contactService';

export default function MergeContacts() {
  const [contacts, setContacts] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const toggleSelection = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleMerge = async () => {
    if (selectedIds.length < 2) {
      setError('Please select at least 2 contacts to merge');
      return;
    }

    const result = await Swal.fire({
      title: 'Merge Contacts?',
      text: `Merge ${selectedIds.length} contacts into one? This action cannot be undone.`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#1E3A8A',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, merge them!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        setError('');
        await mergeContacts(selectedIds);
        
        await Swal.fire({
          icon: 'success',
          title: 'Merged!',
          text: 'Contacts have been merged successfully.',
          timer: 2000,
          showConfirmButton: false
        });
        
        navigate('/contacts');
      } catch (err) {
        setError(err.response?.data?.message || 'Merge failed');
        setLoading(false);
        
        Swal.fire({
          icon: 'error',
          title: 'Merge Failed',
          text: err.response?.data?.message || 'Failed to merge contacts',
          confirmButtonColor: '#1E3A8A'
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <NavBar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <GitMerge className="text-white" size={24} />
            </div>
            <h1 className="text-4xl font-bold text-primary">Merge Contacts</h1>
          </div>
          <p className="text-neutral text-lg ml-15">
            Select 2 or more contacts to merge. Non-empty fields will be preserved.
          </p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
            {error}
          </div>
        )}

        <div className="mb-6 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-700 font-semibold">
                Selected: <span className="text-purple-600 text-xl">{selectedIds.length}</span> contacts
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {selectedIds.length < 2 ? 'Select at least 2 contacts to merge' : 'Ready to merge'}
              </p>
            </div>
            <Button 
              variant="primary" 
              onClick={handleMerge}
              disabled={loading || selectedIds.length < 2}
              className="flex items-center gap-2 px-6 py-3"
            >
              <GitMerge size={20} />
              {loading ? 'Merging...' : 'Merge Selected'}
            </Button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact) => (
            <div 
              key={contact._id} 
              className={`bg-white p-6 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 border-2 ${
                selectedIds.includes(contact._id) 
                  ? 'border-purple-500 shadow-2xl transform scale-105' 
                  : 'border-gray-100 hover:border-purple-300'
              }`}
              onClick={() => toggleSelection(contact._id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {contact.firstName.charAt(0)}{contact.lastName.charAt(0)}
                </div>
                {selectedIds.includes(contact._id) ? (
                  <CheckCircle2 className="text-purple-600" size={28} />
                ) : (
                  <div className="w-7 h-7 border-2 border-gray-300 rounded-full"></div>
                )}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                {contact.firstName} {contact.lastName}
              </h3>
              {contact.primaryPhone && (
                <p className="text-gray-600 text-sm mb-1">📞 {contact.primaryPhone}</p>
              )}
              {contact.email && (
                <p className="text-gray-600 text-sm mb-1 truncate">✉️ {contact.email}</p>
              )}
              {contact.company && (
                <p className="text-gray-600 text-sm">🏢 {contact.company}</p>
              )}
            </div>
          ))}
        </div>
        
        {contacts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <GitMerge className="text-gray-400" size={40} />
            </div>
            <p className="text-neutral text-lg">No contacts available to merge</p>
          </div>
        )}
      </div>
    </div>
  );
}
