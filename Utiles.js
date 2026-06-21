import { Productos } from './Productos.js'
import { MiServidor } from './MiServidor.js';

export const imprimir = (elemento, contenido) => {
  document.querySelector(`#${elemento}`).innerHTML = contenido;
};

export const obtenerValorInput = (idInput) => document.getElementById(idInput).value;

export const validarSesion = () => {
  const sesionActiva = sessionStorage.getItem('sesionActiva') === 'TRUE';
  const estaEnLogin = document.location.pathname.endsWith('/index.html') || document.location.pathname === '/';
  const estaEnSecciones = document.location.pathname.includes('/secciones/');

  if (!sesionActiva) {
    if (!estaEnLogin) {
      document.location.replace(estaEnSecciones ? '../index.html' : 'index.html');
    }
  } else if (estaEnLogin) {
    document.location.replace('secciones/inicio.html');
  }
};

export const mostrarTodosLosProductos = (productos = [new Productos()]) => {
  return `<article id="grilla" class="grillacat">${productos.map((producto) => producto.mostrarEnLista()).join('')}</article>`;
};
