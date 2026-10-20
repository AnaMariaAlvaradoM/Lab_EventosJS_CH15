const test = require("node:test");
const assert = require("node:assert/strict");
const { revisar, elemento, visibles, turnosEnPantalla, codigoDe, escribir, cancelar } = require("./utilidades");

function codigosVisibles(document) {
  return visibles(document).map(codigoDe);
}

test("escribir sandra deja visible solo a Sandra Ruiz", () => {
  revisar(({ document }) => {
    escribir(document, "sandra");
    assert.deepEqual(codigosVisibles(document), ["B-004"], 'al escribir "sandra" solo debería verse el turno B-004 (a los demás ponles la clase "turno--oculto")');
  });
});

test("la búsqueda no distingue mayúsculas", () => {
  revisar(({ document }) => {
    escribir(document, "SANDRA");
    assert.deepEqual(codigosVisibles(document), ["B-004"], 'al escribir "SANDRA" también debería verse solo B-004 (convierte los dos textos a minúsculas con toLowerCase)');
  });
});

test("buscar por código: a-01 muestra los cuatro turnos A-01", () => {
  revisar(({ document }) => {
    escribir(document, "a-01");
    assert.deepEqual(codigosVisibles(document), ["A-014", "A-015", "A-016", "A-017"], 'al escribir "a-01" deberían verse A-014, A-015, A-016 y A-017');
  });
});

test("borrar la búsqueda vuelve a mostrar todos", () => {
  revisar(({ document }) => {
    escribir(document, "sandra");
    escribir(document, "");
    assert.equal(visibles(document).length, 6, "con el buscador vacío deberían verse los 6 turnos (quita la clase turno--oculto con classList.remove)");
  });
});

test("la búsqueda mira solo el código y el nombre", () => {
  revisar(({ document }) => {
    assert.equal(turnosEnPantalla(document).length, 6, "la fila debería tener 6 turnos: termina primero el Ejercicio 02");
    escribir(document, "cancelar");
    assert.equal(visibles(document).length, 0, 'al escribir "cancelar" no debería verse ningún turno: busca en dataset.codigo y dataset.nombre, no en todo el texto del <li>');
  });
});

test("el filtro no se pierde al cancelar un turno", () => {
  revisar(({ document }) => {
    escribir(document, "a-01");
    cancelar(document, "A-015");
    assert.equal(turnosEnPantalla(document).length, 5, "después de cancelar A-015 deberían quedar 5 turnos en la fila");
    assert.deepEqual(codigosVisibles(document), ["A-014", "A-016", "A-017"], 'con "a-01" escrito, después de cancelar A-015 deberían verse solo A-014, A-016 y A-017 (llama a aplicarBusqueda() al final de pintarFila)');
  });
});

test("el buscador está conectado con el evento input", () => {
  revisar(({ document, escuchadores }) => {
    const buscador = elemento(document, "buscador");
    const conectado = escuchadores.some((e) => e.elemento === buscador && e.tipo === "input");
    assert.ok(conectado, 'el buscador debería estar conectado así: buscador.addEventListener("input", aplicarBusqueda);');
  });
});
