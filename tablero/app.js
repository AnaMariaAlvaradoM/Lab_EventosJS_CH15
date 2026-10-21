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
  listaEspera.textContent = ""; //Vacía la lista
  for (let i = 0; turnos.length > i; i++) {
    const turno = turnos[i];
    //Creacion del Li
    const li = document.createElement("li");
    li.className = "turno";
    //Creacion del span class="turno__codigo"
    const spanCodigo = document.createElement("span");
    spanCodigo.className = "turno__codigo";
    spanCodigo.textContent = turno.codigo;
    li.appendChild(spanCodigo);
    //Creacion del div class="turno__datos"
    const divDatos = document.createElement("div");
    divDatos.className = "turno__datos";
    li.appendChild(divDatos);
    //Creacion del p class="turno__nombre"
    const pNombre = document.createElement("p");
    pNombre.className = "turno__nombre";
    pNombre.textContent = turno.nombre;
    divDatos.appendChild(pNombre);
    //Creacion del p class="turno__tramite"
    const pTramite = document.createElement("p");
    pTramite.className = "turno__tramite";
    pTramite.textContent = `${turno.tramite} · ${turno.modulo}`;
    divDatos.appendChild(pTramite);
    //Creacion del span class="turno__estado"
    const spanEstado = document.createElement("span");
    spanEstado.className = "turno__estado";
    spanEstado.textContent = turno.atendido ? "Atendido" : "En espera";
    if(turno.atendido){
      li.classList.add("turno--atendido");
    }
    li.appendChild(spanEstado);

    const turnoCancelar = document.createElement("button");
    turnoCancelar.className = "turno__cancelar";
    turnoCancelar.textContent = "Cancelar";
    li.appendChild(turnoCancelar);

    //Li dentro de la listaEspera
    listaEspera.appendChild(li);

    //data-set
    li.dataset.codigo = turno.codigo;
    li.dataset.modulo = turno.modulo;
    li.dataset.nombre = turno.nombre;
    turnoCancelar.dataset.accion = "cancelar";
    

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
  let turnoEncontrado = null;
  for (let i = 0; turnos.length > i; i++) {
    if (!turnos[i].atendido) {
      turnoEncontrado = turnos[i];
      break;
    }
  }
  if (!turnoEncontrado) {
    visorNumero.textContent = "— — —";
    visorModulo.textContent = "No hay turnos en espera";
  } else {
    turnoEncontrado.atendido = true;
    visorNumero.textContent = turnoEncontrado.codigo;
    visorModulo.textContent = `Pase al ${turnoEncontrado.modulo}`;
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
  const noAtendido = document.querySelectorAll("li:not(.turno--atendido)");
  contadorFila.textContent = noAtendido.length;
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

// Tu código aquí

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
pintarFila();
// ============================================================

// Cuando termines el Ejercicio 02, escribe aquí abajo: pintarFila();
