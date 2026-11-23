/* =========================================================
   Componentes del reportaje (versión 23 nov. 2026)
   - Fragmentos de audio y pódcast (AUDIOS en data.js)
   - Fotos con pie y crédito (FOTOS en data.js)
   - Gráfico de unidades (100 hogares)
   - Historias de vida (TESTIMONIOS en testimonios.js)
   ========================================================= */
(function () {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mmss = (t) => { t = Math.max(0, Math.round(t || 0)); return Math.floor(t / 60) + ":" + String(t % 60).padStart(2, "0"); };
  const fuente = (k) => {
    const f = FUENTES[k];
    if (!f) return "";
    return `<p class="src">Fuente: ${f.u ? `<a href="${f.u}" target="_blank" rel="noopener">${esc(f.t)}</a>` : esc(f.t)}</p>`;
  };
  const ICON_PLAY = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l13-7.5z" fill="currentColor"/></svg>';
  const ICON_PAUSE = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h4.5v16H6zM13.5 4H18v16h-4.5z" fill="currentColor"/></svg>';

  /* ---------- reproductor de audio ---------- */
  let sonando = null;
  function montarClip(fig, a) {
    const podcast = fig.classList.contains("clip--podcast");
    fig.classList.add("cinta");
    fig.innerHTML =
      `<button class="clip__play" type="button" aria-label="Escuchar: ${esc(a.quien)}">${ICON_PLAY}</button>` +
      `<div class="clip__body">` +
      (podcast ? `<p class="clip__kicker">Pódcast</p><p class="clip__title">${esc(a.rol)}</p>` : `<p class="clip__who"><b>${esc(a.quien)}</b> · ${esc(a.rol)}</p>`) +
      `<div class="clip__track"><div class="clip__bar" role="slider" tabindex="0" aria-label="Posición del audio" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div class="clip__fill"></div></div><span class="clip__time">0:00</span></div>` +
      (podcast
        ? `<details class="clip__tr"><summary>Leer la transcripción</summary><p>${esc(a.texto)}</p></details>`
        : `<blockquote class="clip__q">«${esc(a.texto)}»</blockquote>`) +
      fuente(a.f) +
      `</div><audio preload="metadata" src="${a.src}"></audio>`;
    const au = $("audio", fig), btn = $(".clip__play", fig), fill = $(".clip__fill", fig), bar = $(".clip__bar", fig), time = $(".clip__time", fig);
    const pintar = () => {
      const p = au.duration ? au.currentTime / au.duration : 0;
      fill.style.transform = `scaleX(${p})`;
      bar.setAttribute("aria-valuenow", Math.round(p * 100));
      time.textContent = au.duration ? `${mmss(au.currentTime)} / ${mmss(au.duration)}` : "0:00";
    };
    au.addEventListener("loadedmetadata", pintar);
    au.addEventListener("timeupdate", pintar);
    au.addEventListener("play", () => {
      if (sonando && sonando !== au) sonando.pause();
      sonando = au; fig.classList.add("is-playing"); btn.innerHTML = ICON_PAUSE; btn.setAttribute("aria-label", "Pausar");
    });
    const parar = () => { fig.classList.remove("is-playing"); btn.innerHTML = ICON_PLAY; btn.setAttribute("aria-label", `Escuchar: ${a.quien}`); };
    au.addEventListener("pause", parar);
    au.addEventListener("ended", () => { parar(); au.currentTime = 0; pintar(); });
    btn.addEventListener("click", () => (au.paused ? au.play() : au.pause()));
    const saltar = (x) => { if (!au.duration) return; const r = bar.getBoundingClientRect(); au.currentTime = Math.min(1, Math.max(0, (x - r.left) / r.width)) * au.duration; };
    bar.addEventListener("click", (e) => saltar(e.clientX));
    bar.addEventListener("keydown", (e) => {
      if (!au.duration) return;
      if (e.key === "ArrowRight") au.currentTime = Math.min(au.duration, au.currentTime + 5);
      if (e.key === "ArrowLeft") au.currentTime = Math.max(0, au.currentTime - 5);
    });
  }
  $$("[data-audio]").forEach((fig) => { const a = AUDIOS[fig.dataset.audio]; if (a) montarClip(fig, a); });

  /* ---------- fotos ---------- */
  $$("[data-foto]").forEach((fig) => {
    const f = FOTOS[fig.dataset.foto];
    if (!f) { fig.remove(); return; }
    fig.classList.add("cinta");
    fig.innerHTML = `<img src="${f.src}" alt="${esc(f.alt)}" loading="lazy" decoding="async"><figcaption>${esc(f.pie)} <span class="credito">${esc(f.credito)}</span></figcaption>`;
    $("img", fig).addEventListener("error", () => fig.remove());
  });

  /* ---------- gráfico de unidades ---------- */
  const uni = $("#unidades");
  if (uni) {
    const pct = Math.round((SERIE_REAS[SERIE_REAS.length - 1].h / 8777) * 100);
    let html = "";
    for (let i = 0; i < 100; i++) html += `<span class="u ${i < pct ? "u--fuera" : "u--dentro"}" style="--d:${i * 12}ms"></span>`;
    for (let i = 0; i < 12; i++) html += `<span class="u u--nuevo" style="--d:${1300 + i * 60}ms"></span>`;
    uni.innerHTML = html;
    new IntersectionObserver((es, o) => es.forEach((e) => { if (e.isIntersecting) { uni.classList.add("in"); o.disconnect(); } }), { threshold: .3 }).observe(uni);
  }

  /* ---------- calendario de años pendientes ---------- */
  const anios = $(".anios");
  if (anios) new IntersectionObserver((es, o) => es.forEach((e) => { if (e.isIntersecting) { anios.classList.add("in"); o.disconnect(); } }), { threshold: .4 }).observe(anios);

  /* ---------- historias de vida ---------- */
  const hg = $("#historias-grid");
  if (hg && typeof TESTIMONIOS !== "undefined" && TESTIMONIOS.length) {
    TESTIMONIOS.forEach((t, i) => {
      const art = document.createElement("article");
      art.className = "historia cinta";
      const key = "__hist" + i;
      if (t.audio) AUDIOS[key] = { src: t.audio, quien: t.nombre || "Testimonio", rol: t.lugar || "", texto: t.texto, f: "reportaje" };
      art.innerHTML =
        (t.foto ? `<img src="${t.foto}" alt="${esc(t.alt || "")}" loading="lazy">` : "") +
        `<div class="historia__body"><p class="historia__n">${esc(t.nombre || "")}</p><p class="historia__l">${esc(t.lugar || "")}</p>` +
        (t.audio ? `<figure class="clip clip--card" data-audio="${key}"></figure>` : `<blockquote class="clip__q">«${esc(t.texto)}»</blockquote>`) +
        (t.credito ? `<p class="fine">${esc(t.credito)}</p>` : "") + `</div>`;
      hg.appendChild(art);
      const fig = $("[data-audio]", art);
      if (fig) montarClip(fig, AUDIOS[key]);
    });
    hg.hidden = false;
  }

  /* ---------- rótulos de la infografía: ancho según el texto ---------- */
  const ajustarTags = () => $$(".amb-tag").forEach((g) => {
    const t = $("text", g), r = $("rect", g);
    try { const w = t.getComputedTextLength(); if (w) r.setAttribute("width", Math.ceil(w + 20)); } catch (e) {}
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(ajustarTags); else ajustarTags();
  window.addEventListener("resize", ajustarTags);

  /* ---------- videos de dron: se reproducen solo cuando están a la vista ---------- */
  const vids = $$(".dron__v");
  if (vids.length) {
    if (reduce) vids.forEach((v) => v.removeAttribute("loop"));
    else {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        const v = e.target;
        if (e.isIntersecting) { v.preload = "auto"; const p = v.play(); if (p) p.catch(() => {}); } else v.pause();
      }), { threshold: .25 });
      vids.forEach((v) => io.observe(v));
    }
  }
})();
