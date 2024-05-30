const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

// New route to get random posts - this should be defined before any routes with :id
router.get('/random', postController.getRandomPosts);

// New function to get top posts by views in the last X days
router.get('/top', postController.getTopPosts);
router.get('/search', postController.searchPosts);

// Existing routes...
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById); // This should come after the 'random' route
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);


module.exports = router;
