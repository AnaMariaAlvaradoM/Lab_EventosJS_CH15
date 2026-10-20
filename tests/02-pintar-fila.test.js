const test = require("node:test");
const assert = require("node:assert/strict");
const { revisar, turnosEnPantalla, turnosDelArreglo, elemento } = require("./utilidades");

test("al abrir la página hay un li.turno por cada turno del arreglo", () => {
  revisar(({ window, document }) => {
    const turnos = turnosDelArreglo(window);
    const items = turnosEnPantalla(document);
    assert.equal(items.length, turnos.length, `la fila debería tener ${turnos.length} <li class="turno"> al abrir la página y tiene ${items.length} (¿llamaste pintarFila() al final de app.js?)`);
  });
});

test("cada turno muestra su código en span.turno__codigo, en el orden del arreglo", () => {
  revisar(({ window, document }) => {
    const turnos = turnosDelArreglo(window);
    const items = turnosEnPantalla(document);
    assert.ok(items.length > 0, "la fila está vacía: ¿llamaste pintarFila() al final de app.js?");
    items.forEach((li, i) => {
      const codigo = li.querySelector(":scope > .turno__codigo");
      assert.equal(codigo && codigo.textContent.trim(), turnos[i].codigo, `el <li> número ${i + 1} debería tener <span class="turno__codigo">${turnos[i].codigo}</span> como hijo directo`);
    });
  });
});

test("cada turno muestra nombre y trámite dentro de div.turno__datos", () => {
  revisar(({ window, document }) => {
    const turnos = turnosDelArreglo(window);
    const items = turnosEnPantalla(document);
    assert.ok(items.length > 0, "la fila está vacía: ¿llamaste pintarFila() al final de app.js?");
    items.forEach((li, i) => {
      const t = turnos[i];
      const nombre = li.querySelector(":scope > .turno__datos > .turno__nombre");
      const tramite = li.querySelector(":scope > .turno__datos > .turno__tramite");
      assert.equal(nombre && nombre.textContent.trim(), t.nombre, `en el turno ${t.codigo}, el <p class="turno__nombre"> debería decir "${t.nombre}" y estar DENTRO del <div class="turno__datos">`);
      const esperado = t.tramite + " · " + t.modulo;
      assert.equal(tramite && tramite.textContent.trim(), esperado, `en el turno ${t.codigo}, el <p class="turno__tramite"> debería decir "${esperado}" y estar DENTRO del <div class="turno__datos">`);
    });
  });
});

test("al abrir la página cada turno dice En espera en span.turno__estado", () => {
  revisar(({ document }) => {
    const items = turnosEnPantalla(document);
    assert.ok(items.length > 0, "la fila está vacía: ¿llamaste pintarFila() al final de app.js?");
    items.forEach((li, i) => {
      const estado = li.querySelector(":scope > .turno__estado");
      assert.equal(estado && estado.textContent.trim(), "En espera", `el <li> número ${i + 1} debería tener <span class="turno__estado">En espera</span>`);
    });
  });
});

test("el mensaje de fila vacía queda oculto cuando hay turnos", () => {
  revisar(({ document }) => {
    const mensaje = elemento(document, "mensajeVacio");
    const oculto = mensaje.hidden || mensaje.classList.contains("turno--oculto");
    assert.ok(oculto, 'con turnos en la fila, el mensaje "No hay turnos cargados" debería quedar oculto (al final de pintarFila: mensajeVacio.hidden = turnos.length > 0;)');
  });
});

test("volver a pintar la fila no duplica los turnos", () => {
  revisar(({ window, document }) => {
    const turnos = turnosDelArreglo(window);
    try {
      window.eval("pintarFila(); pintarFila();");
    } catch (e) {
      throw new Error("No pude llamar a pintarFila(): revisa que la función se llame exactamente así");
    }
    const items = turnosEnPantalla(document);
    assert.equal(items.length, turnos.length, `después de pintar 3 veces la fila debería seguir con ${turnos.length} turnos y tiene ${items.length} (¿vacías la lista en la primera línea de pintarFila?)`);
  });
});
