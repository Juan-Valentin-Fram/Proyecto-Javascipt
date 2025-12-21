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


// proyecto final

function saludo() {
    alert("Gracias por usar la calculadora de gastos!");
}

saludo();

let nombreproyecto = "Calculadora de gastos";
let objetivo = prompt("Describa el objetivo de su uso");
let tecnologias = ["HTML", "CSS", "JavaScript"];
let escompleto = true;

let numberA = parseInt(prompt("Ingrese un numero para sumar:"));
let numberB = parseInt(prompt("Ingrese un numero para sumar:"));
let resultado = numberA + numberB;
console.log("El resultado de la suma es: " + resultado);

console.log("Proyecto: " + nombreproyecto + "\nObjetivo: " + objetivo + "\nTecnologias: " + tecnologias + "\nCompletado: " + escompleto);

let trabajo = prompt("¿Es para un fin personal? (si/no)");
let edad = parseInt(prompt("Ingrese su edad:"));

if (trabajo.toLowerCase() === "si" && edad >= 18) {
    console.log("Puede utilizar la calculadora de gastos para su fin personal.");
} else {
    console.log("No puede utilizar la calculadora de gastos.");
}

function despedida() {
    alert("¡Hasta luego!");
}

despedida();

const sumar = (a, b) => {
    return a + b;
}

console.log("El resultado de la suma es: " + sumar(15, 25));
