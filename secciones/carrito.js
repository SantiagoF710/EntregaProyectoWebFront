document.addEventListener('DOMContentLoaded', () => {

    const carritoGuardado = localStorage.getItem('carrito');


    if (carritoGuardado) {
        let carrito = JSON.parse(carritoGuardado);

        mostrarCarritoEnHTML(carrito);

        document.getElementById('compra-btn').addEventListener('click', () => {
            window.location.href = 'compra.html';
        });
    }

    const formaPagoForm = document.getElementById('forma-pago-form');
    if (formaPagoForm) {
        formaPagoForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const metodoPago = document.querySelector('input[name="pago"]:checked');
            
            if (metodoPago) {
                const metodoSeleccionado = metodoPago.value;
                console.log('Método de pago seleccionado:', metodoSeleccionado);

            } else {
                console.log('Selecciona un método de pago antes de continuar.');
            }
        });
    }
});

function mostrarCarritoEnHTML(carrito) {
    const carritoHTML = carrito.map((producto) => {
        return `
            <figure class="producto-en-carrito producto">
            <img src="${producto.img}" alt="${producto.nombre}">
            <div class="precio"><p>${producto.nombre} - $${producto.precio}</p></div>
            <div class="acciones">
            <button class="eliminar-del-carrito" data-id="${producto.id}">Eliminar del carrito</button>
            </div>
        </figure>`;
    }).join('');


    document.getElementById('carrito-container').innerHTML = carritoHTML;

    const totalPrecio = carrito.reduce((total, producto) => total + parseFloat(producto.precio), 0);

    document.getElementById('total-precio').innerText = `Total: $${totalPrecio.toFixed(2)}`;

    const compraDiv = document.getElementById('compra');
    if (compraDiv) { 
        if (carrito.length > 0) {
            compraDiv.innerHTML = '<button id="compra-btn">Comprar</button>';
            document.getElementById('compra-btn').addEventListener('click', redireccionarCompra);
        } else {
            compraDiv.innerHTML = ''; 
        }
    }

    document.querySelectorAll('.eliminar-del-carrito').forEach((boton) => {
        boton.addEventListener('click', (event) => {
            const productId = event.target.dataset.id;

            carrito = carrito.filter((producto) => producto.id !== parseInt(productId));

            localStorage.setItem('carrito', JSON.stringify(carrito));

            mostrarCarritoEnHTML(carrito);
        });
    });
}

function redireccionarCompra() {
    window.location.href = 'compra.html';
}