import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Input from '../components/Input';
import Button from '../components/Button';
import { createContact, getContact, updateContact } from '../services/contactService';

export default function ContactEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  useEffect(() => {
    if (id) {
      fetchContact();
    }
  }, [id]);

  const fetchContact = async () => {
    try {
      const contact = await getContact(id);
      Object.keys(contact).forEach(key => {
        if (key === 'tags') {
          setValue('tags', contact.tags.join(', '));
        } else {
          setValue(key, contact[key]);
        }
      });
    } catch (error) {
      console.error('Error fetching contact:', error);
    }
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError('');
      
      const contactData = {
        ...data,
        tags: data.tags ? data.tags.split(',').map(t => t.trim()).filter(t => t) : []
      };

      if (id) {
        await updateContact(id, contactData);
      } else {
        await createContact(contactData);
      }
      
      navigate('/contacts');
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-primary mb-6">
            {id ? 'Edit Contact' : 'New Contact'}
          </h1>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                {...register('firstName', { required: 'First name is required' })}
                error={errors.firstName?.message}
              />
              
              <Input
                label="Last Name"
                {...register('lastName', { required: 'Last name is required' })}
                error={errors.lastName?.message}
              />
            </div>

            <Input
              label="Nickname"
              {...register('nickname')}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Primary Phone"
                {...register('primaryPhone')}
              />
              
              <Input
                label="Secondary Phone"
                {...register('secondaryPhone')}
              />
            </div>

            <Input
              label="Email"
              type="email"
              {...register('email')}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <Input
                label="Company"
                {...register('company')}
              />
              
              <Input
                label="Job Title"
                {...register('jobTitle')}
              />
            </div>

            <Input
              label="Avatar URL"
              {...register('avatarUrl')}
            />

            <div className="mb-4">
              <label className="block text-neutral text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                className="w-full px-4 py-2 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                rows="3"
                {...register('description')}
              />
            </div>

            <div className="mb-4">
              <label className="block text-neutral text-sm font-medium mb-2">
                Private Note
              </label>
              <textarea
                className="w-full px-4 py-2 border border-neutral rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                rows="3"
                {...register('privateNote')}
              />
            </div>

            <Input
              label="Tags (comma-separated)"
              placeholder="work, friend, family"
              {...register('tags')}
            />

            <div className="flex gap-4 mt-6">
              <Button type="submit" variant="primary" disabled={loading}>
                {loading ? 'Saving...' : id ? 'Update Contact' : 'Create Contact'}
              </Button>
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => navigate('/contacts')}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
