class Gasto {
    constructor(id, descripcion, monto, categoria) {
        this.id = id;
        this.descripcion = descripcion;
        this.monto = parseFloat(monto); // Aseguramos que sea número [cite: 11]
        this.categoria = categoria;
    }

    calcularIVA() {
        return this.monto * 1.21;
    }
}

const obtenerGastosAlmacenados = () => {
    const datosRecuperados = localStorage.getItem("lista_gastos_usuario");
    return datosRecuperados ? JSON.parse(datosRecuperados) : [];
};

const guardarGastosEnAlmacenamiento = (listadoDeGastos) => {
    localStorage.setItem("lista_gastos_usuario", JSON.stringify(listadoDeGastos));
};

const obtenerIngresoAlmacenado = () => {
    return localStorage.getItem("ingreso_mensual_usuario") || "";
};