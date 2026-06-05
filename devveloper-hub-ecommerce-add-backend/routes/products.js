import express from 'express';
import { body, validationResult } from 'express-validator';
import { auth, admin } from '../middleware/auth.js';
import Product from '../models/Product.js';

const router = express.Router();

// تمام مصنوعات حاصل کریں
router.get('/', async (req, res) => {
  try {
    const { category, minPrice, maxPrice, search } = req.query;
    let filter = {};

    if (category) filter.category = category;
    if (search) filter.name = { $regex: search, $options: 'i' };
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = minPrice;
      if (maxPrice) filter.price.$lte = maxPrice;
    }

    const products = await Product.find(filter).limit(50);
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ID سے مصنوع حاصل کریں
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'مصنوع نہیں ملی' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// نئی مصنوع بنائیں (صرف admin)
router.post('/',
  auth, admin,
  [
    body('name').notEmpty().withMessage('نام ضروری ہے'),
    body('description').notEmpty().withMessage('تفصیل ضروری ہے'),
    body('price').isFloat({ min: 0 }).withMessage('قیمت صحیح ہونی چاہیے'),
    body('category').notEmpty().withMessage('زمرہ ضروری ہے'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, description, price, category, stock, image } = req.body;
      const product = new Product({
        name,
        description,
        price,
        category,
        stock: stock || 0,
        image,
        createdBy: req.user.id,
      });

      await product.save();
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// مصنوع کو اپڈیٹ کریں (صرف admin)
router.put('/:id',
  auth, admin,
  async (req, res) => {
    try {
      const { name, description, price, category, stock, image } = req.body;
      let product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ error: 'مصنوع نہیں ملی' });
      }

      if (name) product.name = name;
      if (description) product.description = description;
      if (price) product.price = price;
      if (category) product.category = category;
      if (stock !== undefined) product.stock = stock;
      if (image) product.image = image;

      await product.save();
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// مصنوع کو حذف کریں (صرف admin)
router.delete('/:id',
  auth, admin,
  async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'مصنوع نہیں ملی' });
      }
      res.json({ message: 'مصنوع حذف ہو گئی' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// ریویو شامل کریں
router.post('/:id/review',
  auth,
  [
    body('comment').notEmpty().withMessage('تبصرہ ضروری ہے'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('ریٹنگ 1 سے 5 کے درمیان ہونی چاہیے'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ error: 'مصنوع نہیں ملی' });
      }

      product.reviews.push({
        user: req.user.id,
        comment: req.body.comment,
        rating: req.body.rating,
      });

      // اوسط ریٹنگ کا حساب لگائیں
      const avgRating = product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length;
      product.rating = avgRating;

      await product.save();
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

export default router;
