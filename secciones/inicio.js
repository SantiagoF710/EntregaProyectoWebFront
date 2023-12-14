let slider = document.querySelector("#slider")
let contador = 1 

const paneles = ["../Img/banner1.jpg","../Img/banner2.jpg","../Img/banner3.jpg","../Img/banner4.jpg"]

function cargarSlider(){


    slider.style.backgroundImage = "url(" + paneles[contador]
    contador++

    if(contador >= 4){

        contador = 0

    }
  
}

 setInterval(cargarSlider, 7000)