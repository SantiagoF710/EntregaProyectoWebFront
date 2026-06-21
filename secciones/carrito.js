document.addEventListener('DOMContentLoaded', () => {
  const carrito = obtenerCarrito();
  mostrarCarritoEnHTML(carrito);
});

function obtenerCarrito() {
  try {
    return JSON.parse(localStorage.getItem('carrito')) || [];
  } catch {
    return [];
  }
}

function mostrarCarritoEnHTML(carrito) {
  const contenedor = document.getElementById('carrito-container');
  const compraDiv = document.getElementById('compra');

  if (carrito.length === 0) {
    contenedor.innerHTML = '<div class="empty-cart"><h3>Tu carrito está vacío</h3><p>Explorá el catálogo y agregá los productos que necesites.</p><a class="btn" href="lista.html" style="margin-top:20px;">Ver productos</a></div>';
    document.getElementById('total-precio').innerText = 'Total: $0.00';
    compraDiv.innerHTML = '';
    window.dispatchEvent(new Event('cart-updated'));
    return;
  }

  contenedor.innerHTML = carrito.map((producto) => `
    <figure class="producto producto-en-carrito">
      <div class="product-image-wrap"><img src="${producto.img}" alt="${producto.nombre}"><span class="product-category">${producto.categoria || 'Frog'}</span></div>
      <figcaption class="product-info"><h3>${producto.nombre}</h3><div class="precio">$${producto.precio}</div></figcaption>
      <div class="acciones"><button class="eliminar-del-carrito" data-id="${producto.id}" type="button">Quitar del carrito</button></div>
    </figure>`).join('');

  const totalPrecio = carrito.reduce((total, producto) => total + Number.parseFloat(producto.precio || 0), 0);
  document.getElementById('total-precio').innerText = `Total: $${totalPrecio.toFixed(2)}`;
  compraDiv.innerHTML = '<button id="compra-btn" type="button">Continuar compra</button>';
  document.getElementById('compra-btn').addEventListener('click', () => { window.location.href = 'compra.html'; });

  document.querySelectorAll('.eliminar-del-carrito').forEach((boton) => {
    boton.addEventListener('click', () => {
      const indice = carrito.findIndex((producto) => producto.id === Number(boton.dataset.id));
      if (indice >= 0) carrito.splice(indice, 1);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      window.dispatchEvent(new Event('cart-updated'));
      mostrarCarritoEnHTML(carrito);
    });
  });
}
