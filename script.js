const video = document.getElementById("video");
const statusText = document.getElementById("status");
const alertSound = document.getElementById("alertSound");

let stream;
let previousFrame;
let model;
let lastCaptureTime = 0;

// =====================
// START CAMERA
// =====================
async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;

    loadModel();
    detectMotion();
  } catch (err) {
    alert("Camera access denied");
  }
}

// =====================
// STOP CAMERA
// =====================
function stopCamera() {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    statusText.innerText = "Camera stopped";
  }
}

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
// PLAY SOUND
// =====================
function playSound() {
  alertSound.currentTime = 0;
  alertSound.play();
}

// =====================
// CAPTURE IMAGE
// =====================
function captureImage(canvas) {
  const dataURL = canvas.toDataURL("image/png");

  const img = document.createElement("img");
  img.src = dataURL;

  const btn = document.createElement("button");
  btn.innerText = "Download";
  btn.onclick = () => downloadImage(dataURL);

  const wrapper = document.createElement("div");
  wrapper.appendChild(img);
  wrapper.appendChild(btn);

  document.getElementById("gallery").prepend(wrapper);

  // Auto download
  downloadImage(dataURL);
}

// =====================
// DOWNLOAD IMAGE
// =====================
function downloadImage(dataURL) {
  const a = document.createElement("a");
  a.href = dataURL;
  a.download = "capture_" + Date.now() + ".png";
  a.click();
}

// =====================
// AI OBJECT DETECTION
// =====================
async function loadModel() {
  model = await cocoSsd.load();
  detectObjects();
}

async function detectObjects() {
  setInterval(async () => {
    if (!model || !video.videoWidth) return;

    const predictions = await model.detect(video);

    if (predictions.length > 0) {
      const objects = predictions.map(p => p.class).join(", ");
      statusText.innerText = "Detected: " + objects;
    }
  }, 1500);
}
