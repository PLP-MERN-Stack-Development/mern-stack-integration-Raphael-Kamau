import Post from '../models/Post.js';
import { validationResult } from 'express-validator';

// 📄 Get all posts
export const getPosts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;

    const total = await Post.countDocuments();
    const posts = await Post.find()
      .populate('category', 'name')
      .populate('author', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      posts,
      page,
      totalPages: Math.ceil(total / limit),
      totalPosts: total
    });
  } catch (err) {
    next(err);
  }
};

// 📄 Get single post by ID
export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('category', 'name')
      .populate('author', 'name')
      .populate('comments.user', 'name');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

// 📝 Create new post
export const createPost = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { title, content, category, image } = req.body;
    const post = new Post({
      title,
      content,
      category,
      image,
      author: req.user._id
    });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

// ✏️ Update post
export const updatePost = async (req, res, next) => {
  const { title, content, category, image } = req.body;

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.title = title || post.title;
    post.content = content || post.content;
    post.category = category || post.category;
    post.image = image || post.image;

    await post.save();
    res.json(post);
  } catch (err) {
    next(err);
  }
};

// 🗑️ Delete post
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    next(err);
  }
};

// 💬 Add comment to post
export const addComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const comment = {
      user: req.user._id,
      content: req.body.content
    };

    post.comments.push(comment);
    await post.save();

    const populatedComment = await Post.populate(post, {
      path: 'comments.user',
      select: 'name'
    });

    res.status(201).json(populatedComment.comments.at(-1));
  } catch (err) {
    next(err);
  }
};
