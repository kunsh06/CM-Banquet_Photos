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
