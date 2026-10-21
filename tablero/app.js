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
  { codigo: "A-014", nombre: "Luisa Cárdenas",  tramite: "Autorización de examen", modulo: "Módulo 1", atendido: false },
  { codigo: "A-015", nombre: "Óscar Betancur",  tramite: "Cambio de EPS",          modulo: "Módulo 2", atendido: false },
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

const visorNumero  = document.getElementById("visorNumero");
const visorModulo  = document.getElementById("visorModulo");
const listaEspera  = document.getElementById("listaEspera");
const btnLlamar    = document.getElementById("btnLlamar");
const buscador     = document.getElementById("buscador");
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
function actualizarContador() {
  const enEspera = document.querySelectorAll(".turno:not(.turno--atendido)");
  contadorFila.textContent = enEspera.length;
}

function aplicarBusqueda() {
  const texto = buscador.value.toLowerCase();
  const items = document.querySelectorAll(".turno");

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

function pintarFila() {
  listaEspera.textContent = "";

  for (let i = 0; i < turnos.length; i++) {
    const turno = turnos[i];

    const item = document.createElement("li");
    item.className = "turno";

    item.dataset.codigo = turno.codigo;
    item.dataset.modulo = turno.modulo;
    item.dataset.nombre = turno.nombre;

    const codigo = document.createElement("span");
    codigo.className = "turno__codigo";
    codigo.textContent = turno.codigo;

    const datos = document.createElement("div");
    datos.className = "turno__datos";

    const nombre = document.createElement("p");
    nombre.className = "turno__nombre";
    nombre.textContent = turno.nombre;

    const tramite = document.createElement("p");
    tramite.className = "turno__tramite";
    tramite.textContent = turno.tramite + " · " + turno.modulo;

    datos.appendChild(nombre);
    datos.appendChild(tramite);

    const estado = document.createElement("span");
    estado.className = "turno__estado";

    if (turno.atendido) {
      item.classList.add("turno--atendido");
      estado.textContent = "Atendido";
    } else {
      estado.textContent = "En espera";
    }

    const cancelar = document.createElement("button");
    cancelar.className = "turno__cancelar";
    cancelar.textContent = "Cancelar";
    cancelar.dataset.accion = "cancelar";

    item.appendChild(codigo);
    item.appendChild(datos);
    item.appendChild(estado);
    item.appendChild(cancelar);

    listaEspera.appendChild(item);
  }

  mensajeVacio.hidden = turnos.length > 0;
  actualizarContador();
  aplicarBusqueda();
}

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

buscador.addEventListener("input", aplicarBusqueda);

pintarFila();

