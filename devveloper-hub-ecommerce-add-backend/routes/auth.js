import express from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Register endpoint
router.post('/register',
  [
    body('name').notEmpty().withMessage('نام ضروری ہے'),
    body('email').isEmail().withMessage('صحیح ای میل داخل کریں'),
    body('password').isLength({ min: 6 }).withMessage('پاس ورڈ کم از کم 6 حروف ہونے چاہیے'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password } = req.body;

      // چیک کریں کہ صارف پہلے سے موجود ہے
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ error: 'صارف پہلے سے موجود ہے' });
      }

      // نیا صارف بنائیں
      user = new User({ name, email, password });
      await user.save();

      // JWT token بنائیں
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        message: 'رجسٹریشن کامیاب ہے',
        token,
        user: { id: user._id, name: user.name, email: user.email },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Login endpoint
router.post('/login',
  [
    body('email').isEmail().withMessage('صحیح ای میل داخل کریں'),
    body('password').notEmpty().withMessage('پاس ورڈ ضروری ہے'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // صارف تلاش کریں
      const user = await User.findOne({ email }).select('+password');
      if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ error: 'غلط ای میل یا پاس ورڈ' });
      }

      // JWT token بنائیں
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        message: 'لاگ ان کامیاب ہے',
        token,
        user: { id: user._id, name: user.name, email: user.email },
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

export default router;
