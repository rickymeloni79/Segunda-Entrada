// Variables
const series = 4
const reps = 12
const descanso = 2

// Array de objetos
const ejercicios = [
    { nombre: "Press bco plano", grupo: "Pecho" },
    { nombre: "Dominadas", grupo: "Espalda" },
    { nombre: "Press militar", grupo: "Hombros" },
    { nombre: "Curl biceps", grupo: "Bíceps" },
    { nombre: "Ext triceps", grupo: "Tríceps" },
    { nombre: "Sentadillas", grupo: "Piernas" }
]

// Función de orden superior
function mostrarMensaje(mensaje, callback) {
    document.getElementById('resultMessage').textContent = mensaje
    if (callback) callback()
}

// Función de orden superior
function manejarFormulario(nombre, email, callback) {
    localStorage.setItem('nombre', nombre)
    localStorage.setItem('email', email)
    if (callback) callback()
}


document.getElementById('submitBtn').addEventListener('click', () => {
    const nombre = document.getElementById('name').value
    const email = document.getElementById('email').value

    if (!nombre || !email) {
        mostrarMensaje("Por favor, complete todos los campos.")
        return
    }

    manejarFormulario(nombre, email, () => {
        document.getElementById('formSection')
        document.getElementById('exerciseSection')
    })
})

document.getElementById('confirmBtn').addEventListener('click', () => {
    const muscleGroupIndex = parseInt(document.getElementById('muscleGroup').value, 10) - 1
    if (muscleGroupIndex < 0 || muscleGroupIndex >= ejercicios.length) {
        mostrarMensaje("Por favor, selecciona un grupo muscular válido.")
        return
    }

    const ejercicioSeleccionado = ejercicios[muscleGroupIndex]
    const mensaje = `La rutina de hoy es:\nEjercicio: ${ejercicioSeleccionado.nombre}\nSeries: ${series} x ${reps} repeticiones\nDescanso: ${descanso} min entre series`

    mostrarMensaje(mensaje, () => {
        document.getElementById('exerciseSection')
        document.getElementById('resultSection')
    })
})

document.getElementById('newsBtn').addEventListener('click', () => {
    const email = localStorage.getItem('email')
    if (confirm(`Gracias. Te enviaremos las últimas noticias a: ${email}`)) {
       
    } else {
     
    }
})