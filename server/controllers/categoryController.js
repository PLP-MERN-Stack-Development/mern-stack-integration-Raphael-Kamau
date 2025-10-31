import Category from '../models/Category.js';
import { validationResult } from 'express-validator';

export const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

export const createCategory = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { name, slug } = req.body;
    const existing = await Category.findOne({ slug });
    if (existing) return res.status(400).json({ message: 'Slug already exists' });

    const category = new Category({ name, slug });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};
