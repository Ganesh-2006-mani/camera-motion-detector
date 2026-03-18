import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getStorage, ref, uploadString } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "XXXX",
  appId: "XXXX"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const video = document.getElementById("video");
const overlay = document.getElementById("overlay");
const ctxOverlay = overlay.getContext("2d");

const statusText = document.getElementById("status");
const alertSound = document.getElementById("alertSound");

let stream;
let previousFrame;
let model;
let lastCaptureTime = 0;

// =====================
// START CAMERA
// =====================
window.startCamera = async function () {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    loadModel();
    detectMotion();
  } catch {
    alert("Camera permission denied");
  }
};

// =====================
// STOP CAMERA
// =====================
window.stopCamera = function () {
  if (stream) {
    stream.getTracks().forEach(t => t.stop());
  }
};

// =====================
// MOTION DETECTION
// =====================
function detectMotion() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  setInterval(() => {
    if (!video.videoWidth) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0);

    const currentFrame = ctx.getImageData(0, 0, canvas.width, canvas.height);

    if (previousFrame) {
      let diff = 0;

      for (let i = 0; i < currentFrame.data.length; i += 4) {
        diff += Math.abs(currentFrame.data[i] - previousFrame.data[i]);
      }

      if (diff > 5000000) {
        statusText.innerText = "⚠️ Motion Detected!";
        playSound();

        const now = Date.now();
        if (now - lastCaptureTime > 5000) {
          captureImage(canvas);
          lastCaptureTime = now;
        }

      } else {
        statusText.innerText = "No motion";
      }
    }

    previousFrame = currentFrame;
  }, 500);
}

// =====================
// SOUND
// =====================
function playSound() {
  alertSound.currentTime = 0;
  alertSound.play();
}

// =====================
// CAPTURE + DOWNLOAD + FIREBASE
// =====================
function captureImage(canvas) {
  const dataURL = canvas.toDataURL("image/png");

  uploadToFirebase(dataURL);

  const img = document.createElement("img");
  img.src = dataURL;

  const btn = document.createElement("button");
  btn.innerText = "Download";
  btn.onclick = () => downloadImage(dataURL);

  const wrap = document.createElement("div");
  wrap.appendChild(img);
  wrap.appendChild(btn);

  document.getElementById("gallery").prepend(wrap);

  downloadImage(dataURL);
}

// =====================
// DOWNLOAD
// =====================
function downloadImage(dataURL) {
  const a = document.createElement("a");
  a.href = dataURL;
  a.download = "capture_" + Date.now() + ".png";
  a.click();
}

// =====================
// FIREBASE UPLOAD
// =====================
async function uploadToFirebase(dataURL) {
  const fileRef = ref(storage, "images/" + Date.now() + ".png");
  await uploadString(fileRef, dataURL, "data_url");
}

// =====================
// AI MODEL
// =====================
async function loadModel() {
  model = await cocoSsd.load();
  detectObjects();
}

// =====================
// OBJECT DETECTION + BOXES
// =====================
function detectObjects() {
  setInterval(async () => {
    if (!model || !video.videoWidth) return;

    overlay.width = video.videoWidth;
    overlay.height = video.videoHeight;

    const predictions = await model.detect(video);

    ctxOverlay.clearRect(0, 0, overlay.width, overlay.height);

    predictions.forEach(p => {
      const [x, y, w, h] = p.bbox;

      ctxOverlay.strokeStyle = "red";
      ctxOverlay.lineWidth = 2;
      ctxOverlay.strokeRect(x, y, w, h);

      ctxOverlay.fillStyle = "red";
      ctxOverlay.font = "14px Arial";
      ctxOverlay.fillText(p.class, x, y > 10 ? y - 5 : 10);
    });

    if (predictions.length) {
      statusText.innerText = "Detected: " + predictions.map(p => p.class).join(", ");
    }

  }, 1000);
}
