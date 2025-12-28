# Assignment Workflow – Backend

This repository contains the **backend server** for the Assignment Workflow application, built with **Node.js, Express, and MongoDB**.

The backend is already deployed on a Render free server:

**Production URL:**  
https://assignment-workflow-be.onrender.com

---

## 🚀 Local Setup Instructions

Follow the steps below to run the backend locally.

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/AmanSingh29/assignment-workflow-be
```

---

## 2️⃣ Open Project in VS Code

```bash
cd assignment-workflow-backend
code .
```

---

## 3️⃣ Install Dependencies

Open the VS Code integrated terminal and run:

```bash
npm install
```

---

## 4️⃣ Create Environment Variables

At the **root of the project**, create a file named `.env`.

Add the following values:

```env
PORT=5000

# Local or cloud database connection string
MONGODB_URI="mongodb://localhost:27017/assignment-workflow"

# Environment: dev or production
NODE_ENV="production"

# JWT configuration
JWT_SECRET="asf2e32e3d34dfd35gfd23dvsdc23dsc2323dasxcv2wxe34f2"
JWT_EXPIRES_IN="1d"
```

> ⚠️ Note:
>
> - You can replace `MONGODB_URI` with a MongoDB Atlas connection string if needed.
> - `JWT_SECRET` can be any random secure string.

---

## 5️⃣ Start the Server

Run the following command:

```bash
npm run start
```

---

## 6️⃣ Server Access

Once started, the backend will be available at:

```
http://localhost:5000
```

You can now use this URL in your **frontend `.env` file** as the API base URL.

---

## ✅ Example Frontend API Base URL

```env
VITE_API_BASE_URL="http://localhost:5000"
```

---

## 🧩 Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Role-based Access Control

---
