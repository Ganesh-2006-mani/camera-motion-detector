let stream = null;
let isCameraRunning = false;

// START CAMERA
function startCamera() {
  if (isCameraRunning) return;

  navigator.mediaDevices.getUserMedia({ video: true })
    .then(s => {
      stream = s;
      document.getElementById("video").srcObject = stream;
      isCameraRunning = true;
      document.getElementById("status").innerText = "Camera Started";
    })
    .catch(err => {
      console.log(err);
      alert("Camera access denied");
    });
}

// STOP CAMERA
function stopCamera() {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }

  document.getElementById("video").srcObject = null;
  stream = null;
  isCameraRunning = false;

  document.getElementById("status").innerText = "Camera Stopped";
}

// CAPTURE IMAGE
function capture() {
  if (!isCameraRunning) {
    alert("Start camera first");
    return;
  }

  const video = document.getElementById("video");

  const canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(video, 0, 0);

  const imageData = canvas.toDataURL("image/png");

  createCard(imageData);
}

// CREATE CARD (image + buttons)
function createCard(src) {
  const card = document.createElement("div");
  card.className = "card";

  const img = document.createElement("img");
  img.src = src;

  // DOWNLOAD BUTTON
  const downloadBtn = document.createElement("button");
  downloadBtn.innerText = "Download";
  downloadBtn.className = "download";

  downloadBtn.onclick = () => {
    const a = document.createElement("a");
    a.href = src;
    a.download = "photo.png";
    a.click();
  };

  // DELETE BUTTON
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "delete";

  deleteBtn.onclick = () => {
    card.remove();
  };

  card.appendChild(img);
  card.appendChild(downloadBtn);
  card.appendChild(deleteBtn);

  document.getElementById("gallery").prepend(card);
}
