const User = require('../models/User');
const { verifyToken } = require('../config/jwt');
const mongoose = require('mongoose');

exports.updateUserInfo = async (req, res) => {
  try {
    const { dateOfBirth, bio } = req.body;

    // Validation
    if (!dateOfBirth || !bio) {
      return res.status(400).json({ error: 'Date of birth and bio are required' });
    }

    // Verify token
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = verifyToken(token);
    const userId = decoded.userId;

    // Update user info
    await User.findByIdAndUpdate(userId, { dateOfBirth, bio });

    res.status(200).json({ message: 'User info updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error updating user info' });
  }
};
exports.uploadProfile = async (req, res) => {
  try {
    // Verify token
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = verifyToken(token);
    const userId = decoded.userId;

    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Update profile image
    const profileImage = req.file.path; // File path saved by multer
    await User.findByIdAndUpdate(userId, { profileImage });

    res.status(200).json({ message: 'Profile image uploaded successfully', profileImage });
  } catch (err) {
    console.error('Error uploading profile image:', err); // Log the error for debugging
    res.status(500).json({ error: 'Error uploading profile image' });
  }
};
exports.getUserData = async (req, res) => {
  try {
    // Verify token
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = verifyToken(token);
    const userId = decoded.userId;

    // Fetch user data
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching user data' });
  }
};

exports.searchUsers = async (req, res) => {
  try {
    const { query } = req.query;

    // Search for users by username or name
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: 'i' } }, // Case-insensitive search
        { name: { $regex: query, $options: 'i' } }, // Case-insensitive search
      ],
    }).select('name username profileImage'); // Return only necessary fields

    res.status(200).json(users);
  } catch (err) {
    console.error('Error searching users:', err);
    res.status(500).json({ error: 'Error searching users' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch user details
    const user = await User.findById(userId).select('name username profileImage followers following');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user details:', err);
    res.status(500).json({ error: 'Error fetching user details' });
  }
};

// Follow a user
exports.followUser = async (req, res) => {

  try {
    const { userId } = req.params; // ID of the user to follow

    // Verify token to get current user ID
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = verifyToken(token);
    const currentUserId = decoded.userId;

    // Check if the current user is already following the target user
    const targetUser = await User.findById(userId);
    if (targetUser.followers.includes(currentUserId)) {
      return res.status(400).json({ error: 'You are already following this user' });
    }

    // Add current user to target user's followers
    targetUser.followers.push(currentUserId);
    await targetUser.save();

    // Add target user to current user's following
    const currentUser = await User.findById(currentUserId);
    currentUser.following.push(userId);
    await currentUser.save();


    res.status(200).json({ message: 'User followed successfully' });
  } catch (err) {
    console.error('Error following user:', err);
    res.status(500).json({ error: 'Error following user' });
  }
};

// Unfollow a user
exports.unfollowUser = async (req, res) => {
  try {
    const { userId } = req.params; // ID of the user to unfollow

    // Verify token to get current user ID
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = verifyToken(token);
    const currentUserId = decoded.userId;

    // Remove current user from target user's followers
    const targetUser = await User.findById(userId);
    targetUser.followers = targetUser.followers.filter((followerId) => followerId.toString() !== currentUserId);
    await targetUser.save();

    // Remove target user from current user's following
    const currentUser = await User.findById(currentUserId);
    currentUser.following = currentUser.following.filter((followingId) => followingId.toString() !== userId);
    await currentUser.save();

    res.status(200).json({ message: 'User unfollowed successfully' });
  } catch (err) {
    console.error('Error unfollowing user:', err);
    res.status(500).json({ error: 'Error unfollowing user' });
  }
};


exports.getFriendSuggestions = async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const decoded = verifyToken(token);
    const userId = decoded.userId;

    // Validate userId
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    // Fetch random users (excluding the logged-in user)
    const users = await User.aggregate([
      { $match: { _id: { $ne: mongoose.Types.ObjectId(userId) } } }, // Exclude the logged-in user
      { $sample: { size: 5 } }, // Fetch 5 random users
      { $project: { name: 1, username: 1, profileImage: 1 } }, // Include only name, username, and profileImage
    ]);

    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching friend suggestions:', err);
    res.status(500).json({ error: 'Error fetching friend suggestions' });
  }
};