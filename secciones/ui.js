import { validarSesion } from '../Utiles.js';

validarSesion();

const menuToggle = document.querySelector('.boton-menu');
const siteNav = document.querySelector('.navegacion-sitio');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('abierto');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  siteNav.addEventListener('click', () => {
    siteNav.classList.remove('abierto');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
}

const obtenerCarrito = () => {
  try {
    return JSON.parse(localStorage.getItem('carrito')) || [];
  } catch {
    return [];
  }
};

const actualizarContadorCarrito = () => {
  const cantidad = obtenerCarrito().length;
  document.querySelectorAll('.contador-carrito').forEach((contador) => {
    contador.textContent = cantidad;
    contador.setAttribute('aria-label', `${cantidad} productos en el carrito`);
  });
};

actualizarContadorCarrito();
window.addEventListener('storage', actualizarContadorCarrito);
window.addEventListener('cart-updated', actualizarContadorCarrito);

document.querySelectorAll('.boton-salir').forEach((boton) => {
  boton.addEventListener('click', () => {
    sessionStorage.removeItem('sesionActiva');
    document.location.replace('../index.html');
  });
});
