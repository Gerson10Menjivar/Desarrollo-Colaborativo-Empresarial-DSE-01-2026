let productos = [];
let indiceEditar = null;

function agregarProducto() {

    let nombre = document.getElementById("nombre").value;
    let precio = document.getElementById("precio").value;
    let descripcion = document.getElementById("descripcion").value;
    let estado = document.getElementById("estado").value;
    let categoria = document.getElementById("categoria").value;

    if (nombre === "" || precio === "" || descripcion === "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campos incompletos',
            text: 'Por favor complete toda la información'
        });
        return;
    }

    if (indiceEditar === null) {

        productos.push({
            nombre,
            precio,
            descripcion,
            estado,
            categoria
        });

        Swal.fire({
            icon: 'success',
            title: 'Producto agregado'
        });

    } else {

        productos[indiceEditar] = {
            nombre,
            precio,
            descripcion,
            estado,
            categoria
        };

        indiceEditar = null;

        Swal.fire({
            icon: 'success',
            title: 'Producto actualizado'
        });
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
                <td>${prod.categoria}</td>
                <td>
                    <span class="badge ${prod.estado === 'Activo' ? 'bg-success' : 'bg-secondary'}">
                        ${prod.estado}
                    </span>
                </td>
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
    document.getElementById("estado").value = productos[index].estado;
    document.getElementById("categoria").value = productos[index].categoria;

    indiceEditar = index;

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("estado").value = "Activo";
    document.getElementById("categoria").value = "";
}