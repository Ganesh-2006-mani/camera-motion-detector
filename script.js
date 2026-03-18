const video = document.getElementById("video");
const statusText = document.getElementById("status");

let stream;
let previousFrame;

async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    detectMotion();
  } catch (err) {
    alert("Camera access denied");
  }
}

function stopCamera() {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    statusText.innerText = "Status: Camera stopped";
  }
}

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
      } else {
        statusText.innerText = "No motion";
      }
    }

    previousFrame = currentFrame;
  }, 500);
}
