import api from './api';

export const getContacts = async () => {
  const response = await api.get('/contacts');
  return response.data;
};

export const createContact = async (contactData) => {
  const response = await api.post('/contacts', contactData);
  return response.data;
};

export const getContact = async (id) => {
  const response = await api.get(`/contacts/${id}`);
  return response.data;
};

export const updateContact = async (id, contactData) => {
  const response = await api.put(`/contacts/${id}`, contactData);
  return response.data;
};

export const deleteContact = async (id) => {
  const response = await api.delete(`/contacts/${id}`);
  return response.data;
};

export const mergeContacts = async (contactIds) => {
  const response = await api.post('/contacts/merge', { contactIds });
  return response.data;
};

export const shareContact = async (id) => {
  const response = await api.post(`/contacts/${id}/share`);
  return response.data;
};

export const getContactQR = async (id) => {
  const response = await api.get(`/contacts/${id}/qr`);
  return response.data;
};

export const sendContactSMS = async (id, phoneNumber) => {
  const response = await api.post(`/contacts/${id}/sms`, { phoneNumber });
  return response.data;
};

export const getSharedContact = async (token) => {
  const response = await api.get(`/share/${token}`);
  return response.data;
};

export const getAllUsers = async () => {
  const response = await api.get('/admin/users');
  return response.data;
};

export const getUserContactCount = async (userId) => {
  const response = await api.get(`/admin/users/${userId}/count`);
  return response.data;
};
