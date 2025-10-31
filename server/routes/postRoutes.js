import express from 'express';
import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  addComment
} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';
import { body } from 'express-validator';
import { toggleLike } from '../models/Post.js';

const router = express.Router();

const validatePost = [
  body('title').notEmpty().withMessage('Title is required'),
  body('content').notEmpty().withMessage('Content is required'),
  body('category').notEmpty().withMessage('Category is required')
];

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', protect, validatePost, createPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);
router.post('/:id/comments', protect, body('content').notEmpty(), addComment);
router.post('/:id/like', protect, toggleLike);

export default router;
