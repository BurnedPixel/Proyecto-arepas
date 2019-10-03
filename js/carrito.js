class Carrito {

    //Añadir producto al carrito
    comprarProducto(e){
        e.preventDefault();
        //Delegado para agregar al carrito
        if(e.target.classList.contains('agregar-carrito')){
            const producto = e.target.parentElement.parentElement;
            //Enviamos el producto seleccionado para tomar sus datos
            this.leerDatosProducto(producto);
        }
    }
  //Esto lee los datos del producto
    leerDatosProducto(producto){
        const infoProducto = {
            imagen : producto.querySelector('img').src,
            titulo : producto.querySelector('h2').textContent,
            precio : producto.querySelector('h4').textContent,
            id : producto.querySelector('a').getAttribute('data-id'),
            cantidad : 1
        }
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(productoLS){
            if(productoLS.id === infoProducto.id){
                productosLS = productoLS.id;
            }
        });
        if(productosLS === infoProducto.id){
            Swal.fire({
                type: 'Epa chamo',
                title: '!! Epa chamo !!',
                text: 'Ya agregaste esta arepa',
                confirmButtonText: 'Sigue comprando mi pana',
                confirmButtonColor: 'rgba(255, 241, 48)'
              })
        }
        else{
            this.insertarCarrito(infoProducto);
        }
    }
//MUestra los productos seleccionados dentro del carrito
     insertarCarrito(producto){
        const row = document.createElement('tr');
        row.innerHTML = `
        <td><img src="${producto.imagen}" width=100></td> 
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>        
        <td><a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.titulo}"></a></td>
        `;
        listaProductos.appendChild(row);
        this.guardarProductosLocalStorage(producto);
    }

 //Elimina el producto del DOM   
    eliminarProducto(e){
        e.preventDefault();
        let producto, productoID;
        if(e.target.classList.contains('borrar-producto')){
            e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            producto = producto.querySelector('a').getAttribute('data-id');
        }
        this.eliminarProductoLocalStorage(productoID);
    }


//Elimina todo lo selecionado
    vaciarCarrito(e){
        e.preventDefault();
        while(listaProductos.firstChild){
            listaProductos.removeChild(listaProductos.firstChild);
        };
        this.vaciarLocalStorage();

        return false;
    }

 //Almacenar en el LS   
    guardarProductosLocalStorage(producto){
        let productos;
        //Toma valor ed un arreglo con datos del LS
        productos = this.obtenerProductosLocalStorage();
        //Agregar el producto al carrito
        productos.push(producto);
        //agregamos al LS
        localStorage.setItem('productos', JSON.stringify(productos));
    }

 //Comprobar que hay elementos en el LS   
    obtenerProductosLocalStorage(){
        let productoLS;

        //Comprobar si hay algo en LS
        if(localStorage.getItem('productos') === null){
            productoLS = [];
        }
        else{
            productoLS = JSON.parse(localStorage.getItem('productos'));
        }
        return productoLS; 
    }

//Eliminar producto por ID del LS  
    eliminarProductoLocalStorage(productoID){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(productoLS, index){
            if(productoLS.id === productoID){
                productosLS.splice(index, 1);
            }
        });
        
        localStorage.setItem('productos', JSON.stringify(productosLS));
    }

 //Mostrar los productos guardados en el LS   
    leerLocalStorage() {
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (producto) {
            //CONstruir plantilla
            const row = document.createElement('tr');
            row.innerHTML = `
        <td><img src="${producto.imagen}" width=100></td> 
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>        
        <td><a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a></td>
        `;
            listaProductos.appendChild(row);
        });
    }

    leerLocalStorageCompra(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(producto){
            const row = document.createElement('tr');
            row.innerHTML = `
        <td><img src="${producto.imagen}" width=100></td> 
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td> 
        <td><input type="number" class="form-control cantidad" min="1" value=${producto.cantidad}></td>
        <td>${producto.precio * producto.cantidad}</td>
        <td><a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a></td>
        `;
            listaCompra.appendChild(row);
        });
        console.log('asda')
    }

    vaciarLocalStorage(){
        localStorage.clear();
    }

    procesarPedido(e){
        e.preventDefault();
        if(this.obtenerProductosLocalStorage().length === 0){
            Swal.fire({
                type: 'Epa chamo',
                title: '!! Epa chamo !!',
                text: '¿ Como quieres procesar la compra si no has comprado ?',
                confirmButtonText: 'Anda y compra',
                confirmButtonColor: 'rgba(255, 241, 48)'
              })
        }
        else{
            location.href = "./compras.html"
        }
    }
}  