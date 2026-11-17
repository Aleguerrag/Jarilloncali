/* =========================================================
   Motor de scrollytelling — El Jarillón de Cali
   Cada .scene tiene un escenario fijo (.stage) y pasos (.step).
   Cuando un paso cruza el centro de la pantalla se activa:
   - los elementos con data-s="n", "n-" o "a-b" aparecen o se ocultan
   - se ejecuta la función de esa escena en ESCENAS
   Los datos vienen de js/data.js (no se duplican aquí).
   ========================================================= */
(function () {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const NS = "http://www.w3.org/2000/svg";
  const svg = (tag, attrs = {}, parent) => {
    const el = document.createElementNS(NS, tag);
    for (const k in attrs) el.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(el);
    return el;
  };
  const fmt = (n, dec = 0) => n.toLocaleString("es-CO", { minimumFractionDigits: dec, maximumFractionDigits: dec });
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const setGeom = (el, props) => { for (const k in props) { el.setAttribute(k, props[k]); el.style[k] = props[k] + "px"; } };

  /* ---------- fuentes, sellos y textos desde data.js ---------- */
  $$("[data-f]").forEach((p) => {
    const f = FUENTES[p.dataset.f];
    if (!f) return;
    p.innerHTML = "Fuente: " + (f.u ? `<a href="${f.u}" target="_blank" rel="noopener">${esc(f.t)}</a>` : esc(f.t));
  });
  const SELLO = { "verificado": "verificado", "con-limites": "respaldado con límites", "por-verificar": "por verificar" };
  $$("[data-e]").forEach((s) => { s.className = "badge badge--" + s.dataset.e; s.textContent = SELLO[s.dataset.e]; });
  $$("[data-txt]").forEach((p) => {
    const [grupo, k] = p.dataset.txt.split(".");
    const src = grupo === "fallas" ? FALLAS[k] : DIQUE_PUNTOS[k];
    if (src) p.textContent = src.d;
  });
  CICLO.forEach((c, i) => {
    const t = $(`[data-ciclo-t="${i}"]`), d = $(`[data-ciclo-d="${i}"]`);
    if (t) t.textContent = c.t;
    if (d) d.textContent = c.d;
  });

  /* ---------- contadores ---------- */
  function contar(el) {
    if (el.dataset.done) return;
    el.dataset.done = "1";
    const to = parseFloat(el.dataset.to), dec = +(el.dataset.dec || 0);
    const pre = el.dataset.pre || "", suf = el.dataset.suf || "";
    if (reduce) { el.textContent = pre + fmt(to, dec) + suf; return; }
    const t0 = performance.now(), dur = 1300;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = pre + fmt(to * e, dec) + suf;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- visibilidad por paso ---------- */
  function enRango(regla, n) {
    if (/^\d+$/.test(regla)) return n === +regla;
    const [a, b] = regla.split("-");
    return n >= +a && (b === "" ? true : n <= +b);
  }
  function aplicar(scene, n) {
    $$("[data-s]", scene).forEach((el) => el.classList.toggle("on", enRango(el.dataset.s, n)));
  }

  /* ---------- escenas ---------- */
  const ESCENAS = {
    muro(n) {
      const a = $("#muro-agua");
      setGeom(a, n === 1 ? { y: 258, height: 122 } : { y: 330, height: 50 });
    },
    historia(n, step) {
      $("#hist-year").textContent = step.dataset.year || "";
      setGeom($("#hist-agua"), n === 2 ? { y: 262, height: 98 } : { y: 330, height: 30 });
    },
    anatomia(n) {
      setGeom($("#anat-agua"), n === 1 ? { y: 196, height: 164 } : { y: 300, height: 60 });
    },
    cede(n) {
      const r = [0, 70, 240, 430, 900][n] ?? 0;
      setGeom($("#flood"), { r });
      const off = [[], [], ["ptap", "bombeo"], ["ptap", "bombeo", "ptar", "lagunas", "barrios", "mio"], INFRA.map((i) => i.id)][n] || [];
      $$(".infra-item").forEach((g) => g.classList.toggle("off", off.includes(g.dataset.id)));
    },
    escombros(n) {
      $$(".nodo").forEach((g, i) => g.classList.toggle("on", i === n - 1));
    }
  };

  /* ---------- infraestructura del simulador ---------- */
  const ICONOS = {
    agua: "M0 -11c0 0-8 10-8 15a8 8 0 0016 0c0-5-8-15-8-15z",
    casa: "M-10 2L0 -9l10 11v9H3v-6h-6v6h-7z",
    bus: "M-10 -8h20v14h-20z M-6 9a2 2 0 104 0a2 2 0 10-4 0 M2 9a2 2 0 104 0a2 2 0 10-4 0",
    bomba: "M-9 -3h12v8h-12z M3 -1h7v4h-7z M-5 -9v6",
    laguna: "M-11 2q5.5 -6 11 0t11 0 M-11 7q5.5 -6 11 0t11 0",
    ptar: "M-9 -9h18v18h-18z M-5 -3h10 M-5 2h10"
  };
  const CORTO = { ptap: "Agua potable", ptar: "Aguas residuales", bombeo: "Bombeo", lagunas: "Lagunas", barrios: "Barrios", mio: "MIO", navarro: "Navarro" };
  const gInfra = $("#infra");
  if (gInfra) INFRA.forEach((it) => {
    const g = svg("g", { class: "infra-item", transform: `translate(${it.x},${it.y})`, "data-id": it.id }, gInfra);
    svg("circle", { r: 24, fill: "#faf7f0", stroke: "#141414", "stroke-width": 2.5 }, g);
    const stroke = ["bomba", "laguna", "ptar"].includes(it.icon);
    svg("path", { d: ICONOS[it.icon] || ICONOS.casa, fill: stroke ? "none" : "#2f6f8f", stroke: "#2f6f8f", "stroke-width": stroke ? 2.5 : 1 }, g);
    const t = svg("text", { y: 44, "text-anchor": "middle", class: "svg-small" }, g);
    t.textContent = CORTO[it.id] || it.t;
    svg("path", { class: "x", d: "M-16 -16L16 16M16 -16L-16 16", stroke: "#c0392b", "stroke-width": 4 }, g);
  });

  /* ---------- gráfico de la brecha ---------- */
  const gb = $("#brecha-svg");
  if (gb) {
    const X = (x) => 90 + (x - 2018) / (2026.6 - 2018) * 660;
    const Y = (p) => 420 - p / 100 * 370;
    [0, 25, 50, 75, 100].forEach((p) => {
      svg("line", { x1: 90, x2: 750, y1: Y(p), y2: Y(p), stroke: "#141414", "stroke-opacity": p ? .12 : .6, "stroke-width": p ? 1 : 2 }, gb);
      const t = svg("text", { x: 80, y: Y(p) + 5, "text-anchor": "end", class: "svg-small" }, gb); t.textContent = p + " %";
    });
    [2018, 2020, 2022, 2024, 2026].forEach((y) => { const t = svg("text", { x: X(y), y: 446, "text-anchor": "middle", class: "svg-small" }, gb); t.textContent = y; });
    const obra = SERIE_OBRA.map((d) => [X(d.x), Y(d.km / 26.1 * 100)]);
    const reas = SERIE_REAS.map((d) => [X(d.x), Y(d.h / 8777 * 100)]);
    const linea = (pts) => "M" + pts.map((p) => p.join(" ")).join(" L");
    svg("path", { d: linea(obra), class: "draw", "data-s": "0-", pathLength: 1, fill: "none", stroke: "#141414", "stroke-width": 5, "stroke-linejoin": "round" }, gb);
    svg("path", { d: linea(reas), class: "draw", "data-s": "1-", pathLength: 1, fill: "none", stroke: "#a63a2b", "stroke-width": 5, "stroke-linejoin": "round" }, gb);
    const pts = svg("g", { "data-s": "0-" }, gb);
    obra.forEach(([x, y]) => svg("circle", { cx: x, cy: y, r: 6, fill: "#141414" }, pts));
    const pts2 = svg("g", { "data-s": "1-" }, gb);
    reas.forEach(([x, y]) => svg("circle", { cx: x, cy: y, r: 6, fill: "#a63a2b" }, pts2));
    const lo = svg("text", { x: obra[0][0] + 10, y: obra[0][1] - 14, class: "svg-label", "data-s": "0-" }, gb); lo.textContent = "Obra reforzada";
    const lr = svg("text", { x: reas[0][0] - 12, y: reas[0][1] + 34, class: "svg-label svg-alert", "data-s": "1-", "text-anchor": "middle" }, gb); lr.textContent = "Hogares reasentados";
    const [ox, oy] = obra[obra.length - 1], [, ry] = reas[reas.length - 1];
    const vo = svg("text", { x: ox + 12, y: oy + 6, class: "svg-label", "data-s": "0-" }, gb); vo.textContent = "97 %";
    const vr = svg("text", { x: ox + 12, y: ry + 6, class: "svg-label svg-alert", "data-s": "1-" }, gb); vr.textContent = "64 %";
    const br = svg("g", { "data-s": "2-" }, gb);
    svg("path", { d: `M${ox - 18} ${oy} h-10 V${ry} h10`, fill: "none", stroke: "#2f6f8f", "stroke-width": 3 }, br);
    const tb = svg("text", { x: ox - 36, y: (oy + ry) / 2 + 8, "text-anchor": "end", class: "svg-hand", fill: "#2f6f8f" }, br); tb.textContent = "brecha: 33 puntos";
    const t18 = svg("text", { x: 420, y: Y(30), "text-anchor": "middle", class: "svg-hand svg-alert", "data-s": "3" }, gb); t18.textContent = "faltan 3.132 hogares → ≈18 años";
  }

  /* ---------- ciclo ---------- */
  const gc = $("#ciclo-nodos");
  if (gc) CICLO.forEach((c, i) => {
    const a = (-90 + i * 72) * Math.PI / 180, x = 250 + 170 * Math.cos(a), y = 250 + 170 * Math.sin(a);
    const g = svg("g", { class: "nodo", transform: `translate(${x.toFixed(1)},${y.toFixed(1)})` }, gc);
    svg("circle", { r: 30 }, g);
    const n = svg("text", { "text-anchor": "middle" }, g); n.textContent = i + 1;
    const lx = Math.cos(a) * 52, ly = Math.sin(a) * 50;
    const l = svg("text", { class: "lbl", x: lx.toFixed(1), y: ly.toFixed(1), "text-anchor": Math.abs(Math.cos(a)) < .3 ? "middle" : (Math.cos(a) > 0 ? "start" : "end") }, g);
    l.textContent = c.t.split(" · ")[1] || c.t;
  });

  /* ---------- foto opcional ---------- */
  $$("[data-photo]").forEach((el) => {
    const img = new Image();
    img.onload = () => { el.style.backgroundImage = `url("${el.dataset.photo}")`; el.classList.add("has-img"); };
    img.src = el.dataset.photo;
  });

  /* ---------- activar pasos ---------- */
  const capLinks = $$("#bar-caps a");
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const step = en.target, scene = step.closest(".scene"), n = +step.dataset.step;
      $$(".step", scene).forEach((s) => s.classList.toggle("is-active", s === step));
      scene.dataset.active = n;
      aplicar(scene, n);
      $$(".count", step).forEach(contar);
      const fn = ESCENAS[scene.dataset.scene];
      if (fn) fn(n, step);
    });
  }, { rootMargin: "-48% 0px -48% 0px" });
  $$(".step").forEach((s) => io.observe(s));
  $$(".scene").forEach((sc) => aplicar(sc, 0));
  $$(".step[data-step='0']").forEach((s) => s.classList.add("is-active"));
  if (ESCENAS.historia) ESCENAS.historia(0, $("#historia .step"));

  // capítulo actual en la barra
  const ioCap = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      capLinks.forEach((a) => a.classList.toggle("is-on", a.dataset.cap === en.target.id));
    });
  }, { rootMargin: "-50% 0px -50% 0px" });
  $$("main > section").forEach((s) => ioCap.observe(s));

  // líneas del cierre
  const ioCierre = new IntersectionObserver((entries) => entries.forEach((en) => en.isIntersecting && en.target.classList.add("on")), { rootMargin: "0px 0px -25% 0px" });
  $$(".cierre__line").forEach((l, i) => { l.style.transitionDelay = i * .35 + "s"; ioCierre.observe(l); });

  /* ---------- apertura: el agua sube con el scroll ---------- */
  const intro = $("#inicio"), agua = $("#intro-agua"), ola = $("#intro-ola"), prog = $("#progress");
  let ticking = false;
  function onScroll() {
    ticking = false;
    const vh = window.innerHeight, r = intro.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - vh * 1.4)));
    const y = 400 - p * 178;
    agua.setAttribute("y", y); agua.setAttribute("height", 500 - y);
    ola.setAttribute("transform", `translate(0 ${y - 400})`);
    const doc = document.documentElement;
    prog.style.transform = `scaleX(${Math.min(1, window.scrollY / Math.max(1, doc.scrollHeight - vh))})`;
  }
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* ---------- cifras y archivo ---------- */
  const gridC = $("#cifras");
  if (gridC) CIFRAS.forEach((c) => {
    const f = FUENTES[c.f];
    const d = document.createElement("div");
    d.className = "cifra";
    d.innerHTML = `<span class="cifra__n">${c.pre || ""}${fmt(c.n, c.dec || 0)}${c.suf || ""}</span><span class="cifra__l">${esc(c.label)}</span>` +
      (c.nota ? `<span class="fine">${esc(c.nota)}</span>` : "") +
      (f ? `<p class="src">Fuente: ${f.u ? `<a href="${f.u}" target="_blank" rel="noopener">${esc(f.t)}</a>` : esc(f.t)}</p>` : "");
    gridC.appendChild(d);
  });
  const list = $("#archivo-list");
  if (list) {
    ARCHIVO_ORDEN.forEach((k) => {
      const f = FUENTES[k]; if (!f) return;
      const li = document.createElement("li");
      li.innerHTML = f.u ? `<a href="${f.u}" target="_blank" rel="noopener">${esc(f.t)}</a>` : esc(f.t);
      list.appendChild(li);
    });
    $("#n-fuentes").textContent = list.children.length;
  }

  /* ---------- testimonios (solo si existen) ---------- */
  if (typeof TESTIMONIOS !== "undefined" && TESTIMONIOS.length) {
    const g = $("#testimonios-grid");
    TESTIMONIOS.forEach((t) => {
      const fig = document.createElement("figure");
      fig.innerHTML = `<blockquote>«${esc(t.texto)}»</blockquote><figcaption>${esc(t.quien || "")}</figcaption>`;
      g.appendChild(fig);
    });
    $("#testimonios").hidden = false;
  }

  /* ---------- sonido del río (generado, sin archivos) ---------- */
  const btn = $("#sound");
  let ctx = null, master = null;
  function iniciarAudio() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    ctx = new AC();
    const len = ctx.sampleRate * 4, buf = ctx.createBuffer(1, len, ctx.sampleRate), d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) { const w = Math.random() * 2 - 1; last = (last + 0.02 * w) / 1.02; d[i] = last * 3.2; }
    const src = ctx.createBufferSource(); src.buffer = buf; src.loop = true;
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 520;
    const lfo = ctx.createOscillator(), lfoG = ctx.createGain(); lfo.frequency.value = 0.08; lfoG.gain.value = 180;
    lfo.connect(lfoG); lfoG.connect(lp.frequency);
    master = ctx.createGain(); master.gain.value = 0;
    src.connect(lp); lp.connect(master); master.connect(ctx.destination);
    src.start(); lfo.start();
    return true;
  }
  btn.addEventListener("click", () => {
    const on = btn.getAttribute("aria-pressed") !== "true";
    if (on && !ctx && !iniciarAudio()) return;
    if (ctx.state === "suspended") ctx.resume();
    master.gain.cancelScheduledValues(ctx.currentTime);
    master.gain.linearRampToValueAtTime(on ? 0.5 : 0, ctx.currentTime + 0.8);
    btn.setAttribute("aria-pressed", on);
    btn.title = on ? "Silenciar el río" : "Activar sonido del río";
  });
})();
