# 📚 Online E-Book Store

## 📖 Project Overview
An online platform for users to browse, purchase, and review e-books.  
Special feature: **Voice-to-Text** functionality for creating book content.

## ✨ Key Features
- 📚 Manage Books (Add, Edit, Delete, View)
- 🛒 Shopping Cart & Payment Integration
- ⭐ Reviews and Ratings for Books
- 🗣️ Voice-to-Text for Book Content Creation
- 🔐 User Authentication (Login / Register)
  
## 🛠️ Tech Stack
- **Frontend:** React.js, TypeScript, TailwindCSS
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, TypeScript
- **Authentication:** JWT (JSON Web Token)
- **Deployment:** Vercel / Render / Netlify

## 🧩 Project Structure
```bash
client/    # Frontend React App
server/    # Backend Node.js App
```

## 🔥 Special Feature
- **Voice-to-Text:** Authors can create books using their voice instead of typing.  
- **Auto Chapter & Topic Numbering:** When authors add chapters, the system automatically calculates numbering.

## 📦 Setup Instructions

### Backend
```bash
cd server
npm install
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

### Environment Variables
Create a `.env` file in the server directory and add:
```bash
PORT=5000
MONGO_URI=your_mongo_db_connection_string
JWT_SECRET=your_secret_key
```

## 🧑‍💻 Team Members
- **Sandaruwan Chandrasena:** Voice-to-Text, Authentication
- **Dimasha:** Books Management
- **Chalana:** Cart & Payment
- **Ridmi:** Reviews & Ratings

## 📸 Screenshots
*(Add screenshots of your app here after the frontend is ready)*

## 📜 License
This project is licensed under the MIT License.

---
