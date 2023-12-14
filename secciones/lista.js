    import { Productos } from '../Productos.js';
    import { MiServidor } from '../MiServidor.js';
    import { imprimir, mostrarTodosLosProductos, validarSesion } from '../Utiles.js';

    let inicio = 0;
    let final = 16;
    let filtroCategorias;
    let data;
    let carrito = [];

    validarSesion();
    cargarProductos();

    function cargarProductos() {
        MiServidor.obtenerListaProductos()
            .then((productos) => {
                data = productos;
                mostrarListado();
                cargarCategorias();
            })
            .catch(mostrarError);
    }

    function cargarCategorias() {
        const categoriasUnicas = [...new Set(data.map((p) => p.categoria))];
        filtroCategorias = document.getElementById('filtroCategorias');

        filtroCategorias.innerHTML = '';

        const todasLasCategoriasOption = document.createElement('option');
        todasLasCategoriasOption.value = 'todas';
        todasLasCategoriasOption.textContent = 'Todas las categorías';
        filtroCategorias.appendChild(todasLasCategoriasOption);

        categoriasUnicas.forEach((categoria) => {
            const option = document.createElement('option');
            option.value = categoria;
            option.textContent = categoria;
            filtroCategorias.appendChild(option);
        });

        filtroCategorias.addEventListener('change', () => {
            const categoriaSeleccionada = filtroCategorias.value;

            if (categoriaSeleccionada === 'todas') {
                mostrarListado(data); 
                mostrarBotonesN(true); 
            } else {
                const productosFiltrados = data.filter((p) => p.categoria === categoriaSeleccionada);
                mostrarListado(productosFiltrados);
                mostrarBotonesN(false); 
            }

            const nuevaURL = window.location.href.split('?')[0] + `?categoria=${categoriaSeleccionada}`;
            history.pushState({}, '', nuevaURL);
        });

        const categoriaParametro = obtenerParametroUrl('categoria');
        if (categoriaParametro) {
            filtroCategorias.value = categoriaParametro;
            const productosFiltrados = data.filter((p) => p.categoria === categoriaParametro);
            mostrarListado(productosFiltrados);
            mostrarBotonesN(false); // Ocultar botones
        }
    }

    function mostrarListado(productos = data) {

        const productosOrdenados = productos.sort((a, b) => a.id - b.id);

        const productosPrimeros16 = productosOrdenados.slice(inicio, final);

        const productosMostrados = productosPrimeros16.map((p) =>
            new Productos(p.id, p.img, p.nombre, p.precio, p.descripcion, p.categoria)
        );

        imprimir('primeraseccion', mostrarTodosLosProductos(productosMostrados));
        mostrarBotonesN(true); 

        document.querySelectorAll('.agregarCarrito').forEach((boton) => {
            boton.addEventListener('click', (event) => {
                const productId = event.target.dataset.id;
                const productoEncontrado = data.find((p) => p.id === parseInt(productId));
        
                if (productoEncontrado) {

                    carrito.push(productoEncontrado);
                    console.log('Producto agregado al carrito:', productoEncontrado);
                    console.log('Carrito:', carrito);
        
                    localStorage.setItem('carrito', JSON.stringify(carrito));
                    mostrarMensajeAgregado(productoEncontrado.nombre);
                }
            });
        });
    }
    
    function mostrarMensajeAgregado(nombreProducto) {

        const mensajeNotificacion = document.getElementById('mensajeNotificacion');
        const notificacion = document.getElementById('notificacion');
    
        mensajeNotificacion.innerText = `${nombreProducto} ha sido agregado al carrito.`;
    
        notificacion.style.display = 'block';

        setTimeout(() => {
            notificacion.style.display = 'none';
        }, 2000); 
    }
    function mostrarError(error) {
        imprimir('listaError', error);
    }

    function mostrarBotonesN(visible) {
        const botonesN = document.querySelectorAll(".n");
        botonesN.forEach((boton) => {
            boton.style.display = visible ? 'inline-block' : 'none';
        });
    }

    function obtenerParametroUrl(nombre) {
        nombre = nombre.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + nombre + '=([^&#]*)');
        var resultados = regex.exec(location.search);
        return resultados === null ? '' : decodeURIComponent(resultados[1].replace(/\+/g, ' '));
    }

    function actualizarGrilla(rangoInicio, rangoFinal) {
        inicio = rangoInicio;
        final = rangoFinal;
        mostrarListado();
    }

    window.onload = cargarProductos;

    let n1 = document.querySelector(".n1");
    let n2 = document.querySelector(".n2");
    let n3 = document.querySelector(".n3");

    n1.addEventListener("click", () => actualizarGrilla(0, 16));
    n2.addEventListener("click", () => actualizarGrilla(16, 32));
    n3.addEventListener("click", () => actualizarGrilla(32, 48));

