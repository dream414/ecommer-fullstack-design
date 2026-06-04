# E-Commerce Backend API

Node.js + Express.js backend for the e-commerce application.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### Running the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/user/:userId` - Get user's orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id` - Update order status

### Health Check
- `GET /api/health` - API health status

## Project Structure

```
backend/
├── config/
│   └── database.js
├── models/
│   ├── User.js
│   ├── Product.js
│   └── Order.js
├── routes/
│   ├── auth.js
│   ├── products.js
│   └── orders.js
├── .env.example
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## Technologies Used

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **express-validator** - Input validation
- **nodemon** - Development auto-reload
- **CORS** - Cross-origin resource sharing

## Future Enhancements

- [ ] Add payment gateway integration
- [ ] Add email notifications
- [ ] Add file upload functionality
- [ ] Add rate limiting
- [ ] Add comprehensive error handling
- [ ] Add unit and integration tests
- [ ] Add API documentation (Swagger)
