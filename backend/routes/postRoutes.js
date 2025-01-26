const express = require('express');
const postController = require('../controllers/postController');
const upload = require('../config/multer'); // For file uploads
const router = express.Router();

router.post('/create-post', upload.single('media'), postController.createPost);
router.get('/random-posts', postController.getRandomPosts);
router.get('/user-posts/:userId', postController.getUserPosts);
router.get('/posts/:postId', postController.getPostById);
router.post('/posts/:postId/like', postController.likePost);
router.post('/posts/:postId/comment', postController.addComment);
router.post('/posts/:postId/share', postController.sharePost);


module.exports = router;