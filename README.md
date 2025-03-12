# YouTube Clone
# NOTE: Sometimes the YouTube API stops working due to too many requests. In that case, please follow my video for a demo.

Click here 👇👇👇👇
[![YouTube Clone Demo](https://img.youtube.com/vi/r1VlFXvhGmA/0.jpg)](https://youtu.be/r1VlFXvhGmA?si=C8eEyUHUpJT98fba)

A fully functional **YouTube Clone** built with **React.js, Redux, Node.js, Express.js, MongoDB, Firebase, and Tailwind CSS**. The project includes features like user authentication, video uploads, search functionality, comments, likes/dislikes, and real-time updates.

## 🚀 Features

### ✅ Authentication
- Users can **register and log in** securely using JWT-based authentication.
- Profile information (including profile picture) is stored and displayed.

### ✅ Video Upload & Management
- Users can **upload videos**, set thumbnails, and manage their uploads.
- Firebase is used for **video storage**.

### ✅ Video Player
- Custom **video player** with play, pause, fullscreen, and quality options.
- Autoplay suggestions based on user preferences.

### ✅ Search & Categories
- **Live search** suggestions using the YouTube API.
- Categorized video sections for better navigation.

### ✅ Likes, Comments, & Subscriptions
- Users can **like/dislike videos**.
- **Comment system** with replies.
- Users can **subscribe/unsubscribe** from channels.

### ✅ Responsive Design & Performance
- **Optimized for all devices** (desktop, tablet, mobile).
- Uses **Lazy Loading** for videos to improve performance.

---

## 🛠️ Tech Stack

### Frontend
- **React.js** (Component-based UI)
- **Redux Toolkit** (State management)
- **Tailwind CSS** (Styling)
- **React Router** (Navigation)

### Backend
- **Node.js** (Runtime)
- **Express.js** (Backend framework)
- **MongoDB & Mongoose** (Database)
- **Firebase Storage** (Video uploads)
- **JWT Authentication** (Secure login system)

### Other Tools
- **Axios** (API requests)
- **React Avatar** (Profile pictures)
- **React Icons** (Icons for UI)

---

## 🛠️ Installation & Setup

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-username/youtube-clone.git
cd youtube-clone
```

### **2️⃣ Backend Setup**
```sh
cd backend
npm install
npm start
```

#### Configure `.env` file in `backend/`
```env
PORT=4000
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
FIREBASE_API_KEY=your-firebase-api-key
```

### **3️⃣ Frontend Setup**
```sh
cd frontend
npm install
npm run dev
```

#### Configure `.env` file in `frontend/`
```env
VITE_BACKEND_URL=http://localhost:4000
VITE_FIREBASE_API_KEY=your-firebase-api-key
```

### **4️⃣ Open in Browser**
```sh
http://localhost:5173
```

---

## 📌 API Endpoints

### **Authentication**
| Method | Endpoint          | Description       |
|--------|------------------|-------------------|
| POST   | `/api/auth/signup` | Register a new user |
| POST   | `/api/auth/login`  | User login |
| GET    | `/api/user/profile` | Fetch user details |

### **Videos**
| Method | Endpoint          | Description       |
|--------|------------------|-------------------|
| POST   | `/api/videos/upload` | Upload new video |
| GET    | `/api/videos/` | Fetch all videos |
| GET    | `/api/videos/:id` | Fetch a single video |

---

## ⚡ Future Enhancements
- **Live Streaming Feature**
- **Real-time Chat System**
- **AI-powered Recommendations**

---

## 📜 License
This project is **open-source** and available under the **MIT License**.

---

## 🤝 Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m 'Added feature XYZ'`)
4. Push to the branch (`git push origin feature-branch`)
5. Open a **Pull Request**

---



