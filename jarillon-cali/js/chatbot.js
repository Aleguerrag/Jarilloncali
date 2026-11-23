/* =========================================================
   \"Pregúntale al Jarillón\" — chatbot del reportaje
   Modo 1 (por defecto, sin servidor): búsqueda semántica ligera (BM25) sobre KB.
   Modo 2 (opcional): RAG con modelo de lenguaje vía el Worker de /worker,
           si CONFIG.chatEndpoint tiene una URL. Las fichas recuperadas se envían
           como contexto y el modelo solo puede responder con ellas.
   ========================================================= */
(function () {
  "use strict";
  const log = document.getElementById("chat-log");
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  const sug = document.getElementById("chat-sug");

  /* ---------- normalización ---------- */
  const STOP = new Set("a al algo como con cual cuales cuando de del el ella en es esa ese eso esta este esto fue ha hay la las le lo los mas me mi mis muy no o para pero por que quien se si sin sobre su sus te tu un una uno y ya yo son ser estan esta hacer hace puede pueden cuanto cuanta cuantos cuantas donde dime cuentame saber quiero hizo hace sabes favor puedes podrias".split(" "));
  const SIN = { represa: "dique", muro: "dique", barrera: "dique", jarillon: "dique", rio: "rio", rompe: "ruptura", rompiera: "ruptura", revienta: "ruptura", falla: "ruptura", colapsa: "ruptura", reubicadas: "reasentadas", reubicados: "reasentadas", reasentados: "reasentadas", familias: "hogares", hogar: "hogares", arrienda: "arriendo", arrendar: "arriendo", alquilan: "arriendo", alquiler: "arriendo", temblor: "sismo", terremoto: "sismo", plata: "presupuesto", costo: "presupuesto", cuesta: "presupuesto" };
  const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9ñ\s]/g, " ").replace(/\s+/g, " ").trim();
  const stem = (w) => { if (w.length > 5) w = w.replace(/(aciones|acion|amiento|mientos|mente|idades|idad|ados|adas|ado|ada|es|s)$/, ""); return w.length > 6 ? w.slice(0, 6) : w; };
  const toks = (s) => norm(s).split(" ").filter((w) => w && !STOP.has(w)).map((w) => stem(SIN[w] || w));

  /* ---------- índice BM25 ---------- */
  const docs = KB.map((d) => toks([d.q.join(" "), d.k.join(" "), d.k.join(" "), d.a].join(" ")));
  const N = docs.length, avg = docs.reduce((a, d) => a + d.length, 0) / N;
  const df = {};
  docs.forEach((d) => new Set(d).forEach((w) => (df[w] = (df[w] || 0) + 1)));
  const idf = (w) => Math.log(1 + (N - (df[w] || 0) + 0.5) / ((df[w] || 0) + 0.5));
  function buscar(q, k = 3) {
    const qt = toks(q), qn = norm(q);
    return KB.map((d, i) => {
      let s = 0;
      const tf = {};
      docs[i].forEach((w) => (tf[w] = (tf[w] || 0) + 1));
      qt.forEach((w) => {
        if (!tf[w]) return;
        s += idf(w) * ((tf[w] * 2.2) / (tf[w] + 1.2 * (0.25 + 0.75 * docs[i].length / avg)));
      });
      d.k.forEach((kw) => { if (kw.includes(" ") && qn.includes(norm(kw))) s += 2.5; });
      return { d, s };
    }).sort((a, b) => b.s - a.s).slice(0, k);
  }

  /* ---------- guardas ---------- */
  function guardia(q) {
    const qn = norm(q);
    for (const key of ["emergencia", "personal", "prediccion", "opinion"]) {
      if (GUARD[key].k.some((kw) => qn.includes(norm(kw)))) return GUARD[key].a;
    }
    return null;
  }

  /* ---------- UI ---------- */
  const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  function burbuja(html, who) {
    const d = document.createElement("div");
    d.className = "msg msg--" + who;
    d.innerHTML = (who === "bot" ? '<span class="msg__name">El Jarillón</span>' : "") + html;
    log.appendChild(d);
    log.scrollTop = log.scrollHeight;
    return d;
  }
  const srcHTML = (key) => {
    const f = FUENTES[key];
    if (!f) return "";
    return `<span class="msg__src">📎 Fuente: ${f.u ? `<a href="${f.u}" target="_blank" rel="noopener">${esc(f.t)}</a>` : esc(f.t)}</span>`;
  };
  const NO_SE = "No tengo información verificada sobre eso en este reportaje. Prueba preguntando por la historia del dique, qué pasaría si se rompe, el agua, el reasentamiento o el alquiler entre escombros. Para trámites o casos particulares, la entidad indicada es el Plan Jarillón de la Alcaldía de Cali.";

  async function responder(q) {
    burbuja(esc(q), "user");
    const typing = burbuja('<span class="typing"><span></span><span></span><span></span></span>', "bot");
    await new Promise((r) => setTimeout(r, 450));

    const g = guardia(q);
    if (g) { typing.innerHTML = '<span class="msg__name">El Jarillón</span>' + esc(g); return; }

    const res = buscar(q, 4);
    const top = res[0];

    // Modo IA (opcional)
    if (window.CONFIG && CONFIG.chatEndpoint) {
      try {
        const ctx = res.filter((r) => r.s > 0).map((r) => ({ texto: r.d.a, fuente: FUENTES[r.d.f] ? FUENTES[r.d.f].t : "" }));
        const r = await fetch(CONFIG.chatEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ pregunta: q, contexto: ctx }) });
        if (!r.ok) throw new Error(r.status);
        const j = await r.json();
        typing.innerHTML = '<span class="msg__name">El Jarillón · IA</span>' + esc(j.respuesta || NO_SE).replace(/\n/g, "<br>") + (top && top.s > 0 ? srcHTML(top.d.f) : "");
        log.scrollTop = log.scrollHeight;
        return;
      } catch (e) { console.warn("Modo IA no disponible, uso la base local.", e); }
    }

    if (!top || top.s < (CONFIG.umbral || 1.6)) {
      typing.innerHTML = '<span class="msg__name">El Jarillón</span>' + esc(NO_SE);
      return;
    }
    let html = '<span class="msg__name">El Jarillón</span>' + esc(top.d.a) + srcHTML(top.d.f);
    const rel = res.slice(1).filter((r) => r.s > top.s * 0.55 && r.s > 1.6).slice(0, 2);
    if (rel.length) html += `<span class="msg__src">También te puede interesar: ${rel.map((r) => `<button class="chip chip--mini" data-q="${esc(r.d.q[0])}">${esc(r.d.q[0])}</button>`).join(" ")}</span>`;
    typing.innerHTML = html;
    log.scrollTop = log.scrollHeight;
  }

  log.addEventListener("click", (e) => { const b = e.target.closest("[data-q]"); if (b) responder(b.dataset.q); });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) return;
    input.value = "";
    responder(q);
  });
  SUGERENCIAS.forEach((s) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "chip"; b.textContent = s;
    b.addEventListener("click", () => responder(s));
    sug.appendChild(b);
  });
  burbuja("¡Hola! Soy el asistente de este reportaje. Respondo con información verificada sobre el jarillón del río Cauca: su historia, el riesgo, el reasentamiento y la vida sobre el dique. Cada respuesta trae su fuente. ¿Qué quieres saber?", "bot");

  // exponer para pruebas
  window.__jarillonBuscar = buscar;
  window.__jarillonGuardia = guardia;
})();
