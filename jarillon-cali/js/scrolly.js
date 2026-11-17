/* =========================================================
   Motor de scrollytelling — El Jarillón de Cali
   Dos mecánicas combinadas:
   1. Pasos (.step): cuando una tarjeta cruza el centro de la pantalla
      se activa; los elementos con data-s="n", "n-" o "a-b" aparecen.
   2. Scrub (data-scrub): la animación sigue el scroll de forma continua
      (agua, dibujo del mapa, línea de tiempo, inundación, carrera).
   Los datos vienen de js/data.js.
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
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeIO = (t) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const setGeom = (el, props) => { for (const k in props) { el.setAttribute(k, props[k]); el.style[k] = props[k] + "px"; } };
  function tween(from, to, dur, onUpdate) {
    if (reduce) { onUpdate(to); return; }
    const t0 = performance.now();
    const tick = (t) => {
      const p = clamp((t - t0) / dur), e = easeIO(p);
      onUpdate(Array.isArray(from) ? from.map((f, i) => lerp(f, to[i], e)) : lerp(from, to, e));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- textos desde data.js ---------- */
  $$("[data-f]").forEach((p) => {
    const f = FUENTES[p.dataset.f];
    if (!f) return;
    p.innerHTML = "Fuente: " + (f.u ? `<a href="${f.u}" target="_blank" rel="noopener">${esc(f.t)}</a>` : esc(f.t));
  });
  const SELLO = { "verificado": "verificado", "con-limites": "respaldado con límites", "por-verificar": "por verificar" };
  $$("[data-e]").forEach((s) => { s.className = "badge badge--" + s.dataset.e; s.textContent = SELLO[s.dataset.e]; });
  $$("[data-txt]").forEach((p) => {
    const [g, k] = p.dataset.txt.split(".");
    const src = g === "fallas" ? FALLAS[k] : DIQUE_PUNTOS[k];
    if (src) p.textContent = src.d;
  });
  const cicloCorto = (c) => c.t.split(" · ")[1] || c.t;
  CICLO.forEach((c, i) => {
    const n = $(`[data-ciclo-n="${i}"]`), t = $(`[data-ciclo-t="${i}"]`), d = $(`[data-ciclo-d="${i}"]`);
    if (n) n.textContent = `Paso ${i + 1} de ${CICLO.length}`;
    if (t) t.textContent = cicloCorto(c);
    if (d) d.textContent = c.d;
  });

  /* ---------- portadas: títulos palabra por palabra ---------- */
  $$(".opener__title").forEach((h) => {
    const words = h.textContent.trim().split(/\s+/);
    h.innerHTML = words.map((w, i) => `<span class="w"><span style="transition-delay:${i * 90}ms">${esc(w)}</span></span>`).join(" ");
  });
  const ioOpen = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle("in", e.isIntersecting)), { threshold: .35 });
  $$(".opener").forEach((o) => ioOpen.observe(o));

  /* ---------- contadores ---------- */
  function contar(el) {
    if (el.dataset.done) return;
    el.dataset.done = "1";
    const to = parseFloat(el.dataset.to), dec = +(el.dataset.dec || 0), pre = el.dataset.pre || "", suf = el.dataset.suf || "";
    tween(0, to, 1300, (v) => (el.textContent = pre + fmt(v, dec) + suf));
  }

  /* ---------- visibilidad por paso ---------- */
  const enRango = (r, n) => {
    if (/^\d+$/.test(r)) return n === +r;
    const [a, b] = r.split("-");
    return n >= +a && (b === "" ? true : n <= +b);
  };
  const aplicar = (scene, n, attr = "s") => $$(`[data-${attr}]`, scene).forEach((el) => el.classList.toggle("on", enRango(el.dataset[attr], n)));

  /* =========================================================
     01 · EL MURO — cámara + gráfico de unidades
     ========================================================= */
  const muroSvg = $("#muro-svg");
  const VB = [[340, 178, 150, 90], [220, 140, 400, 240], [0, 0, 800, 480], [0, 0, 800, 480], [0, 0, 800, 480], [0, 0, 800, 480]];
  let vbActual = VB[0].slice();
  const gUnits = $("#units");
  if (gUnits) {
    for (let i = 0; i < 100; i++) {
      const x = 205 + (i % 10) * 40, y = 30 + Math.floor(i / 10) * 40;
      const u = svg("path", { class: "unit", d: `M${x} ${y + 30}v-16l14-12l14 12v16z`, fill: "#f2c230", stroke: "#141414", "stroke-width": 1.5 }, gUnits);
      u.style.transitionDelay = (i * 9) + "ms";
    }
    const t = svg("text", { x: 400, y: 456, "text-anchor": "middle", class: "svg-small" }, gUnits);
    t.textContent = "Cada casita representa ≈ 88 hogares del censo 2010-2011";
  }

  /* =========================================================
     05 · SI CEDE — infraestructura
     ========================================================= */
  const ICONOS = {
    agua: "M0 -11c0 0-8 10-8 15a8 8 0 0016 0c0-5-8-15-8-15z",
    casa: "M-10 2L0 -9l10 11v9H3v-6h-6v6h-7z",
    bus: "M-10 -8h20v14h-20z M-6 9a2 2 0 104 0a2 2 0 10-4 0 M2 9a2 2 0 104 0a2 2 0 10-4 0",
    bomba: "M-9 -3h12v8h-12z M3 -1h7v4h-7z M-5 -9v6",
    laguna: "M-11 2q5.5 -6 11 0t11 0 M-11 7q5.5 -6 11 0t11 0",
    ptar: "M-9 -9h18v18h-18z M-5 -3h10 M-5 2h10"
  };
  const CORTO = { ptap: "Agua potable", ptar: "Aguas residuales", bombeo: "Bombeo", lagunas: "Lagunas", barrios: "Barrios", mio: "MIO", navarro: "Navarro" };
  const BREACH = { x: 760, y: 240 };
  const gInfra = $("#infra");
  if (gInfra) INFRA.forEach((it) => {
    const g = svg("g", { class: "infra-item", transform: `translate(${it.x},${it.y})`, "data-id": it.id }, gInfra);
    g.dataset.dist = Math.hypot(it.x - BREACH.x, it.y - BREACH.y);
    svg("circle", { r: 24, fill: "#fbf8f2", stroke: "#141414", "stroke-width": 2.5 }, g);
    const stroke = ["bomba", "laguna", "ptar"].includes(it.icon);
    svg("path", { d: ICONOS[it.icon] || ICONOS.casa, fill: stroke ? "none" : "#2f6f8f", stroke: "#2f6f8f", "stroke-width": stroke ? 2.5 : 1 }, g);
    const t = svg("text", { y: 44, "text-anchor": "middle", class: "svg-small" }, g);
    t.textContent = CORTO[it.id] || it.t;
    svg("path", { class: "x", d: "M-15 -15L15 15M15 -15L-15 15", stroke: "#c0392b", "stroke-width": 4 }, g);
  });

  /* =========================================================
     06 · LA BRECHA — calendario de años pendientes
     ========================================================= */
  const cal = $("#r-cal");
  if (cal) for (let y = 2027; y <= 2044; y++) {
    const s = document.createElement("span");
    s.dataset.y = y;
    s.style.transitionDelay = ((y - 2027) * 70) + "ms";
    cal.appendChild(s);
  }

  /* =========================================================
     07 · ESCOMBROS — rueda
     ========================================================= */
  const gc = $("#ciclo-nodos"), wheel = $("#wheel");
  const nodos = [];
  if (gc) CICLO.forEach((c, i) => {
    const a = -90 + i * 72, r = (a * Math.PI) / 180;
    const g = svg("g", { class: "nodo", transform: `translate(${(250 + 170 * Math.cos(r)).toFixed(1)},${(250 + 170 * Math.sin(r)).toFixed(1)})` }, gc);
    const inner = svg("g", { class: "nodo-in" }, g);
    svg("circle", { r: 30 }, inner);
    const n = svg("text", { "text-anchor": "middle" }, inner); n.textContent = i + 1;
    const l = svg("text", { class: "lbl" }, inner); l.textContent = cicloCorto(c);
    nodos.push({ g, inner, l, a });
  });
  let rotWheel = 0;
  function pintarRueda(w) {
    rotWheel = w;
    wheel.setAttribute("transform", `rotate(${w} 250 250)`);
    nodos.forEach((n) => {
      n.inner.setAttribute("transform", `rotate(${-w})`);
      const ang = ((n.a + w) * Math.PI) / 180, cx = Math.cos(ang);
      n.l.setAttribute("x", (cx * 50).toFixed(1));
      n.l.setAttribute("y", (Math.sin(ang) * 50 + 5).toFixed(1));
      n.l.setAttribute("text-anchor", Math.abs(cx) < .35 ? "middle" : cx > 0 ? "start" : "end");
    });
  }
  if (wheel) pintarRueda(0);

  /* =========================================================
     Escenas por pasos
     ========================================================= */
  const ESCENAS = {
    muro(n) {
      const to = VB[n] || VB[0];
      const from = vbActual.slice();
      vbActual = to.slice();
      tween(from, to, 1300, (v) => muroSvg.setAttribute("viewBox", v.map((x) => x.toFixed(2)).join(" ")));
      setGeom($("#muro-agua"), n === 2 ? { y: 258, height: 122 } : { y: 330, height: 50 });
      $$(".unit").forEach((u, i) => u.classList.toggle("gone", n >= 5 && i < 64));
    },
    anatomia(n) {
      setGeom($("#anat-agua"), n === 1 ? { y: 190, height: 170 } : { y: 300, height: 60 });
    },
    escombros(n) {
      const i = n >= 1 && n <= 5 ? n - 1 : -1;
      nodos.forEach((nd, k) => nd.g.classList.toggle("on", k === i));
      tween(rotWheel, i >= 0 ? -i * 72 : 0, 1100, pintarRueda);
      $("#wheel-t").textContent = i >= 0 ? cicloCorto(CICLO[i]) : "el ciclo";
      $("#wheel-s").textContent = i >= 0 ? `paso ${i + 1} de ${CICLO.length}` : "vuelve a empezar ↻";
      $("#ciclo-svg").style.opacity = n === 6 ? .35 : 1;
    }
  };

  const ioStep = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const step = en.target, scene = step.closest("[data-scene]"), n = +step.dataset.step;
      if (scene.dataset.active === String(n)) return;
      $$(".step", scene).forEach((s) => s.classList.toggle("is-active", s === step));
      scene.dataset.active = n;
      aplicar(scene, n);
      $$(".count", step).forEach(contar);
      const fn = ESCENAS[scene.dataset.scene];
      if (fn) fn(n, step);
    });
  }, { rootMargin: "-48% 0px -48% 0px" });
  $$(".step").forEach((s) => ioStep.observe(s));
  $$(".scene").forEach((sc) => { aplicar(sc, 0); sc.dataset.active = "0"; });
  $$(".step[data-step='0']").forEach((s) => s.classList.add("is-active"));

  /* =========================================================
     Escenas continuas (scrub)
     ========================================================= */
  const agua = $("#intro-agua"), ola = $("#intro-ola");
  const pAgua = $("#d-agua"), pCis = $("#d-cis"), pCali = $("#d-cali"), tip = $("#d-tip"), kmHud = $("#km-hud");
  const lens = [pAgua, pCis, pCali].map((p) => (p ? p.getTotalLength() : 0));
  const hTrack = $("#h-track"), hYear = $("#h-year"), hFill = $("#h-fill"), hScene = $("[data-scene='historia']");
  const ANIOS = [1958, 1965, 2011, 2012, 2024, 2026];
  let hIdx = -1;
  const flood = $("#flood"), hudHa = $("#hud-ha"), hudSrv = $("#hud-srv");
  const rYear = $("#r-year"), rObra = $("#r-obra"), rObraV = $("#r-obra-v"), rGente = $("#r-gente"), rGenteV = $("#r-gente-v"), rNd = $("#r-nd");
  const serie = (arr, key, base, x) => {
    if (x <= arr[0].x) return arr[0][key] / base * 100;
    for (let i = 1; i < arr.length; i++) if (x <= arr[i].x) {
      const t = (x - arr[i - 1].x) / (arr[i].x - arr[i - 1].x);
      return lerp(arr[i - 1][key], arr[i][key], t) / base * 100;
    }
    return arr[arr.length - 1][key] / base * 100;
  };
  let introP = 0;

  const SCRUB = {
    intro(p) {
      introP = p;
      const y = 400 - clamp(p / .7) * 178;
      agua.setAttribute("y", y); agua.setAttribute("height", 500 - y);
      ola.setAttribute("transform", `translate(0 ${y - 400})`);
    },
    mapa(p) {
      const a = clamp((p - .12) / .3), c = clamp((p - .46) / .12), k = clamp((p - .6) / .08);
      pAgua.style.strokeDashoffset = 1 - a; pCis.style.strokeDashoffset = 1 - c; pCali.style.strokeDashoffset = 1 - k;
      let pt;
      if (a < 1) pt = pAgua.getPointAtLength(a * lens[0]);
      else if (c < 1) pt = pCis.getPointAtLength(c * lens[1]);
      else pt = pCali.getPointAtLength(k * lens[2]);
      tip.setAttribute("cx", pt.x); tip.setAttribute("cy", pt.y);
      tip.style.opacity = k >= 1 ? 0 : 1;
      kmHud.textContent = fmt(17 * a + 6.7 * c + 2 * k, 1) + " km";
    },
    historia(p) {
      const n = ANIOS.length, raw = p * (n - 1), i = Math.min(n - 2, Math.floor(raw)), f = raw - i;
      const s = f < .3 ? 0 : f > .7 ? 1 : easeIO((f - .3) / .4);
      const pos = i + s;
      hTrack.style.transform = `translate3d(${-pos * window.innerWidth}px,0,0)`;
      hYear.textContent = Math.round(lerp(ANIOS[i], ANIOS[i + 1], s));
      hFill.style.transform = `scaleX(${pos / (n - 1)})`;
      const idx = Math.round(pos);
      if (idx !== hIdx) {
        hIdx = idx;
        aplicar(hScene, idx, "h");
        setGeom($("#h-agua"), idx === 2 ? { y: 132, height: 118 } : { y: 210, height: 40 });
      }
    },
    cede(p) {
      const t = clamp((p - .2) / .6);
      const r = t * 820;
      setGeom(flood, { r });
      let off = 0;
      $$(".infra-item").forEach((g) => { const o = +g.dataset.dist < r * .9; g.classList.toggle("off", o); if (o) off++; });
      hudHa.textContent = fmt(Math.round(12293 * t)) + " ha";
      hudSrv.textContent = `${off} de ${INFRA.length}`;
    },
    brecha(p) {
      const t = clamp((p - .05) / .45), x = lerp(2018, 2026.15, t);
      rYear.textContent = Math.floor(x);
      const o = serie(SERIE_OBRA, "km", 26.1, x);
      rObra.style.width = o + "%"; rObraV.textContent = Math.round(o) + " %";
      if (x < SERIE_REAS[0].x) {
        rGente.style.width = "0%"; rGenteV.textContent = "—"; rNd.style.opacity = 1;
      } else {
        const g = serie(SERIE_REAS, "h", 8777, x);
        rGente.style.width = g + "%"; rGenteV.textContent = Math.round(g) + " %"; rNd.style.opacity = 0;
      }
    }
  };
  const scrubs = $$("[data-scrub]");
  const barH = () => $("#bar").offsetHeight;
  const prog = $("#progress");
  let ticking = false;
  function onScroll() {
    ticking = false;
    const vh = window.innerHeight;
    scrubs.forEach((sec) => {
      const r = sec.getBoundingClientRect();
      if (r.bottom < -vh || r.top > vh * 2) return;
      const pin = vh - barH();
      const p = clamp((barH() - r.top) / Math.max(1, r.height - pin));
      SCRUB[sec.dataset.scrub] && SCRUB[sec.dataset.scrub](p);
    });
    const doc = document.documentElement;
    prog.style.transform = `scaleX(${clamp(window.scrollY / Math.max(1, doc.scrollHeight - vh))})`;
  }
  const req = () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } };
  window.addEventListener("scroll", req, { passive: true });
  window.addEventListener("resize", req);
  onScroll();

  /* ---------- lluvia de la apertura ---------- */
  const cv = $("#rain");
  if (cv && !reduce) {
    const ctx = cv.getContext("2d");
    let W = 0, H = 0, gotas = [], visible = true;
    const size = () => {
      const r = cv.getBoundingClientRect(), d = Math.min(2, window.devicePixelRatio || 1);
      W = r.width; H = r.height; cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0);
    };
    size(); window.addEventListener("resize", size);
    for (let i = 0; i < 220; i++) gotas.push({ x: Math.random(), y: Math.random(), v: .6 + Math.random() * .8, l: 8 + Math.random() * 14 });
    new IntersectionObserver((es) => { visible = es[0].isIntersecting; if (visible) requestAnimationFrame(llover); }).observe($("#inicio"));
    function llover() {
      if (!visible) return;
      ctx.clearRect(0, 0, W, H);
      const n = Math.floor(60 + introP * 160);
      ctx.strokeStyle = "rgba(156,199,220,.35)"; ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < n; i++) {
        const g = gotas[i];
        g.y += g.v * .012; if (g.y > 1.05) { g.y = -.05; g.x = Math.random(); }
        const x = g.x * W, y = g.y * H;
        ctx.moveTo(x, y); ctx.lineTo(x - 2, y + g.l);
      }
      ctx.stroke();
      requestAnimationFrame(llover);
    }
    requestAnimationFrame(llover);
  }

  /* ---------- barra: capítulo actual ---------- */
  const capLinks = $$("#bar-caps a");
  const ioCap = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) capLinks.forEach((a) => a.classList.toggle("is-on", a.dataset.cap === e.target.dataset.cap));
  }), { rootMargin: "-50% 0px -50% 0px" });
  $$("main > section").forEach((s) => ioCap.observe(s));
  new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && capLinks.forEach((a) => a.classList.remove("is-on"))), { rootMargin: "-50% 0px -50% 0px" })
    .observe($("#inicio"));

  /* ---------- cierre ---------- */
  const ioC = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("on", "in")), { rootMargin: "0px 0px -20% 0px" });
  $$(".cierre__line").forEach((l, i) => { l.style.transitionDelay = i * .45 + "s"; ioC.observe(l); });
  const regla = $(".cierre__regla");
  if (regla) {
    const tk = $(".ticks", regla);
    for (let i = 0; i <= 10; i++) svg("line", { x1: 10 + i * 38, x2: 10 + i * 38, y1: 30, y2: i % 5 ? 40 : 48 }, tk);
    const lb = svg("text", { x: 200, y: 22, "text-anchor": "middle", class: "svg-note" }, regla); lb.textContent = "10 cm";
    ioC.observe(regla);
  }

  /* ---------- cifras y archivo ---------- */
  const gridC = $("#cifras");
  if (gridC) CIFRAS.forEach((c) => {
    const f = FUENTES[c.f], d = document.createElement("div");
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

  /* ---------- testimonios ---------- */
  if (typeof TESTIMONIOS !== "undefined" && TESTIMONIOS.length) {
    const g = $("#testimonios-grid");
    TESTIMONIOS.forEach((t) => {
      const fig = document.createElement("figure");
      fig.innerHTML = `<blockquote>«${esc(t.texto)}»</blockquote><figcaption>${esc(t.quien || "")}</figcaption>`;
      g.appendChild(fig);
    });
    $("#testimonios").hidden = false;
  }

  /* ---------- foto opcional ---------- */
  $$("[data-photo]").forEach((el) => {
    const img = new Image();
    img.onload = () => { el.style.backgroundImage = `url("${el.dataset.photo}")`; el.classList.add("has-img"); };
    img.src = el.dataset.photo;
  });

  /* ---------- sonido del río ---------- */
  const btn = $("#sound");
  let actx = null, master = null;
  function iniciarAudio() {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return false;
    actx = new AC();
    const len = actx.sampleRate * 4, buf = actx.createBuffer(1, len, actx.sampleRate), d = buf.getChannelData(0);
    let last = 0;
    for (let i = 0; i < len; i++) { const w = Math.random() * 2 - 1; last = (last + .02 * w) / 1.02; d[i] = last * 3.2; }
    const src = actx.createBufferSource(); src.buffer = buf; src.loop = true;
    const lp = actx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 520;
    const lfo = actx.createOscillator(), lfoG = actx.createGain(); lfo.frequency.value = .08; lfoG.gain.value = 180;
    lfo.connect(lfoG); lfoG.connect(lp.frequency);
    master = actx.createGain(); master.gain.value = 0;
    src.connect(lp); lp.connect(master); master.connect(actx.destination);
    src.start(); lfo.start();
    return true;
  }
  btn.addEventListener("click", () => {
    const on = btn.getAttribute("aria-pressed") !== "true";
    if (on && !actx && !iniciarAudio()) return;
    if (actx.state === "suspended") actx.resume();
    master.gain.cancelScheduledValues(actx.currentTime);
    master.gain.linearRampToValueAtTime(on ? .5 : 0, actx.currentTime + .8);
    btn.setAttribute("aria-pressed", on);
    btn.title = on ? "Silenciar el río" : "Activar sonido del río";
  });
})();
