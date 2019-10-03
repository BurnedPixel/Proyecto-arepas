const compra = new Min();
const listaCompra = document.querySelector('#lista-carrito tbody');

cargarEventos()

function cargarEventos(){
    
    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());
} 
