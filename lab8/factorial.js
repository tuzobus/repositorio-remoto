function factorial(numero) {
    if (numero < 0) return -1;
    if (numero === 0) return 1;
    return numero * factorial(numero - 1);
}

console.log("El factorial de 3 es ", factorial(3));
console.log("El factorial de 5 es ", factorial(5));
console.log("El factorial de 9 es ", factorial(9));