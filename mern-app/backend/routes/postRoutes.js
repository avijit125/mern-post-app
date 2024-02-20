const express = require('express');
const router = express.Router();
const postController = require('../controller/postController');

// GET all posts with pagination and search
router.get('/', postController.getAllPosts);

// POST bulk upload posts
router.post('/bulk-upload', postController.bulkupload);

module.exports = router;
