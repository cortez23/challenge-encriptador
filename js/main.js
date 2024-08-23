// Tablas de encriptación y desencriptación personalizadas
let tablaEncriptacion = {
    "a": "ai",
    "e": "enter",
    "i": "imes",
    "o": "ober",
    "u": "ufat"
};

// Crear tabla de desencriptación a partir de la tabla de encriptación
let tablaDesencriptacion = {};
for (let clave in tablaEncriptacion) {
    let valor = tablaEncriptacion[clave];
    tablaDesencriptacion[valor] = clave;
}

// Función para limpiar el textarea y el resultado
function limpiar() {
    document.getElementById('texTarea').value = '';
    mostrarMensajeInicial();
}

// Función para mostrar el mensaje inicial en el resultado
function mostrarMensajeInicial() {
    var result_box = document.getElementById('result_box');
    result_box.innerHTML = `
        <img src="./img/Muñeco.png" alt="" class="img_result">
        <h3 class="title_result">Ningún mensaje fue encontrado</h3>
        <p class="text_result">Ingresa el texto que desees encriptar o desencriptar.</p>
    `;
}

// Función para encriptar o desencriptar según la acción
function acciones(accion) {
    var texto = document.getElementById('texTarea').value;
    var resultado = '';

    if (accion === 'encriptar') {
        resultado = encriptarTexto(texto);
    } else if (accion === 'desencriptar') {
        resultado = desencriptarTexto(texto);
    }

    mostrarResultado(resultado);
}

// Función para encriptar el texto utilizando la tabla de encriptación
function encriptarTexto(texto) {
    texto = texto.toLowerCase(); // Convertir a minúsculas para manejar consistencia

    var textoEncriptado = '';
    for (var i = 0; i < texto.length; i++) {
        var caracter = texto[i];
        if (tablaEncriptacion.hasOwnProperty(caracter)) {
            textoEncriptado += tablaEncriptacion[caracter];
        } else {
            textoEncriptado += caracter; // Mantener caracteres no definidos en la tabla
        }
    }
    return textoEncriptado;
}

// Función para desencriptar el texto utilizando la tabla de desencriptación
function desencriptarTexto(texto) {
    var textoDesencriptado = '';
    var i = 0;
    while (i < texto.length) {
        var subcadena = texto.substr(i, 5); // Longitud de las claves en la tabla (máximo 5 caracteres)
        if (tablaDesencriptacion.hasOwnProperty(subcadena)) {
            textoDesencriptado += tablaDesencriptacion[subcadena];
            i += 5; // Saltar al siguiente bloque encriptado
        } else {
            textoDesencriptado += texto[i]; // Mantener caracteres no encriptados
            i++;
        }
    }
    return textoDesencriptado;
}

// Función para mostrar el resultado en el div de resultado
function mostrarResultado(resultado) {
    var result_box = document.getElementById('result_box');

    if (resultado.trim() !== '') {
        result_box.innerHTML = `
            <h3 class="title_result">Resultado</h3>
            <p class="text_result">${resultado}</p>
            <button id="copiarResultado" onclick="copiarResultado()">Copiar</button>
        `;
    } else {
        result_box.innerHTML = `
            <img src="./img/Muñeco.png" alt="" class="img_result">
            <h3 class="title_result">Ningún mensaje fue encontrado</h3>
            <p class="text_result">Ingresa el texto que desees encriptar o desencriptar.</p>
        `;
    }
}
// Función para copiar el contenido del resultado al portapapeles
function copiarResultado() {
    var resultado = document.querySelector('.text_result').textContent;

    // Crear un elemento temporal (input) para el texto a copiar
    var inputTemp = document.createElement('textarea');
    inputTemp.value = resultado;
    document.body.appendChild(inputTemp);

    // Seleccionar el texto del input temporal
    inputTemp.select();
    inputTemp.setSelectionRange(0, 99999); // Para dispositivos móviles

    // Ejecutar el comando de copiado
    document.execCommand('copy');

    // Eliminar el input temporal
    document.body.removeChild(inputTemp);

    // Mostrar mensaje o realizar alguna acción adicional
    alert('¡Texto copiado al portapapeles!');
}
// Mostrar el mensaje inicial al cargar la página
mostrarMensajeInicial();