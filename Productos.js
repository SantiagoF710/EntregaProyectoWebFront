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
        <div class="product-image-wrap">
          <img src="${this.img}" alt="${this.nombre}">
          <span class="product-category">${this.categoria}</span>
        </div>
        <figcaption class="product-info">
          <h3>${this.nombre}</h3>
          <p>${this.descripcion || 'Un producto seleccionado con la calidad de Frog.'}</p>
          <div class="precio">$${this.precio}</div>
        </figcaption>
        <div class="acciones">
          <a href="detalle.html?id=${this.id}">Ver detalle</a>
          <button class="agregarCarrito" data-id="${this.id}" type="button">Agregar</button>
        </div>
      </figure>`;
    }
}
