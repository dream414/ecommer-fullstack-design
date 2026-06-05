import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'براہ کرم نام فراہم کریں'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'براہ کرم ای میل فراہم کریں'],
    unique: true,
    lowercase: true,
    match: /^\S+@\S+\.\S+$/,
  },
  password: {
    type: String,
    required: [true, 'براہ کرم پاس ورڈ فراہم کریں'],
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  address: {
    street: String,
    city: String,
    country: String,
    postalCode: String,
  },
  phone: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Password hashing سے پہلے
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcryptjs.genSalt(10);
    this.password = await bcryptjs.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// پاس ورڈ کو موازنہ کرنے کا طریقہ
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
