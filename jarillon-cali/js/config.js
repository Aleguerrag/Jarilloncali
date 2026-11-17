/* =========================================================
   CONFIGURACIÓN
   chatEndpoint: déjelo vacío para usar el chatbot con la base local (funciona en GitHub Pages sin servidor).
   Para activar el modo IA (modelo de lenguaje con RAG), despliegue el Worker de la carpeta /worker
   y pegue aquí su URL, por ejemplo: "https://jarillon-chat.su-usuario.workers.dev"
   NUNCA ponga una clave de API en este archivo: es público.
   ========================================================= */
window.CONFIG = {
  chatEndpoint: "",
  umbral: 1.6
};
