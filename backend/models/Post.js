const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who commented
  text: { type: String, required: true }, // Comment text
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

const postSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who created the post
  content: { type: String }, // Post content (text)
  media: { type: String }, // Path to the uploaded photo/video
  mediaType: { type: String, enum: ['image', 'video'] }, // Type of media (image or video)
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who liked the post
  comments: [commentSchema], // Array of comments
  shares: { type: Number, default: 0 }, // Number of shares
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

module.exports = mongoose.model('Post', postSchema);