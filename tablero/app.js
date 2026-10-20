// ============================================================
// Lab de eventos · Tablero de turnos (JavaScript)
// ============================================================
// La sede Av. 68 de Compensar necesita poner a funcionar la pantalla
// de su sala de espera. Tú la construyes en este archivo, ejercicio por ejercicio.
// El enunciado completo de cada ejercicio está en el README.md.
//
// La idea de todo el taller: el arreglo turnos manda.
// La pantalla (el DOM) solo muestra lo que dice el arreglo.
// ============================================================

// ===== Los datos: la fila de la sede (ya vienen listos, no los borres) =====
const turnos = [
  { codigo: "A-014", nombre: "Luisa Cárdenas",   tramite: "Autorización de examen", modulo: "Módulo 1", atendido: false },
  { codigo: "A-015", nombre: "Óscar Betancur",   tramite: "Cambio de EPS",          modulo: "Módulo 2", atendido: false },
  { codigo: "B-003", nombre: "Yeimi Moreno",    tramite: "Certificado laboral",    modulo: "Módulo 3", atendido: false },
  { codigo: "A-016", nombre: "Camilo Restrepo", tramite: "Autorización de examen", modulo: "Módulo 1", atendido: false },
  { codigo: "B-004", nombre: "Sandra Ruiz",     tramite: "Afiliación de hijo",     modulo: "Módulo 4", atendido: false },
  { codigo: "A-017", nombre: "Jhon Quintero",   tramite: "Incapacidad",            modulo: "Módulo 2", atendido: false }
];

// ============================================================
// Ejercicio 01 · Agarrar los elementos
// ============================================================
// Guarda en 7 constantes los elementos del HTML, con
// document.getElementById("..."). Usa estos nombres:
//   visorNumero · visorModulo · listaEspera · btnLlamar
//   buscador · contadorFila · mensajeVacio
// ============================================================

const visorNumero = document.getElementById("visorNumero");
const visorModulo = document.getElementById("visorModulo");
const listaEspera = document.getElementById("listaEspera");
const btnLlamar = document.getElementById("btnLlamar");
const buscador = document.getElementById("buscador");
const contadorFila = document.getElementById("contadorFila");
const mensajeVacio = document.getElementById("mensajeVacio");


// ============================================================
// Ejercicio 02 · pintarFila(): del arreglo a la pantalla
// ============================================================
// Vacía la lista y, con un for, crea un <li class="turno"> por
// cada turno del arreglo, con esta forma:
//
//   <li class="turno">
//     <span class="turno__codigo">A-014</span>
//     <div class="turno__datos">
//       <p class="turno__nombre">Luisa Cárdenas</p>
//       <p class="turno__tramite">Autorización de examen · Módulo 1</p>
//     </div>
//     <span class="turno__estado">En espera</span>
//   </li>
//
// Al final (después del for), oculta el mensaje de fila vacía:
//   mensajeVacio.hidden = turnos.length > 0;
// ============================================================

function pintarFila() {
  // 1. Vaciar la lista
  listaEspera.textContent = "";

  // 2. Recorrer el arreglo turnos con un for
  for (let i = 0; i < turnos.length; i++) {
    const turno = turnos[i];

    // Crear el li principal
    const item = document.createElement("li");
    item.className = "turno";

    // Ejercicio 04: Si el turno ya fue atendido, agregar la clase turno--atendido
    if (turno.atendido) {
      item.classList.add("turno--atendido");
    }

    // Crear el span del código
    const codigo = document.createElement("span");
    codigo.className = "turno__codigo";
    codigo.textContent = turno.codigo;
    item.appendChild(codigo);

    // Crear el div de datos
    const datos = document.createElement("div");
    datos.className = "turno__datos";

    // Párrafo del nombre
    const nombre = document.createElement("p");
    nombre.className = "turno__nombre";
    nombre.textContent = turno.nombre;
    datos.appendChild(nombre);

    // Párrafo del trámite y módulo
    const tramite = document.createElement("p");
    tramite.className = "turno__tramite";
    tramite.textContent = turno.tramite + " · " + turno.modulo;
    datos.appendChild(tramite);

    // Meter el div dentro del li
    item.appendChild(datos);

    // Crear el span del estado (Ejercicio 04: texto dinámico)
    const estado = document.createElement("span");
    estado.className = "turno__estado";
    estado.textContent = turno.atendido ? "Atendido" : "En espera";
    item.appendChild(estado);

    // Ejercicio 06: Datos escondidos con dataset y el botón Cancelar
    item.dataset.codigo = turno.codigo;
    item.dataset.modulo = turno.modulo;
    item.dataset.nombre = turno.nombre;

    const btnCancelar = document.createElement("button");
    btnCancelar.className = "turno__cancelar";
    btnCancelar.textContent = "Cancelar";
    btnCancelar.dataset.accion = "cancelar";
    item.appendChild(btnCancelar);

    // 3. Meter el li completo en la lista de espera
    listaEspera.appendChild(item);
  }

  // 4. Ocultar el mensaje de fila vacía si hay turnos
  mensajeVacio.hidden = turnos.length > 0;

  // Ejercicio 05: Llamar al contador al final de pintarFila
  actualizarContador();

  // Ejercicio 08: Aplicar búsqueda para mantener el filtro activo al repintar
  aplicarBusqueda();
}


// ============================================================
// Ejercicio 03 · Llamar al siguiente (evento click)
// ============================================================
// llamarSiguiente(): busca el primer turno con atendido en false,
// lo marca como atendido, escribe su código en el visor grande y
// "Pase al Módulo N" en el párrafo de abajo. Al final, repinta.
// Si ya no queda nadie: el visor dice "— — —" y abajo
// "No hay turnos en espera".
// Conéctala al botón con addEventListener("click", ...).
// ============================================================

function llamarSiguiente() {
  let turnoEncontrado = null;

  for (let i = 0; i < turnos.length; i++) {
    if (!turnos[i].atendido) {
      turnoEncontrado = turnos[i];
      turnoEncontrado.atendido = true;
      break;
    }
  }

  if (!turnoEncontrado) {
    visorNumero.textContent = "— — —";
    visorModulo.textContent = "No hay turnos en espera";
    return;
  }

  visorNumero.textContent = turnoEncontrado.codigo;
  visorModulo.textContent = "Pase al " + turnoEncontrado.modulo;

  pintarFila();
}

btnLlamar.addEventListener("click", llamarSiguiente);


// ============================================================
// Ejercicio 04 · Estados con classList
// ============================================================
// (Este ejercicio se resuelve dentro de pintarFila, arriba)


// ============================================================
// Ejercicio 05 · El contador
// ============================================================
// actualizarContador(): cuenta con querySelectorAll los <li> que
// NO tienen la clase turno--atendido y escribe ese número en el
// contador. Llámala al final de pintarFila.
// ============================================================

function actualizarContador() {
  const turnosPendientes = listaEspera.querySelectorAll(".turno:not(.turno--atendido)");
  contadorFila.textContent = turnosPendientes.length;
}


// ============================================================
// Ejercicio 06 · Datos escondidos con dataset y el botón Cancelar
// ============================================================
// (Este ejercicio se resuelve dentro de pintarFila, arriba)


// ============================================================
// Ejercicio 07 · Cancelar con UN solo escuchador (delegación)
// ============================================================
// cancelarTurno(evento): si el clic NO fue en un botón de cancelar,
// no hace nada. Si sí, busca el <li> del botón con closest(".turno"),
// lee su dataset.codigo, saca ese turno del arreglo con splice y
// repinta. Conéctala a la LISTA (no a cada botón).
// ============================================================

function cancelarTurno(evento) {
  if (evento.target.dataset.accion !== "cancelar") {
    return;
  }

  const item = evento.target.closest(".turno");
  const codigoTurno = item.dataset.codigo;

  for (let i = 0; i < turnos.length; i++) {
    if (turnos[i].codigo === codigoTurno) {
      turnos.splice(i, 1);
      break;
    }
  }

  pintarFila();
}

listaEspera.addEventListener("click", cancelarTurno);


// ============================================================
// Ejercicio 08 · Búsqueda en vivo (evento input)
// ============================================================
// aplicarBusqueda(): toma lo escrito en el buscador y oculta (clase
// turno--oculto) los <li> cuyo código o nombre no lo contengan.
// Sin importar mayúsculas: "sandra" encuentra a "Sandra".
// Conéctala al buscador con el evento "input" y llámala también
// al final de pintarFila.
// ============================================================

function aplicarBusqueda() {
  const textoBusqueda = buscador.value.toLowerCase();
  const items = listaEspera.querySelectorAll(".turno");

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const codigo = item.dataset.codigo.toLowerCase();
    const nombre = item.dataset.nombre.toLowerCase();

    if (codigo.includes(textoBusqueda) || nombre.includes(textoBusqueda)) {
      item.classList.remove("turno--oculto");
    } else {
      item.classList.add("turno--oculto");
    }
  }
}

buscador.addEventListener("input", aplicarBusqueda);


// ============================================================
// Arranque: pinta la fila apenas abre la página
// ============================================================

pintarFila();