// ======================================================
// Lab de eventos · Tablero de turnos (JavaScript)
// ======================================================

// Estos son los datos: la fila de verdad
const turnos = [
  { codigo: "A-014", nombre: "Luisa Cárdenas",   tramite: "Autorización de examen", modulo: "Módulo 1", atendido: false },
  { codigo: "A-015", nombre: "Oscar Betancur",   tramite: "Cambio de EPS",          modulo: "Módulo 2", atendido: false },
  { codigo: "B-003", nombre: "Hernán Moreno",    tramite: "Certificado laboral",    modulo: "Módulo 3", atendido: false },
  { codigo: "A-016", nombre: "Camila Rodríguez", tramite: "Autorización de examen", modulo: "Módulo 1", atendido: false },
  { codigo: "B-004", nombre: "Sandra Ruiz",      tramite: "Afiliación de hijo",     modulo: "Módulo 4", atendido: false },
  { codigo: "A-017", nombre: "Pedro Quintero",   tramite: "Incapacidad",            modulo: "Módulo 2", atendido: false }
];

// ======================================================
// Ejercicio 01 · Agarrar los elementos
// ======================================================
const visorNumero = document.getElementById("visorNumero");
const visorModulo = document.getElementById("visorModulo");
const listaEspera = document.getElementById("listaEspera");
const btnLlamar = document.getElementById("btnLlamar");
const buscador = document.getElementById("buscador");
const contadorFila = document.getElementById("contadorFila");
const mensajeVacio = document.getElementById("mensajeVacio");

// ======================================================
// Ejercicio 02 · pintarFila
// ======================================================
function pintarFila() {
  listaEspera.textContent = "";

  for (let i = 0; i < turnos.length; i++) {
    const turno = turnos[i];

    const item = document.createElement("li");
    item.className = "turno";

    // Ejercicio 04: estado con classList
    if (turno.atendido) {
      item.classList.add("turno--atendido");
    }

    // Ejercicio 06: datos escondidos
    item.dataset.codigo = turno.codigo;
    item.dataset.modulo = turno.modulo;
    item.dataset.nombre = turno.nombre;

    const codigo = document.createElement("span");
    codigo.className = "turno__codigo";
    codigo.textContent = turno.codigo;
    item.appendChild(codigo);

    const datos = document.createElement("div");
    datos.className = "turno__datos";

    const nombre = document.createElement("p");
    nombre.className = "turno__nombre";
    nombre.textContent = turno.nombre;
    datos.appendChild(nombre);

    const tramite = document.createElement("p");
    tramite.className = "turno__tramite";
    tramite.textContent = turno.tramite + " · " + turno.modulo;
    datos.appendChild(tramite);

    item.appendChild(datos);

    const estado = document.createElement("span");
    estado.className = "turno__estado";
    if (turno.atendido) {
      estado.textContent = "Atendido";
    } else {
      estado.textContent = "En espera";
    }
    item.appendChild(estado);

    // Ejercicio 06: botón Cancelar
    const boton = document.createElement("button");
    boton.className = "turno__cancelar";
    boton.textContent = "Cancelar";
    boton.dataset.accion = "cancelar";
    item.appendChild(boton);

    listaEspera.appendChild(item);
  }

  mensajeVacio.hidden = turnos.length > 0;

  actualizarContador();
  aplicarBusqueda();
}

// ======================================================
// Ejercicio 03 · Llamar al siguiente (evento click)
// ======================================================
function llamarSiguiente() {
  let siguiente = null;

  for (let i = 0; i < turnos.length; i++) {
    if (turnos[i].atendido === false) {
      siguiente = turnos[i];
      break;
    }
  }

  if (siguiente === null) {
    visorNumero.textContent = "— — —";
    visorModulo.textContent = "No hay turnos en espera";
    return;
  }

  siguiente.atendido = true;
  visorNumero.textContent = siguiente.codigo;
  visorModulo.textContent = "Pase al " + siguiente.modulo;

  pintarFila();
}

btnLlamar.addEventListener("click", llamarSiguiente);

// ======================================================
// Ejercicio 05 · El contador
// ======================================================
function actualizarContador() {
  const enEspera = listaEspera.querySelectorAll(".turno:not(.turno--atendido)");
  contadorFila.textContent = enEspera.length;
}

// ======================================================
// Ejercicio 07 · Cancelar con un solo escuchador
// ======================================================
function cancelarTurno(evento) {
  if (evento.target.dataset.accion !== "cancelar") {
    return;
  }

  const item = evento.target.closest(".turno");
  const codigo = item.dataset.codigo;

  for (let i = 0; i < turnos.length; i++) {
    if (turnos[i].codigo === codigo) {
      turnos.splice(i, 1);
      break;
    }
  }

  pintarFila();
}

listaEspera.addEventListener("click", cancelarTurno);

// ======================================================
// Ejercicio 08 · Búsqueda en vivo (evento input)
// ======================================================
function aplicarBusqueda() {
  const texto = buscador.value.toLowerCase();
  const items = listaEspera.querySelectorAll(".turno");

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const contenido = (item.dataset.codigo + " " + item.dataset.nombre).toLowerCase();

    if (contenido.includes(texto)) {
      item.classList.remove("turno--oculto");
    } else {
      item.classList.add("turno--oculto");
    }
  }
}

buscador.addEventListener("input", aplicarBusqueda);

// ======================================================
// Arranque
// ======================================================
pintarFila();
