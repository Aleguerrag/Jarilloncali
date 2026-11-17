# El Jarillón de Cali · Territorio, gente y riesgo

Sitio web del reportaje transmedia del curso **Periodismo e IA** (Universidad Autónoma de Occidente, 2026).
Equipo: Alejandro Guerra, Daniela Victoria, Danna Guerra y María José Dalfo.

Sitio estático (HTML, CSS y JavaScript, sin dependencias). Funciona en GitHub Pages tal como está.

---

## 1. Publicar en GitHub Pages (10 minutos)

1. Entra a <https://github.com/new> y crea un repositorio público, por ejemplo `jarillon-cali`.
2. En el repositorio nuevo: **Add file → Upload files**. Arrastra **todo el contenido** de esta carpeta (no la carpeta en sí): `index.html`, `css/`, `js/`, `assets/`, `worker/`, `README.md`, `.nojekyll`. Clic en **Commit changes**.
3. Ve a **Settings → Pages**. En *Build and deployment* elige **Deploy from a branch**, rama `main`, carpeta `/ (root)`, y guarda.
4. En 1-2 minutos el sitio queda en `https://TU-USUARIO.github.io/jarillon-cali/`.

Para verlo en tu computador sin subirlo: abre `index.html` con doble clic. Si las fotos no cargan, usa un servidor local: en la terminal, dentro de la carpeta, `python3 -m http.server` y abre <http://localhost:8000>.

---

## 2. Estructura

```
index.html            Página completa (portada, 3 capítulos, anatomía, simulador, chatbot, archivo, método)
css/styles.css        Estética de recortes: papel, bordes rasgados, Montserrat / Open Sans / Shadows Into Light
js/data.js            ← TODOS LOS DATOS Y FUENTES. Editen aquí cifras, línea de tiempo, infraestructura, ciclo.
js/kb.js              ← BASE DE CONOCIMIENTO DEL CHATBOT (fichas pregunta-respuesta-fuente)
js/main.js            Interacciones (no hace falta tocarlo)
js/chatbot.js         Motor del chatbot (no hace falta tocarlo)
js/config.js          Activa el modo IA del chatbot (opcional)
assets/img/           Fotos del reportaje (ver abajo)
worker/worker.js      Servidor opcional para el modo IA del chatbot
```

## 3. Poner las fotos

El sitio busca estas fotos en `assets/img/`. Si un archivo no existe, muestra un recuadro con la descripción. Cuando lo subas con ese nombre exacto, aparece solo.

| Archivo | Dónde aparece | Qué foto |
|---|---|---|
| `hero-rio.jpg` | Portada, grande | Río Cauca visto desde la corona del dique |
| `hero-archivo.jpg` | Portada (en blanco y negro) | Foto de archivo del oriente o del dique (con crédito) |
| `hero-barrio.jpg` | Portada | Viviendas sobre el jarillón, sin rostros identificables |
| `cronica-escombros.jpg` | Capítulo 3 | Escombros junto a una vivienda habitada, sin rostros |

Usa JPG horizontales de unos 1600 px de ancho y menos de 500 KB (comprímelas en <https://squoosh.app>). Si una imagen es una recreación con IA, escríbelo en el pie de foto o en el recuadro.

## 4. Actualizar contenidos

- **Cifras, línea de tiempo, infraestructura, ciclo:** `js/data.js`. Cada dato tiene `f` (clave de la fuente en `FUENTES`) y `e` (estado: `verificado`, `con-limites`, `por-verificar`).
- **Textos de los capítulos y testimonios:** `index.html` (buscar `[Testimonio` y `✎ En reportería`).
- **Chatbot:** agregar fichas en `js/kb.js` con `q` (preguntas tipo), `k` (palabras clave), `a` (respuesta) y `f` (fuente). Solo información verificada.

## 5. El chatbot «Pregúntale al Jarillón»

**Modo base (activo, sin servidor):** busca la ficha más relevante con un algoritmo de recuperación de información (BM25 con sinónimos) y responde con su texto y su fuente. Tiene guardas: emergencias → línea 123; datos personales, opiniones y predicciones → se niega. Si no encuentra nada, dice que no tiene información verificada.

**Modo IA (opcional, generación aumentada por recuperación o RAG):** el sitio recupera las fichas relevantes y un modelo de lenguaje redacta la respuesta solo con ellas. Requiere una cuenta gratuita de Cloudflare y una clave de API de Anthropic. La clave nunca va en el sitio.

1. Instala Wrangler: `npm i -g wrangler` y luego `wrangler login`.
2. Dentro de la carpeta `worker/`, despliega: `wrangler deploy worker.js --name jarillon-chat --compatibility-date 2026-01-01`.
3. Guarda la clave: `wrangler secret put ANTHROPIC_API_KEY --name jarillon-chat`.
4. En el panel de Cloudflare, en el Worker → Settings → Variables, agrega `ALLOWED_ORIGIN` = `https://TU-USUARIO.github.io`.
5. Copia la URL del Worker en `js/config.js` → `chatEndpoint`.

Si el Worker falla, el chat vuelve solo al modo base.

## 6. Créditos y verificación

Todas las cifras enlazan su fuente en la sección **Archivo**. Las marcadas *por verificar* no deben presentarse como hechos hasta confirmarse con la fuente primaria. Los esquemas del dique y del simulador son **ilustrativos, no a escala**, y no son una modelación hidráulica.
