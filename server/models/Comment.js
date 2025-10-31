import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  author: { type: String, required: true },
  text: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Comment', commentSchema);
