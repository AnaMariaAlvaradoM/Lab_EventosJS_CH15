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
const visorNumero = document.getElementById("visorNumero")
const visorModulo = document.getElementById("visorModulo")
const listaEspera = document.getElementById("listaEspera")
const btnLlamar = document.getElementById("btnLlamar")
const buscador = document.getElementById("buscador")
const contadorFila = document.getElementById("contadorFila")
const mensajeVacio = document.getElementById("mensajeVacio")

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
    listaEspera.innerHTML = "";
    for (let i = 0; i < turnos.length; i++) {
      const turno = turnos[i];
    const fila = document.createElement("li")
    fila.className = "turno"
    fila.dataset.codigo = turno.codigo;
    fila.dataset.modulo = turno.modulo;
    fila.dataset.nombre = turno.nombre;
    if(turno.atendido === true){
          fila.classList.add("turno--atendido");
    }
    const codigo = document.createElement("span")
    codigo.className = "turno__codigo"
    codigo.textContent = turno.codigo
    fila.appendChild(codigo)
    const turnoDatos = document.createElement("div")
    turnoDatos.className = "turno__datos"
    const nombre = document.createElement("p")
    nombre.className = "turno__nombre"
    nombre.textContent = turno.nombre
    turnoDatos.appendChild(nombre)
    const turnoTramite = document.createElement("p")
    turnoTramite.className = "turno__tramite"
turnoTramite.textContent = turno.tramite + " · " + turno.modulo;    turnoDatos.appendChild(turnoTramite)
    fila.appendChild(turnoDatos)
    const estado = document.createElement("span")
    estado.className = "turno__estado"
    if (turno.atendido === true) {
    estado.textContent = "Atendido";
} else {
    estado.textContent = "En espera";
}   
    const btnCancelar = document.createElement("button");
    btnCancelar.className = "turno__cancelar";
    btnCancelar.textContent = "Cancelar";
    btnCancelar.dataset.accion = "cancelar";
    fila.appendChild(btnCancelar);
    fila.appendChild(estado)
    listaEspera.appendChild(fila)

    }
    mensajeVacio.hidden = turnos.length > 0;
    actualizarContador();
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
    let siguiente = null;
    for (let i = 0; i < turnos.length; i++) {
        if (turnos[i].atendido === false) {
            siguiente = turnos[i];
            break;
        }
    }
    if (siguiente !== null) {
        siguiente.atendido = true;
        visorNumero.textContent = siguiente.codigo;
        visorModulo.textContent = "Pase al " + siguiente.modulo;
    } else {
        visorNumero.textContent = "— — —";
        visorModulo.textContent = "No hay turnos en espera";
    }
    pintarFila();
}
btnLlamar.addEventListener("click", llamarSiguiente);


// ============================================================
// Ejercicio 04 · Estados con classList
// ============================================================
// Dentro de pintarFila: si el turno ya fue atendido, agrégale al
// <li> la clase turno--atendido y haz que su estado diga
// "Atendido" en vez de "En espera".
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
    const pendientes = document.querySelectorAll("li.turno:not(.turno--atendido)");
    contadorFila.textContent = pendientes.length;
}

// ============================================================
// Ejercicio 06 · Datos escondidos con dataset y el botón Cancelar
// ============================================================
// Dentro de pintarFila:
//   - guarda en cada <li> el código, el módulo y el nombre del
//     turno con dataset (data-codigo, data-modulo, data-nombre);
//   - crea un <button class="turno__cancelar">Cancelar</button>
//     con dataset.accion = "cancelar" y agrégalo al <li>.
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
    if (!evento.target.classList.contains("turno__cancelar")) {
        return;
    }

    const fila = evento.target.closest(".turno");
    const codigo = fila.dataset.codigo;

    for (let i = 0; i < turnos.length; i++) {
        if (turnos[i].codigo === codigo) {
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

// Tu código aquí

// ============================================================
// Arranque: pinta la fila apenas abre la página
// ============================================================

// Cuando termines el Ejercicio 02, escribe aquí abajo: pintarFila();
pintarFila()