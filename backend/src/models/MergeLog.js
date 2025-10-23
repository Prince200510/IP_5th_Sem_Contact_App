import mongoose from 'mongoose';

const mergeLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mergedContactId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  sourceContactIds: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true
  },
  mergedData: {
    type: Object,
    required: true
  }
}, { timestamps: true });

export default mongoose.model('MergeLog', mergeLogSchema);
