/**
 * ARCHIVO DE LÓGICA: Gestión de datos y clases 
 */

// Definición de la Clase con constructor según Unidad 4 [cite: 225, 694]
class Gasto {
    constructor(id, descripcion, monto, categoria) {
        this.id = id;
        this.descripcion = descripcion;
        this.monto = parseFloat(monto); // Aseguramos que sea número [cite: 11]
        this.categoria = categoria;
    }

    // Método para calcular el IVA (Unidad 6 - Actividad práctica) [cite: 711]
    calcularIVA() {
        return this.monto * 1.21;
    }
}

// Funciones de gestión de almacenamiento (Storage) [cite: 391, 396]
const obtenerGastosAlmacenados = () => {
    const datosRecuperados = localStorage.getItem("lista_gastos_usuario");
    // Usamos JSON.parse para convertir el texto en objetos [cite: 380, 408]
    return datosRecuperados ? JSON.parse(datosRecuperados) : [];
};

const guardarGastosEnAlmacenamiento = (listadoDeGastos) => {
    // Convertimos a JSON para persistencia [cite: 374, 407]
    localStorage.setItem("lista_gastos_usuario", JSON.stringify(listadoDeGastos));
};

const obtenerIngresoAlmacenado = () => {
    return localStorage.getItem("ingreso_mensual_usuario") || "";
};