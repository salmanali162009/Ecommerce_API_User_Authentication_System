# 🛒 E-Commerce Backend API

A complete RESTful E-Commerce Backend API built with Node.js, Express.js, MongoDB, and Mongoose.

This backend provides authentication, product management, Cloudinary image uploads, product search, order management, seller functionality, password recovery, and API validation.

---

# 🚀 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Joi
- Nodemailer
- Multer
- Cloudinary
- Postman

---

# ✨ Main Features

- User Authentication
- JWT Protected APIs
- Password Hashing
- Forgot Password / Reset Password
- Product CRUD
- Product Image Upload
- Cloudinary Integration
- Product Search
- Product Pagination
- Seller Product Management
- Customer Order Management
- Seller Order Management
- Order Status Management
- Order Cancellation
- Stock Management
- Joi Validation
- Authorization
- Custom API Error Responses

---

# 📁 Project Structure

```text
backend/
│
├── config/
│   └── db.js
│
├── controller/
│   ├── auth/
│   ├── product/
│   └── order/
│
├── middleware/
│   ├── auth.middleware.js
│   └── upload.middleware.js
│
├── model/
│   ├── User.js
│   ├── Product.js
│   └── Order.js
│
├── routes/
│   ├── auth.route.js
│   ├── product.route.js
│   └── order.route.js
│
├── images/
│
├── .env
├── .gitignore
├── package.json
└── server.js