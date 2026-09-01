import { MiServidor } from '../MiServidor.js';

const contenedor = document.getElementById('detalle-container');
const idProducto = Number(new URLSearchParams(window.location.search).get('id'));

const mostrarError = (mensaje) => {
  contenedor.innerHTML = `<div class="estado-detalle"><h2>No pudimos cargar el producto</h2><p>${mensaje}</p><a class="boton" href="lista.html" style="margin-top:20px;">Volver al catalogo</a></div>`;
};

if (!idProducto) {
  mostrarError('El identificador del producto no es valido.');
} else {
  MiServidor.obtenerListaProductos()
    .then((productos) => {
      const producto = productos.find((item) => item.id === idProducto);

      if (!producto) {
        throw new Error('El producto solicitado no existe.');
      }

      contenedor.innerHTML = `
        <article class="producto-detalle">
          <div class="imagen-detalle"><img src="${producto.img}" alt="${producto.nombre}"></div>
          <div class="detalle-info">
            <span class="categoria-producto">${producto.categoria}</span>
            <h1>${producto.nombre}</h1>
            <p class="descripcion-detalle">${producto.descripcion || 'Un producto seleccionado con la calidad y confianza de Frog.'}</p>
            <div class="precio-detalle">$${producto.precio}</div>
            <div class="acciones-detalle"><button id="agregarDetalle" type="button">Agregar al carrito</button><a class="boton boton-secundario" href="lista.html">Seguir comprando</a></div>
          </div>
        </article>`;

      document.getElementById('agregarDetalle').addEventListener('click', () => {
        const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        window.dispatchEvent(new Event('cart-updated'));
        document.getElementById('agregarDetalle').textContent = 'Agregado al carrito';
      });
    })
    .catch((error) => mostrarError(error.message || error));
}
