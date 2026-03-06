let productos = [];
let indiceEditar = null;

function mostrarSeccion(seccion) {
    document.getElementById("formularioSection").style.display =
        seccion === "formulario" ? "block" : "none";

    document.getElementById("listaSection").style.display =
        seccion === "lista" ? "block" : "none";
}

function agregarProducto() {

    let nombre = document.getElementById("nombre").value.trim();
    let precio = document.getElementById("precio").value;
    let stock = parseInt(document.getElementById("stock").value);
    let descripcion = document.getElementById("descripcion").value.trim();
    let categoria = document.getElementById("categoria").value;

    if (!nombre || !precio || isNaN(stock) || !descripcion || !categoria) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos incompletos',
            text: 'Complete toda la información'
        });
        return;
    }

    // Estado automático
    let estado = stock === 0 ? "Inactivo" : "Activo";

    let producto = {
        nombre,
        precio,
        stock,
        descripcion,
        categoria,
        estado
    };

    if (indiceEditar === null) {
        productos.push(producto);

        Swal.fire({
            icon: 'success',
            title: 'Producto agregado'
        });

    } else {
        productos[indiceEditar] = producto;
        indiceEditar = null;

        Swal.fire({
            icon: 'success',
            title: 'Producto actualizado'
        });
    }

    limpiarFormulario();
    mostrarProductos();
    mostrarSeccion("lista");
}

function mostrarProductos() {
    let tabla = document.getElementById("tablaProductos");
    tabla.innerHTML = "";

    productos.forEach((prod, index) => {

        let badgeEstado = prod.estado === "Activo"
            ? '<span class="badge bg-success">Activo</span>'
            : '<span class="badge bg-secondary">Inactivo</span>';

        let badgeStock;

        if (prod.stock === 0) {
            badgeStock = `<span class="badge bg-danger">0 (Sin stock)</span>`;
        } else if (prod.stock <= 5) {
            badgeStock = `<span class="badge bg-warning text-dark">${prod.stock} (Bajo)</span>`;
        } else {
            badgeStock = `<span class="badge bg-primary">${prod.stock}</span>`;
        }

        tabla.innerHTML += `
            <tr>
                <td>${prod.nombre}</td>
                <td>$${prod.precio}</td>
                <td>${badgeStock}</td>
                <td>${prod.descripcion}</td>
                <td>${prod.categoria}</td>
                <td>${badgeEstado}</td>
                <td>
                    <button class="btn btn-success btn-sm me-2" onclick="editarProducto(${index})">
                        Editar
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${index})">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });
}

function editarProducto(index) {

    document.getElementById("nombre").value = productos[index].nombre;
    document.getElementById("precio").value = productos[index].precio;
    document.getElementById("stock").value = productos[index].stock;
    document.getElementById("descripcion").value = productos[index].descripcion;
    document.getElementById("categoria").value = productos[index].categoria;

    indiceEditar = index;
    mostrarSeccion("formulario");
}

function eliminarProducto(index) {

    Swal.fire({
        title: '¿Eliminar producto?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#6c757d',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {

        if (result.isConfirmed) {
            productos.splice(index, 1);
            mostrarProductos();

            Swal.fire({
                icon: 'success',
                title: 'Producto eliminado'
            });
        }
    });
}

function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("precio").value = "";
    document.getElementById("stock").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("categoria").value = "";
}