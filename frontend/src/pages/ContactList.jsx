import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus, Mail, Phone, Briefcase, Edit, Trash2 } from 'lucide-react';
import Swal from 'sweetalert2';
import NavBar from '../components/NavBar';
import Button from '../components/Button';
import { getContacts, deleteContact } from '../services/contactService';

export default function ContactList() {
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

  const handleDelete = async (id, name) => {
    const result = await Swal.fire({
      title: 'Delete Contact?',
      text: `Are you sure you want to delete ${name}? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        await deleteContact(id);
        setContacts(contacts.filter(c => c._id !== id));
        
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Contact has been deleted.',
          timer: 2000,
          showConfirmButton: false
        });
      } catch (error) {
        console.error('Error deleting contact:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to delete contact',
          confirmButtonColor: '#1E3A8A'
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <NavBar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">My Contacts</h1>
            <p className="text-neutral">Manage your contact list</p>
          </div>
          <Link to="/contacts/new">
            <Button variant="primary" className="flex items-center gap-2">
              <UserPlus size={20} />
              Add Contact
            </Button>
          </Link>
        </div>
        
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mb-4"></div>
            <p className="text-neutral">Loading contacts...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contacts.map((contact) => (
              <div key={contact._id} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {contact.firstName.charAt(0)}{contact.lastName.charAt(0)}
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/contacts/${contact._id}/edit`}>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit size={18} />
                      </button>
                    </Link>
                    <button 
                      onClick={() => handleDelete(contact._id, `${contact.firstName} ${contact.lastName}`)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-1">
                  {contact.firstName} {contact.lastName}
                </h3>
                {contact.nickname && (
                  <p className="text-sm text-gray-500 mb-3 italic">"{contact.nickname}"</p>
                )}
                
                <div className="space-y-2 mb-4">
                  {contact.primaryPhone && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone size={16} className="text-blue-500" />
                      <span className="text-sm">{contact.primaryPhone}</span>
                    </div>
                  )}
                  {contact.email && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail size={16} className="text-green-500" />
                      <span className="text-sm truncate">{contact.email}</span>
                    </div>
                  )}
                  {contact.company && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Briefcase size={16} className="text-purple-500" />
                      <span className="text-sm">{contact.company}</span>
                    </div>
                  )}
                  {contact.jobTitle && (
                    <p className="text-sm text-gray-600 ml-6">{contact.jobTitle}</p>
                  )}
                </div>
                
                {contact.tags && contact.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {contact.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {!loading && contacts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus className="text-gray-400" size={40} />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No contacts yet</h3>
            <p className="text-neutral mb-6">Start building your contact list</p>
            <Link to="/contacts/new">
              <Button variant="primary" className="inline-flex items-center gap-2">
                <UserPlus size={20} />
                Create Your First Contact
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
