const galleryImages = [
  "assets/gallery/gallery-01.jpg",
  "assets/gallery/gallery-02.jpg",
  "assets/gallery/gallery-03.jpg"
];

const galleryGrid = document.querySelector("#galleryGrid");

if (galleryGrid) {
  galleryImages.forEach(function (imagePath, index) {
    const link = document.createElement("a");
    link.className = "gallery-item";
    link.href = imagePath;
    link.target = "_blank";
    link.rel = "noopener";

    const img = document.createElement("img");
    img.src = imagePath;
    img.alt = "Hookah Master gallery photo " + (index + 1);
    img.loading = "lazy";

    link.appendChild(img);
    galleryGrid.appendChild(link);
  });
}
