import Contact from '../models/Contact.js';
import MergeLog from '../models/MergeLog.js';
import QRCode from 'qrcode';
import jwt from 'jsonwebtoken';

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ ownerId: req.user._id }).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createContact = async (req, res) => {
  try {
    const contact = await Contact.create({
      ...req.body,
      ownerId: req.user._id
    });
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, ownerId: req.user._id });
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.id, ownerId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndDelete({ _id: req.params.id, ownerId: req.user._id });
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const mergeContacts = async (req, res) => {
  try {
    const { contactIds } = req.body;

    if (!contactIds || contactIds.length < 2) {
      return res.status(400).json({ message: 'At least 2 contacts required for merge' });
    }

    const contacts = await Contact.find({
      _id: { $in: contactIds },
      ownerId: req.user._id
    });

    if (contacts.length !== contactIds.length) {
      return res.status(404).json({ message: 'Some contacts not found' });
    }

    const mergedData = {};
    const fields = [
      'firstName', 'lastName', 'primaryPhone', 'secondaryPhone', 'email',
      'company', 'jobTitle', 'description', 'privateNote', 'nickname', 'avatarUrl'
    ];

    for (const field of fields) {
      for (const contact of contacts) {
        if (contact[field] && !mergedData[field]) {
          mergedData[field] = contact[field];
        }
      }
    }

    const allTags = new Set();
    contacts.forEach(contact => {
      if (contact.tags) {
        contact.tags.forEach(tag => allTags.add(tag));
      }
    });
    mergedData.tags = Array.from(allTags);
    mergedData.ownerId = req.user._id;

    const mergedContact = await Contact.create(mergedData);

    await MergeLog.create({
      userId: req.user._id,
      mergedContactId: mergedContact._id,
      sourceContactIds: contactIds,
      mergedData
    });

    await Contact.deleteMany({ _id: { $in: contactIds }, ownerId: req.user._id });

    res.status(201).json(mergedContact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const shareContact = async (req, res) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, ownerId: req.user._id });
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    const shareToken = jwt.sign(
      { contactId: contact._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    const shareUrl = `${process.env.API_BASE_URL}/api/share/${shareToken}`;

    res.json({ shareToken, shareUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSharedContact = async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
    const contact = await Contact.findById(decoded.contactId).select('-privateNote -ownerId');
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.json(contact);
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired share link' });
  }
};

export const getContactQR = async (req, res) => {
  try {
    const contact = await Contact.findOne({ _id: req.params.id, ownerId: req.user._id });
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    const shareToken = jwt.sign(
      { contactId: contact._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    const shareUrl = `${process.env.API_BASE_URL}/api/share/${shareToken}`;
    const qrCodeDataURL = await QRCode.toDataURL(shareUrl);

    res.json({ qrCode: qrCodeDataURL, shareUrl });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendContactSMS = async (req, res) => {
  try {
    return res.status(503).json({ message: 'SMS service not available' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
