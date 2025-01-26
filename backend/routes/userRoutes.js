const express = require('express');
const userController = require('../controllers/userController');
const upload = require('../config/multer'); // For file uploads
const router = express.Router();

router.post('/user-info', userController.updateUserInfo);
router.post('/upload-profile', upload.single('profileImage'), userController.uploadProfile);
router.get('/user-data', userController.getUserData); // New route for fetching user data
router.get('/search', userController.searchUsers);
router.get('/:userId', userController.getUserById);
router.post('/follow/:userId', userController.followUser);
router.post('/unfollow/:userId', userController.unfollowUser);
router.get('/random-friends', userController.getFriendSuggestions);

module.exports = router;