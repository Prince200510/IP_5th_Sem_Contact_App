import User from '../models/User.js';
import Contact from '../models/Contact.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ email: { $ne: process.env.ADMIN_EMAIL } })
      .select('-password')
      .sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserContactCount = async (req, res) => {
  try {
    const count = await Contact.countDocuments({ ownerId: req.params.userId });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
