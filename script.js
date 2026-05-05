/*
  CM Banquet Gallery
  Static JavaScript only. No backend and no network requests.

  WHERE TO ADD IMAGES / VIDEOS:
  1. Put your files inside the uploads folder.
  2. Add each file name to the files array below.
  3. Keep the names exactly the same, including spaces and extensions.

  Example:
  const files = [
    "banquet-photo-1.jpg",
    "banquet-video-1.mp4"
  ];
*/
const files = [
  /*
    ADD YOUR FILE NAMES HERE.
    These examples are commented out so the page starts empty.

    "photo1.jpg",
    "photo2.png",
    "video1.mp4"
  */
];

const galleryGrid = document.getElementById("galleryGrid");
const uploadLink = document.getElementById("uploadLink");
const uploadPanel = document.getElementById("uploadPanel");
const closeUpload = document.getElementById("closeUpload");
const visualUpload = document.getElementById("visualUpload");
const previewGrid = document.getElementById("previewGrid");

const imageTypes = ["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp", "avif", "heic", "heif"];
const videoTypes = ["mp4", "mov", "m4v", "webm", "ogv", "ogg"];

function buildGallery() {
  galleryGrid.innerHTML = "";

  if (files.length === 0) {
    galleryGrid.innerHTML = '<p class="section-note">No files added yet. Add media names in script.js.</p>';
    return;
  }

  files.forEach((fileName) => {
    const filePath = `uploads/${fileName}`;
    const card = document.createElement("article");
    const downloadLink = document.createElement("a");
    const label = document.createElement("span");
    const media = createMediaElement(filePath, fileName);

    card.className = "media-card";
    downloadLink.href = filePath;
    downloadLink.download = fileName;
    label.className = "media-label";
    label.textContent = fileName;

    downloadLink.appendChild(media);
    downloadLink.appendChild(label);
    card.appendChild(downloadLink);
    galleryGrid.appendChild(card);
  });
}

function createMediaElement(filePath, fileName) {
  const extension = getExtension(fileName);

  if (videoTypes.includes(extension)) {
    const video = document.createElement("video");
    video.src = filePath;
    video.muted = true;
    video.playsInline = true;
    video.preload = "metadata";
    return video;
  }

  if (imageTypes.includes(extension)) {
    const image = document.createElement("img");
    image.src = filePath;
    image.alt = fileName;

    image.addEventListener("error", () => {
      image.replaceWith(createFallback(fileName));
    });

    return image;
  }

  return createFallback(fileName);
}

function createFallback(fileName) {
  const fallback = document.createElement("div");
  fallback.className = "media-fallback";
  fallback.textContent = fileName;
  return fallback;
}

function getExtension(fileName) {
  return fileName.split(".").pop().toLowerCase();
}

function openUploadPanel() {
  uploadPanel.classList.remove("hidden");
}

function closeUploadPanel() {
  uploadPanel.classList.add("hidden");
}

function showVisualPreviews() {
  previewGrid.innerHTML = "";

  Array.from(visualUpload.files).forEach((file) => {
    const item = document.createElement("div");
    const url = URL.createObjectURL(file);
    const label = document.createElement("span");
    let media;

    item.className = "preview-item";
    label.className = "media-label";
    label.textContent = file.name;

    if (file.type.startsWith("video/")) {
      media = document.createElement("video");
      media.src = url;
      media.controls = true;
    } else {
      media = document.createElement("img");
      media.src = url;
      media.alt = file.name;
    }

    item.appendChild(media);
    item.appendChild(label);
    previewGrid.appendChild(item);
  });
}

uploadLink.addEventListener("click", openUploadPanel);
closeUpload.addEventListener("click", closeUploadPanel);
visualUpload.addEventListener("change", showVisualPreviews);

buildGallery();
