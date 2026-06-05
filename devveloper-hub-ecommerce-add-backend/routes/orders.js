import express from 'express';
import { body, validationResult } from 'express-validator';
import { auth } from '../middleware/authMiddleware.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

const router = express.Router();

// نیا آرڈر بنائیں
router.post('/',
  auth,
  [
    body('items').isArray({ min: 1 }).withMessage('کم از کم ایک آئٹم ضروری ہے'),
    body('shippingAddress').notEmpty().withMessage('ڈلیوری کا پتہ ضروری ہے'),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { items, shippingAddress } = req.body;
      let totalAmount = 0;

      // کل رقم کا حساب لگائیں
      for (let item of items) {
        const product = await Product.findById(item.product);
        if (!product) {
          return res.status(404).json({ error: `مصنوع ${item.product} نہیں ملی` });
        }
        if (product.stock < item.quantity) {
          return res.status(400).json({ error: `${product.name} میں کافی اسٹاک نہیں ہے` });
        }
        item.price = product.price;
        totalAmount += product.price * item.quantity;
        // اسٹاک میں سے کم کریں
        product.stock -= item.quantity;
        await product.save();
      }

      const order = new Order({
        user: req.user.id,
        items,
        totalAmount,
        shippingAddress,
      });

      await order.save();
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// صارف کے آرڈرز حاصل کریں
router.get('/user/:userId', auth, async (req, res) => {
  try {
    if (req.user.id !== req.params.userId && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'اختیار نہیں' });
    }

    const orders = await Order.find({ user: req.params.userId }).populate('items.product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ID سے آرڈر حاصل کریں
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product');
    if (!order) {
      return res.status(404).json({ error: 'آرڈر نہیں ملا' });
    }

    if (req.user.id !== order.user.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'اختیار نہیں' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// آرڈر کی حالت اپڈیٹ کریں
router.put('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'آرڈر نہیں ملا' });
    }

    if (req.user.id !== order.user.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'اختیار نہیں' });
    }

    if (req.body.status) order.status = req.body.status;
    if (req.body.paymentStatus) order.paymentStatus = req.body.paymentStatus;
    if (req.body.trackingNumber) order.trackingNumber = req.body.trackingNumber;
    order.updatedAt = new Date();

    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// آرڈر Delete کریں
router.delete('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        error: 'آرڈر نہیں ملا'
      });
    }

    // صرف آرڈر کا مالک یا admin delete کر سکتا ہے
    if (
      req.user.id !== order.user.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        error: 'اختیار نہیں'
      });
    }

    await Order.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'آرڈر کامیابی سے حذف کر دیا گیا'
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});



export default router;
