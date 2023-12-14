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
        <img src="${this.img}" alt="${this.nombre}">
        <div class="precio"><p>PRECIO = $${this.precio}</p></div>
        <div class="acciones">
        <a href="detalle.html?id=${this.id}">Ver más...</a>
          <button class="agregarCarrito" data-id="${this.id}">Agregar al carrito</button>
        </div>
      </figure>`;
    }
    mostrarDetalle(){
        
    }


}