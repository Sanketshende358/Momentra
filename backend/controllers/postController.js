
const Post = require('../models/Post');
const { verifyToken } = require('../config/jwt');

exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const media = req.file ? req.file.path : null; // File path for photo/video
    const mediaType = req.file ? (req.file.mimetype.startsWith('image') ? 'image' : 'video') : null; // Determine media type

    // Verify token to get user ID
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = verifyToken(token);
    const userId = decoded.userId;

    // Create new post
    const newPost = new Post({ userId, content, media, mediaType });
    await newPost.save();

    res.status(201).json({ message: 'Post created successfully', post: newPost });
  } catch (err) {
    console.error('Error creating post:', err); // Log the error for debugging
    res.status(500).json({ error: 'Error creating post' });
  }
};
exports.getRandomPosts = async (req, res) => {
  try {
    // Fetch all posts and populate user details
    const posts = await Post.aggregate([{ $sample: { size: 10 } }]) // Fetch 10 random posts
      .lookup({
        from: 'users', // Join with the users collection
        localField: 'userId',
        foreignField: '_id',
        as: 'userId',
      })
      .unwind('userId'); // Unwind the joined user data

    res.status(200).json(posts);
  } catch (err) {
    console.error('Error fetching random posts:', err);
    res.status(500).json({ error: 'Error fetching random posts' });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch posts for the specified user
    const posts = await Post.find({ userId }).populate('userId', 'name username profileImage');
    res.status(200).json(posts);
  } catch (err) {
    console.error('Error fetching user posts:', err);
    res.status(500).json({ error: 'Error fetching user posts' });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const { postId } = req.params;

    // Fetch the post and populate user details
    const post = await Post.findById(postId).populate('userId', 'name username profileImage');
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (err) {
    console.error('Error fetching post:', err);
    res.status(500).json({ error: 'Error fetching post' });
  }
};

// Like a post
exports.likePost = async (req, res) => {

  try {
    const { postId } = req.params;

    // Verify token to get user ID
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = verifyToken(token);
    const userId = decoded.userId;

    // Check if the user already liked the post
    const post = await Post.findById(postId);
    if (post.likes.includes(userId)) {
      return res.status(400).json({ error: 'You already liked this post' });
    }

    // Add user to likes array
    post.likes.push(userId);
    await post.save();


    res.status(200).json({ message: 'Post liked successfully', post });
  } catch (err) {
    console.error('Error liking post:', err);
    res.status(500).json({ error: 'Error liking post' });
  }
};

// Add a comment to a post
exports.addComment = async (req, res) => {

  try {
    const { postId } = req.params;
    const { text } = req.body;

    // Verify token to get user ID
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = verifyToken(token);
    const userId = decoded.userId;

    // Add comment to the post
    const post = await Post.findById(postId);
    post.comments.push({ userId, text });
    await post.save();

    res.status(200).json({ message: 'Comment added successfully', post });
  } catch (err) {
    console.error('Error adding comment:', err);
    res.status(500).json({ error: 'Error adding comment' });
  }
};

// Share a post
exports.sharePost = async (req, res) => {

  try {
    const { postId } = req.params;

    // Increment the share count
    const post = await Post.findByIdAndUpdate(postId, { $inc: { shares: 1 } }, { new: true });

    res.status(200).json({ message: 'Post shared successfully', post });
  } catch (err) {
    console.error('Error sharing post:', err);
    res.status(500).json({ error: 'Error sharing post' });
  }
};