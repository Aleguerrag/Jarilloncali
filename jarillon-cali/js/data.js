/* =========================================================
   DATOS DEL REPORTAJE — Jarillón de Cali
   Todo dato lleva fuente. Estados: "verificado", "con-limites", "por-verificar".
   Para actualizar el sitio, editen SOLO este archivo.
   ========================================================= */

const FUENTES = {
  alc2022: { t: "Alcaldía de Cali — «23 de los 26,1 kilómetros del jarillón ya están reforzados» (dic. 2022)", u: "https://www.cali.gov.co/publicaciones/173344/23-de-los-261-kilometros-del-jarillon-ya-estan-reforzados/" },
  alcCop16: { t: "Alcaldía de Cali — Plan Jarillón en la COP16 (16 abr. 2024)", u: "https://www.cali.gov.co/publicaciones/181122/el-plan-jarillon-de-cali-uno-de-los-esfuerzos-de-mitigacion-de-cambio-climatico-que-seran-presentados-en-la-cop16/" },
  alcPlan: { t: "Alcaldía de Cali, Gestión del Riesgo — Plan Jarillón de Cali", u: "https://www.cali.gov.co/gestiondelriesgo/publicaciones/167270/plan-jarillon-de-cali/" },
  alcTramo6: { t: "Alcaldía de Cali — Inició reforzamiento en Floralia, Comfenalco y Río Cali (ago. 2022)", u: "https://www.cali.gov.co/publicaciones/170550/inicio-reforzamiento-del-jarillon-en-floralia-comfenalco-y-rio-cali/" },
  diag2012: { t: "Alcaldía de Cali, UGAP-PJAOC — Jarillón o dique de Aguablanca: diagnóstico y plan de acción (7 dic. 2012)", u: "https://web1.cali.gov.co/comunicaciones/publicaciones/descargar.php?id=33115" },
  holanda: { t: "Alcaldía de Cali — Diagnóstico de la misión holandesa y la Corporación OSSO (2012)", u: "https://www.cali.gov.co/alcaldenlinea/publicaciones/48225/diagnstico-de-la-misin-holandesa-y-la-corporacin-osso-en-convenio-entre-la-alcalda-y-la-nacin/" },
  holanda2: { t: "Alcaldía de Cali — Misión holandesa y sitios críticos del jarillón (2012)", u: "https://www.cali.gov.co/publicaciones/48126/la-alcalda-trabaja-con-la-misin-holandesa-en-estrategias-por-el-jarilln/" },
  cvcCrecientes: { t: "CVC–Univalle — Análisis hidráulico de las crecientes históricas del río Cauca (Anillo Aguablanca, 1958)", u: "https://ecopedia.cvc.gov.co/sites/default/files/archivosAdjuntos/corc-cvc-uv_analisis_crecientes_historicas.pdf" },
  cvcOsso2015: { t: "CVC y OSSO-Univalle — Estudios de riesgo por inundaciones, Plan Jarillón (feb. 2015)", u: "https://ecopedia.cvc.gov.co/sites/default/files/archivosAdjuntos/195_informe_final_plan_jarillon_de_cali.pdf" },
  osso2012: { t: "Corporación OSSO — Informe de avance N° 2, Fondo Adaptación (oct. 2012)", u: "https://ecopedia.cvc.gov.co/sites/default/files/archivosAdjuntos/174_informe_de_avance_ndeg2_contrato_celebrado_entre_fondo_de_adaptacion_y_corporacion_osso_-_anillo_de_proteccion_rio_cauca.pdf" },
  tiempoTramos: { t: "El Tiempo — Impulso al reforzamiento del tercer tramo del jarillón", u: "https://www.eltiempo.com/colombia/cali/impulso-al-reforzamiento-de-tercer-tramo-de-jarillon-del-rio-cauca-173954" },
  tiempo2024: { t: "El Tiempo — La realidad de dos proyectos que llevan una década en veremos (20 may. 2024)", u: "https://www.eltiempo.com/colombia/cali/la-realidad-de-dos-proyectos-que-llevan-una-decada-en-veremos-uno-contra-inundaciones-y-el-otro-para-renovar-el-centro-de-cali-3343995" },
  occRefuerzo: { t: "Occidente — «El 25 % del jarillón está reforzado» (nota de archivo)", u: "https://occidente.co/cali/el-25-del-jarillon-esta-reforzado/" },
  occAgua: { t: "Occidente — Avance del Plan Jarillón y PTAP Puerto Mallarino (nota de archivo)", u: "https://occidente.co/?p=117534" },
  pais2018: { t: "El País — El jarillón puede soportar el invierno, pero sigue amenazado (2018, act. 2023)", u: "https://www.elpais.com.co/cali/el-jarillon-del-rio-cauca-puede-soportar-el-invierno-pero-sigue-amenazado.html" },
  pais2024: { t: "El País — Están reinvadiendo el jarillón del río Cauca (16 ene. 2024)", u: "https://www.elpais.com.co/cali/estan-reinvadiendo-el-jarillon-del-rio-cauca-el-cual-protege-a-cali-de-inundaciones-1628.html" },
  pais2025: { t: "El País — Más de 3000 familias todavía habitan el jarillón (5 jul. 2025)", u: "https://www.elpais.com.co/cali/mas-de-3000-familias-todavia-habitan-el-jarillon-del-rio-cauca-cuando-se-reubicaran-0529.html" },
  pais2026: { t: "El País — El Plan Jarillón está a 400 metros de ser terminado (23 feb. 2026)", u: "https://www.elpais.com.co/cali/el-plan-jarillon-del-rio-cauca-esta-a-400-metros-de-ser-terminado-que-falta-para-su-culminacion-2314.html" },
  paisVia: { t: "El País — El jarillón del río Cauca no es una vía (mar. 2026)", u: "https://www.elpais.com.co/cali/el-jarillon-del-rio-cauca-no-es-una-via-se-limitara-el-acceso-y-transito-de-vehiculos-sobre-su-estructura-1335.html" },
  paisSismo: { t: "El País — El jarillón se mantiene íntegro tras el sismo del 10 de agosto (ago. 2026)", u: "https://www.elpais.com.co/cali/jarillon-del-rio-cauca-en-cali-se-mantiene-integro-tras-el-sismo-del-10-de-agosto-1626.html" },
  occSismo: { t: "Occidente — El jarillón tras el sismo: CVC confirma su estabilidad (ago. 2026)", u: "https://occidente.co/cali/el-jarillon-del-rio-cauca-tras-el-sismo-cvc-confirma-su-estabilidad/" },
  baudo: { t: "Baudó Agencia Pública — Una y mil vidas sobre el jarillón del río Cauca (oct. 2021)", u: "https://baudoap.com/unaymilvidas/" },
  uribe2012: { t: "Uribe Castro y Holguín — El papel del Estado frente al manejo del dique del río Cauca en Cali, Eleuthera (2012)", u: "https://revistasojs.ucaldas.edu.co/index.php/eleuthera/article/download/5098/4637/8519" },
  uribe2022: { t: "Hernando Uribe Castro — Conocimiento técnico-científico y «destrucción creativa» del valle del río Cauca, Historia y Espacio (2022)", u: "https://historiayespacio.univalle.edu.co/index.php/historia_y_espacio/article/download/12113/14924/44827" },
  ruiz2023: { t: "Ruiz Cucalón y Mosquera Torres — La planificación de reasentamientos en Cali, Programa Editorial Univalle (2023)", u: "https://doi.org/10.25100/peu.845" },
  corte2019: { t: "Corte Constitucional — Sentencia T-547 de 2019", u: "https://www.corteconstitucional.gov.co/relatoria/2019/t-547-19.htm" },
  entrevista: { t: "Entrevista del equipo con la gerencia jurídica del Plan Jarillón (oct. 2026)", u: "" },
  cvcCuentos: { t: "CVC — periódico Cuentos Verdes, octubre de 2014 (historia de la CVC y el proyecto Aguablanca)", u: "https://tramitesdga.cvc.gov.co/sites/default/files/Comunicaciones/Periodico_Cuentos_Verdes/Periodico_Cuentos_Verdes_2014/Periodico-Cuentos-octubre-2014.pdf" },
  reportaje: { t: "Equipo del reportaje, Periodismo e IA, UAO (2026)", u: "" },
  equipo: { t: "Cálculo propio del equipo con cifras de las fuentes citadas", u: "" }
};

/* ---------- CIFRAS CLAVE ---------- */
const CIFRAS = [
  { n: 26.1, dec: 1, suf: " km", label: "de dique protegen el oriente de Cali", f: "tiempoTramos", nota: "17 km del jarillón de Aguablanca, 2 km del río Cali y 6,7 km del Canal Interceptor Sur." },
  { n: 900000, pre: "+", label: "personas del oriente dependen de él", f: "alcTramo6", nota: "Cifra de la Alcaldía y el Fondo Adaptación (2022). En verificación con Gestión del Riesgo." },
  { n: 80, suf: " %", label: "del agua potable sale de Puerto Mallarino, junto al dique", f: "occAgua", nota: "Dato de archivo: en actualización con EMCALI." },
  { n: 12293, suf: " ha", label: "se inundarían en 4 municipios si el dique falla (creciente de 100 años)", f: "cvcOsso2015", nota: "Cali, Palmira, Candelaria y Yumbo." },
  { n: 8777, label: "hogares censados sobre el dique tras la ola invernal 2010-2011", f: "pais2026", nota: "" },
  { n: 3132, label: "hogares censados seguían en el dique (feb. 2026)", f: "pais2026", nota: "8.777 − 5.645 = 3.132." },
  { n: 18, pre: "≈", suf: " años", label: "tardaría el reasentamiento al ritmo actual", f: "equipo", nota: "349 hogares en 2 años → 174,5/año; 3.132 ÷ 174,5 ≈ 17,9. Proyección ilustrativa." },
  { n: 10, suf: " cm", label: "le faltaron al río para sobrepasar el jarillón en 2010-2011", f: "alcPlan", nota: "" }
];

/* ---------- LÍNEA DE TIEMPO (Insight 1) ---------- */
const TIMELINE = [
  { y: "1954", t: "Nace la CVC", d: "Se crea la Corporación Autónoma Regional del Valle del Cauca, inspirada en el modelo del valle del Tennessee, para manejar el agua, la energía y la tierra del valle.", f: "cvcCuentos", e: "con-limites", tag: "Institución" },
  { y: "1958", t: "El Anillo de Aguablanca", d: "La CVC construye el dique marginal del río Cauca dentro del proyecto Aguablanca: proteger y drenar tierras planas inundables, hasta entonces potreros, humedales y madreviejas. El diagnóstico de 2012 lo describe como una buena estructura «diseñada y construida para las condiciones presentes en 1958».", f: "cvcCrecientes", e: "con-limites", tag: "Obra", key: true },
  { y: "1960s-70s", t: "La tierra seca se vuelve ciudad", d: "Desecados los humedales, el suelo agrícola del oriente se vuelve codiciado. Llega la urbanización formal, el loteo pirata y, después, familias migrantes —buena parte del Pacífico— que encuentran en el propio dique un lugar para vivir.", f: "uribe2012", e: "por-verificar", tag: "Ciudad", key: true },
  { y: "2010-2011", t: "La Niña pone a prueba el muro", d: "El río Cauca estuvo a 10 cm de sobrepasar la altura del jarillón. Tras la emergencia se censan 8.777 hogares viviendo sobre el dique.", f: "alcPlan", e: "verificado", tag: "Riesgo", key: true },
  { y: "2012", t: "Diagnóstico holandés", d: "Ingenieros holandeses y la Corporación OSSO identifican puntos críticos en 3,5 de los 17 km del dique de Aguablanca, cerca de la PTAR Cañaveralejo, la planta de Puerto Mallarino, Alfonso López y Navarro. Inventarian 118 rampas, 18 puntos de erosión y 12 de escombros. Nace el Plan Jarillón con un convenio de $1,3 billones.", f: "diag2012", e: "verificado", tag: "Riesgo" },
  { y: "2015", t: "El mapa del desastre posible", d: "El estudio CVC–OSSO modela una creciente de 100 años: 12.293 hectáreas inundadas en Cali, Palmira, Candelaria y Yumbo.", f: "cvcOsso2015", e: "verificado", tag: "Riesgo" },
  { y: "2019", t: "La Corte interviene", d: "Las sentencias T-502 y T-547 de 2019 abordan los derechos de familias del jarillón en los procesos de reasentamiento.", f: "corte2019", e: "por-verificar", tag: "Derechos" },
  { y: "2022", t: "23 de 26,1 km reforzados", d: "La Alcaldía reporta 23 km con reforzamiento. El dique mide unos 3,5 m de alto y 60 m de ancho, hasta 100 m en algunos sectores.", f: "alc2022", e: "verificado", tag: "Obra" },
  { y: "2024", t: "Reinvasión de tramos reforzados", d: "Se reporta la reocupación de tramos ya intervenidos. La Contraloría advierte que el componente social no se ha cumplido después de 10 años.", f: "pais2024", e: "con-limites", tag: "Ocupación" },
  { y: "2026 · feb", t: "La obra casi lista; la gente no", d: "Obra al 97 %. De 8.777 hogares censados se han reasentado 5.645; quedan 3.132. En dos años se reasentaron 349.", f: "pais2026", e: "con-limites", tag: "Obra", key: true },
  { y: "2026 · ago", t: "El sismo", d: "Sismo de magnitud 7,4 con epicentro en Chocó. La CVC y la Javeriana inspeccionan el dique: íntegro, con una fisura en Paso del Comercio.", f: "paisSismo", e: "con-limites", tag: "Riesgo" },
  { y: "2026 · nov", t: "Arriendo entre escombros", d: "Familias desalojadas regresan al dique y arriendan casas vecinas pendientes de demolición. Hallazgo en reportería.", f: "reportaje", e: "por-verificar", tag: "Ocupación", key: true }
];

/* ---------- ANATOMÍA DEL DIQUE ---------- */
const DIQUE_PUNTOS = {
  corona: { t: "Corona", d: "La parte superior del dique. Es la cota que el agua no debe superar. En 2010-2011 el río quedó a 10 cm de rebasarla. Allí se instalaron viviendas y hoy circulan motos y carros, aunque el jarillón «no es una vía».", f: "alcPlan" },
  humeda: { t: "Cara húmeda", d: "El talud que mira al río y recibe su empuje. En 2024 se encontraron 4 puntos con escombros en esta cara: peso muerto y material suelto donde el agua golpea.", f: "pais2024" },
  seca: { t: "Cara seca", d: "El talud que mira a la ciudad. Si el agua se filtra a través del dique, aquí aparecen las primeras señales: humedad, surgencias, hundimientos.", f: "diag2012" },
  cuerpo: { t: "Cuerpo del dique (terraplén)", d: "Relleno de tierra compactada de unos 3,5 m de alto y 60 m de ancho, que llega a 100 m en algunos sectores. Fue diseñado para la Cali de 1958, cuando el oriente no estaba urbanizado.", f: "alc2022" },
  suelo: { t: "Suelo de fundación", d: "Los suelos del oriente son aluviales y susceptibles a la licuefacción: con un sismo fuerte, en suelos saturados, pueden perder resistencia y comportarse como un líquido.", f: "alcPlan" },
  columnas: { t: "Reforzamiento estático", d: "Columnas de hasta 9 m de profundidad para que, ante un sismo, el suelo no se licúe y el jarillón no colapse. Se complementa con un reforzamiento «dinámico» frente al empuje lateral del agua.", f: "occRefuerzo" },
  casas: { t: "Viviendas sobre el dique", d: "8.777 hogares censados en 2010-2011. En el tramo de Puerto Mallarino, cerca del 30 % del área del dique estaba ocupada en 2012. Cada vivienda implica cimientos, pozos y excavaciones dentro de la estructura.", f: "diag2012" },
  escombros: { t: "Escombros", d: "Cuando se demuele una casa y los escombros se quedan, el dique carga peso muerto y material suelto. En 2024: 9 puntos con escombros (4 en la cara húmeda y 5 en la corona).", f: "pais2024" },
  excavacion: { t: "Excavaciones y rampas", d: "El diagnóstico de 2012 contó 118 rampas, 12 cruces de tubería y 15 cruces de cauces en el dique de Aguablanca. Cada corte reduce la sección que resiste al río.", f: "diag2012" },
  rio: { t: "Río Cauca", d: "Nivel normal frente a creciente: el diseño revisado en 2012 trabajó con una creciente de 500 años más 0,5 m de borde libre como referencia.", f: "diag2012" }
};

const FALLAS = {
  desborde: { t: "Desbordamiento", d: "El río supera la corona y el agua erosiona la cara seca desde arriba hasta abrir una brecha. Es lo que casi ocurrió en 2010-2011." },
  filtracion: { t: "Filtración y tubificación", d: "El agua encuentra un camino por debajo o a través del dique —raíces, pozos, tuberías, excavaciones— y arrastra partículas hasta formar un «tubo» que lo vacía por dentro." },
  talud: { t: "Deslizamiento del talud", d: "Un talud saturado, cargado de escombros o cortado por rampas pierde estabilidad y se desliza. El dique se adelgaza justo donde más empuja el agua." },
  licuefaccion: { t: "Licuefacción por sismo", d: "Si coinciden lluvias y sismo, el suelo saturado del oriente puede perder resistencia: el terraplén se asienta o se agrieta. Por eso se instalaron columnas de reforzamiento." }
};

const DIAG2012 = [
  { k: "Rampas", v: 118 }, { k: "Erosión", v: 18 }, { k: "Cruces de cauce", v: 15 },
  { k: "Cruces de tubería", v: 12 }, { k: "Escombros", v: 12 }, { k: "Problemas geotécnicos", v: 11 },
  { k: "Puentes", v: 10 }, { k: "Menor distancia al río", v: 7 }
];

/* ---------- SIMULADOR (esquema ilustrativo) ---------- */
const INFRA = [
  { id: "ptap", x: 735, y: 150, icon: "agua", t: "PTAP Puerto Mallarino", d: "Planta de agua potable junto al río. Se ha reportado que provee cerca del 80 % del agua de Cali (dato en actualización con EMCALI).", f: "occAgua", e: "con-limites" },
  { id: "ptar", x: 700, y: 360, icon: "ptar", t: "PTAR Cañaveralejo", d: "Planta de tratamiento de aguas residuales. La misión holandesa de 2012 ubicó puntos críticos del dique en sus inmediaciones.", f: "holanda2", e: "con-limites" },
  { id: "bombeo", x: 640, y: 80, icon: "bomba", t: "Estación de bombeo Paso del Comercio", d: "Evacúa aguas lluvias del oriente hacia el río. Tras el sismo de agosto de 2026 se halló una fisura en el dique en este sector.", f: "paisSismo", e: "con-limites" },
  { id: "lagunas", x: 520, y: 250, icon: "laguna", t: "Lagunas de Charco Azul y El Pondaje", d: "Regulan las aguas lluvias del oriente antes de evacuarlas al río. Hoy concentran cerca de 1.000 hogares en reocupación.", f: "pais2026", e: "con-limites" },
  { id: "barrios", x: 380, y: 300, icon: "casa", t: "Barrios del oriente", d: "Más de 900.000 personas del oriente dependen del dique. Una evaluación de 2018 habló de 79 barrios en 10 comunas (dato por actualizar).", f: "alcTramo6", e: "por-verificar" },
  { id: "mio", x: 300, y: 170, icon: "bus", t: "Sistema MIO", d: "Infraestructura de transporte en el oriente. Qué patios, terminales o troncales quedan en zona inundable está en verificación con Metrocali.", f: "reportaje", e: "por-verificar" },
  { id: "navarro", x: 560, y: 470, icon: "casa", t: "Navarro y Canal Interceptor Sur", d: "Extremo sur del sistema: 6,7 km de dique marginal del Canal Interceptor Sur. Faltan 60 m que dependen del traslado de la Estación de Transferencia de la carrera 50.", f: "pais2026", e: "con-limites" }
];
const BRECHAS = {
  norte: { x: 690, y: 95, t: "Paso del Comercio (norte)" },
  centro: { x: 760, y: 240, t: "Puerto Mallarino (centro)" },
  sur: { x: 700, y: 440, t: "Navarro (sur)" }
};

/* ---------- BRECHA OBRA vs. REASENTAMIENTO ---------- */
/* Porcentajes calculados sobre base fija: 26,1 km y 8.777 hogares. */
const SERIE_OBRA = [
  { x: 2018.8, km: 7.5, f: "pais2018", lbl: "oct 2018" },
  { x: 2022.95, km: 23.0, f: "alc2022", lbl: "dic 2022" },
  { x: 2024.3, km: 25.2, f: "alcCop16", lbl: "abr 2024" },
  { x: 2026.15, km: 25.3, f: "pais2026", lbl: "feb 2026" }
];
const SERIE_REAS = [
  { x: 2024.3, h: 5296, f: "alcCop16", lbl: "abr 2024" },
  { x: 2025.5, h: 5445, f: "pais2025", lbl: "jul 2025" },
  { x: 2026.15, h: 5645, f: "pais2026", lbl: "feb 2026" }
];

/* ---------- CICLO DEL ARRIENDO ENTRE ESCOMBROS (Insight 5) ---------- */
const CICLO = [
  { t: "1 · La salida", d: "La familia censada sale del dique: vivienda, carta cheque, subsidio de relocalización o subsidio de arriendo. A veces es un acuerdo; a veces, un desalojo." },
  { t: "2 · El arriendo afuera", d: "Con subsidio de arriendo, la familia se va a otro barrio. El costo, la distancia del trabajo y la pérdida de la unidad productiva hacen difícil sostenerse. Baudó documentó que la mitad de las unidades productivas desaparece al reasentar." },
  { t: "3 · El regreso", d: "Vuelven al dique. No a su casa —ya marcada o demolida— sino a una vivienda vecina, todavía en pie, pendiente de demolición. Alguien la arrienda." },
  { t: "4 · Vivir entre escombros", d: "Convivencia con ruinas, sin garantías, sin contrato y sin derecho a reasentamiento: quien llega después del censo 2010-2011 «no puede ser incluido» en el Plan." },
  { t: "5 · El próximo desalojo", d: "Llega el operativo, se demuele la casa arrendada y la familia busca la siguiente. El ciclo vuelve a empezar." }
];

/* ---------- ARCHIVO ---------- */
const ARCHIVO_ORDEN = ["cvcCuentos", "cvcOsso2015", "osso2012", "diag2012", "holanda", "cvcCrecientes", "alcPlan", "alc2022", "alcCop16", "alcTramo6", "tiempoTramos", "tiempo2024", "pais2018", "pais2024", "pais2025", "pais2026", "paisVia", "paisSismo", "occSismo", "occRefuerzo", "occAgua", "baudo", "uribe2012", "uribe2022", "ruiz2023", "corte2019"];
