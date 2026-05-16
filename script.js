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
  "IMG_0159.jpeg",
  "IMG_0160.jpeg",
  "IMG_0161.jpeg",
  "IMG_0162.jpeg",
  "IMG_0163.jpeg",
  "IMG_4874.jpeg",
  "IMG_4876.jpeg",
  "IMG_4877.jpeg",
  "IMG_4878.jpeg",
  "IMG_4879.jpeg",
  "IMG_5097.CR2",
  "IMG_5098.CR2",
  "IMG_5100.CR2",
  "IMG_5101.CR2",
  "IMG_5102.CR2",
  "IMG_5103.CR2",
  "IMG_5104.CR2",
  "IMG_5105.CR2",
  "IMG_5106.CR2",
  "IMG_5107.CR2",
  "IMG_5108.CR2",
  "IMG_5109.CR2",
  "IMG_5110.CR2",
  "IMG_5111.CR2",
  "IMG_5112.CR2",
  "IMG_5113.CR2",
  "IMG_5114.CR2",
  "IMG_5115.CR2",
  "IMG_5116.CR2"
];

const galleryGrid = document.getElementById("galleryGrid");
const downloadAllHome = document.getElementById("downloadAllHome");
const downloadAllGallery = document.getElementById("downloadAllGallery");
const uploadLink = document.getElementById("uploadLink");
const uploadPanel = document.getElementById("uploadPanel");
const closeUpload = document.getElementById("closeUpload");
const visualUpload = document.getElementById("visualUpload");
const previewGrid = document.getElementById("previewGrid");
const imageModal = document.getElementById("imageModal");
const expandedImage = document.getElementById("expandedImage");
const modalDownload = document.getElementById("modalDownload");
const closeImageModal = document.getElementById("closeImageModal");

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
    const label = document.createElement("span");
    const media = createMediaElement(filePath, fileName);
    const actions = document.createElement("div");
    const downloadLink = createDownloadLink(filePath, fileName);

    card.className = "media-card";
    label.className = "media-label";
    label.textContent = fileName;
    actions.className = "media-actions";

    if (isImageFile(fileName)) {
      const expandButton = document.createElement("button");
      expandButton.className = "media-action-button";
      expandButton.type = "button";
      expandButton.textContent = "Expand";
      expandButton.addEventListener("click", () => openImageModal(filePath, fileName));

      media.classList.add("clickable-media");
      media.addEventListener("click", () => openImageModal(filePath, fileName));
      actions.appendChild(expandButton);
    }

    actions.appendChild(downloadLink);
    card.appendChild(media);
    card.appendChild(label);
    card.appendChild(actions);
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

function createDownloadLink(filePath, fileName) {
  const downloadLink = document.createElement("a");
  downloadLink.className = "media-action-button";
  downloadLink.href = filePath;
  downloadLink.download = fileName;
  downloadLink.textContent = "Download";
  return downloadLink;
}

function isImageFile(fileName) {
  return imageTypes.includes(getExtension(fileName));
}

function getExtension(fileName) {
  return fileName.split(".").pop().toLowerCase();
}

function openImageModal(filePath, fileName) {
  expandedImage.src = filePath;
  expandedImage.alt = fileName;
  modalDownload.href = filePath;
  modalDownload.download = fileName;
  imageModal.classList.remove("hidden");
}

function closeExpandedImage() {
  imageModal.classList.add("hidden");
  expandedImage.src = "";
  modalDownload.href = "#";
}

function downloadAllFiles() {
  if (files.length === 0) {
    alert("No files have been added yet.");
    return;
  }

  files.forEach((fileName, index) => {
    setTimeout(() => {
      const downloadLink = document.createElement("a");
      downloadLink.href = `uploads/${fileName}`;
      downloadLink.download = fileName;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      downloadLink.remove();
    }, index * 400);
  });
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
downloadAllHome.addEventListener("click", downloadAllFiles);
downloadAllGallery.addEventListener("click", downloadAllFiles);
closeImageModal.addEventListener("click", closeExpandedImage);

imageModal.addEventListener("click", (event) => {
  if (event.target === imageModal) {
    closeExpandedImage();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeExpandedImage();
  }
});

buildGallery();
