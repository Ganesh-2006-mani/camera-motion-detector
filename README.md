# 📸 Camera AI Detector Web App

A modern, responsive web application that uses your device camera to capture images, store them in the cloud, and manage them through a user-based dashboard with authentication.

---

## 🚀 Features

### 🔐 Authentication

* User Signup & Login (Email/Password)
* Logout functionality
* Session handling with Firebase Auth

---

### 📷 Camera System (Fixed & Optimized)

* Start / Stop camera (stable, no crashes)
* Prevents multiple camera instances
* Smooth restart after stopping
* Capture images directly from video stream

---

### ☁️ Cloud Integration

* Upload captured images to Firebase Storage
* Store metadata in Firestore
* User-specific image storage (each user has their own gallery)

---

### 🖼️ Gallery Dashboard

* View all saved images
* Persistent storage (data stays after refresh)
* Delete images:

  * Removes from UI
  * Removes from Firebase Storage

---

### 🔍 Image Preview System

* Fullscreen modal preview
* Next / Previous navigation
* Keyboard controls:

  * → Next image
  * ← Previous image
  * ESC to close

---

### 🎨 UI / UX Improvements

* Clean modern dark theme
* Card-based layout
* Responsive design (mobile-friendly)
* Improved buttons and spacing
* Hover effects and smooth interactions

---

## 🛠️ Tech Stack

* HTML5
* CSS3 (Responsive + Modern UI)
* JavaScript (Vanilla)

### Firebase Services:

* Authentication
* Firestore Database
* Cloud Storage

---

## 📂 Project Structure

```
camera-ai-detector/
│
├── index.html      # UI structure
├── style.css       # Styling & responsive design
├── script.js       # Logic + Firebase integration
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Create Firebase Project

Go to Firebase Console and create a new project.

---

### 2. Enable Services

Enable:

* Authentication (Email/Password)
* Firestore Database
* Storage

---

### 3. Add Firebase Config

Replace this in `script.js`:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_ID",
  storageBucket: "YOUR_BUCKET",
};
```

---

### 4. Run the Project

Open `index.html` in your browser.

> ⚠️ Camera works only on HTTPS or localhost.

---

## ⚠️ Known Limitations

* No loading indicators (UI feedback missing)
* Firestore queries not optimized (fetches all data)
* No Firebase security rules configured
* No animations or advanced UI interactions
* No image zoom or swipe gestures

---

## 📈 Future Improvements

* Add loading spinners & UI feedback
* Optimize Firestore queries (filter by userId)
* Add image zoom & swipe navigation
* Add video recording upload
* Improve UI with animations and icons
* Add Firebase security rules

---

## 🎯 Learning Outcomes

This project demonstrates:

* Camera API usage (start/stop lifecycle)
* DOM manipulation & dynamic UI updates
* State management (image tracking, modal navigation)
* Firebase Authentication flow
* Cloud Storage & Firestore integration
* Real-world CRUD operations (create/delete images)
* Responsive UI design

---

## 👨‍💻 Author

**Ganesh Manikanta Neelam**

---

## 📄 License

This project is open-source and free to use.
