let productos = [];
let indiceEditar = null;

function agregarProducto() {
    let nombre = document.getElementById("nombre").value;
    let precio = document.getElementById("precio").value;
    let descripcion = document.getElementById("descripcion").value;

    if (nombre === "" || precio === "" || descripcion === "") {
        alert("Complete todos los campos");
        return;
    }

    if (indiceEditar === null) {
        productos.push({ nombre, precio, descripcion });
    } else {
        productos[indiceEditar] = { nombre, precio, descripcion };
        indiceEditar = null;
    }

    limpiarFormulario();
    mostrarProductos();
}

function mostrarProductos() {
    let tabla = document.getElementById("tablaProductos");
    tabla.innerHTML = "";

    productos.forEach((prod, index) => {
        tabla.innerHTML += `
            <tr>
                <td>${prod.nombre}</td>
                <td>$${prod.precio}</td>
                <td>${prod.descripcion}</td>
                <td>
                    <button class="editar-btn" onclick="editarProducto(${index})">
                        Editar
                    </button>
                </td>
            </tr>
        `;
    });
}

function editarProducto(index) {
    document.getElementById("nombre").value = productos[index].nombre;
    document.getElementById("precio").value = productos[index].precio;
    document.getElementById("descripcion").value = productos[index].descripcion;

    indiceEditar = index;
}

function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("descripcion").value = "";
}