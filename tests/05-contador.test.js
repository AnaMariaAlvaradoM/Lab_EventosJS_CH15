const test = require("node:test");
const assert = require("node:assert/strict");
const { revisar, elemento, llamar, turnosDelArreglo } = require("./utilidades");

function contador(document) {
  return elemento(document, "contadorFila").textContent.trim();
}

test("al abrir la página el contador dice 6", () => {
  revisar(({ document }) => {
    assert.equal(contador(document), "6", "al abrir la página el contador debería decir 6 (llama a actualizarContador() al final de pintarFila)");
  });
});

test("después de dos llamados el contador dice 4", () => {
  revisar(({ document }) => {
    llamar(document, 2);
    assert.equal(contador(document), "4", "después de dos llamados el contador debería decir 4 (cuenta los .turno:not(.turno--atendido))");
  });
});

test("cuando todos fueron llamados el contador dice 0", () => {
  revisar(({ window, document }) => {
    assert.equal(contador(document), "6", "al abrir la página el contador debería decir 6: termina primero ese test");
    llamar(document, turnosDelArreglo(window).length);
    assert.equal(contador(document), "0", "cuando todos fueron llamados el contador debería decir 0");
  });
});

test("seguir dando clic sin nadie en la fila deja el contador en 0", () => {
  revisar(({ window, document }) => {
    assert.equal(contador(document), "6", "al abrir la página el contador debería decir 6: termina primero ese test");
    llamar(document, turnosDelArreglo(window).length + 2);
    assert.equal(contador(document), "0", "con la fila agotada, el contador debería quedarse en 0");
  });
});
