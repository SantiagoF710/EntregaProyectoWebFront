import { Productos } from './Productos.js'
import { MiServidor } from './MiServidor.js';

export const imprimir = (elemento, contenido) => {
  document.querySelector(`#${elemento}`).innerHTML = contenido;
};

export const obtenerValorInput = (idInput) => document.getElementById(idInput).value;

export const validarSesion = () => {
  const sesionActiva = sessionStorage.getItem('sesionActiva') === 'TRUE';
  const estaEnLogin = document.location.pathname.includes('login.html');

  if (!sesionActiva) {

    if (!estaEnLogin) {
      document.location.replace('login.html');
    }
  } else if (estaEnLogin) {

    document.location.replace('lista.html');
  }
};

export const mostrarTodosLosProductos = (productos = [new Productos()]) => {
  let listado = '<article id="grilla" class="grillacat" </article> '

  productos.forEach((c) => {
    listado += c.mostrarEnLista();
  });

  return listado;
};
