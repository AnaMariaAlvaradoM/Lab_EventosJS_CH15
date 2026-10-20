# 🏥 Lab de eventos · Tablero de turnos

Generation Colombia · Cohorte 15 · JavaScript para la web · Taller calificable

---

## 🧭 ¿Qué es esto?

### La situación

Llegas a la sede de Compensar de la Avenida 68 un martes a las 7 de la mañana.
Sacas el turno **A-014**, te sientas y miras una pantalla durante cuarenta minutos.

Esa pantalla muestra el turno que se está atendiendo, a qué módulo pasar y quién sigue en la fila.
**Hoy tú pones a funcionar esa pantalla.**

### Para pensar antes de empezar

> Si se va la luz y la pantalla se apaga, ¿la persona del turno A-014 perdió su turno?

Escribe tu respuesta en un papel. Al final del taller vuelve a leerla.

### Lo que recibes y lo que construyes

Dentro de la carpeta `tablero/` hay tres archivos:

| Archivo | Cómo viene | Qué haces tú |
|---|---|---|
| `index.html` | Completo, con 5 **huecos** | Llenas los 5 huecos (Ejercicio 01) |
| `styles.css` | Completo | Nada. Ya tiene todas las clases que vas a usar |
| `app.js` | Con los datos de la fila y los enunciados | Todo tu JavaScript |

### La idea de todo el taller

```text
arreglo  →  DOM
 dato       reflejo
```

El arreglo `turnos` es la fila de verdad. La pantalla solo **muestra** lo que dice el arreglo.
Cada vez que algo cambia, cambias el arreglo y vuelves a pintar.

### La calificación es automática

Cada vez que subes tu código, GitHub corre unos **tests** que abren tu tablero, hacen clic, escriben en el buscador y revisan lo que aparece.
En pocos minutos ves tu nota de **0.0 a 5.0** y qué te falta.

### ¿Qué es un test?

**Definición técnica:** un test es un código que abre tu página en un navegador simulado, hace lo mismo que haría una persona (clic, escribir) y compara lo que aparece con lo esperado.

**En la vida real:** es como el cliente incógnito de un banco. Llega, saca turno, espera, y anota punto por punto qué funcionó y qué no.

### Algunos tests revisan CÓMO lo hiciste

Este es un taller de **eventos**. Por eso hay tests que revisan que conectaste el botón y el buscador con `addEventListener`, y que el botón Cancelar use **un solo** escuchador en la lista.

---

## 📋 Los 8 ejercicios

### Tabla general

Los 8 ejercicios construyen **un solo tablero**. Cada uno se monta sobre el anterior.

| # | Tema | Dónde | Lo que haces |
|---|---|---|---|
| 01 | Los huecos del HTML | `index.html` y `app.js` | 5 `id` y las 7 constantes con `getElementById` |
| 02 | Pintar la fila | `app.js` | función `pintarFila` con `createElement` y `appendChild` |
| 03 | Llamar (evento `click`) | `app.js` | función `llamarSiguiente` y su `addEventListener` |
| 04 | Estados con `classList` | `app.js` | marcar los turnos atendidos |
| 05 | El contador | `app.js` | función `actualizarContador` con `querySelectorAll` |
| 06 | `dataset` y botón Cancelar | `app.js` | datos escondidos en cada turno y su botón |
| 07 | Delegación de eventos | `app.js` | función `cancelarTurno` con **un** escuchador |
| 08 | Búsqueda (evento `input`) | `app.js` | función `aplicarBusqueda` |

### ¿Dónde está el enunciado?

Aquí abajo, en la sección **Paso 3**, explicado paso a paso.
En `app.js` también hay un resumen corto de cada ejercicio, justo donde va su código.

---

## ⏰ Fecha límite

### Cuándo cierra

La profe te indica el día y la hora de cierre.

### Qué pasa después

Después de esa hora puedes seguir haciendo `git push`, pero **tu nota ya no cambia**.
Si abres tu Pull Request por primera vez después del cierre, queda con la etiqueta **⏰ Fuera de plazo**.

---

## 🚀 Paso 1 · Crea tu copia del repo (Fork)

### ¿Qué es un Fork?

**Definición técnica:** un fork es una copia de un repositorio en tu propia cuenta de GitHub. Puedes modificarla sin afectar el original.

**En la vida real:** la profe tiene el cuaderno original y tú le sacas fotocopia. Escribes en tu fotocopia, no en el cuaderno de la profe.

### Cómo hacerlo

1. Entra al repositorio de la profe en GitHub.
2. Arriba a la derecha, haz clic en **Fork**.
3. Deja todo como está y haz clic en **Create fork**.

### Cómo saber que quedó bien

Arriba a la izquierda debe decir **TU-USUARIO / Lab_EventosJS_CH15**.
Debajo aparece en letra pequeña: *forked from …*

---

## 💻 Paso 2 · Descarga tu copia al computador (Clone)

### Copia la dirección de TU fork

En **tu** fork (no en el de la profe), haz clic en el botón verde **Code** y copia la URL que termina en `.git`.

### Clona desde VS Code

Abre la terminal de VS Code (`Ctrl + ñ` o menú **Terminal → New Terminal**), ubícate en la carpeta donde guardas tus proyectos y escribe esto. Cambia la URL por la que copiaste:

```bash
git clone https://github.com/TU-USUARIO/Lab_EventosJS_CH15.git
```

### Abre la carpeta del proyecto

```bash
cd Lab_EventosJS_CH15
code .
```

### Instala las herramientas de los tests (una sola vez)

Igual que en el taller del vivero: los tests usan un **navegador simulado** llamado *jsdom*.
En la terminal, dentro de la carpeta del proyecto:

```bash
npm install
```

Aparece una carpeta `node_modules`. No la toques: es de los tests y nunca se sube a GitHub.

---

## ✍️ Paso 3 · Construye el tablero

### Mira tu tablero mientras trabajas

Clic derecho sobre `tablero/index.html` → **Open with Live Server**.
Cada vez que guardas (`Ctrl + S`), la página se recarga sola.

### Abre la consola del navegador

En la página, presiona `F12` y entra a la pestaña **Console**.
Ahí vas a ver tus `console.log` y los errores. Déjala abierta todo el taller.

### Reglas de oro

- **No le cambies el nombre** a los archivos ni a la carpeta `tablero/`.
- **No borres** el arreglo `turnos` del inicio de `app.js`.
- **Los nombres van exactos:** los `id`, las constantes, las funciones y las clases, con sus mayúsculas.
- **Los textos van exactos:** `En espera`, `Atendido`, `Pase al Módulo 1`, `— — —`, `No hay turnos en espera`, `Cancelar`.

### Las clases ya existen en el CSS

No tienes que escribir ni una línea de CSS.
Cuando el enunciado diga "ponle la clase `turno--atendido`", esa clase ya tiene su diseño en `styles.css`.

---

### Ejercicio 01 · Los huecos (y conoce a `null`)

#### Qué es `getElementById`

**Definición técnica:** `document.getElementById("x")` busca en la página el elemento con `id="x"` y te lo entrega para que lo manipules. Si no lo encuentra, entrega `null`.

**En la vida real:** es como llamar a alguien por altavoz en la sala de espera. Si nadie tiene ese nombre, nadie se levanta.

#### Tu tarea, parte A: pide los elementos ANTES de llenar los huecos

En `app.js`, debajo del comentario del Ejercicio 01, guarda los 7 elementos en constantes.
Este es el primero, para que veas la forma:

```javascript
const visorNumero = document.getElementById("visorNumero");
```

Haz lo mismo con `visorModulo`, `listaEspera`, `btnLlamar`, `buscador`, `contadorFila` y `mensajeVacio`.
Luego, debajo, escribe `console.log(visorNumero);`, guarda y mira la consola.

#### Para pensar

> La consola dice `null`. Si el `id` está escrito en tu JavaScript, ¿por qué no lo encuentra?

#### Tu tarea, parte B: llena los 5 huecos

Abre `index.html`. Hay 5 comentarios que dicen **HUECO**: a cada elemento le falta su `id`.

| Elemento | `id` que va |
|---|---|
| `<p class="visor__numero">` | `visorNumero` |
| `<p class="visor__modulo">` | `visorModulo` |
| `<input class="panel__input">` | `buscador` |
| `<span class="conteo__cifra">` | `contadorFila` |
| `<ul class="fila__lista">` | `listaEspera` |

`btnLlamar` y `mensajeVacio` ya traían su `id`. Guarda, recarga y mira otra vez la consola: ahora sale el elemento.
Cuando lo veas, borra el `console.log`.

#### Para pensar

> `getElementById("visornumero")` y `id="visorNumero"`: ¿se encuentran? ¿Por qué?

---

### Ejercicio 02 · Pintar la fila

#### Qué es `createElement` y `appendChild`

**Definición técnica:** `document.createElement("li")` crea un elemento nuevo, pero lo deja **fuera** de la página. `padre.appendChild(hijo)` lo mete dentro de otro elemento, y ahí sí aparece.

**En la vida real:** es como imprimir un aviso (`createElement`) y luego pegarlo en la cartelera (`appendChild`). Impreso pero sin pegar, nadie lo ve.

#### La forma de cada turno

El CSS espera esta estructura exacta por cada turno:

```html
<li class="turno">
  <span class="turno__codigo">A-014</span>
  <div class="turno__datos">
    <p class="turno__nombre">Luisa Cárdenas</p>
    <p class="turno__tramite">Autorización de examen · Módulo 1</p>
  </div>
  <span class="turno__estado">En espera</span>
</li>
```

Ojo con el árbol: el nombre y el trámite cuelgan del `div`, el `div` cuelga del `li`, y el `li` cuelga de la lista.

#### Así se crea y se cuelga un elemento

Este es el patrón. Lo repites para cada pieza del turno:

```javascript
const codigo = document.createElement("span");
codigo.className = "turno__codigo";
codigo.textContent = turno.codigo;
item.appendChild(codigo);
```

#### Tu tarea

En `app.js`, debajo del comentario del Ejercicio 02, escribe la función `pintarFila()`:

1. En la **primera línea**, vacía la lista: `listaEspera.textContent = "";`
2. Recorre el arreglo `turnos` con un `for` y arma un `<li>` completo por cada turno.
3. Mete cada `<li>` en `listaEspera` con `appendChild`.
4. Después del `for`, oculta el mensaje de fila vacía: `mensajeVacio.hidden = turnos.length > 0;`

Por último, al **final** de `app.js` (en el bloque "Arranque"), llama a la función: `pintarFila();`

#### Para pensar

> Escribiste el arreglo, pero antes de llamar a `pintarFila()` la fila estaba vacía. ¿El arreglo existía o no?
> Prueba a colgar el nombre de `item` en vez del `div`. ¿Qué se rompe? Devuélvelo.

---

### Ejercicio 03 · Llamar al siguiente (evento `click`)

#### Qué es un evento

**Definición técnica:** un evento es algo que pasa en la página (un clic, una tecla, escribir en un campo). Con `elemento.addEventListener("click", funcion)` le dices al navegador: "cuando pase esto, ejecuta esta función".

**En la vida real:** es el timbre del módulo. La funcionaria no está mirando la puerta todo el tiempo; cuando suena el timbre, actúa.

#### Tu tarea

Escribe la función `llamarSiguiente()`:

1. Recorre `turnos` y guarda el **primero** que tenga `atendido` en `false`. Detén el ciclo con `break`.
2. Si no encontraste ninguno, escribe `— — —` en `visorNumero`, `No hay turnos en espera` en `visorModulo`, y sal con `return`.
3. Si lo encontraste, marca `atendido = true`, escribe su código en `visorNumero` y `"Pase al " + modulo` en `visorModulo`.
4. Al final, llama a `pintarFila()` para que la pantalla se ponga al día.

Debajo de la función, conéctala al botón:

```javascript
btnLlamar.addEventListener("click", llamarSiguiente);
```

#### Para pensar

> ¿Por qué se escribe `llamarSiguiente` sin paréntesis dentro de `addEventListener`?
> Le diste varios clics: ¿por qué el mismo turno no vuelve a salir?

---

### Ejercicio 04 · Estados con `classList`

#### Qué es `classList`

**Definición técnica:** `elemento.classList.add("x")` le agrega la clase `x` a un elemento, y `classList.remove("x")` se la quita. Es la forma de cambiar cómo se ve algo sin escribir CSS desde JavaScript.

**En la vida real:** es la ficha de "atendido" que le ponen a tu historia clínica. El sello no dice de qué color es; la oficina ya sabe qué hacer con las fichas selladas.

#### Tu tarea

Dentro de `pintarFila`, para cada turno:

- Si `turno.atendido` es `true`, agrégale al `<li>` la clase `turno--atendido`.
- El estado dice `Atendido` si ya fue atendido, y `En espera` si no.

#### Para pensar

> Si mañana el cliente pide que los atendidos se vean azules, ¿qué archivo abres?

---

### Ejercicio 05 · El contador

#### Qué es `querySelectorAll`

**Definición técnica:** `elemento.querySelectorAll("selector")` busca **todos** los descendientes que cumplen un selector de CSS. Lo que entrega tiene `length`, igual que un arreglo.

**En la vida real:** es pedirle al vigilante "cuénteme cuántas personas hay sentadas en la fila que todavía no han pasado".

#### Tu tarea

Escribe la función `actualizarContador()`:

- Cuenta los `<li>` con clase `turno` que **no** tengan la clase `turno--atendido`. En CSS eso se escribe `.turno:not(.turno--atendido)`.
- Escribe ese número en `contadorFila`.

Llámala en la última parte de `pintarFila`, después del `for`.

#### Para pensar

> Imagina que el contador dice 5 y en pantalla se ven 3 turnos en espera. ¿Cuál de los dos está mal?

---

### Ejercicio 06 · Datos escondidos con `dataset` y el botón Cancelar

#### Qué es `dataset`

**Definición técnica:** los atributos que empiezan por `data-` guardan información dentro de un elemento sin mostrarla. En JavaScript se leen y escriben con `elemento.dataset`: `item.dataset.codigo = "A-014"` crea `data-codigo="A-014"`.

**En la vida real:** es el código de barras de tu turno impreso. Tú no lo lees, pero la máquina sí.

#### Tu tarea, parte A: los datos

Dentro de `pintarFila`, guarda en cada `<li>` su código, su módulo y su nombre:

```javascript
item.dataset.codigo = turno.codigo;
```

Haz lo mismo con `modulo` y `nombre`. Abre el inspector (`F12` → **Elements**) y busca un `<li>`: los atributos están ahí, pero no se ven en la página.

#### Tu tarea, parte B: el botón

Dentro de `pintarFila`, crea un `<button>` por cada turno:

- con la clase `turno__cancelar` y el texto `Cancelar`;
- con `dataset.accion = "cancelar"`, para reconocerlo después;
- colgado del `<li>`, después del estado.

#### Para pensar

> Si te doy un `<li>` cualquiera de la pantalla, ¿cómo sabes a cuál turno del arreglo corresponde?

---

### Ejercicio 07 · Cancelar con UN solo escuchador (delegación)

#### El problema

Tienes 6 botones. La tentación es ponerle un `addEventListener` a cada uno.
Pero cada vez que llamas a `pintarFila`, la primera línea **borra** la lista: los botones con escuchador se destruyen y nacen botones nuevos sin ninguno.

#### Qué es la delegación de eventos

**Definición técnica:** cuando haces clic en un botón, el evento **sube** por el árbol: botón → `li` → lista → página. Delegar es poner **un** escuchador en un elemento que nunca se borra (la lista) y preguntar, con `evento.target`, dónde fue el clic exactamente.

**En la vida real:** en vez de poner un portero en cada consultorio, hay uno solo en la entrada del pasillo. Cuando alguien llega, el portero mira a qué consultorio va.

#### Tu tarea

Escribe la función `cancelarTurno(evento)`:

1. Si `evento.target.dataset.accion` **no** es `"cancelar"`, sal con `return` (el clic fue en otro lado).
2. Busca el `<li>` del botón: `const item = evento.target.closest(".turno");`
3. Lee su `item.dataset.codigo` y busca ese turno en el arreglo.
4. Sácalo del arreglo con `turnos.splice(i, 1)` y vuelve a pintar.

Conéctala a la **lista**, no a los botones:

```javascript
listaEspera.addEventListener("click", cancelarTurno);
```

#### Qué es `closest`

**Definición técnica:** `elemento.closest(".x")` sube por el árbol desde el elemento y entrega el primer antepasado (o él mismo) que cumpla el selector.

**En la vida real:** es preguntar "¿de qué familia es este niño?" y subir hasta encontrar al acudiente.

#### Para pensar

> Sacaste el turno del arreglo, pero nunca le dijiste al `<li>` que desapareciera. ¿Por qué desapareció?

---

### Ejercicio 08 · Búsqueda en vivo (evento `input`)

#### Qué es el evento `input`

**Definición técnica:** el evento `input` se dispara **cada vez** que cambia lo escrito en un campo, letra por letra. Lo escrito se lee con `campo.value`.

**En la vida real:** es el buscador de contactos del celular: filtra mientras escribes, sin botón de "buscar".

#### Tu tarea

Escribe la función `aplicarBusqueda()`:

1. Toma `buscador.value` en minúsculas (`toLowerCase()`).
2. Recorre los `<li>` de la lista con `querySelectorAll(".turno")`.
3. Para cada uno, arma su texto de búsqueda con los datos que guardaste:

```javascript
const contenido = (item.dataset.codigo + " " + item.dataset.nombre).toLowerCase();
```

4. Si `contenido` incluye lo escrito (`includes`), quítale la clase `turno--oculto`; si no, pónsela.

Conéctala al buscador:

```javascript
buscador.addEventListener("input", aplicarBusqueda);
```

#### Pruébala

Escribe `sandra`, luego `SANDRA`, luego `a-01`, y borra todo.

#### Para pensar

> Escribe algo en el buscador y luego cancela un turno. ¿Qué le pasa al filtro? ¿Por qué?
> Arréglalo: la solución es **una sola línea** y va donde ya llamas a `actualizarContador()`.

> ¿Por qué buscamos en el `dataset` y no en todo el texto del `<li>`? Pista: escribe `cancelar`.

---

### Antes de entregar

Revisa que tu tablero cumpla todo esto:

- La fila se pinta sola al abrir la página.
- El botón de llamar muestra el turno en el visor y lo marca como atendido.
- Los atendidos se ven distintos a los que esperan.
- El contador baja cada vez que llamas a alguien.
- Cancelar quita el turno de la fila, y sigue funcionando después de llamar.
- El buscador filtra mientras escribes, y el filtro no se pierde al cancelar.
- El visor avisa cuando ya no queda nadie.

### La pregunta final

> Cuenta cuántas veces en todo el taller le dijiste a un `<li>` específico que cambiara.
> Vuelve a leer lo que respondiste al inicio, sobre la luz y el turno A-014. ¿Escribirías lo mismo?

---

## 🧪 Paso 4 · Prueba tu nota en tu computador

### Corre todos los tests

En la terminal de VS Code, dentro de la carpeta del proyecto:

```bash
npm test
```

### Cómo leer el resultado

- ✅ el ejercicio pasó todos sus tests
- 🟡 pasó algunos tests
- ❌ no pasó ninguno
- Debajo de cada ✗ aparece **qué** esperaba el test

Al final ves tu **nota de 0.0 a 5.0**. Es la misma que te va a poner GitHub.

### Corre un solo ejercicio

Si quieres revisar solo uno, agrega su número. Por ejemplo, para el 07:

```bash
npm test -- 07
```

---

## ☁️ Paso 5 · Sube tu código a tu fork

### Los 3 comandos de siempre

```bash
git add .
git commit -m "Tablero: llamar al siguiente"
git push
```

### ¿Qué hace cada uno?

- `git add .` → prepara todos tus cambios (como meter las cosas en una caja).
- `git commit -m "..."` → cierra la caja y le pone una etiqueta con un mensaje.
- `git push` → envía la caja a tu fork en GitHub.

---

## 📬 Paso 6 · Entrega: abre tu Pull Request (solo UNA vez)

### ¿Qué es un Pull Request?

**Definición técnica:** un Pull Request (PR) es una solicitud para proponer tus cambios al repositorio original. Ahí se revisan y se comentan.

**En la vida real:** es como radicar un documento en una oficina. Lo entregas una vez, queda con número de radicado, y cualquier corrección se agrega a ese mismo trámite.

### Cómo abrirlo

1. Entra a **tu fork** en GitHub.
2. Haz clic en **Contribute** y luego en **Open pull request**.
3. En el título escribe tu **nombre y apellido completos**. Por ejemplo: `Laura Gómez Pérez`.
4. Haz clic en **Create pull request**.

### Muy importante

**Abre un solo PR.** Cuando hagas `git push` otra vez, tu PR se actualiza solo y se vuelve a calificar.

---

## 🎯 Paso 7 · Mira tu nota en GitHub

### Dónde aparece

Espera 1 o 2 minutos después de cada `git push` y entra a tu Pull Request:

- Aparece un **comentario automático** con tu nota y una tabla por ejercicio.
- A la derecha verás una etiqueta, por ejemplo **Nota 4.2**.
- El enlace **Ver qué falta por corregir** te muestra qué tests fallaron.

### ¿Quieres subir la nota?

Corrige en VS Code, revisa con `npm test` y haz de nuevo el **Paso 5**.

### Ojo con la fecha límite

Después del cierre, los `git push` ya no cambian tu nota.
Si tu primera entrega llega tarde, el PR queda con **⏰ Fuera de plazo**.

---

## 🎁 Retos opcionales (no cambian tu nota)

### Reto 1 · Una tecla para limpiar el buscador

Con el evento `keydown` en el buscador, haz que la tecla **Escape** borre lo escrito y vuelva a mostrar a todos.
Pista: `evento.key` te dice qué tecla se presionó. Después de borrar `buscador.value`, llama a `aplicarBusqueda()`.

### Reto 2 · Confirmar antes de cancelar

Antes del `splice`, pregunta con `confirm("¿Cancelar el turno A-015?")`, como en la clase de alertas.
Si la persona dice que no, sal con `return`.

### Reto 3 · Contar los atendidos

Agrega al panel un segundo número con cuántos turnos van atendidos.
Tendrás que agregar un elemento en `index.html`: el CSS de `.conteo` te sirve de base.

---

## 🚫 Archivos que NO debes modificar

### La lista

- La carpeta `tests/`
- La carpeta `scripts/`
- La carpeta `.github/`
- Los archivos `package.json` y `package-lock.json`

### ¿Qué pasa si los modificas?

Tu PR queda marcado con la etiqueta **⚠️ Revisar** y la profe lo revisa a mano.
Además, GitHub siempre califica con los tests originales, así que modificarlos no cambia tu nota.

---

## 🆘 Errores frecuentes

### En la consola: "Cannot set properties of null"

Le estás poniendo texto a algo que no existe: `getElementById` no encontró el `id` y entregó `null`.
No busques el error en la línea donde explota: búscalo en la línea del `getElementById`. Compara el `id` del HTML y el de `app.js`, letra por letra.

### "npm no se reconoce como un comando"

No tienes Node.js instalado, o VS Code se abrió antes de instalarlo.
Instálalo desde [nodejs.org](https://nodejs.org) (versión LTS) y reinicia VS Code.

### "Faltan las herramientas de los tests: corre npm install"

Te saltaste la última parte del **Paso 2**. Corre `npm install` una vez y vuelve a correr `npm test`.

### "app.js intentó usar un elemento que no encontró (línea …)"

Es el mismo error de `null`. Revisa los huecos del Ejercicio 01 y el nombre del `id` en `app.js`.

### "app.js usa "…", pero no existe (línea …)"

Llamaste una función que todavía no has escrito, o la escribiste con otro nombre.
Por ejemplo: pusiste `aplicarBusqueda();` en `pintarFila` antes de crear la función del Ejercicio 08.

### "la fila está vacía" o "¿llamaste pintarFila()?"

Te faltó la línea `pintarFila();` al final de `app.js`, en el bloque "Arranque".

### "después de pintar 3 veces la fila debería seguir con 6 turnos"

Los turnos se duplican: te falta `listaEspera.textContent = "";` en la primera línea de `pintarFila`.

### "app.js tiene un error de sintaxis (SyntaxError) (línea …)"

Falta o sobra un paréntesis, una llave o una comilla cerca de esa línea.
Con un error de sintaxis **nada** de `app.js` funciona: por eso fallan casi todos los ejercicios al tiempo.

### "Tiempo agotado: revisa si tienes un ciclo infinito"

Un `for` o `while` que nunca termina, casi siempre en `llamarSiguiente`. Revisa que la variable del ciclo avance.

### "no le pongas escuchadores a cada botón"

Le pusiste `addEventListener` a cada botón dentro de `pintarFila`. Quítalo y usa uno solo en la lista (Ejercicio 07).

### "Please tell me who you are" al hacer commit

Git no sabe quién eres. Configúralo una sola vez con tu nombre y el correo de tu cuenta de GitHub:

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tucorreo@ejemplo.com"
```

### "Permission denied" o error 403 al hacer push

Clonaste el repo de la profe en vez de tu fork.
Vuelve al **Paso 2** y clona la URL de **tu** fork.

---

<sub>© 2026 Ana Alvarado · Educadora Tech & Desarrolladora Full Stack · Todos los derechos reservados · linkedin.com/in/ana-alvarado-instructora-full-stack</sub>
