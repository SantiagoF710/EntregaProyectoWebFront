export class Productos {
    id;
    img;
    nombre;
    precio;
    descripcion;
    categoria;

    constructor(
        id = 0,
        img = '',
        nombre = '',
        precio = '',
        descripcion = '',
        categoria = '',
    ) {
        this.id = id;
        this.img = img;
        this.nombre = nombre;
        this.precio = precio;
        this.descripcion = descripcion;
        this.categoria = categoria;
    }

    mostrarEnLista() {
      return `<figure class="producto">
        <div class="marco-imagen-producto">
          <img src="${this.img}" alt="${this.nombre}">
          <span class="categoria-producto">${this.categoria}</span>
        </div>
        <figcaption class="info-producto">
          <h3>${this.nombre}</h3>
          <p>${this.descripcion || 'Un producto seleccionado con la calidad de Frog.'}</p>
          <div class="precio">$${this.precio}</div>
        </figcaption>
        <div class="acciones">
          <a href="detalle.html?id=${this.id}">Ver detalle</a>
          <button class="agregar-carrito" data-id="${this.id}" type="button">Agregar</button>
        </div>
      </figure>`;
    }
}
