// Variables globales
const series = 4;
const reps = 12;
const descanso = 2;

// Array de ejercicios
const ejercicios = [
    { nombre: "Press banco plano", grupo: "Pecho" },
    { nombre: "Dominadas", grupo: "Espalda" },
    { nombre: "Press militar", grupo: "Hombros" },
    { nombre: "Curl bíceps", grupo: "Bíceps" },
    { nombre: "Extensión tríceps", grupo: "Tríceps" },
    { nombre: "Sentadillas", grupo: "Piernas" }
];

// Array para almacenar la rutina del usuario
let rutina = [];

// Petición de datos del usuario
document.getElementById('submitBtn').addEventListener('click', () => {
    const nombre = document.getElementById('name').value;
    const edad = document.getElementById('age').value;
    const objetivo = document.getElementById('goal').value;

    if (!nombre || !edad || !objetivo) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    localStorage.setItem('nombre', nombre);
    localStorage.setItem('edad', edad);
    localStorage.setItem('objetivo', objetivo);

    document.getElementById('formSection').style.display = 'none';
    document.getElementById('exerciseSection').style.display = 'block';

    alert(`¡Hola ${nombre}! Tu objetivo es ${objetivo}.`);
});

// Selección de ejercicios
document.getElementById('confirmBtn').addEventListener('click', () => {
    const muscleGroupIndex = parseInt(document.getElementById('muscleGroup').value, 10) - 1;

    if (muscleGroupIndex < 0 || muscleGroupIndex >= ejercicios.length) {
        alert("Por favor, selecciona un grupo muscular válido.");
        return;
    }

    // Filtrar los ejercicios por grupo muscular seleccionado
    const grupoMuscular = ejercicios[muscleGroupIndex].grupo;
    const ejerciciosFiltrados = ejercicios.filter(ejercicio => ejercicio.grupo === grupoMuscular);

    // Mapear los ejercicios filtrados a un formato legible
    const ejerciciosTexto = ejerciciosFiltrados.map(ejercicio => 
        `Ejercicio: ${ejercicio.nombre} - ${series} x ${reps} repeticiones - ${descanso} min de descanso`
    );

    // Mostrar los ejercicios seleccionados y guardarlos en la rutina
    document.getElementById('exerciseList').innerHTML = ejerciciosTexto.map(ejercicio => 
        `<div>${ejercicio}</div>`
    ).join('');

    rutina = [...rutina, ...ejerciciosFiltrados];

    // Mostrar la sección de resultados
    document.getElementById('resultSection').style.display = 'block';

    // Saludar al usuario
    const nombre = localStorage.getItem('nombre');
    document.getElementById('resultMessage').textContent = `Hola ${nombre}, tu rutina está lista.`;
});

// Enviar la rutina por email
document.getElementById('sendEmailBtn').addEventListener('click', () => {
    const nombre = localStorage.getItem('nombre');
    const email = prompt("Por favor, ingresa tu dirección de email:");

    if (!email) {
        alert("No se proporcionó un email. Rutina no enviada.");
        return;
    }

    const rutinaTexto = rutina.map(ejercicio => ejercicio.nombre).join(', ');

    const mailtoLink = `mailto:${email}?subject=Tu Rutina de Entrenamiento&body=Hola ${nombre},%0D%0A%0D%0A Aquí está tu rutina de entrenamiento:%0D%0A ${rutinaTexto}%0D%0A%0D%0A ¡Buena suerte con tu entrenamiento!`;
    window.location.href = mailtoLink;
});