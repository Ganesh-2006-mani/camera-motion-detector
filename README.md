# 📸 Camera AI Detector Web App

A full-featured web application that uses your device camera to capture images, manage them with cloud storage, and provide a user-based dashboard with authentication.

---

## 🚀 Features

### 🔐 Authentication

* User Signup & Login
* Logout functionality
* Session management using Firebase Auth

### 📷 Camera System

* Start / Stop camera (fully optimized)
* Capture images from live video
* Stable camera lifecycle (no crashes or duplicate streams)

### ☁️ Cloud Integration

* Upload images to Firebase Storage
* Store metadata in Firestore
* User-specific image storage

### 🖼️ Gallery Dashboard

* View all captured images
* Delete images (removes from UI + Firebase)
* Persistent data across sessions

### 🔍 Image Preview (Modal)

* Fullscreen image preview
* Next / Previous navigation
* Keyboard controls:

  * → Next image
  * ← Previous image
  * ESC to close

---

## 🛠️ Tech Stack

* HTML5
* CSS3
* JavaScript (Vanilla)
* Firebase:

  * Authentication
  * Firestore Database
  * Cloud Storage

---

## 📂 Project Structure

```
camera-ai-detector/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Create Firebase Project

Go to Firebase Console and create a new project.

---

### 2. Enable Services

Enable the following:

* Authentication (
