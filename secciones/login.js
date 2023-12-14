import { MiServidor } from '../MiServidor.js';
import { imprimir, obtenerValorInput, validarSesion } from '../Utiles.js';

validarSesion();
document.querySelector('#botonLogin').addEventListener('click', () => {

  const email = obtenerValorInput('usuarioLogin');
  const password = obtenerValorInput('contraseñaLogin');

  if (!email || !password) {
    imprimir('errorLogin', 'Debe ingresar un email y una contraseña');
    usuarioLogin.focus()
    usuarioLogin.value = ""
    contraseñaLogin.value = ""
  return;
}


  MiServidor.login(email, password)
    .then(() => {
      sessionStorage.setItem('sesionActiva', 'TRUE');
      document.location.replace('inicio.html');
    })
    .catch((error) => {
      imprimir('errorLogin', error);
      usuarioLogin.focus()
      usuarioLogin.value = ""
      contraseñaLogin.value = ""
    });
});
