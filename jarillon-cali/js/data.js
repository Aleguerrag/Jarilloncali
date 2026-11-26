/* =========================================================
   DATOS DEL REPORTAJE — Jarillón de Cali
   Todo dato lleva fuente. Estados: "verificado", "con-limites", "por-verificar".
   Para actualizar el sitio, editen SOLO este archivo (y kb.js / testimonios.js).
   Última actualización: 23 nov. 2026.
   ========================================================= */

const FUENTES = {
  /* ---------- Alcaldía de Cali ---------- */
  alcPlan: { t: "Alcaldía de Cali, Gestión del Riesgo, Plan Jarillón de Cali", u: "https://www.cali.gov.co/gestiondelriesgo/publicaciones/167270/plan-jarillon-de-cali/" },
  alc2022: { t: "Alcaldía de Cali, \"23 de los 26,1 kilómetros del jarillón ya están reforzados\" (dic. 2022)", u: "https://www.cali.gov.co/publicaciones/173344/23-de-los-261-kilometros-del-jarillon-ya-estan-reforzados/" },
  alcCop16: { t: "Alcaldía de Cali, Plan Jarillón en la COP16 (16 abr. 2024)", u: "https://www.cali.gov.co/publicaciones/181122/el-plan-jarillon-de-cali-uno-de-los-esfuerzos-de-mitigacion-de-cambio-climatico-que-seran-presentados-en-la-cop16/" },
  alcTramo6: { t: "Alcaldía de Cali, Inició reforzamiento en Floralia, Comfenalco y Río Cali (ago. 2022)", u: "https://www.cali.gov.co/publicaciones/170550/inicio-reforzamiento-del-jarillon-en-floralia-comfenalco-y-rio-cali/" },
  alcSep2025: { t: "Alcaldía de Cali, Plan Jarillón y 85 familias de Samanes del Cauca (24 sep. 2025)", u: "https://www.cali.gov.co/publicaciones/189098/plan-jarillon-de-cali-y-85-familias-de-samanes-del-cauca-buscan-acuerdos-para-dejar-atras-el-riesgo-de-inundacion/" },
  alcDic2025: { t: "Alcaldía de Cali, Un mural por la paz en El Pondaje y Charco Azul (16 dic. 2025)", u: "https://www.cali.gov.co/publicaciones/190601/un-mural-por-la-paz-arte-comunitario-que-resignifica-la-ciudadela-recreativa-el-pondaje-y-charco-azul/" },
  alcVia2026: { t: "Alcaldía de Cali, El jarillón del río Cauca no es una vía (12 mar. 2026)", u: "https://www.cali.gov.co/cultura/publicaciones/191712/el-jarillon-del-rio-cauca-no-es-una-via-se-limitara-el-acceso-y-transito-de-vehiculos-sobre-su-estructura/" },
  alcAbr2026: { t: "Alcaldía de Cali, Cinco familias del Plan Jarillón reasentadas en Palmira (21 abr. 2026)", u: "https://www.cali.gov.co/publicaciones/192240/cinco-familias-beneficiarias-del-plan-jarillon-fueron-reasentadas-en-palmira/" },
  alcLagunas2026: { t: "Alcaldía de Cali, Comparendos por residuos en la zona de protección de El Pondaje y Charco Azul (8 may. 2026)", u: "https://www.cali.gov.co/publicaciones/192493/policia-ambiental-impuso-comparendos-por-afectacion-con-residuos-en-zona-de-proteccion-de-las-lagunas-el-pondaje-y-charco-azul/" },
  alcDesbordes: { t: "Alcaldía de Cali, Recuperando el jarillón del río Cauca, recuperamos Cali (21 nov. 2024)", u: "https://www.cali.gov.co/publicaciones/183781/recuperando-el-jarillon-del-rio-cauca-recuperamos-cali/" },
  alcGuardianes: { t: "Alcaldía de Cali, Cali empodera comunidades como \"Guardianes del Jarillón\" (18 sep. 2025)", u: "https://www.cali.gov.co/publicaciones/189000/cali-empodera-comunidades-como-guardianes-del-jarillon-gobernanza-efectiva-para-proteger-el-dique-sobre-el-rio-cauca/" },
  alcRamali: { t: "Alcaldía de Cali, El jarillón se convirtió en aula abierta (Ramalí, Calimio Norte, 2026)", u: "https://www.cali.gov.co/publicaciones/192270/el-jarillon-del-rio-cauca-se-convirtio-en-un-aula-abierta-para-estudiantes-de-planeacion-territorial-de-la-universidad-de-san-buenaventura/" },
  alcEmcali80: { t: "Alcaldía de Cali, EMCALI garantiza el suministro continuo de agua potable (2026)", u: "https://www.cali.gov.co/publicaciones/194072/emcali-garantiza-el-suministro-continuo-de-agua-potable-en-cali-y-descarta-racionamientos/" },
  decreto480: { t: "Alcaldía de Cali, Decreto 4110.20.0480 de 2016: compensaciones del reasentamiento del Plan Jarillón", u: "https://normagrama.cali.gov.co/compilacion/docs/pdf/d_alcacali_0480_2016.pdf" },
  decreto608: { t: "Alcaldía de Cali, Decreto 0608 de 2025: actualiza el cálculo de las compensaciones", u: "https://normagrama.cali.gov.co/compilacion/docs/pdf/d_alcacali_0608_2025.pdf" },
  diag2012: { t: "Alcaldía de Cali, UGAP-PJAOC, Jarillón o dique de Aguablanca: diagnóstico y plan de acción (7 dic. 2012)", u: "https://web1.cali.gov.co/comunicaciones/publicaciones/descargar.php?id=33115" },
  holanda: { t: "Alcaldía de Cali, Diagnóstico de la misión holandesa y la Corporación OSSO (2012)", u: "https://www.cali.gov.co/alcaldenlinea/publicaciones/48225/diagnstico-de-la-misin-holandesa-y-la-corporacin-osso-en-convenio-entre-la-alcalda-y-la-nacin/" },
  holanda2: { t: "Alcaldía de Cali, Misión holandesa y sitios críticos del jarillón (2012)", u: "https://www.cali.gov.co/publicaciones/48126/la-alcalda-trabaja-con-la-misin-holandesa-en-estrategias-por-el-jarilln/" },

  /* ---------- CVC y estudios técnicos ---------- */
  cvcCrecientes: { t: "CVC y Univalle, Análisis hidráulico de las crecientes históricas del río Cauca (Anillo Aguablanca)", u: "https://ecopedia.cvc.gov.co/sites/default/files/archivosAdjuntos/corc-cvc-uv_analisis_crecientes_historicas.pdf" },
  cvcOsso2015: { t: "CVC y OSSO-Univalle, Estudios de riesgo por inundaciones, Plan Jarillón (feb. 2015)", u: "https://ecopedia.cvc.gov.co/sites/default/files/archivosAdjuntos/195_informe_final_plan_jarillon_de_cali.pdf" },
  osso2012: { t: "Corporación OSSO y Royal HaskoningDHV, Informe de avance N° 2, contrato con el Fondo Adaptación, escenarios de rotura del anillo de protección del río Cauca (oct. 2012)", u: "https://ecopedia.cvc.gov.co/sites/default/files/archivosAdjuntos/174_informe_de_avance_ndeg2_contrato_celebrado_entre_fondo_de_adaptacion_y_corporacion_osso_-_anillo_de_proteccion_rio_cauca.pdf" },
  cvcCuentos: { t: "CVC, periódico Cuentos Verdes, octubre de 2014 (historia de la CVC y el proyecto Aguablanca)", u: "https://tramitesdga.cvc.gov.co/sites/default/files/Comunicaciones/Periodico_Cuentos_Verdes/Periodico_Cuentos_Verdes_2014/Periodico-Cuentos-octubre-2014.pdf" },

  /* ---------- Prensa ---------- */
  tiempoTramos: { t: "El Tiempo, Impulso al reforzamiento del tercer tramo del jarillón", u: "https://www.eltiempo.com/colombia/cali/impulso-al-reforzamiento-de-tercer-tramo-de-jarillon-del-rio-cauca-173954" },
  tiempo2024: { t: "El Tiempo, La realidad de dos proyectos que llevan una década en veremos (20 may. 2024)", u: "https://www.eltiempo.com/colombia/cali/la-realidad-de-dos-proyectos-que-llevan-una-decada-en-veremos-uno-contra-inundaciones-y-el-otro-para-renovar-el-centro-de-cali-3343995" },
  occRefuerzo: { t: "Occidente, \"El 25 % del jarillón está reforzado\" (nota de archivo)", u: "https://occidente.co/cali/el-25-del-jarillon-esta-reforzado/" },
  occCVC: { t: "Occidente, Anuncian revisión del jarillón del río Cauca: director de la CVC (12 ago. 2026)", u: "https://occidente.co/cali/anuncian-revision-de-jarillon-del-rio-cauca/" },
  occEscombros: { t: "Occidente, Cali retira 99 mil toneladas de escombros tras el terremoto (sep. 2026)", u: "https://occidente.co/cali/cali-retira-99-mil-toneladas-escombros-terremoto/" },
  pais2018: { t: "El País, El jarillón puede soportar el invierno, pero sigue amenazado (2018, act. 2023)", u: "https://www.elpais.com.co/cali/el-jarillon-del-rio-cauca-puede-soportar-el-invierno-pero-sigue-amenazado.html" },
  pais2024: { t: "El País, Están reinvadiendo el jarillón del río Cauca (16 ene. 2024)", u: "https://www.elpais.com.co/cali/estan-reinvadiendo-el-jarillon-del-rio-cauca-el-cual-protege-a-cali-de-inundaciones-1628.html" },
  paisPTAP: { t: "El País, Planta de Puerto Mallarino tuvo que ser cerrada por daño en Playa Renaciente (16 dic. 2024)", u: "https://www.elpais.com.co/cali/planta-de-puerto-mallarino-tuvo-que-ser-cerrada-este-es-el-sector-que-esta-sin-agua-en-cali-1632.html" },
  pais2025: { t: "El País, Más de 3000 familias todavía habitan el jarillón (5 jul. 2025)", u: "https://www.elpais.com.co/cali/mas-de-3000-familias-todavia-habitan-el-jarillon-del-rio-cauca-cuando-se-reubicaran-0529.html" },
  pais2026: { t: "El País, El Plan Jarillón está a 400 metros de ser terminado (23 feb. 2026)", u: "https://www.elpais.com.co/cali/el-plan-jarillon-del-rio-cauca-esta-a-400-metros-de-ser-terminado-que-falta-para-su-culminacion-2314.html" },
  paisSismo: { t: "El País, El jarillón se mantiene íntegro tras el sismo del 10 de agosto (ago. 2026)", u: "https://www.elpais.com.co/amp/cali/jarillon-del-rio-cauca-en-cali-se-mantiene-integro-tras-el-sismo-del-10-de-agosto-1626.html" },
  paisVictimas: { t: "El País, Finaliza la búsqueda de personas tras el terremoto y comienza la reconstrucción (ago. 2026)", u: "https://www.elpais.com.co/cali/cali-finaliza-la-busqueda-de-personas-en-los-escombros-tras-el-terremoto-y-comienza-etapa-de-reconstruccion-2140.html" },
  repEmcali: { t: "La República, EMCALI: la planta de Puerto Mallarino abastece al 70 % de los caleños (ago. 2022)", u: "https://www.larepublica.co/empresas/emcali-invierte-5-000-millones-para-operar-con-energia-limpiar-y-potabilizar-el-agua-3430768" },
  baudo: { t: "Baudó Agencia Pública, Una y mil vidas sobre el jarillón del río Cauca (oct. 2021)", u: "https://baudoap.com/unaymilvidas/" },

  /* ---------- Academia ---------- */
  uribe2012: { t: "Uribe Castro y Holguín, El papel del Estado frente al manejo del dique del río Cauca en Cali, Eleuthera (2012)", u: "https://revistasojs.ucaldas.edu.co/index.php/eleuthera/article/download/5098/4637/8519" },
  ruiz2023: { t: "Ruiz Cucalón y Mosquera Torres, La planificación de reasentamientos en Cali, Programa Editorial Univalle (2023)", u: "https://doi.org/10.25100/peu.845" },
  rivas2019: { t: "Rivas Orobio, Borrar del mapa: el Plan Jarillón de Cali 2005-2012, Universidad del Valle (2019)", u: "https://core.ac.uk/download/511510398.pdf" },
  salazar2016: { t: "Salazar Collazos, El capital social en el reasentamiento del jarillón del río Cauca, Universidad del Valle (2016)", u: "https://bibliotecadigital.univalle.edu.co/bitstreams/ea481e60-ed05-460c-a294-cccad07b85e8/download" },
  valencia2025: { t: "Valencia Segura, Macroproyecto habitacional Plan Jarillón de Cali, FLACSO Ecuador (2025)", u: "https://repositorio.flacsoandes.edu.ec/bitstream/10469/23049/2/TFLACSO-2025KSVS.pdf" },
  ocampo2021: { t: "Ocampo-Marulanda et al., Desecación de humedales: la ciénaga de Aguablanca, Tropical Conservation Science (2021)", u: "https://doi.org/10.1177/19400829211007075" },
  figueroa2016: { t: "Figueroa Gómez, El río, la inundación y la \"ola invernal\" en Colombia 2010-2012, Encrucijadas (2016)", u: "https://recyt.fecyt.es/index.php/encrucijadas/article/view/79013" },
  tobin1995: { t: "Tobin, The levee love affair: a stormy relationship?, Water Resources Bulletin (1995)", u: "https://doi.org/10.1111/j.1752-1688.1995.tb04025.x" },
  corte2019: { t: "Corte Constitucional, Sentencia T-547 de 2019", u: "https://www.corteconstitucional.gov.co/relatoria/2019/t-547-19.htm" },

  /* ---------- Reportería propia ---------- */
  entOrtega: { t: "Entrevista del equipo con Jhony Ortega, coordinador del Proyecto Plan Jarillón (2026)", u: "" },
  entSocial: { t: "Entrevista del equipo con una integrante del área social del Plan Jarillón (identidad reservada, 2026)", u: "" },
  entGeologo: { t: "Respuesta en audio de un geólogo consultado por el equipo (nov. 2026)", u: "" },
  entGobernanza: { t: "Entrevista del equipo con Juan Camilo, del área de Gobernanza del Plan Jarillón (nov. 2026)", u: "" },
  entrevista: { t: "Entrevista del equipo con la gerencia jurídica del Plan Jarillón (oct. 2026)", u: "" },
  echeverri: { t: "Alejandro Echeverri Gómez, \"El jarillón de Cali: genealogía de un muro\", documento de análisis para el equipo (nov. 2026)", u: "" },
  reportaje: { t: "Equipo del reportaje, Periodismo e IA, UAO (2026)", u: "" },
  equipo: { t: "Cálculo propio del equipo con cifras de las fuentes citadas", u: "" }
};

/* ---------- CIFRAS CLAVE (sección final) ---------- */
const CIFRAS = [
  { n: 26.1, dec: 1, suf: " km", label: "de dique protegen el oriente de Cali", f: "tiempoTramos", nota: "17 km del jarillón de Aguablanca, 2 km del río Cali y 6,7 km del Canal Interceptor Sur." },
  { n: 97, suf: " %", label: "del refuerzo terminado", f: "pais2026", nota: "Faltan tres tramos que suman unos 430 metros. El más largo, de 350, está en Playa Renaciente, en consulta previa." },
  { n: 8777, label: "hogares verificados en el censo del Plan Jarillón", f: "alcPlan", nota: "Es una base fija. Quien llegó después del corte no es beneficiario." },
  { n: 5693, label: "hogares reasentados (abril de 2026)", f: "alcAbr2026", nota: "Equivale al 64,9 % del censo. En la entrevista, el coordinador del Plan habló de 5.472." },
  { n: 3084, label: "hogares censados que seguían por reasentar", f: "equipo", nota: "Resulta de restar 5.693 a 8.777. No incluye a quienes llegaron después del censo, que nadie ha contado." },
  { n: 7.4, dec: 1, label: "magnitud del sismo del 10 de agosto de 2026", f: "occCVC", nota: "Según la CVC, el dique se diseñó para resistir un sismo de 7,5." },
  { n: 70, pre: "≈", suf: " %", label: "de los caleños recibe agua de la planta de Puerto Mallarino, junto al dique", f: "repEmcali", nota: "Dato de Emcali de 2022. Con la planta Río Cauca, el río aporta cerca del 80 % del agua de la ciudad." },
  { n: 3023, suf: " ha", label: "del oriente de Cali se inundarían en el peor escenario de rotura con una creciente de 100 años", f: "osso2012", nota: "Seis roturas de 150 metros, según el modelo de la Corporación OSSO de 2012. Con cinco roturas de 30 metros el área baja a 572 ha." },
  { n: 15, pre: "≈", suf: " años", label: "tardaría el reasentamiento al ritmo de abril de 2024 a abril de 2026", f: "equipo", nota: "En esos dos años salieron 397 hogares, unos 199 por año. Al dividir 3.084 entre 199 resultan 15,5 años. Es una proyección ilustrativa." },
  { n: 10, suf: " cm", label: "le faltaron al río para sobrepasar el jarillón durante La Niña de 2010 y 2011", f: "alcPlan", nota: "" }
];

/* ---------- FRAGMENTOS DE AUDIO ----------
   Transcripción verificada contra el audio. Las marcas [...] indican omisiones. */
const AUDIOS = {
  podcast: { src: "assets/audio/podcast-historia-jarillon.mp3", quien: "Pódcast del equipo", rol: "La historia del jarillón en dos minutos y medio", f: "reportaje",
    texto: "Imaginen por un momento que una parte de Cali pudiera quedar bajo el agua. No estamos hablando de una película ni de una historia de ficción. Es un riesgo que durante años ha estado presente en nuestra ciudad, y para entenderlo tenemos que viajar al pasado. A finales de los años 50, Cali comenzó a expandirse hacia el oriente. Por eso, entre 1958 y 1962, la Corporación Autónoma Regional del Valle, CVC, construyó un muro de contención de aproximadamente 17 kilómetros junto al río Cauca. Su misión era proteger estos terrenos de las inundaciones. Así nació el jarillón. Pero con los años algo empezó a cambiar. Alrededor de esta estructura comenzaron a establecerse familias que buscaban un lugar donde vivir. Los asentamientos crecieron y el jarillón dejó de ser solamente una barrera de protección. También se convirtió en el hogar de miles de personas. El momento que encendió las alarmas llegó entre 2010 y 2011, cuando el fenómeno de La Niña provocó una fuerte ola invernal en Colombia. La situación dejó en evidencia el deterioro y la vulnerabilidad del dique. Una posible ruptura podía provocar una inundación de enormes proporciones. Fue entonces cuando, en 2012, nació oficialmente el Plan Jarillón de Cali [...]. ¿Su propósito? No solamente reforzar el dique, sino también reubicar a las familias que vivían en zonas de alto riesgo y proteger la infraestructura de servicios públicos de la ciudad. Y es que las consecuencias de una inundación podrían afectar directamente a cerca de 900.000 habitantes del oriente de Cali. Pero detrás de esta gran obra hay mucho más que cemento, maquinaria y cifras. Hay familias, historias, hogares que tuvieron que dejar atrás, y una ciudad que aprendió que prevenir también significa proteger vidas. Porque el Plan Jarillón no es solamente la historia de un muro que busca contener el agua. Es la historia de una Cali que tuvo que mirar de frente uno de sus riesgos más grandes." },
  ortegaOcupaciones: { src: "assets/audio/ortega-ocupaciones.mp3", quien: "Jhony Ortega", rol: "Coordinador del Proyecto Plan Jarillón", f: "entOrtega",
    texto: "Después del 10 de agosto, las nuevas problemáticas que tenemos son nuevas ocupaciones, ya que muchas personas aprovechan estas situaciones para generar estos espacios de ocupación." },
  ortegaEscombros: { src: "assets/audio/ortega-escombros.mp3", quien: "Jhony Ortega", rol: "Coordinador del Proyecto Plan Jarillón", f: "entOrtega",
    texto: "Y el arrojo de escombros que están haciendo en este momento, de todas las demoliciones y todas las adecuaciones de las viviendas." },
  ortegaGrietas: { src: "assets/audio/ortega-grietas.mp3", quien: "Jhony Ortega", rol: "Coordinador del Proyecto Plan Jarillón", f: "entOrtega",
    texto: "De eso se hizo una evaluación técnica y pudimos detectar tres grietas a lo largo del jarillón del río Cauca, las cuales no son de preocupación, no generan un gran impacto y no se van a prolongar con el transcurso del tiempo. Las mismas ya fueron intervenidas de manera artesanal con cal y arcilla, y con esto se hace el manejo de estas grietas para subsanarlas." },
  geologoHumedales: { src: "assets/audio/geologo-humedales.mp3", quien: "Geólogo consultado por el equipo", rol: "Sobre urbanizar antiguos humedales", f: "entGeologo",
    texto: "¿Qué consecuencias tiene haber urbanizado sobre antiguos humedales? Pues que el agua… los ríos, los humedales, en épocas de lluvia tienden a recuperar sus propios cauces, sus propios humedales. Entonces estas casas siempre van a tener este problema de inundaciones, o que el río recupere su cauce." },
  geologoSubsuelo: { src: "assets/audio/geologo-subsuelo.mp3", quien: "Geólogo consultado por el equipo", rol: "Sobre los hundimientos del terreno", f: "entGeologo",
    texto: "En caso de que haya [hundimientos], lo que los causa son las aguas subsuperficiales, o sea, en el subsuelo. Esas aguas van arrastrando partículas y dejan espacios por debajo del suelo, y esos espacios eventualmente quedan libres, y las casas y lo que esté por encima se viene hacia abajo." },
  gobernanza: { src: "assets/audio/gobernanza-estrategia.mp3", quien: "Juan Camilo", rol: "Área de Gobernanza del Plan Jarillón", f: "entGobernanza",
    texto: "A través de la estrategia de gobernanza, que es sensibilización, articulación y participación ciudadana. La sensibilización nos permite explicarles y concientizarlos, y trabajar en pro del territorio y del cuidado de la zona donde viven." }
};

/* ---------- FOTOS ---------- */
const FOTOS = {
  brisas: { src: "assets/img/brisas-del-cauca-2022.jpg", alt: "Dos hombres caminan con el agua a las rodillas entre casas de madera inundadas en Brisas del Cauca.", pie: "Brisas del Cauca, 11 de noviembre de 2022. En la franja entre el río y el dique, la llamada pata húmeda, el agua entra a las casas cada vez que el Cauca crece.", credito: "Foto de Comunicaciones Plan Jarillón, Alcaldía de Cali." },
  puertoNuevo: { src: "assets/img/puerto-nuevo-inundacion.jpg", alt: "De noche, vecinos miran una calle inundada mientras dos funcionarios con botas revisan el agua.", pie: "Puerto Nuevo, mayo de 2017. Funcionarios revisan una calle inundada mientras los vecinos esperan en los andenes.", credito: "Foto de Comunicaciones Plan Jarillón, Alcaldía de Cali." },
  juanchito: { src: "assets/img/juanchito-inundacion.jpg", alt: "Tres personas cargan bultos y un tanque con el agua a la cintura frente a casas inundadas.", pie: "Juanchito, enero de 2017. Vecinos sacan lo que pueden de sus casas con el agua a la cintura.", credito: "Foto de Comunicaciones Plan Jarillón, Alcaldía de Cali." },
  vivienda: { src: "assets/img/vivienda-inundada.jpg", alt: "Un hombre con gorra azul y una prenda roja al hombro está de pie con el agua a los tobillos entre plátanos y casas de madera.", pie: "Marzo de 2022. Una vivienda junto al río, rodeada de agua y plataneras.", credito: "Foto de Comunicaciones Plan Jarillón, Alcaldía de Cali." },
  propuestaIA: { src: "assets/img/propuesta-ia-sistema-capas.jpg", alt: "Ilustración de un corte del jarillón con huertas y bosque inundable hacia el río, pilotes en el núcleo y barrio hacia la ciudad.", pie: "Una propuesta para pensar el jarillón como un sistema de capas, con huerta y bosque inundable hacia el río, un sendero en la corona y espacio público hacia la ciudad.", credito: "Ilustración generada con inteligencia artificial. Es una propuesta conceptual y no representa el diseño ejecutado del dique." }
};

/* ---------- SIMULADOR (esquema ilustrativo) ---------- */
const INFRA = [
  { id: "bombeo", x: 640, y: 90, icon: "bomba", t: "Estación de bombeo Paso del Comercio", d: "Evacúa al río las aguas lluvias del oriente.", f: "paisSismo" },
  { id: "ptar", x: 660, y: 200, icon: "ptar", t: "PTAR Cañaveralejo", d: "Planta de tratamiento de aguas residuales del oriente.", f: "holanda2" },
  { id: "ptap", x: 748, y: 318, icon: "agua", t: "PTAP Puerto Mallarino", d: "Planta de agua potable que abastece a cerca del 70 % de los caleños.", f: "repEmcali" },
  { id: "lagunas", x: 560, y: 340, icon: "laguna", t: "Lagunas de Charco Azul y El Pondaje", d: "Regulan las aguas lluvias del oriente antes de bombearlas al río.", f: "pais2026" },
  { id: "barrios", x: 520, y: 210, icon: "casa", t: "Barrios del oriente", d: "Las comunas del oriente, en la llanura baja junto al dique.", f: "osso2012" },
  { id: "navarro", x: 680, y: 480, icon: "casa", t: "Navarro y Canal Interceptor Sur", d: "Extremo sur del sistema de diques.", f: "pais2026" }
];

/* Roturas simuladas por la Corporación OSSO (2012), de norte a sur. */
const ROTURAS = [
  { id: "calimio", y: 150, k: .9, t: "Calimio" },
  { id: "petecuy", y: 215, k: 1.05, t: "Petecuy" },
  { id: "alfonso", y: 270, k: 1.1, t: "Alfonso López" },
  { id: "vallegrande", y: 385, k: 1, t: "Valle Grande" },
  { id: "decepaz", y: 450, k: .95, t: "Decepaz" },
  { id: "navarro", y: 515, k: .9, t: "Navarro" }
];

/* ---------- BRECHA OBRA vs. REASENTAMIENTO ---------- */
/* Porcentajes calculados sobre base fija: 26,1 km y 8.777 hogares. */
const SERIE_OBRA = [
  { x: 2018.8, km: 7.5, f: "pais2018", lbl: "oct 2018" },
  { x: 2022.95, km: 23.0, f: "alc2022", lbl: "dic 2022" },
  { x: 2024.3, km: 25.2, f: "alcCop16", lbl: "abr 2024" },
  { x: 2026.3, km: 25.3, f: "pais2026", lbl: "feb 2026" }
];
const SERIE_REAS = [
  { x: 2024.3, h: 5296, f: "alcCop16", lbl: "abr 2024" },
  { x: 2025.7, h: 5470, f: "alcSep2025", lbl: "sep 2025" },
  { x: 2025.95, h: 5633, f: "alcDic2025", lbl: "dic 2025" },
  { x: 2026.3, h: 5693, f: "alcAbr2026", lbl: "abr 2026" }
];

/* ---------- CICLO DEL REGRESO (Lo nuevo) ---------- */
const CICLO = [
  { t: "La salida", d: "La familia censada deja el dique con una de las compensaciones del Decreto 0480 de 2016, ya sea vivienda, carta cheque, subsidio de relocalización o subsidio de arriendo. A veces sale por acuerdo y a veces por desalojo." },
  { t: "El arriendo afuera", d: "Con el subsidio de arriendo se muda a otro barrio. El costo, la distancia del trabajo y la pérdida del negocio que tenía en la casa hacen difícil sostenerse. Baudó Agencia Pública documentó que la mitad de las unidades productivas desaparece con el reasentamiento." },
  { t: "El regreso", d: "Vuelve al dique. No a su casa, que ya está marcada o demolida, sino a una vecina que sigue en pie a la espera de la demolición. Alguien se la arrienda." },
  { t: "Vivir entre escombros", d: "Vive sin contrato, sin garantías y sin derecho a reasentamiento, porque quien llega después del censo queda por fuera del Plan. Desde el sismo, los escombros de las demoliciones se suman al peso sobre el muro." },
  { t: "El próximo desalojo", d: "Llega el operativo, se demuele la casa arrendada y la familia busca la siguiente. El ciclo vuelve a empezar." }
];

/* ---------- ARCHIVO ---------- */
const ARCHIVO_ORDEN = ["cvcCuentos", "cvcCrecientes", "diag2012", "holanda", "holanda2", "osso2012", "cvcOsso2015", "alcPlan", "alc2022", "alcTramo6", "alcCop16", "alcDesbordes", "alcSep2025", "alcGuardianes", "alcDic2025", "alcVia2026", "alcAbr2026", "alcLagunas2026", "alcRamali", "alcEmcali80", "decreto480", "decreto608", "tiempoTramos", "tiempo2024", "pais2018", "pais2024", "paisPTAP", "pais2025", "pais2026", "paisSismo", "paisVictimas", "occCVC", "occEscombros", "occRefuerzo", "repEmcali", "baudo", "uribe2012", "rivas2019", "salazar2016", "ruiz2023", "valencia2025", "ocampo2021", "figueroa2016", "tobin1995", "corte2019", "echeverri", "entOrtega", "entSocial", "entGeologo", "entGobernanza", "entrevista"];
