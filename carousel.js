document.addEventListener('DOMContentLoaded', function() {
   // Carrusel de imágenes principal (hero)
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

  // Opcional: cambio automático cada 6s
  setInterval(() => {
    current = (current + 1) % images.length;
    showImage(current);
  }, 6000);

  // Carrusel horizontal de productos para cada sección
  document.querySelectorAll('.productos-carousel-container').forEach(container => {
    const grid = container.querySelector('.productos-grid');
    const leftProd = container.querySelector('.productos-arrow.left');
    const rightProd = container.querySelector('.productos-arrow.right');
    const producto = grid.querySelector('.producto');
    if (!grid || !leftProd || !rightProd || !producto) return;

    let productoWidth = producto.offsetWidth + parseInt(getComputedStyle(grid).gap) || 0;
    let visibleCount = Math.floor(grid.parentElement.offsetWidth / productoWidth);
    let position = 0;

    function updateCarousel() {
      grid.style.transform = `translateX(-${position * productoWidth}px)`;
    }

    leftProd.addEventListener('click', () => {
      if (position > 0) {
        position--;
        updateCarousel();
      }
    });

    rightProd.addEventListener('click', () => {
      if (position < grid.children.length - visibleCount) {
        position++;
        updateCarousel();
      }
    });

    window.addEventListener('resize', () => {
      productoWidth = producto.offsetWidth + parseInt(getComputedStyle(grid).gap) || 0;
      visibleCount = Math.floor(grid.parentElement.offsetWidth / productoWidth);
      updateCarousel();
    });
  });
});