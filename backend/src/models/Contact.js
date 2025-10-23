import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  primaryPhone: {
    type: String,
    trim: true
  },
  secondaryPhone: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  company: {
    type: String,
    trim: true
  },
  jobTitle: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  privateNote: {
    type: String,
    trim: true
  },
  nickname: {
    type: String,
    trim: true
  },
  tags: {
    type: [String],
    default: []
  },
  avatarUrl: {
    type: String,
    trim: true
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Contact', contactSchema);
