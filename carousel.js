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

  // Opcional: cambio automático cada 5s
  setInterval(() => {
    current = (current + 1) % images.length;
    showImage(current);
  }, 5000);

  // Carrusel horizontal de productos para cada sección
document.querySelectorAll('.productos-carousel-container').forEach(container => {
  const grid = container.querySelector('.productos-grid');
  const leftProd = container.querySelector('.productos-arrow.left');
  const rightProd = container.querySelector('.productos-arrow.right');
  const producto = grid.querySelector('.producto');
  if (!grid || !leftProd || !rightProd || !producto) return;

  function getProductoWidth() {
    // Calcula el ancho real de un producto + gap
    const style = getComputedStyle(grid);
    const gap = parseFloat(style.gap) || 0;
    return producto.offsetWidth + gap;
  }

  function getVisibleCount() {
    // Cuántos productos caben en el viewport del carrusel
    const containerWidth = grid.parentElement.offsetWidth;
    const prodWidth = getProductoWidth();
    return Math.max(1, Math.floor((containerWidth + (parseFloat(getComputedStyle(grid).gap) || 0)) / prodWidth));
  }

  let productoWidth = getProductoWidth();
  let visibleCount = getVisibleCount();
  let position = 0;

  function updateCarousel() {
    // Corrige la posición si se pasa del máximo
    const maxPosition = Math.max(0, grid.children.length - visibleCount);
    if (position > maxPosition) position = maxPosition;
    // Calcula el desplazamiento real (sin sumar gap al último producto)
    const gap = parseFloat(getComputedStyle(grid).gap) || 0;
    let translate = position * (producto.offsetWidth + gap);
    grid.style.transform = `translateX(-${translate}px)`;
  }

  leftProd.addEventListener('click', () => {
    if (position > 0) {
      position--;
      updateCarousel();
    }
  });

  rightProd.addEventListener('click', () => {
    productoWidth = getProductoWidth();
    visibleCount = getVisibleCount();
    const maxPosition = Math.max(0, grid.children.length - visibleCount);
    if (position < maxPosition) {
      position++;
      if (position > maxPosition) position = maxPosition;
      updateCarousel();
    }
  });

  window.addEventListener('resize', () => {
    productoWidth = getProductoWidth();
    visibleCount = getVisibleCount();
    const maxPosition = Math.max(0, grid.children.length - visibleCount);
    if (position > maxPosition) position = maxPosition;
    updateCarousel();
  });

  // Inicializa el carrusel
  updateCarousel();
});

  // Personalización automática de mensaje WhatsApp en botones "Comprar"
  document.querySelectorAll('.btn-whatsapp-comprar').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    // Busca el nombre del producto (en el h3 más cercano)
    const producto = btn.closest('.producto');
    const nombre = producto ? producto.querySelector('h3').textContent.trim() : '';
    const mensaje = encodeURIComponent(`¡Hola K-Ray Accesorios! Vi en tu página web el producto ${nombre} y me interesa mucho. Quisiera saber más detalles, disponibilidad y formas de pago. ¡Gracias!`);
    const url = `https://wa.me/51944793924?text=${mensaje}`;
    window.open(url, '_blank');
  });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  hamburger.addEventListener('click', function() {
    navLinks.classList.toggle('open');
  });
  // Cierra el menú al hacer click en un link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
 });