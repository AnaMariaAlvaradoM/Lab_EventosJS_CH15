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
  { codigo: "A-014", nombre: "Luisa Cárdenas", tramite: "Autorización de examen", modulo: "Módulo 1", atendido: false },
  { codigo: "A-015", nombre: "Óscar Betancur", tramite: "Cambio de EPS", modulo: "Módulo 2", atendido: false },
  { codigo: "B-003", nombre: "Yeimi Moreno", tramite: "Certificado laboral", modulo: "Módulo 3", atendido: false },
  { codigo: "A-016", nombre: "Camilo Restrepo", tramite: "Autorización de examen", modulo: "Módulo 1", atendido: false },
  { codigo: "B-004", nombre: "Sandra Ruiz", tramite: "Afiliación de hijo", modulo: "Módulo 4", atendido: false },
  { codigo: "A-017", nombre: "Jhon Quintero", tramite: "Incapacidad", modulo: "Módulo 2", atendido: false }
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

  listaEspera.innerHTML = '';

  for (let i = 0; i < turnos.length; i++) {
    const ListaE = turnos[i];

    //Creo el <li> para la lista
    const listaT = document.createElement("li");
    //Creo el span para el estado
    const spanEstado = document.createElement("span");

    //Creo el boton cancelar para turno
    const botonCancelar = document.createElement("button");
    listaT.className = "turno"

    //Guardar codigo, nombre, modulo
    listaT.dataset.codigo = ListaE.codigo;
    listaT.dataset.modulo = ListaE.modulo;
    listaT.dataset.nombre = ListaE.nombre;

    //Validar si el estado cambio a true
    if (ListaE.atendido === true) {
      //Crear la clase turno--atendido
      listaT.classList.add('turno--atendido');
    }


    listaT.innerHTML = `
    <span class="turno__codigo">${ListaE.codigo}</span>
    <div class="turno__datos">
      <p class="turno__nombre" data-nombre>${ListaE.nombre}</p>
      <p class="turno__tramite" data-modulo>${ListaE.tramite} · ${ListaE.modulo} </p>
    </div>
    <span class="turno__estado">${ListaE.atendido === true ? "Atendido" : "En espera"}</span>
    `;

    botonCancelar.className = "turno__cancelar";
    botonCancelar.textContent = "Cancelar";
    botonCancelar.dataset.accion = "cancelar";

    //Añado a la lista del li el botton 
    listaT.appendChild(botonCancelar);


    //Añado li completo a la lista para que se vea en pantalla (listaEspera es la constate con el id del html)
    //Añado span nuevo
    listaEspera.appendChild(listaT, spanEstado);

  }
  mensajeVacio.hidden = turnos.length > 0;
  actualizarContador();

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


  btnLlamar.addEventListener("click", function () {
    let turnoEncontrado = null;
    //Buscar el primer elemento con false
    for (let i = 0; i < turnos.length; i++) {
      if (turnos[i].atendido === false) {
        turnoEncontrado = turnos[i];
        break;
      }
    }

    //Si quedan mas turno o no
    if (turnoEncontrado != null) {
      //Se marca como atendido
      turnoEncontrado.atendido = true;
      //Se muestra en pantalla
      visorNumero.textContent = `${turnoEncontrado.codigo}`;
      visorModulo.textContent = `Pase al ${turnoEncontrado.modulo}`
    } else {
      visorNumero.textContent = "— — —";
      visorModulo.textContent = "No hay turnos en espera";
    }

    pintarFila();
  });
}
llamarSiguiente();

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

  //Seleccionamos todos los li con querySelectAll excluyendo el .turno--atendido
  const pendientesTurno = listaEspera.querySelectorAll('li:not(.turno--atendido)');

  //Se le envia la cantidad de elemento al contador con textcontent
  contadorFila.textContent = pendientesTurno.length;


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

  //Verifico si el click fue en el boton de cancelar 
  const boton = evento.target.closest(".turno__cancelar");
  if (!boton) return;
  //miro que le boton sirva en consola
  console.log(boton, "click");

  //Buscamos li en el contenedor usando closest
  const li = boton.closest(".turno");
  if (!li) return;
  console.log(li, "click");

  // dataset.codigo para leer el codigo almacenado
  const codigoTurno = li.dataset.codigo;

  //Buscamos el codigo en turno
  const codigoenTurno = turnos.findIndex(turno => turno.codigo === codigoTurno);

  //Si se encuentra
  if (codigoenTurno !== -1) {
    turnos.splice(codigoenTurno, 1);
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
  //buscador viene del id del html .tolowercase convierte todo a minisculas para evitar problemas de mayusculas y minusculas
  const textoBuscado = buscador.value.toLowerCase();
  //Selecciono la clase turno de los li 
  const filas = listaEspera.querySelectorAll('.turno');

  filas.forEach(li => {

    //Extraen el codigo y lo pasan a minusculas
    const codigo = li.dataset.codigo.toLowerCase();
    const nombre = li.dataset.nombre.toLowerCase();

    // Si el código o el nombre incluyen el texto, quitamos la clase oculto; si no, la agregamos
    if (codigo.includes(textoBuscado) || nombre.includes(textoBuscado)) {
      li.classList.remove('turno--oculto');
    } else {
      li.classList.add('turno--oculto');
    }
  });
}
// 4. Conectamos la función al input del buscador (fuera de las funciones)
buscador.addEventListener('input', aplicarBusqueda);


// ============================================================
// Arranque: pinta la fila apenas abre la página
// ============================================================
pintarFila();
// Cuando termines el Ejercicio 02, escribe aquí abajo: pintarFila();

