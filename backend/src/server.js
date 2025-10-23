import dotenv from 'dotenv';
import app from './app.js';
import { connectDB } from './config/db.js';
import User from './models/User.js';

dotenv.config();

const PORT = process.env.PORT || 4000;

const initializeAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (!adminExists) {
      await User.create({
        firstName: 'Admin',
        lastName: 'User',
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        isAdmin: true
      });
      console.log('Admin user created');
    }
  } catch (error) {
    console.error('Error initializing admin:', error.message);
  }
};

const startServer = async () => {
  try {
    await connectDB();
    await initializeAdmin();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
