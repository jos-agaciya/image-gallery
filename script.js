document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.image-container img');
  const containers = document.querySelectorAll('.image-container');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const closeBtn = document.querySelector('.close');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const filterBtns = document.querySelectorAll('.filter-buttons button');

  let visibleImages = [];
  let currentIndex = 0;

  function updateVisibleImages() {
    visibleImages = Array.from(images).filter(img => !img.parentElement.classList.contains('hide'));
  }

  function openLightbox(img) {
    updateVisibleImages();
    currentIndex = visibleImages.indexOf(img);
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
  }

  function closeLightbox() {
    lightbox.style.display = 'none';
  }

  function showNext() {
    if (visibleImages.length === 0) return;
    currentIndex = (currentIndex + 1) % visibleImages.length;
    fadeLightboxImage(visibleImages[currentIndex].src);
  }

  function showPrev() {
    if (visibleImages.length === 0) return;
    currentIndex = (currentIndex - 1 + visibleImages.length) % visibleImages.length;
    fadeLightboxImage(visibleImages[currentIndex].src);
  }

  // Fade transition inside lightbox
  function fadeLightboxImage(src) {
    lightboxImg.style.opacity = 0;
    setTimeout(() => {
      lightboxImg.src = src;
      lightboxImg.style.opacity = 1;
    }, 200);
  }

  // Click events on gallery images
  images.forEach(img => {
    img.addEventListener('click', () => {
      if (img.parentElement.classList.contains('hide')) return;
      openLightbox(img);
    });
  });

  // Filter buttons with fade
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter');
      containers.forEach(container => {
        if (category === 'all' || container.dataset.category === category) {
          container.classList.remove('hide'); // fade in
        } else {
          container.classList.add('hide'); // fade out
        }
      });
      updateVisibleImages();
    });
  });

  // Lightbox button events
  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);

  // Close lightbox by clicking outside image
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard support
  document.addEventListener('keydown', e => {
    if (lightbox.style.display !== 'flex') return;
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'Escape') closeLightbox();
  });
});