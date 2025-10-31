import express from 'express';
import Comment from '../models/Comment.js';

const router = express.Router();

router.get('/:postId', async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId }).sort({ createdAt: -1 });
  res.json(comments);
});

router.post('/:postId', async (req, res) => {
  const comment = new Comment({
    post: req.params.postId,
    author: req.body.author,
    text: req.body.text,
  });
  await comment.save();
  req.io.emit('commentAdded', comment); // emit to all clients
  res.status(201).json(comment);
});

export default router;
