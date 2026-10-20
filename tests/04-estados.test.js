const test = require("node:test");
const assert = require("node:assert/strict");
const { revisar, llamar, turnosEnPantalla } = require("./utilidades");

function estadoDe(li) {
  const estado = li.querySelector(".turno__estado");
  return estado ? estado.textContent.trim() : "";
}

test("después de un llamado, el primer turno tiene la clase turno--atendido", () => {
  revisar(({ document }) => {
    llamar(document, 1);
    const items = turnosEnPantalla(document);
    assert.ok(items.length > 0, "la fila está vacía: termina primero el Ejercicio 02");
    assert.ok(items[0].classList.contains("turno--atendido"), 'después de un llamado, el primer <li> debería tener la clase "turno--atendido" (usa classList.add dentro de pintarFila)');
  });
});

test("los turnos que no han sido llamados no tienen la clase turno--atendido", () => {
  revisar(({ document }) => {
    llamar(document, 1);
    const items = turnosEnPantalla(document);
    assert.ok(items.length > 1, "la fila está vacía: termina primero el Ejercicio 02");
    items.slice(1).forEach((li, i) => {
      assert.ok(!li.classList.contains("turno--atendido"), `el <li> número ${i + 2} todavía no ha sido llamado: NO debería tener la clase "turno--atendido"`);
    });
  });
});

test("el turno llamado dice Atendido en su estado", () => {
  revisar(({ document }) => {
    llamar(document, 1);
    const items = turnosEnPantalla(document);
    assert.ok(items.length > 0, "la fila está vacía: termina primero el Ejercicio 02");
    assert.equal(estadoDe(items[0]), "Atendido", 'después de un llamado, el estado del primer turno debería decir "Atendido"');
  });
});

test("después de tres llamados hay tres atendidos y los demás en espera", () => {
  revisar(({ document }) => {
    llamar(document, 3);
    const items = turnosEnPantalla(document);
    assert.ok(items.length > 3, "la fila debería seguir mostrando todos los turnos");
    items.forEach((li, i) => {
      const esperado = i < 3 ? "Atendido" : "En espera";
      assert.equal(estadoDe(li), esperado, `después de tres llamados, el <li> número ${i + 1} debería decir "${esperado}"`);
      assert.equal(li.classList.contains("turno--atendido"), i < 3, `después de tres llamados, el <li> número ${i + 1} ${i < 3 ? "debería" : "NO debería"} tener la clase "turno--atendido"`);
    });
  });
});
