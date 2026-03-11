/**
 * ARCHIVO PRINCIPAL: Interacción y visualización 
 */

// Referencias a elementos del DOM (Unidad 7) [cite: 484, 489]
const inputIngresoMensual = document.querySelector("#ingreso");
const inputDescripcionGasto = document.querySelector("#nombreGasto");
const inputMontoGasto = document.querySelector("#montoGasto");
const selectorCategoriaGasto = document.querySelector("#categoriaGasto");
const botonRegistrarGasto = document.querySelector("#botonGuardar");
const contenedorListaDeGastos = document.querySelector("#listaGastos");
const seccionResumenFinanciero = document.querySelector("#resultado");

// Estado inicial de la aplicación
let listadoGlobalDeGastos = obtenerGastosAlmacenados();
inputIngresoMensual.value = obtenerIngresoAlmacenado();

// Función para renderizar usando createElement (Buena práctica de DOM) 
const mostrarGastosEnPantalla = () => {
    contenedorListaDeGastos.innerHTML = ""; // Limpiamos el contenedor [cite: 494]

    listadoGlobalDeGastos.forEach((gastoIndividual) => {
        const divGasto = document.createElement("div"); // Creamos el nodo 
        divGasto.className = "item-gasto";

        const parrafoInfo = document.createElement("p");
        // Usamos plantillas literales de la Unidad 7 [cite: 500, 501]
        parrafoInfo.textContent = `${gastoIndividual.descripcion} (${gastoIndividual.categoria}): $${gastoIndividual.monto}`;

        const botonBorrar = document.createElement("button");
        botonBorrar.textContent = "Eliminar";
        botonBorrar.className = "btn-eliminar";
        
        // MANEJO DE EVENTOS CORRECTO (Sin 'window' ni eventos en el HTML) 
        botonBorrar.addEventListener("click", () => {
            eliminarGastoSeleccionado(gastoIndividual.id);
        });

        divGasto.appendChild(parrafoInfo);
        divGasto.appendChild(botonBorrar);
        contenedorListaDeGastos.appendChild(divGasto);
    });

    actualizarResumenDeCuentas();
};

const actualizarResumenDeCuentas = () => {
    // Uso de H.O.S 'reduce' para sumar (Unidad 6) [cite: 390, 453]
    const totalDeEgresos = listadoGlobalDeGastos.reduce((acumulador, gasto) => acumulador + gasto.monto, 0);
    const presupuestoIngresado = parseFloat(inputIngresoMensual.value) || 0;
    const saldoFinalDisponible = presupuestoIngresado - totalDeEgresos;

    seccionResumenFinanciero.innerHTML = `
        <div class="resumen-caja">
            <p><strong>Total de Gastos:</strong> $${totalDeEgresos}</p>
            <p><strong>Saldo Neto:</strong> $${saldoFinalDisponible}</p>
        </div>
    `;
};

// Lógica de interacción
const procesarNuevoGasto = () => {
    const descripcion = inputDescripcionGasto.value;
    const monto = inputMontoGasto.value;
    const categoria = selectorCategoriaGasto.value;

    if (descripcion !== "" && monto > 0) {
        // Instanciamos el objeto con la clase de logic.js [cite: 694]
        const nuevoObjetoGasto = new Gasto(Date.now(), descripcion, monto, categoria);
        listadoGlobalDeGastos.push(nuevoObjetoGasto);
        
        guardarGastosEnAlmacenamiento(listadoGlobalDeGastos);
        mostrarGastosEnPantalla();
        
        // Feedback con librerías (Unidad 9) [cite: 638, 745]
        Toastify({ text: "Gasto registrado correctamente", gravity: "bottom" }).showToast();
        
        inputDescripcionGasto.value = "";
        inputMontoGasto.value = "";
    }
};

const eliminarGastoSeleccionado = (idABuscar) => {
    // Uso de 'filter' de la Unidad 6 [cite: 389, 709]
    listadoGlobalDeGastos = listadoGlobalDeGastos.filter((g) => g.id !== idABuscar);
    guardarGastosEnAlmacenamiento(listadoGlobalDeGastos);
    mostrarGastosEnPantalla();
};

// Eventos de inicio [cite: 522]
botonRegistrarGasto.addEventListener("click", procesarNuevoGasto);
inputIngresoMensual.addEventListener("input", () => {
    localStorage.setItem("ingreso_mensual_usuario", inputIngresoMensual.value);
    actualizarResumenDeCuentas();
});

// Carga de categorías con Fetch (Unidad 10) [cite: 735, 740]
const cargarCategoriasDesdeJson = async () => {
    try {
        const respuesta = await fetch("./data/categorias.json");
        const datosCategorias = await respuesta.json();
        datosCategorias.forEach((cat) => {
            const opcion = document.createElement("option");
            opcion.value = cat.nombre;
            opcion.textContent = cat.nombre;
            selectorCategoriaGasto.appendChild(opcion);
        });
    } catch (error) {
        console.error("No se pudieron cargar las categorías.");
    }
};

// Arranque de la aplicación
cargarCategoriasDesdeJson();
mostrarGastosEnPantalla();