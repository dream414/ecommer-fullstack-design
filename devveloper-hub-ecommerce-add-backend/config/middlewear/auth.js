import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'توثیق کی ضرورت ہے' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'غلط یا میعاد ختم ہو چکی token' });
  }
};

const admin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'صرف ایڈمن اس کو دیکھ سکتے ہیں' });
  }
  next();
};

export { auth, admin };
