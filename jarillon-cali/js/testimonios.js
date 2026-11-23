/* =========================================================
   HISTORIAS DE VIDA (audio + foto)
   Cada historia aparece sola en la sección «Historias de vida» cuando se
   agrega a esta lista. Mientras esté vacía, la sección muestra solo el
   ensayo fotográfico.

   Reglas antes de publicar:
   - Consentimiento informado (voz, imagen y nombre) registrado.
   - Texto verificado palabra por palabra contra el audio.
   - Si la persona pidió reserva: sin nombre, sin rostro, sin barrio exacto
     y con la voz protegida (distorsionada) antes de subir el archivo.

   Campos:
   { nombre: "Nombre o descripción («Madre cabeza de hogar»)",
     lugar: "Sector y situación («Reasentada en Ramalí, Calimio Norte»)",
     foto: "assets/img/historia-1.jpg",     // opcional
     alt: "Descripción de la foto para lectores de pantalla",
     audio: "assets/audio/historia-1.mp3",  // opcional
     texto: "Fragmento textual del audio",
     credito: "Foto y audio: equipo del reportaje" }
   ========================================================= */
const TESTIMONIOS = [];
