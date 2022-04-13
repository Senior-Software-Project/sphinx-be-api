import mongoose from 'mongoose';

// eslint-disable-next-line new-cap
const statSchema = mongoose.Schema({
  userId: Number,
  userName: String,
  qId: Number,
  success: Boolean,
});

export default mongoose.model('Stat', statSchema);
