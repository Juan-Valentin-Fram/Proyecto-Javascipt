/**
 * PROYECTO FINAL: CALCULADORA DE GASTOS
 * Objetivo: Simulador interactivo de finanzas personales 
 * Aplicando conceptos de Objetos, DOM, Storage, H.O.S y Fetch.
 */

// CLASES Y ABSTRACCIÓN 
// Definimos el modelo de datos para representar un gasto individual.
class Gasto {
    constructor(id, nombre, precio, categoria) {
        this.id = id;
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.categoria = categoria;
    }
}

// ESTADO Y PERSISTENCIA (Storage + JSON)
// Recuperamos datos previos del localStorage o inicializamos un array vacío.
// Usamos JSON.parse para convertir el string almacenado nuevamente en objeto JS.
let gastos = JSON.parse(localStorage.getItem("misGastos")) || [];

// Referencias al DOM para interacción [cite: 533]
const selectCategorias = document.querySelector("#categoriaGasto");
const btnGuardar = document.querySelector("#botonGuardar");
const contenedorLista = document.querySelector("#listaGastos");

// ASINCRONISMO Y FETCH 
// Cargamos las categorías desde un archivo local .json de forma no bloqueante.
const cargarCategorias = async () => {
    try {
        const response = await fetch("./data/categorias.json");
        const data = await response.json();
        // Generamos dinámicamente las opciones del select en el DOM.
        data.forEach(cat => {
            const option = document.createElement("option");
            option.value = cat.nombre;
            option.innerText = cat.nombre;
            selectCategorias.appendChild(option);
        });
    } catch (error) {
        console.error("Error al cargar categorías:", error);
    }
};

// LÓGICA DE NEGOCIO (Entrada y Procesamiento)
const agregarGasto = () => {
    const nombre = document.querySelector("#nombreGasto").value;
    const precio = document.querySelector("#montoGasto").value;
    const categoria = selectCategorias.value;

    // Validación de entradas antes de procesar 
    if (nombre === "" || precio <= 0) {
        Swal.fire({
            title: "Datos incompletos",
            text: "Por favor ingresa una descripción y un monto válido.",
            icon: "warning"
        });
        return;
    }

    // Instanciamos un nuevo objeto y lo agregamos a la colección (Array). 
    const nuevoGasto = new Gasto(Date.now(), nombre, precio, categoria);
    gastos.push(nuevoGasto);

    // Sincronizamos con LocalStorage para persistencia indefinida.
    localStorage.setItem("misGastos", JSON.stringify(gastos));

    // Feedback al usuario con librería Toastify 
    Toastify({
        text: "Gasto guardado",
        duration: 1500,
        gravity: "bottom",
        position: "right",
        style: { background: "linear-gradient(to right, #00b09b, #96c93d)" }
    }).showToast();

    limpiarFormulario();
    renderizarProyecto();
};

// MANIPULACIÓN DINÁMICA DEL DOM Y H.O.S 
const renderizarProyecto = () => {
    contenedorLista.innerHTML = ""; // Limpieza de vista previa

    // Recorrido de colección usando forEach para generar contenido dinámico. 
    gastos.forEach(g => {
        const div = document.createElement("div");
        div.className = "item-gasto";
        // Uso de Plantillas Literales (Template Strings) para legibilidad. 
        div.innerHTML = `
            <p><strong>${g.nombre}</strong> (${g.categoria}): $${g.precio}</p>
            <button class="btn-eliminar" onclick="eliminarGasto(${g.id})">Eliminar</button>
        `;
        contenedorLista.appendChild(div);
    });

    actualizarTotales();
};

const actualizarTotales = () => {
    // Uso de H.O.S 'reduce' para obtener un único valor (Total).
    const totalGastado = gastos.reduce((acc, el) => acc + el.precio, 0);
    const ingreso = parseFloat(document.querySelector("#ingreso").value) || 0;
    const saldo = ingreso - totalGastado;

    // Salida coherente en el HTML según los datos ingresados.
    document.querySelector("#resultado").innerHTML = `
        <div class="resumen-caja">
            <p><strong>Total de Gastos:</strong> $${totalGastado}</p>
            <p><strong>Saldo Disponible:</strong> $${saldo}</p>
        </div>
    `;
};

// FUNCIONES DE MANTENIMIENTO
window.eliminarGasto = (id) => {
    // Uso del método 'filter' para crear un nuevo array sin el elemento eliminado.
    gastos = gastos.filter(g => g.id !== id);
    localStorage.setItem("misGastos", JSON.stringify(gastos));
    renderizarProyecto();
};

const limpiarFormulario = () => {
    document.querySelector("#nombreGasto").value = "";
    document.querySelector("#montoGasto").value = "";
};

// EVENTOS E INICIALIZACIÓN 
btnGuardar.addEventListener("click", agregarGasto);
document.querySelector("#ingreso").addEventListener("input", actualizarTotales);

// Carga inicial de datos asíncronos y renderizado
cargarCategorias();
renderizarProyecto();