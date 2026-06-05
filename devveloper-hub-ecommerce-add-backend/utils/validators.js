import { body, validationResult } from 'express-validator';

const validateEmail = body('email')
  .isEmail()
  .withMessage('براہ کرم صحیح ای میل درج کریں');

const validatePassword = body('password')
  .isLength({ min: 6 })
  .withMessage('پاس ورڈ کم از کم 6 حروف ہونے چاہیے')
  .matches(/^(?=.*[A-Za-z])(?=.*\d)/)
  .withMessage('پاس ورڈ میں حروف اور نمبر ہونے چاہیے');

const validateName = body('name')
  .trim()
  .notEmpty()
  .withMessage('براہ کرم نام درج کریں');

const validatePrice = body('price')
  .isFloat({ min: 0 })
  .withMessage('براہ کرم صحیح قیمت درج کریں');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

export { validateEmail, validatePassword, validateName, validatePrice, handleValidationErrors };
