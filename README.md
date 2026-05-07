# ShopEZ - E-commerce Application (MERN Stack)

A full-stack e-commerce application built with **MongoDB, Express.js, React.js, Node.js**.

---

## 🚀 Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- npm

---

### Step 1: Clone / Extract the project
```bash
cd shopez
```

### Step 2: Setup Backend

```bash
cd server
npm install
```

Edit `.env` file:
```
PORT=8000
MONGO_URI=mongodb://localhost:27017/shopez
JWT_SECRET=shopez_jwt_secret_key
NODE_ENV=development
```

Seed the database (creates products + admin/user accounts):
```bash
node seed.js
```

Start the backend server:
```bash
npm run dev
# Server runs on http://localhost:8000
```

---

### Step 3: Setup Frontend

Open a new terminal:
```bash
cd client
npm install
npm start
# App runs on http://localhost:3000
```

## 🛠️ Tech Stack

- **Frontend:** React.js, React Router v6, Axios, Bootstrap 5
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Auth:** JWT, bcryptjs
- **Dev Tools:** nodemon

---

## ✨ Features

- User Registration & Login (JWT-based auth)
- Product listing with search, category & gender filters
- Product detail page with size/quantity selector
- Cart management (add, remove, clear)
- Checkout with shipping form & payment method selection
- Order placement & tracking
- User profile with order history
- Admin panel: Dashboard stats, Product CRUD, Order status management, User management
- Role-based access control (USER / ADMIN)
- Responsive design with Bootstrap 5
