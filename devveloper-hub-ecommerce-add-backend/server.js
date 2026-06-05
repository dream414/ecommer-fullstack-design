import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import { errorHandler } from './utils/errorHandler.js';
import rateLimit from 'express-rate-limit';

// Routes
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
connectDB();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'بہت سے درخواستیں، براہ کرم بعد میں کوشش کریں',
});

// Middleware
app.use(limiter);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend چل رہا ہے ✅', timestamp: new Date() });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'صفحہ نہیں ملا' });
});

// Error handling middleware
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 سرور چل رہا ہے: http://localhost:${PORT}`);
  console.log(`📝 صحت کی جانچ: http://localhost:${PORT}/api/health`);
  console.log(`🔐 توثیق: POST http://localhost:${PORT}/api/auth/register`);
});
