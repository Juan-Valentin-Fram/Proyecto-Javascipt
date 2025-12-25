// VARIABLE: ESPACIO RESERVADO PARA GUARDAR INFORMACION 

// DECLARACION:
// let cliente;

// ASIGNACION DE VARIABLES:
// cliente = "Carlos";
// console.log(cliente);

// number = 30;
// console.log(number);

// String = "Hola Mundo";
// console.log(String);    

// Boolean = true;
// console.log(Boolean);

// INICIALIZACION DE VARIABLES:
// let edad = 30;
// console.log(edad);

// CONSTANTES: (const) es una variable cuyo valor no puede cambiar
// const nacimiento = 1995;
// console.log(nacimiento);

// Validacion de Usuarios
// const usuarios = [
//     { nombre: "Ana", edad: 20, aceptoTerminos: false },
//     { nombre: "Luis", edad: 15, aceptoTerminos: true },
//     { nombre: "Carlos", edad: 30, aceptoTerminos: true },
//     { nombre: "Maria", edad: 17, aceptoTerminos: true }
// ]

// for (let i = 0; i < usuarios.length; i++) {
//     if (usuarios[i].edad >= 18 && usuarios[i].aceptoTerminos) {
//         console.log("Usuario válido: " + usuarios[i].nombre);
//     }
// }

// // Ciclos por repeticion
// for (let i = 0; i < 5; i++) {
//     console.log("El valor de i es: " + i);
// }

// // Ciclos condicionales
// const password = "1234";
// let passwordIngresada = prompt("Ingrese su contraseña:");

// while (passwordIngresada != password) {
//     passwordIngresada = prompt("Contraseña incorrecta. Ingrese su contraseña nuevamente:");
// }

// // proyecto final
// function saludo() {
//     alert("Gracias por usar la calculadora de gastos!");
// }

// saludo();

// let nombreproyecto = "Calculadora de gastos";
// let objetivo = prompt("Describa el objetivo de su uso");
// let tecnologias = ["HTML", "CSS", "JavaScript"];
// let escompleto = true;

// let numberA = parseInt(prompt("Ingrese un numero para sumar:"));
// let numberB = parseInt(prompt("Ingrese un numero para sumar:"));
// let resultado = numberA + numberB;
// console.log("El resultado de la suma es: " + resultado);

// // let numberA = parseInt (prompt("Ingrese un numero para sumar:"));
// // let numberB = parseInt (prompt("Ingrese un numero para sumar:"));
// // let resultado = numberA + numberB;
// // console.log("El resultado de la suma es: " + resultado);

// console.log("Proyecto: " + nombreproyecto + "\nObjetivo: " + objetivo + "\nTecnologias: " + tecnologias + "\nCompletado: " + escompleto);

// let trabajo = prompt("¿Es para un fin personal? (si/no)");
// let edad = parseInt(prompt("Ingrese su edad:"));

// if (trabajo.toLowerCase() === "si" && edad >= 18) {
//     console.log("Puede utilizar la calculadora de gastos para su fin personal.");
// } else {
//     console.log("No puede utilizar la calculadora de gastos.");
// }

// function despedida() {
//     alert("¡Hasta luego!");
// }

// despedida();

// const sumar = (a, b) => {
//     return a + b;
// }

// console.log("El resultado de la suma es: " + sumar(15, 25));


// proyecto:

// Usuario registrados:
const usuariosRegistrados = [
    { nombre: "Ana", edad: 20, plan: "Premium" },
    { nombre: "Luis", edad: 25, plan: "Básico" },
    { nombre: "Carlos", edad: 30, plan: "Premium" }
];

//Funciones: 

function saludarUsuario(nombre) {
    alert("¡Bienvenido/a a la Calculadora de Gastos, " + nombre + "!");
}

function calcularGastos(cantidad) {
    let total = 0;

    for (let i = 1; i <= cantidad; i++) {
        let entrada = prompt("Ingrese el monto del gasto N°" + i + ":");
        if (entrada != "" && entrada > 0) {
            total = total + parseFloat(entrada);
            console.log("Gasto registrado: $" + entrada);
        } else {
            alert("Monto no válido. Se saltará este registro.");
        }
    }

    return total;
}

function evaluarPresupuesto(limite, totalConsumido) {
    if (totalConsumido > limite) {
        alert("¡Atención! Has excedido tu presupuesto por $" + (totalConsumido - limite));
    } else {
        alert("¡Bien hecho! Estás dentro de tu presupuesto. Te quedan $" + (limite - totalConsumido));
    }
}

// Inicio del programa:
let nombreIngresado = prompt("Ingrese su nombre para comenzar:"); {
    if (usuariosRegistrados) {
        console.log(`Usuario: ${usuariosRegistrados.nombre} - Plan: ${usuariosRegistrados.plan}`);

        saludarUsuario(nombreIngresado);

        // Validacion de edad:
        let edadUsuario = parseInt(prompt("Ingrese su edad:"));

        if (edadUsuario >= 18) {
            console.log("Acceso concedido a " + nombreIngresado);

            let presupuestoMaximo = parseFloat(prompt("¿Cuál es tu presupuesto máximo para este mes?"));
            let cantidadDeGastos = parseInt(prompt("¿Cuántos gastos deseas registrar hoy?"));

            let resultadoTotal = calcularGastos(cantidadDeGastos);

            console.log("Presupuesto fijado: $" + presupuestoMaximo);
            console.log("Total gastado: $" + resultadoTotal);
            alert("El total de tus gastos es: $" + resultadoTotal);

            evaluarPresupuesto(presupuestoMaximo, resultadoTotal);

        } else {
            alert("Lo sentimos, debes ser mayor de 18 años para utilizar esta calculadora.");
            console.warn("Intento de acceso denegado por edad.");
        }

        alert("Gracias por usar la Calculadora de Gastos. ¡Hasta luego!");

    } else {
        alert("Usuario no registrado. Por favor, ingrese un nombre válido.");
    }
}
