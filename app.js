let productos = [];

function agregarProducto() {
    let nombre = document.getElementById("nombre").value;
    let precio = document.getElementById("precio").value;

    if (nombre === "" || precio === "") {
        alert("Por favor complete todos los campos");
        return;
    }

    let producto = {
        nombre: nombre,
        precio: precio
    };

    productos.push(producto);

    mostrarProductos();

    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
}

function mostrarProductos() {
    let lista = document.getElementById("listaProductos");
    lista.innerHTML = "";

    productos.forEach(function(prod) {
        let li = document.createElement("li");
        li.textContent = prod.nombre + " - $" + prod.precio;
        lista.appendChild(li);
    });
}