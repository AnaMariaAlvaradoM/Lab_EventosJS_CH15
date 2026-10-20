// Ayudas para los tests: abren tu tablero en un navegador simulado (jsdom),
// corren tu app.js como lo haría el navegador y hacen clic o escriben por ti.
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const assert = require("node:assert/strict");
const { JSDOM, VirtualConsole } = require("jsdom");

const CARPETA = path.join(__dirname, "..", "tablero");

function leer(archivo) {
  const ruta = path.join(CARPETA, archivo);
  if (!fs.existsSync(ruta)) throw new Error(`No encuentro tablero/${archivo}: no le cambies el nombre ni la carpeta`);
  return fs.readFileSync(ruta, "utf8");
}

function silencioso() {
  return new VirtualConsole();
}

// La página tal como está en index.html, sin correr JavaScript
function paginaSinJS() {
  return new JSDOM(leer("index.html"), { virtualConsole: silencioso() }).window.document;
}

function codigoSinComentarios(archivo) {
  return leer(archivo).replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
}

function explicarError(error) {
  const linea = ((error.stack || "").match(/tablero\/app\.js:(\d+)/) || [])[1];
  const donde = linea ? ` (línea ${linea})` : "";
  if (error.name === "SyntaxError") {
    return `app.js tiene un error de sintaxis (SyntaxError)${donde}: revisa paréntesis, llaves y comillas`;
  }
  if (/timed out/i.test(error.message)) {
    return "app.js tardó demasiado: revisa si tienes un ciclo infinito";
  }
  if (/of null/.test(error.message)) {
    return `app.js intentó usar un elemento que no encontró${donde}: getElementById retornó null. Revisa que el id exista en index.html (Ejercicio 01) y que en app.js lo escribas igual, letra por letra`;
  }
  const noExiste = error.message.match(/^(\w+) is not defined/);
  if (noExiste) {
    return `app.js usa "${noExiste[1]}", pero no existe${donde}: ¿lo escribiste distinto o llamaste una función que todavía no has creado?`;
  }
  if (/is not a function/.test(error.message)) {
    return `app.js lanzó un error${donde}: ${error.message}. ¿Escribiste bien el nombre del método?`;
  }
  return `app.js lanzó un error${donde}: ${error.message}`;
}

// Abre el tablero y corre app.js. Anota cada addEventListener para
// poder revisar la delegación. Retorna { window, document, error, escuchadores }.
function abrirTablero() {
  const dom = new JSDOM(leer("index.html"), { runScripts: "outside-only", virtualConsole: silencioso() });
  const window = dom.window;
  const escuchadores = [];
  const original = window.EventTarget.prototype.addEventListener;
  window.EventTarget.prototype.addEventListener = function (tipo, ...resto) {
    escuchadores.push({ elemento: this, tipo });
    return original.call(this, tipo, ...resto);
  };
  window.confirm = () => true;
  window.alert = () => {};

  let error = null;
  try {
    new vm.Script(leer("app.js"), { filename: "tablero/app.js" }).runInContext(dom.getInternalVMContext(), { timeout: 1000 });
  } catch (e) {
    error = new Error(explicarError(e));
  }
  return { window, document: window.document, error, escuchadores };
}

// Corre la revisión sobre un tablero recién abierto. Si algo falla y app.js
// lanzó un error, se muestra ese error: casi siempre es la causa.
function revisar(revision) {
  const tablero = abrirTablero();
  try {
    revision(tablero);
  } catch (fallo) {
    throw tablero.error || fallo;
  }
}

function elemento(document, id) {
  const el = document.getElementById(id);
  assert.ok(el, `no encuentro el elemento con id="${id}" en index.html (revisa los huecos del Ejercicio 01)`);
  return el;
}

// Los <li class="turno"> de la fila, en orden
function turnosEnPantalla(document) {
  return [...elemento(document, "listaEspera").querySelectorAll("li.turno")];
}

function visibles(document) {
  return turnosEnPantalla(document).filter((li) => !li.classList.contains("turno--oculto"));
}

function codigoDe(li) {
  const span = li.querySelector(".turno__codigo");
  return span ? span.textContent.trim() : li.dataset.codigo;
}

// El arreglo turnos de tu app.js
function turnosDelArreglo(window) {
  try {
    return window.eval("turnos");
  } catch (e) {
    throw new Error("No encuentro el arreglo turnos en app.js: no lo borres ni le cambies el nombre");
  }
}

function clic(el) {
  el.dispatchEvent(new el.ownerDocument.defaultView.MouseEvent("click", { bubbles: true }));
}

function llamar(document, veces = 1) {
  const boton = elemento(document, "btnLlamar");
  for (let i = 0; i < veces; i++) clic(boton);
}

function escribir(document, texto) {
  const buscador = elemento(document, "buscador");
  buscador.value = texto;
  buscador.dispatchEvent(new document.defaultView.Event("input", { bubbles: true }));
}

// Hace clic en el botón Cancelar del turno con ese código
function cancelar(document, codigo) {
  const li = turnosEnPantalla(document).find((item) => codigoDe(item) === codigo);
  assert.ok(li, `no encuentro el turno ${codigo} en la fila`);
  const boton = li.querySelector(".turno__cancelar");
  assert.ok(boton, `el turno ${codigo} no tiene su <button class="turno__cancelar"> (Ejercicio 06)`);
  clic(boton);
}

module.exports = {
  leer, paginaSinJS, codigoSinComentarios, abrirTablero, revisar, elemento, turnosEnPantalla, visibles,
  codigoDe, turnosDelArreglo, clic, llamar, escribir, cancelar,
};
