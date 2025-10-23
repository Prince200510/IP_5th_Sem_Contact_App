import User from '../models/User.js';

export const adminOnly = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (req.user.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: 'Admin access required' });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Server error in admin verification' });
  }
};
