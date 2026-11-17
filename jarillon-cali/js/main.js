/* =========================================================
   Interacciones del sitio — El Jarillón de Cali
   ========================================================= */
(function () {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const NS = "http://www.w3.org/2000/svg";
  const svgEl = (tag, attrs = {}, parent) => {
    const el = document.createElementNS(NS, tag);
    for (const k in attrs) el.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(el);
    return el;
  };
  const fmt = (n, dec = 0) => n.toLocaleString("es-CO", { minimumFractionDigits: dec, maximumFractionDigits: dec });
  const fuenteHTML = (key) => {
    const f = FUENTES[key];
    if (!f) return "";
    return f.u ? `<a href="${f.u}" target="_blank" rel="noopener">${f.t}</a>` : f.t;
  };
  const badge = (e) => {
    const txt = { "verificado": "verificado", "con-limites": "respaldado con límites", "por-verificar": "por verificar" }[e] || e;
    return `<span class="badge badge--${e}">${txt}</span>`;
  };

  /* ---------- bordes de papel rasgado ---------- */
  function rasgar(el) {
    const seed = [...(el.className + el.textContent.length)].reduce((a, c) => a + c.charCodeAt(0), 0);
    let r = seed;
    const rnd = () => ((r = (r * 9301 + 49297) % 233280) / 233280);
    const pts = [];
    const n = 22, amp = 1.4;
    for (let i = 0; i <= n; i++) pts.push(`${(i / n) * 100}% ${rnd() * amp}%`);
    for (let i = 0; i <= n; i++) pts.push(`${100 - rnd() * amp * 0.6}% ${(i / n) * 100}%`);
    for (let i = n; i >= 0; i--) pts.push(`${(i / n) * 100}% ${100 - rnd() * amp}%`);
    for (let i = n; i >= 0; i--) pts.push(`${rnd() * amp * 0.6}% ${(i / n) * 100}%`);
    el.style.clipPath = `polygon(${pts.join(",")})`;
  }
  $$(".torn").forEach(rasgar);

  /* ---------- fotos: si existe el archivo en assets/img, se muestra ---------- */
  $$("[data-slot]").forEach((el) => {
    const src = "assets/img/" + el.dataset.slot;
    const img = new Image();
    img.onload = () => { el.style.backgroundImage = `url("${src}")`; el.classList.add("has-img"); };
    img.src = src;
  });

  /* ---------- menú móvil ---------- */
  const tog = $(".nav__toggle"), links = $(".nav__links");
  tog.addEventListener("click", () => {
    const o = links.classList.toggle("open");
    tog.setAttribute("aria-expanded", o);
  });
  $$(".nav__links a").forEach((a) => a.addEventListener("click", () => links.classList.remove("open")));

  /* ---------- cifras ---------- */
  const grid = $("#cifras-grid");
  CIFRAS.forEach((c) => {
    const b = document.createElement("button");
    b.className = "cifra paper torn reveal";
    b.innerHTML = `<span class="cifra__n" data-n="${c.n}" data-dec="${c.dec || 0}" data-pre="${c.pre || ""}" data-suf="${c.suf || ""}">${c.pre || ""}0${c.suf || ""}</span>
      <span class="cifra__l">${c.label}</span>
      <span class="cifra__f">${c.nota ? c.nota + "<br>" : ""}Fuente: ${fuenteHTML(c.f)}</span>`;
    b.addEventListener("click", (e) => { if (e.target.tagName !== "A") b.classList.toggle("is-open"); });
    grid.appendChild(b);
    rasgar(b);
  });
  function contar(el) {
    const n = +el.dataset.n, dec = +el.dataset.dec, t0 = performance.now(), dur = 1400;
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur), v = n * (1 - Math.pow(1 - p, 3));
      el.textContent = el.dataset.pre + fmt(v, dec) + el.dataset.suf;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  /* ---------- línea de tiempo ---------- */
  const tl = $("#timeline"), tlD = $("#tl-detail");
  function mostrarTL(i) {
    const it = TIMELINE[i];
    $$(".tl-item", tl).forEach((x) => x.classList.toggle("is-on", +x.dataset.i === i));
    tlD.innerHTML = `<p class="kicker">${it.y} · ${it.tag}</p><h4>${it.t}</h4><p>${it.d}</p><p class="fuente-mini">${badge(it.e)} Fuente: ${fuenteHTML(it.f)}</p>`;
  }
  TIMELINE.forEach((it, i) => {
    const b = document.createElement("button");
    b.className = "tl-item" + (it.key ? " key" : "");
    b.dataset.i = i; b.dataset.tag = it.tag;
    b.innerHTML = `<span class="y">${it.y}</span><span class="tt">${it.t}</span>${badge(it.e)}`;
    b.addEventListener("click", () => mostrarTL(i));
    tl.appendChild(b);
  });
  mostrarTL(1);
  $$(".tl-filtros .chip").forEach((c) => c.addEventListener("click", () => {
    $$(".tl-filtros .chip").forEach((x) => x.classList.toggle("is-on", x === c));
    const f = c.dataset.f;
    $$(".tl-item", tl).forEach((x) => x.classList.toggle("hide", f !== "todo" && x.dataset.tag !== f));
  }));

  /* ---------- anatomía del dique ---------- */
  const HS = [
    { k: "rio", x: 120, y: 270 }, { k: "humeda", x: 330, y: 255 }, { k: "corona", x: 500, y: 185 },
    { k: "seca", x: 722, y: 306 }, { k: "cuerpo", x: 500, y: 290 }, { k: "suelo", x: 160, y: 410 },
    { k: "columnas", x: 470, y: 420 }, { k: "casas", x: 560, y: 150, layer: "ocupacion" },
    { k: "escombros", x: 395, y: 225, layer: "ocupacion" }, { k: "excavacion", x: 640, y: 225, layer: "ocupacion" }
  ];
  const hsG = $("#hotspots"), info = $("#dique-info");
  HS.forEach((h, i) => {
    const g = svgEl("g", { class: "hs", tabindex: "0", role: "button", "aria-label": DIQUE_PUNTOS[h.k].t, "data-k": h.k }, hsG);
    if (h.layer) g.dataset.layer = h.layer;
    svgEl("circle", { cx: h.x, cy: h.y, r: 15 }, g);
    const t = svgEl("text", { x: h.x, y: h.y + 1 }, g); t.textContent = i + 1;
    const go = () => {
      $$(".hs", hsG).forEach((x) => x.classList.toggle("is-on", x === g));
      const p = DIQUE_PUNTOS[h.k];
      info.innerHTML = `<p class="kicker">Punto ${i + 1}</p><h4>${p.t}</h4><p>${p.d}</p><p class="fuente-mini">Fuente: ${fuenteHTML(p.f)}</p>`;
      if (h.layer) activarCapa(h.layer, true);
    };
    g.addEventListener("click", go);
    g.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
  });
  function activarCapa(layer, on) {
    $$(`.layer--${layer}`).forEach((l) => l.classList.toggle("is-on", on));
    $$(`[data-layer="${layer}"]`).forEach((b) => b.classList && b.classList.toggle("is-on", on));
  }
  $$(".toggle[data-layer]").forEach((b) => b.addEventListener("click", () => activarCapa(b.dataset.layer, !b.classList.contains("is-on"))));
  $$(".toggle[data-falla]").forEach((b) => b.addEventListener("click", () => {
    const on = !b.classList.contains("is-on");
    $$(".toggle[data-falla]").forEach((x) => x.classList.remove("is-on"));
    $$(".falla").forEach((x) => x.classList.remove("is-on"));
    if (!on) return;
    b.classList.add("is-on");
    const k = b.dataset.falla;
    $(`.falla--${k}`).classList.add("is-on");
    if (k === "desborde") activarCapa("crecida", true);
    if (k === "talud") activarCapa("ocupacion", true);
    const f = FALLAS[k];
    info.innerHTML = `<p class="kicker">Modo de falla</p><h4>${f.t}</h4><p>${f.d}</p><p class="fuente-mini">Explicación general de ingeniería de diques; aplicada al jarillón con ${fuenteHTML("diag2012")} y ${fuenteHTML("alcPlan")}.</p>`;
  }));

  /* tramos */
  const tramos = [{ t: "Jarillón de Aguablanca · 17 km", km: 17, c: "#f2c230" }, { t: "Canal Interceptor Sur · 6,7 km", km: 6.7, c: "#c9a56b" }, { t: "Río Cali · 2 km", km: 2, c: "#4c8fb0" }];
  $("#barra-tramos").innerHTML = tramos.map((t) => `<div style="flex:${t.km};background:${t.c}">${t.t}</div>`).join("");

  /* barras diagnóstico */
  const maxD = Math.max(...DIAG2012.map((d) => d.v));
  $("#barras-diag").innerHTML = DIAG2012.map((d) => `<div class="barra"><span>${d.k}</span><div class="barra__b" style="width:${(d.v / maxD) * 82}%"><span>${d.v}</span></div></div>`).join("");
  $("#barras-diag").closest(".card-box").classList.add("reveal");

  /* ---------- simulador ---------- */
  const infraG = $("#sim-infra"), brG = $("#sim-brecha"), agua = $("#sim-agua"), rango = $("#sim-rango"), lista = $("#sim-lista"), ficha = $("#sim-ficha");
  let brecha = "centro";
  INFRA.forEach((it) => {
    const g = svgEl("g", { class: "ic", tabindex: "0", role: "button", "aria-label": it.t, "data-id": it.id }, infraG);
    svgEl("circle", { cx: it.x, cy: it.y, r: 26, class: "ic__bg" }, g);
    svgEl("use", { href: "#i-" + it.icon, x: it.x - 15, y: it.y - 15, width: 30, height: 30 }, g);
    const lbl = svgEl("text", { x: it.x, y: it.y + 46, "text-anchor": "middle" }, g);
    lbl.textContent = it.t.length > 26 ? it.t.split(" ").slice(0, 3).join(" ") + "…" : it.t;
    const go = () => { ficha.innerHTML = `<h4>${it.t}</h4><p>${it.d}</p><p class="fuente-mini">${badge(it.e)} Fuente: ${fuenteHTML(it.f)}</p>`; };
    g.addEventListener("click", go);
    g.addEventListener("keydown", (e) => { if (e.key === "Enter") go(); });
  });
  function dibujarBrecha() {
    brG.innerHTML = "";
    const b = BRECHAS[brecha];
    svgEl("circle", { cx: b.x, cy: b.y, r: 20, fill: "none", stroke: "#c0392b", "stroke-width": 5, class: "brecha-mark" }, brG);
    svgEl("path", { d: `M${b.x - 12} ${b.y - 12} L${b.x + 12} ${b.y + 12} M${b.x + 12} ${b.y - 12} L${b.x - 12} ${b.y + 12}`, stroke: "#c0392b", "stroke-width": 5 }, brG);
    agua.setAttribute("cx", b.x); agua.setAttribute("cy", b.y);
    actualizarSim();
  }
  function actualizarSim() {
    const v = +rango.value, b = BRECHAS[brecha], R = v * 9;
    agua.setAttribute("r", R);
    const afect = [];
    INFRA.forEach((it) => {
      const d = Math.hypot(it.x - b.x, it.y - b.y);
      const on = d < R * 0.82;
      $(`.ic[data-id="${it.id}"]`).classList.toggle("afectado", on);
      if (on) afect.push({ it, d });
    });
    afect.sort((a, c) => a.d - c.d);
    lista.innerHTML = afect.length ? afect.map((a) => `<li>${a.it.t}</li>`).join("") : `<li style="list-style:none">Mueve la barra para ver qué queda bajo el agua.</li>`;
  }
  rango.addEventListener("input", actualizarSim);
  $$(".sim__brechas .chip").forEach((c) => c.addEventListener("click", () => {
    $$(".sim__brechas .chip").forEach((x) => x.classList.toggle("is-on", x === c));
    brecha = c.dataset.b; rango.value = 0; dibujarBrecha();
  }));
  let anim = null;
  $("#sim-play").addEventListener("click", () => {
    if (anim) { cancelAnimationFrame(anim); anim = null; }
    rango.value = 0;
    const t0 = performance.now();
    const step = (t) => {
      rango.value = Math.min(100, ((t - t0) / 5000) * 100);
      actualizarSim();
      if (+rango.value < 100) anim = requestAnimationFrame(step); else anim = null;
    };
    anim = requestAnimationFrame(step);
  });
  dibujarBrecha();

  /* ---------- gráfico de brecha ---------- */
  (function brechaChart() {
    const s = $("#brecha-svg"), W = 900, H = 380, m = { l: 60, r: 30, t: 30, b: 50 };
    const x0 = 2018, x1 = 2026.5;
    const X = (x) => m.l + ((x - x0) / (x1 - x0)) * (W - m.l - m.r);
    const Y = (p) => H - m.b - (p / 100) * (H - m.t - m.b);
    for (let p = 0; p <= 100; p += 25) {
      svgEl("line", { x1: m.l, x2: W - m.r, y1: Y(p), y2: Y(p), stroke: "#d6ccb8", "stroke-width": 1 }, s);
      const t = svgEl("text", { x: m.l - 10, y: Y(p) + 4, "text-anchor": "end", "font-size": 13, fill: "#5b5650" }, s); t.textContent = p + " %";
    }
    for (let y = 2018; y <= 2026; y += 2) {
      const t = svgEl("text", { x: X(y), y: H - m.b + 24, "text-anchor": "middle", "font-size": 13, fill: "#5b5650" }, s); t.textContent = y;
    }
    const obra = SERIE_OBRA.map((d) => ({ ...d, p: (d.km / 26.1) * 100 }));
    const reas = SERIE_REAS.map((d) => ({ ...d, p: (d.h / 8777) * 100 }));
    const linea = (arr, color, dashFirst) => {
      arr.forEach((d, i) => {
        if (!i) return;
        const a = arr[i - 1];
        svgEl("line", { x1: X(a.x), y1: Y(a.p), x2: X(d.x), y2: Y(d.p), stroke: color, "stroke-width": 5, "stroke-linecap": "round", "stroke-dasharray": dashFirst && i === 1 ? "8 8" : "" }, s);
      });
      arr.forEach((d) => {
        const g = svgEl("g", { class: "pt", tabindex: "0" }, s);
        svgEl("circle", { cx: X(d.x), cy: Y(d.p), r: 8, fill: color, stroke: "#141414", "stroke-width": 2.5 }, g);
        const tt = svgEl("title", {}, g); tt.textContent = `${d.lbl}: ${fmt(d.p, 1)} %`;
        g.addEventListener("click", () => { $("#brecha-src").innerHTML = `<strong>${d.lbl} · ${fmt(d.p, 1)} %</strong> (${d.km ? fmt(d.km, 1) + " de 26,1 km" : fmt(d.h) + " de 8.777 hogares"}) — Fuente: ${fuenteHTML(d.f)}`; });
      });
    };
    // banda de brecha (feb 2026)
    const ob = obra[obra.length - 1], rb = reas[reas.length - 1];
    svgEl("line", { x1: X(ob.x) + 18, x2: X(ob.x) + 18, y1: Y(ob.p), y2: Y(rb.p), stroke: "#c0392b", "stroke-width": 3, "stroke-dasharray": "4 4" }, s);
    const gt = svgEl("text", { x: X(ob.x) - 6, y: (Y(ob.p) + Y(rb.p)) / 2 + 5, "text-anchor": "end", "font-size": 22, "font-weight": 900, fill: "#c0392b", "font-family": "Shadows Into Light" }, s);
    gt.textContent = `brecha: ${fmt(ob.p - rb.p, 0)} puntos`;
    linea(obra, "#f2c230", true);
    linea(reas, "#2f6f8f", false);
    const l1 = svgEl("text", { x: X(2021.4), y: Y(20), "font-size": 16, "font-weight": 800, fill: "#141414" }, s); l1.textContent = "■ Obra reforzada (km)";
    l1.setAttribute("style", "fill:#b58c00");
    const l2 = svgEl("text", { x: X(2021.4), y: Y(11), "font-size": 16, "font-weight": 800, fill: "#2f6f8f" }, s); l2.textContent = "■ Hogares reasentados";
    const p = document.createElement("p"); p.id = "brecha-src"; p.className = "fuente-mini"; p.textContent = "Toca un punto del gráfico.";
    s.after(p);
  })();

  /* ---------- ciclo ---------- */
  (function ciclo() {
    const s = $("#ciclo-svg"), cx = 260, cy = 260, R = 180, txt = $("#ciclo-texto");
    svgEl("circle", { cx, cy, r: R, fill: "none", stroke: "#141414", "stroke-width": 3, "stroke-dasharray": "10 8" }, s);
    const c = svgEl("text", { x: cx, y: cy - 6, "text-anchor": "middle", "font-family": "Shadows Into Light", "font-size": 30 }, s); c.textContent = "el ciclo";
    const c2 = svgEl("text", { x: cx, y: cy + 26, "text-anchor": "middle", "font-family": "Montserrat", "font-weight": 900, "font-size": 18 }, s); c2.textContent = "vuelve a empezar ↻";
    const show = (i) => {
      $$(".paso", s).forEach((p) => p.classList.toggle("is-on", +p.dataset.i === i));
      txt.innerHTML = `<h4>${CICLO[i].t}</h4><p>${CICLO[i].d}</p><p class="fuente-mini">${i === 1 ? "Fuente: " + fuenteHTML("baudo") : i === 3 ? "Fuente: " + fuenteHTML("entrevista") : "Reconstrucción del equipo a partir de la reportería (en verificación)."}</p>`;
    };
    CICLO.forEach((p, i) => {
      const a = -Math.PI / 2 + (i / CICLO.length) * Math.PI * 2;
      const x = cx + R * Math.cos(a), y = cy + R * Math.sin(a);
      const g = svgEl("g", { class: "paso", "data-i": i, tabindex: "0", role: "button" }, s);
      svgEl("circle", { cx: x, cy: y, r: 46 }, g);
      const t = svgEl("text", { x, y: y - 4 }, g); t.textContent = i + 1;
      const t2 = svgEl("text", { x, y: y + 16, "font-size": 12 }, g); t2.textContent = ["La salida", "Afuera", "El regreso", "Escombros", "Desalojo"][i];
      g.addEventListener("click", () => show(i));
      g.addEventListener("keydown", (e) => { if (e.key === "Enter") show(i); });
    });
    show(0);
  })();

  /* ---------- archivo ---------- */
  $("#archivo-lista").innerHTML = ARCHIVO_ORDEN.map((k) => `<li>${fuenteHTML(k)}</li>`).join("");

  /* ---------- aparición al hacer scroll ---------- */
  $$(".cap__text, .quote, .card-box, .testimonio").forEach((e) => e.classList.add("reveal"));
  const io = new IntersectionObserver((ents) => ents.forEach((en) => {
    if (!en.isIntersecting) return;
    en.target.classList.add("in-view");
    const n = en.target.querySelector("[data-n]");
    if (n && !n.dataset.done) { n.dataset.done = 1; contar(n); }
    io.unobserve(en.target);
  }), { threshold: 0.15 });
  $$(".reveal").forEach((e) => io.observe(e));
})();
