const test = require("node:test");
const assert = require("node:assert/strict");
const { revisar, turnosEnPantalla, turnosDelArreglo } = require("./utilidades");

function cadaTurno(revision) {
  revisar(({ window, document }) => {
    const turnos = turnosDelArreglo(window);
    const items = turnosEnPantalla(document);
    assert.ok(items.length > 0, "la fila está vacía: termina primero el Ejercicio 02");
    items.forEach((li, i) => revision(li, turnos[i]));
  });
}

test("cada li guarda su código en data-codigo", () => {
  cadaTurno((li, t) => {
    assert.equal(li.dataset.codigo, t.codigo, `el <li> del turno ${t.codigo} debería tener data-codigo="${t.codigo}" (item.dataset.codigo = turno.codigo)`);
  });
});

test("cada li guarda su módulo en data-modulo", () => {
  cadaTurno((li, t) => {
    assert.equal(li.dataset.modulo, t.modulo, `el <li> del turno ${t.codigo} debería tener data-modulo="${t.modulo}"`);
  });
});

test("cada li guarda el nombre en data-nombre", () => {
  cadaTurno((li, t) => {
    assert.equal(li.dataset.nombre, t.nombre, `el <li> del turno ${t.codigo} debería tener data-nombre="${t.nombre}"`);
  });
});

test("cada li tiene su botón Cancelar", () => {
  cadaTurno((li, t) => {
    const boton = li.querySelector(":scope > button.turno__cancelar");
    assert.ok(boton, `el <li> del turno ${t.codigo} debería tener un <button class="turno__cancelar"> como hijo directo`);
    assert.equal(boton.textContent.trim(), "Cancelar", `el botón del turno ${t.codigo} debería decir "Cancelar"`);
  });
});

test("cada botón Cancelar tiene data-accion cancelar", () => {
  cadaTurno((li, t) => {
    const boton = li.querySelector("button.turno__cancelar");
    assert.ok(boton, `el <li> del turno ${t.codigo} debería tener su <button class="turno__cancelar">`);
    assert.equal(boton.dataset.accion, "cancelar", `el botón del turno ${t.codigo} debería tener data-accion="cancelar" (cancelar.dataset.accion = "cancelar")`);
  });
});
