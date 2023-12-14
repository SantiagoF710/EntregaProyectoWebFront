import { MiServidor } from '../MiServidor.js';
import { imprimir, obtenerValorInput, } from '../Utiles.js';

document.querySelector("#botonSignupVolver").addEventListener('click', () => {
    document.location.replace('../Index.html');
  });

document.querySelector('#botonSignup').addEventListener('click', () => {

    const email = obtenerValorInput('usuarioSignup');
    const password = obtenerValorInput('contraseñaSignup');
  
    if (!email || !password) {
        imprimir('errorSignup', 'Debe ingresar un email y una contraseña');
          usuarioSignup.focus()
          usuarioSignup.value = ""
          contraseñaSignup.value = ""
      return;
    }

    MiServidor.signup(email, password)
  .then(() => {
    document.location.replace('../Index.html');
  })
  .catch(() => {
    imprimir('errorSignup', `Ya existe un usuario con el email ${email}`);
    usuarioSignup.focus()
    usuarioSignup.value = ""
    contraseñaSignup.value = ""
  });
});