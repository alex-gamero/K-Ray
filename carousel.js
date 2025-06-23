document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('.carousel-images img');
  const left = document.querySelector('.carousel-arrow.left');
  const right = document.querySelector('.carousel-arrow.right');
  let current = 0;

  function showImage(idx) {
    images.forEach((img, i) => img.classList.toggle('active', i === idx));
  }

  left.addEventListener('click', () => {
    current = (current - 1 + images.length) % images.length;
    showImage(current);
  });

  right.addEventListener('click', () => {
    current = (current + 1) % images.length;
    showImage(current);
  });

  // Opcional: cambio automático cada 5s
  setInterval(() => {
    current = (current + 1) % images.length;
    showImage(current);
  }, 6000);
});