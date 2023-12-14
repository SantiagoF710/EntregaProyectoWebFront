const manejarErrores = (error = new Error('Error desconocido')) => {
    console.error('Ha ocurrido un error:', error.message);
  
    throw error.message;
  };
  
  const obtenerUrl = (ruta) => `${MiServidor.urlBase}/${ruta}`;
  
  const procesarRespuesta = (res) => {
    return res.json()
      .then((data) => {
        if (data.error) {
          throw new Error(data.mensaje);
        }
  
        return data.mensaje;
      });
  }
  
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  
  export class MiServidor {
    static urlBase = 'https://adsfasdf-xosw.onrender.com';
    /* static urlBase = 'http://localhost:3000'; */
  
   
    static login(email, password) {
      const body = JSON.stringify({ email, password });
  
      return fetch(obtenerUrl('login'), { method: 'POST', body, headers })
        .then(procesarRespuesta)
        .catch(manejarErrores);
    }
  
    static signup(email, password) {
      const body = JSON.stringify({ email, password });
  
      return fetch(obtenerUrl('signup'), { method: 'POST', body, headers })
        .then(procesarRespuesta)
        .catch(manejarErrores);
  
  }
  
   
    static logout() {
      return fetch(obtenerUrl('logout'), { method: 'POST' })
        .then(procesarRespuesta)
        .catch(manejarErrores);
    }
  
  
    static obtenerListaProductos() {
      return fetch(obtenerUrl('productos'), { method: 'GET' })
        .then(procesarRespuesta)
        .catch(manejarErrores);
    }

    static obtenerProductos(idProducto) {
      return fetch(obtenerUrl(`Productos/${idProducto}`))
        .then(procesarRespuesta)
        .catch(manejarErrores);
  
      }

  }
  