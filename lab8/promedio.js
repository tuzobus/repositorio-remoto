function Promedio(arr) {
    if (arr.length === 0) return 0;
    let suma = 0;
    for  (let i = 0; i < arr.length; i++) {
        suma += arr[i];
    }
    return suma / arr.length;
}

const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("Promedio:", Promedio(numeros));