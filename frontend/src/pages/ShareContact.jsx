import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { QrCode, Link as LinkIcon, MessageSquare, Copy, Check } from 'lucide-react';
import NavBar from '../components/NavBar';
import Button from '../components/Button';
import Input from '../components/Input';
import QRImage from '../components/QRImage';
import { getContacts, getContactQR } from '../services/contactService';

export default function ShareContact() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState('');
  const [qrData, setQrData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

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

  const handleGenerateQR = async () => {
    if (!selectedContact) {
      setMessage('Please select a contact');
      return;
    }

    try {
      setLoading(true);
      const data = await getContactQR(selectedContact);
      setQrData(data);
      setMessage('');
      setLoading(false);
    } catch (error) {
      setMessage('Failed to generate QR code');
      setLoading(false);
    }
  };

  const onSubmitSMS = (data) => {
    if (!selectedContact) {
      setMessage('Please select a contact');
      return;
    }

    if (!qrData?.shareUrl) {
      setMessage('Please generate QR code first');
      return;
    }

    const smsBody = encodeURIComponent(`Check out this contact: ${qrData.shareUrl}`);
    const smsUrl = `sms:${data.phoneNumber}?body=${smsBody}`;
    window.location.href = smsUrl;
    setMessage('Opening SMS app...');
  };

  const copyToClipboard = () => {
    if (qrData?.shareUrl) {
      navigator.clipboard.writeText(qrData.shareUrl);
      setCopied(true);
      setMessage('URL copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <NavBar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">Share Contact</h1>
          <p className="text-neutral">Share your contacts via QR code, URL, or SMS</p>
        </div>
        
        {message && (
          <div className={`max-w-2xl mx-auto mb-6 p-4 rounded-xl ${
            message.includes('Failed') || message.includes('Please') 
              ? 'bg-red-50 border border-red-200 text-red-700'
              : 'bg-green-50 border border-green-200 text-green-700'
          }`}>
            {message}
          </div>
        )}

        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Select Contact
            </label>
            <select
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={selectedContact}
              onChange={(e) => setSelectedContact(e.target.value)}
            >
              <option value="">Choose a contact...</option>
              {contacts.map((contact) => (
                <option key={contact._id} value={contact._id}>
                  {contact.firstName} {contact.lastName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-8">
            <Button 
              variant="primary" 
              onClick={handleGenerateQR}
              disabled={loading || !selectedContact}
              className="w-full flex items-center justify-center gap-2 py-3"
            >
              <QrCode size={20} />
              Generate QR Code & Share URL
            </Button>
          </div>

          {qrData && (
            <>
              <div className="mb-8 p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                <div className="flex items-center gap-2 mb-4">
                  <QrCode className="text-blue-600" size={24} />
                  <h3 className="text-lg font-bold text-gray-800">QR Code</h3>
                </div>
                <div className="flex justify-center mb-4 bg-white p-4 rounded-lg">
                  <QRImage value={qrData.shareUrl} size={200} />
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <LinkIcon className="text-green-600" size={20} />
                    <label className="text-gray-700 text-sm font-semibold">
                      Share URL
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={qrData.shareUrl}
                      readOnly
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-sm"
                    />
                    <Button 
                      variant={copied ? "secondary" : "primary"}
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 px-6"
                    >
                      {copied ? <Check size={18} /> : <Copy size={18} />}
                      {copied ? 'Copied' : 'Copy'}
                    </Button>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <MessageSquare className="text-orange-600" size={24} />
                  <h3 className="text-lg font-bold text-gray-800">Send via SMS</h3>
                </div>
                <form onSubmit={handleSubmit(onSubmitSMS)}>
                  <Input
                    label="Phone Number"
                    placeholder="+1234567890"
                    {...register('phoneNumber', { 
                      required: 'Phone number is required',
                      pattern: {
                        value: /^\+?[1-9]\d{1,14}$/,
                        message: 'Invalid phone number format'
                      }
                    })}
                    error={errors.phoneNumber?.message}
                  />
                  <Button 
                    type="submit" 
                    variant="primary"
                    disabled={!selectedContact || !qrData}
                    className="w-full flex items-center justify-center gap-2 py-3"
                  >
                    <MessageSquare size={20} />
                    Open SMS App
                  </Button>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
