# 📸 Camera App with Firebase (Auth + Cloud + Gallery)

A fully functional web application that allows users to authenticate, access their device camera, capture images, and manage them with cloud storage and a personalized dashboard.

---

## 🚀 Features

### 🔐 Authentication System

* User Signup (Email/Password)
* User Login with error handling
* Logout functionality
* Session persistence using Firebase Auth
* Dynamic UI update based on login state

---

### 📷 Camera System (Fixed & Stable)

* Start / Stop camera properly
* Prevents multiple camera instances
* Clean camera shutdown (no freezing issues)
* Restart camera without bugs

---

### 📸 Image Capture

* Capture images directly from video stream
* Instant preview in gallery
* Prevent capture when camera is off

---

### ☁️ Cloud Storage Integration

* Upload images to Firebase Storage
* Store image metadata in Firestore
* User-specific storage (each user has separate images)

---

### 🖼️ Gallery Dashboard

* View all uploaded images
* Persistent data (saved across sessions)
* Delete images:

  * Removes from UI
  * Removes from Firebase Storage

---

### 🔍 Image Preview (Modal Viewer)

* Fullscreen image preview
* Next / Previous navigation
* Smooth image switching

---

### 🎨 UI Improvements

* Clean layout structure
* Responsive design (mobile-friendly)
* Organized sections (Auth, Camera, Gallery)
* Improved button styling and spacing

---

## 🛠️ Tech Stack

* HTML5
* CSS3
* JavaScript (Vanilla)

### Firebase Services:

* Authentication
* Firestore Database
* Cloud Storage

---

## 📂 Project Structure

```id="5npx0n"
camera-app/
│
├── index.html      # UI layout
├── style.css       # Styling & responsiveness
├── script.js       # App logic + Firebase integration
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Create Firebase Project

Go to Firebase Console and create a new project.

---

### 2. Enable Required Services

Enable:

* Authentication → Email/Password
* Firestore Database
* Storage

---

### 3. Add Firebase Configuration

Update this in `script.js`:

```javascript id="1l0m4v"
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

* No loading indicators (UX improvement needed)
* Firestore query not optimized (fetches all data)
* No Firebase security rules configured
* Uses basic alert() for errors (not production-level)
* No animations or advanced UI effects

---

## 📈 Future Improvements

* Add loading spinners & better UI feedback
* Optimize Firestore queries (filter by userId)
* Add image zoom & swipe gestures
* Replace alert() with proper notification system
* Improve UI with animations and icons
* Add Firebase security rules

---

## 🎯 Learning Outcomes

This project demonstrates:

* Camera API usage (start/stop lifecycle management)
* Authentication flow (signup/login/logout)
* State management (user session, gallery, modal navigation)
* Cloud storage handling with Firebase
* Database integration using Firestore
* CRUD operations (create & delete images)
* Responsive UI design

---

## 👨‍💻 Author

**Ganesh Manikanta Neelam**

---

## 📄 License

This project is open-source and free to use.
