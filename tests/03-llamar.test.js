const test = require("node:test");
const assert = require("node:assert/strict");
const { revisar, elemento, llamar, turnosDelArreglo } = require("./utilidades");

function textoDe(document, id) {
  return elemento(document, id).textContent.trim();
}

test("un clic en Llamar siguiente muestra A-014 en el visor", () => {
  revisar(({ document }) => {
    llamar(document, 1);
    assert.equal(textoDe(document, "visorNumero"), "A-014", "después de un clic, el visor grande debería decir A-014");
  });
});

test("un clic en Llamar siguiente dice Pase al Módulo 1", () => {
  revisar(({ document }) => {
    llamar(document, 1);
    assert.equal(textoDe(document, "visorModulo"), "Pase al Módulo 1", 'después de un clic, el párrafo del módulo debería decir "Pase al Módulo 1"');
  });
});

test("dos clics muestran el segundo turno: A-015 y Pase al Módulo 2", () => {
  revisar(({ document }) => {
    llamar(document, 2);
    assert.equal(textoDe(document, "visorNumero"), "A-015", "después de dos clics, el visor debería decir A-015 (¿marcaste el primero como atendido?)");
    assert.equal(textoDe(document, "visorModulo"), "Pase al Módulo 2", 'después de dos clics debería decir "Pase al Módulo 2"');
  });
});

test("el turno llamado queda atendido en el arreglo", () => {
  revisar(({ window, document }) => {
    llamar(document, 1);
    const turnos = turnosDelArreglo(window);
    assert.equal(turnos[0].atendido, true, "después de un clic, turnos[0].atendido debería ser true (el dato manda)");
    assert.equal(turnos[1].atendido, false, "después de un clic, turnos[1].atendido debería seguir en false");
  });
});

test("cuando ya no queda nadie, el visor avisa que no hay turnos", () => {
  revisar(({ window, document }) => {
    const total = turnosDelArreglo(window).length;
    llamar(document, total + 1);
    assert.equal(textoDe(document, "visorNumero"), "— — —", `después de ${total + 1} clics el visor debería decir "— — —"`);
    assert.equal(textoDe(document, "visorModulo"), "No hay turnos en espera", `después de ${total + 1} clics el párrafo debería decir "No hay turnos en espera"`);
  });
});

test("el botón está conectado con addEventListener y el evento click", () => {
  revisar(({ document, escuchadores }) => {
    const boton = elemento(document, "btnLlamar");
    const conectado = escuchadores.some((e) => e.elemento === boton && e.tipo === "click");
    assert.ok(conectado, 'el botón de llamar debería estar conectado así: btnLlamar.addEventListener("click", llamarSiguiente);');
  });
});
