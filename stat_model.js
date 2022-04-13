import mongoose from 'mongoose';

const statSchema = mongoose.Schema({
    userId: Number,
    userName: String,
    qId: Number,
    success: Boolean
});

export default mongoose.model('Stat', statSchema);