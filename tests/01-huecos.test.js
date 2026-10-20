const test = require("node:test");
const assert = require("node:assert/strict");
const { paginaSinJS, codigoSinComentarios } = require("./utilidades");

function revisarId(selector, id, descripcion) {
  const document = paginaSinJS();
  const el = document.querySelector(selector);
  assert.ok(el, `no encuentro el ${descripcion} en index.html: no lo borres ni le cambies la clase`);
  const actual = el.getAttribute("id");
  const encontre = actual === null ? "todavía no tiene id" : `tiene id="${actual}" (revisa mayúsculas y minúsculas)`;
  assert.equal(actual, id, `el ${descripcion} debería tener id="${id}" y ${encontre}`);
}

test("el número grande del visor tiene id visorNumero", () => {
  revisarId("p.visor__numero", "visorNumero", '<p class="visor__numero">');
});

test("el párrafo del módulo tiene id visorModulo", () => {
  revisarId("p.visor__modulo", "visorModulo", '<p class="visor__modulo">');
});

test("el campo de búsqueda tiene id buscador", () => {
  revisarId("input.panel__input", "buscador", '<input class="panel__input">');
});

test("la cifra del contador tiene id contadorFila", () => {
  revisarId("span.conteo__cifra", "contadorFila", '<span class="conteo__cifra">');
});

test("la lista de la fila tiene id listaEspera", () => {
  revisarId("ul.fila__lista", "listaEspera", '<ul class="fila__lista">');
});

test("app.js guarda los 7 elementos con getElementById", () => {
  const codigo = codigoSinComentarios("app.js");
  const document = paginaSinJS();
  const ids = ["visorNumero", "visorModulo", "listaEspera", "btnLlamar", "buscador", "contadorFila", "mensajeVacio"];
  for (const nombre of ids) {
    const patron = new RegExp(`(?:const|let)\\s+${nombre}\\s*=\\s*document\\.getElementById\\(\\s*(["'])(.*?)\\1\\s*\\)`);
    const encontrado = codigo.match(patron);
    assert.ok(encontrado, `en app.js falta la constante ${nombre}: const ${nombre} = document.getElementById("${nombre}");`);
    assert.equal(encontrado[2], nombre, `la constante ${nombre} busca el id "${encontrado[2]}", pero el id es "${nombre}" (compáralos letra por letra)`);
    assert.ok(document.getElementById(nombre), `app.js busca el id "${nombre}", pero no existe en index.html: revisa su hueco`);
  }
});
