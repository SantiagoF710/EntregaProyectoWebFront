const slider = document.querySelector('#slider');
const sliderStatus = document.querySelector('#sliderStatus');
let contador = 1;

const paneles = [
  { src: '../Img/banner1.jpg', label: 'Ofertas en snacks Cheetos y Ruffles' },
  { src: '../Img/banner2.jpg', label: 'Descuento en la segunda unidad de Sprite' },
  { src: '../Img/banner3.jpg', label: 'Promociones destacadas de Frog' },
  { src: '../Img/banner4.jpg', label: 'Beneficios y descuentos de Frog' }
];

paneles.slice(1).forEach(({ src }) => {
  const imagen = new Image();
  imagen.src = src;
});

function cargarSlider() {
  slider.style.opacity = '0.35';

  window.setTimeout(() => {
    const panel = paneles[contador];
    slider.style.backgroundImage = `url("${panel.src}")`;
    slider.setAttribute('aria-label', panel.label);
    sliderStatus.textContent = `${contador + 1} / ${paneles.length}`;
    slider.style.opacity = '1';
    contador = (contador + 1) % paneles.length;
  }, 180);
}

window.setInterval(cargarSlider, 7000);
