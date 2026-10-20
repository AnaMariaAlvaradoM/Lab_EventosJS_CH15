const test = require("node:test");
const assert = require("node:assert/strict");
const {
  revisar, elemento, turnosEnPantalla, turnosDelArreglo, codigoDe, cancelar, llamar, clic,
} = require("./utilidades");

function codigos(document) {
  return turnosEnPantalla(document).map(codigoDe);
}

test("clic en Cancelar de B-003 lo saca de la fila", () => {
  revisar(({ document }) => {
    cancelar(document, "B-003");
    const quedan = codigos(document);
    assert.ok(!quedan.includes("B-003"), "después de cancelar B-003, ese turno ya no debería aparecer en la fila");
    assert.equal(quedan.length, 5, `después de cancelar B-003 deberían quedar 5 turnos en la fila y hay ${quedan.length}`);
  });
});

test("cancelar saca el turno del arreglo", () => {
  revisar(({ window, document }) => {
    cancelar(document, "B-003");
    const turnos = turnosDelArreglo(window);
    assert.ok(!turnos.some((t) => t.codigo === "B-003"), "después de cancelar B-003, el turno debería salir del ARREGLO (turnos.splice) y no solo de la pantalla");
    assert.equal(turnos.length, 5, "después de cancelar B-003, el arreglo debería quedar con 5 turnos");
  });
});

test("el contador baja al cancelar", () => {
  revisar(({ document }) => {
    cancelar(document, "A-017");
    assert.equal(elemento(document, "contadorFila").textContent.trim(), "5", "después de cancelar un turno en espera, el contador debería decir 5 (¿repintas después del splice?)");
  });
});

test("cancelar sigue funcionando después de llamar al siguiente", () => {
  revisar(({ document }) => {
    llamar(document, 1);
    cancelar(document, "A-016");
    assert.ok(!codigos(document).includes("A-016"), "después de llamar y repintar, el botón Cancelar de A-016 debería seguir funcionando (pon el escuchador en la lista, no en los botones)");
  });
});

test("un clic en el turno, fuera del botón, no cancela nada", () => {
  revisar(({ document }) => {
    const items = turnosEnPantalla(document);
    assert.ok(items.length > 0, "la fila está vacía: termina primero el Ejercicio 02");
    const nombre = items[0].querySelector(".turno__nombre") || items[0];
    clic(nombre);
    clic(items[1]);
    assert.equal(turnosEnPantalla(document).length, 6, 'un clic en el nombre o en el <li> NO debería cancelar el turno: revisa que solo actúes si evento.target.dataset.accion es "cancelar"');
  });
});

test("si se cancelan todos, aparece el mensaje de fila vacía", () => {
  revisar(({ document }) => {
    for (const codigo of ["A-014", "A-015", "B-003", "A-016", "B-004", "A-017"]) cancelar(document, codigo);
    assert.equal(turnosEnPantalla(document).length, 0, "después de cancelar los 6 turnos, la fila debería quedar vacía");
    const mensaje = elemento(document, "mensajeVacio");
    const visible = !mensaje.hidden && !mensaje.classList.contains("turno--oculto");
    assert.ok(visible, 'con la fila vacía, el mensaje "No hay turnos cargados" debería volver a verse');
  });
});

test("hay un solo escuchador de clic en la lista y ninguno en los botones", () => {
  revisar(({ document, escuchadores }) => {
    const lista = elemento(document, "listaEspera");
    const enLaLista = escuchadores.some((e) => e.elemento === lista && e.tipo === "click");
    assert.ok(enLaLista, 'la lista debería tener el escuchador: listaEspera.addEventListener("click", cancelarTurno);');
    const enHijos = escuchadores.filter((e) => e.elemento !== lista && typeof e.elemento.closest === "function" && e.elemento.closest("#listaEspera"));
    const conOnclick = turnosEnPantalla(document).filter((li) => li.querySelector(".turno__cancelar") && li.querySelector(".turno__cancelar").onclick);
    assert.equal(enHijos.length + conOnclick.length, 0, "no le pongas escuchadores a cada botón ni a cada <li>: usa uno solo en la lista (delegación)");
  });
});
