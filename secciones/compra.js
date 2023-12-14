function mostrarFormularioTienda() {
    const tiendaForm = document.getElementById('tiendaForm');
    const domicilioForm = document.getElementById('domicilioForm');

    tiendaForm.style.display = 'block';
    domicilioForm.style.display = 'none';
}

function mostrarFormularioDomicilio() {
    const tiendaForm = document.getElementById('tiendaForm');
    const domicilioForm = document.getElementById('domicilioForm');

    tiendaForm.style.display = 'none';
    domicilioForm.style.display = 'block';

    const botonSeleccionarPago = document.querySelector('#domicilioForm button');
    botonSeleccionarPago.disabled = true;

    document.getElementById('nombre').addEventListener('input', validarCamposDomicilio);
    document.getElementById('direccion').addEventListener('input', validarCamposDomicilio);
}

function mostrarOpcionesPago() {
    const opcionesPago = document.getElementById('opcionesPago');
    opcionesPago.style.display = 'block';
}

function mostrarFormularioTarjeta() {
    const tarjetaForm = document.getElementById('tarjetaForm');
    tarjetaForm.style.display = 'block';

    const botonAceptar = document.querySelector('#tarjetaForm button');
    botonAceptar.disabled = true;

    document.getElementById('numeroTarjeta').addEventListener('input', validarCamposTarjeta);
    document.getElementById('nombreTitular').addEventListener('input', validarCamposTarjeta);
    document.getElementById('fechaExpiracion').addEventListener('input', validarCamposTarjeta);
    document.getElementById('codigoSeguridad').addEventListener('input', validarCamposTarjeta);

    botonAceptar.addEventListener('click', () => realizarCompra('Tarjeta'));
}

function validarCamposDomicilio() {
    const nombre = document.getElementById('nombre').value;
    const direccion = document.getElementById('direccion').value;
    const botonSeleccionarPago = document.querySelector('#domicilioForm button');

    botonSeleccionarPago.disabled = !(nombre && direccion);
}

function validarCamposTarjeta() {
    const numeroTarjeta = document.getElementById('numeroTarjeta').value;
    const nombreTitular = document.getElementById('nombreTitular').value;
    const fechaExpiracion = document.getElementById('fechaExpiracion').value;
    const codigoSeguridad = document.getElementById('codigoSeguridad').value;
    const botonAceptar = document.querySelector('#tarjetaForm button');

    botonAceptar.disabled = !(numeroTarjeta && nombreTitular && fechaExpiracion && codigoSeguridad);
}

function realizarCompra(metodoPago) {

    const mensajeCompraCompletada = document.getElementById('mensajeCompraCompletada');
    mensajeCompraCompletada.style.display = 'block';

    setTimeout(() => {
        window.location.href = 'inicio.html';
    }, 3000);
}