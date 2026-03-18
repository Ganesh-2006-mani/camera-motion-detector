import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signOut, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { getStorage, ref, uploadString, deleteObject }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

import { getFirestore, collection, addDoc, getDocs }
from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 CONFIG
const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_ID",
  storageBucket: "YOUR_BUCKET",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

// 🔥 GLOBALS
let stream = null;
let isCameraRunning = false;

let images = [];
let currentIndex = 0;

// 🔥 AUTH
window.signup = () =>
  createUserWithEmailAndPassword(auth, email(), pass());

window.login = () =>
  signInWithEmailAndPassword(auth, email(), pass());

window.logout = () => signOut(auth);

function email() {
  return document.getElementById("email").value;
}
function pass() {
  return document.getElementById("password").value;
}

// 🔥 SESSION
onAuthStateChanged(auth, (user) => {
  if (user) loadImages(user.uid);
  else document.getElementById("gallery").innerHTML = "";
});

// 🔥 CAMERA START
window.startCamera = async () => {
  if (isCameraRunning) return;

  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });

    const video = document.getElementById("video");
    video.srcObject = stream;

    video.onloadedmetadata = () => video.play();

    isCameraRunning = true;
    document.getElementById("status").innerText = "Camera Started";

  } catch (e) {
    console.log("Camera error", e);
  }
};

// 🔥 CAMERA STOP (FIXED)
window.stopCamera = () => {
  const video = document.getElementById("video");

  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }

  video.pause();
  video.srcObject = null;

  stream = null;
  isCameraRunning = false;

  document.getElementById("status").innerText = "Camera Stopped";
};

// 🔥 CAPTURE
window.capture = () => {
  if (!isCameraRunning) return;

  const video = document.getElementById("video");

  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);

  const dataURL = canvas.toDataURL();
  const user = auth.currentUser;

  const path = `images/${user.uid}/${Date.now()}.png`;

  images.unshift(dataURL);

  createCard(dataURL, path, 0);
  upload(dataURL, path);
};

// 🔥 CREATE CARD
function createCard(src, path, index) {
  const img = document.createElement("img");
  img.src = src;

  const btn = document.createElement("button");
  btn.innerText = "Delete";

  const wrap = document.createElement("div");
  wrap.appendChild(img);
  wrap.appendChild(btn);

  img.onclick = () => openModal(index);

  btn.onclick = async () => {
    await deleteObject(ref(storage, path));
    wrap.remove();
    images.splice(index, 1);
  };

  document.getElementById("gallery").prepend(wrap);
}

// 🔥 UPLOAD
async function upload(dataURL, path) {
  await uploadString(ref(storage, path), dataURL, "data_url");

  await addDoc(collection(db, "images"), {
    path,
    userId: auth.currentUser.uid
  });
}

// 🔥 LOAD IMAGES
async function loadImages(uid) {
  const snap = await getDocs(collection(db, "images"));

  images = [];
  document.getElementById("gallery").innerHTML = "";

  snap.forEach(doc => {
    const d = doc.data();

    if (d.userId === uid) {
      const url = `https://firebasestorage.googleapis.com/v0/b/YOUR_BUCKET/o/${encodeURIComponent(d.path)}?alt=media`;

      images.push(url);
      createCard(url, d.path, images.length - 1);
    }
  });
}

// 🔥 MODAL
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");

function openModal(index) {
  currentIndex = index;
  modal.style.display = "block";
  modalImg.src = images[index];
}

document.getElementById("closeModal").onclick = () => {
  modal.style.display = "none";
};

document.getElementById("nextBtn").onclick = () => {
  currentIndex = (currentIndex + 1) % images.length;
  modalImg.src = images[currentIndex];
};

document.getElementById("prevBtn").onclick = () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  modalImg.src = images[currentIndex];
};

document.addEventListener("keydown", (e) => {
  if (modal.style.display === "block") {
    if (e.key === "ArrowRight") document.getElementById("nextBtn").click();
    if (e.key === "ArrowLeft") document.getElementById("prevBtn").click();
    if (e.key === "Escape") modal.style.display = "none";
  }
});
