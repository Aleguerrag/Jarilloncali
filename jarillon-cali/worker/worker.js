/* =========================================================
   Worker de Cloudflare para el modo IA del chatbot (opcional).
   Recibe { pregunta, contexto[] } desde el sitio y llama a la API de Anthropic.
   La clave de API vive como secreto del Worker, nunca en el sitio.

   Variables:
     ANTHROPIC_API_KEY  (secreto)  → wrangler secret put ANTHROPIC_API_KEY
     ALLOWED_ORIGIN     (texto)    → https://SU-USUARIO.github.io
     MODEL              (texto)    → opcional, por defecto "claude-haiku-5-5"
   ========================================================= */
const SYSTEM = `Eres «Pregúntale al Jarillón», asistente del reportaje transmedia del curso Periodismo e IA de la Universidad Autónoma de Occidente sobre el jarillón del río Cauca en Cali.
Reglas:
1. Responde SOLO con la información de las FICHAS que recibes. Si no está ahí, responde: «No tengo información verificada sobre eso en este reportaje» y sugiere a qué entidad preguntar.
2. No inventes cifras, fechas, nombres ni citas. Si dos fichas dan cifras distintas, muestra ambas.
3. Nunca des datos personales ni información que identifique a fuentes anónimas.
4. Si alguien describe una emergencia, indica de inmediato llamar a la línea 123.
5. No opines sobre funcionarios ni partidos. Lenguaje claro, español, máximo 120 palabras.`;

export default {
  async fetch(request, env) {
    const origin = env.ALLOWED_ORIGIN || "*";
    const cors = {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (request.method !== "POST") return new Response("Método no permitido", { status: 405, headers: cors });

    let body;
    try { body = await request.json(); } catch { return new Response("JSON inválido", { status: 400, headers: cors }); }
    const pregunta = String(body.pregunta || "").slice(0, 300);
    const contexto = Array.isArray(body.contexto) ? body.contexto.slice(0, 5) : [];
    if (!pregunta) return new Response("Falta la pregunta", { status: 400, headers: cors });

    const fichas = contexto.map((c, i) => `FICHA ${i + 1} (fuente: ${c.fuente}): ${String(c.texto).slice(0, 1200)}`).join("\n\n") || "(sin fichas relevantes)";

    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json"
      },
      body: JSON.stringify({
        model: env.MODEL || "claude-haiku-5-5",
        max_tokens: 400,
        system: SYSTEM,
        messages: [{ role: "user", content: `${fichas}\n\nPREGUNTA DEL USUARIO: ${pregunta}` }]
      })
    });
    if (!r.ok) return new Response(JSON.stringify({ error: "modelo no disponible" }), { status: 502, headers: { ...cors, "Content-Type": "application/json" } });
    const j = await r.json();
    const respuesta = (j.content || []).map((b) => b.text || "").join("").trim();
    return new Response(JSON.stringify({ respuesta }), { headers: { ...cors, "Content-Type": "application/json" } });
  }
};
