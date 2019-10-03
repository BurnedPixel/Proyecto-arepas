const arepa = new Carrito();
const carrito = document.getElementById('carrito');
const productos = document.getElementById('lista-productos');
const listaProductos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const procesarPedidoBtn = document.getElementById('procesar-pedido');

cargarEventos();

function cargarEventos(){
    productos.addEventListener('click', (e)=>{arepa.comprarProducto(e)});

    carrito.addEventListener('click', (e)=>{arepa.eliminarProducto(e)});

    vaciarCarritoBtn.addEventListener('click', (e)=>{arepa.vaciarCarrito(e)});

    document.addEventListener('DOMContentLoaded', arepa.leerLocalStorage());

    procesarPedidoBtn.addEventListener('click', (e)=>{arepa.procesarPedido(e)});
}

