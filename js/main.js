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
const usuarios = [
    { nombre: "Ana", edad: 20, aceptoTerminos: false },
    { nombre: "Luis", edad: 15, aceptoTerminos: true },
    { nombre: "Carlos", edad: 30, aceptoTerminos: true },
    { nombre: "Maria", edad: 17, aceptoTerminos: true }
]

for (let i = 0; i < usuarios.length; i++) {
    if (usuarios[i].edad >= 18 && usuarios[i].aceptoTerminos) {
        console.log("Usuario válido: " + usuarios[i].nombre);
    }
}

// Ciclos por repeticion
for (let i = 0; i < 5; i++) {
    console.log("El valor de i es: " + i);
}

// Ciclos condicionales
const password = "1234";
let passwordIngresada = prompt("Ingrese su contraseña:");

while (passwordIngresada != password) {
    passwordIngresada = prompt("Contraseña incorrecta. Ingrese su contraseña nuevamente:");
}

// proyecto final

let nombreproyecto = "Calculadora de gastos";
let objetivo = prompt ("Describa el objetivo de su uso");
let tecnologias = ["HTML", "CSS", "JavaScript"];
let escompleto = true;

// let numberA = parseInt (prompt("Ingrese un numero para sumar:"));
// let numberB = parseInt (prompt("Ingrese un numero para sumar:"));
// let resultado = numberA + numberB;
// console.log("El resultado de la suma es: " + resultado);

console.log("Proyecto: " + nombreproyecto + "\nObjetivo: " + objetivo + "\nTecnologias: " + tecnologias + "\nCompletado: " + escompleto);

let trabajo = prompt("¿Es para un fin personal? (si/no)");
let edad = parseInt (prompt("Ingrese su edad:"));

if (trabajo.toLowerCase() === "si" && edad >= 18) {
    console.log("Puede utilizar la calculadora de gastos para su fin personal.");
} else (trabajo.toLowerCase() === "no" && edad < 18); {
    console.log("No puede utilizar la calculadora de gastos.");
}

