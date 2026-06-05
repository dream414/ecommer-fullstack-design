import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'براہ کرم مصنوع کا نام فراہم کریں'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'براہ کرم تفصیل فراہم کریں'],
  },
  price: {
    type: Number,
    required: [true, 'براہ کرم قیمت فراہم کریں'],
    min: 0,
  },
  category: {
    type: String,
    required: [true, 'براہ کرم زمرہ فراہم کریں'],
  },
  stock: {
    type: Number,
    required: [true, 'براہ کرم اسٹاک فراہم کریں'],
    default: 0,
  },
  image: String,
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviews: [
    {
      user: mongoose.Schema.Types.ObjectId,
      comment: String,
      rating: Number,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdBy: mongoose.Schema.Types.ObjectId,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model('Product', productSchema);
export default Product;
