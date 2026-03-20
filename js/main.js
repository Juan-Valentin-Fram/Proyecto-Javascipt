const inputIngresoMensual = document.querySelector("#ingreso");
const inputDescripcionGasto = document.querySelector("#nombreGasto");
const inputMontoGasto = document.querySelector("#montoGasto");
const selectorCategoriaGasto = document.querySelector("#categoriaGasto");
const botonRegistrarGasto = document.querySelector("#botonGuardar");
const contenedorListaDeGastos = document.querySelector("#listaGastos");
const seccionResumenFinanciero = document.querySelector("#resultado");

let listadoGlobalDeGastos = obtenerGastosAlmacenados();
inputIngresoMensual.value = obtenerIngresoAlmacenado();

const mostrarGastosEnPantalla = () => {
    contenedorListaDeGastos.innerHTML = "";

    listadoGlobalDeGastos.forEach((gastoIndividual) => {
        const divGasto = document.createElement("div"); 
        divGasto.className = "item-gasto";

        const parrafoInfo = document.createElement("p");
        parrafoInfo.textContent = `${gastoIndividual.descripcion} (${gastoIndividual.categoria}): $${gastoIndividual.monto}`;

        const botonBorrar = document.createElement("button");
        botonBorrar.textContent = "Eliminar";
        botonBorrar.className = "btn-eliminar";
        
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

const procesarNuevoGasto = () => {
    const descripcion = inputDescripcionGasto.value;
    const monto = inputMontoGasto.value;
    const categoria = selectorCategoriaGasto.value;

    if (descripcion !== "" && monto > 0) {
        const nuevoObjetoGasto = new Gasto(Date.now(), descripcion, monto, categoria);
        listadoGlobalDeGastos.push(nuevoObjetoGasto);
        
        guardarGastosEnAlmacenamiento(listadoGlobalDeGastos);
        mostrarGastosEnPantalla();
        
        Toastify({ text: "Gasto registrado correctamente", gravity: "bottom" }).showToast();
        
        inputDescripcionGasto.value = "";
        inputMontoGasto.value = "";
    }
};

const eliminarGastoSeleccionado = (idABuscar) => {
    listadoGlobalDeGastos = listadoGlobalDeGastos.filter((g) => g.id !== idABuscar);
    guardarGastosEnAlmacenamiento(listadoGlobalDeGastos);
    mostrarGastosEnPantalla();
};

botonRegistrarGasto.addEventListener("click", procesarNuevoGasto);
inputIngresoMensual.addEventListener("input", () => {
    localStorage.setItem("ingreso_mensual_usuario", inputIngresoMensual.value);
    actualizarResumenDeCuentas();
});

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

cargarCategoriasDesdeJson();
mostrarGastosEnPantalla();