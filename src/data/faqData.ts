export type SectionId = 'home' | 'developers' | 'users' | 'brand' | 'submit';

export type FaqCategory = 'users' | 'developers' | 'brand';

export type UserSubcategory =
  | 'all'
  | 'acceso'
  | 'animo-diario'
  | 'citas-comunidad'
  | 'psicologos'
  | 'sos-config';

export type DevSubcategory =
  | 'all'
  | 'arquitectura'
  | 'frontend'
  | 'backend-api'
  | 'database'
  | 'docker-deploy'
  | 'seguridad';

export interface FaqTable {
  headers: string[];
  rows: string[][];
}

export interface FaqItem {
  id: string;
  question: string;
  questionEn: string;
  category: FaqCategory;
  subcategory: string;
  featuredOnHome?: boolean;
  summary: string;
  summaryEn: string;
  paragraphs: string[];
  steps?: string[];
  bullets?: string[];
  callout?: {
    type: 'info' | 'warning' | 'danger';
    title: string;
    text: string;
  };
  codeBlock?: {
    title?: string;
    code: string;
  };
  table?: FaqTable;
  keywords: string[];
}

export const MASCOT_IMAGE_URL =
  '/assets/aistudio/Gemini_Generated_Image_vilxlpvilxlpvilx_bb618390.jpg';

export const FAQ_ITEMS: FaqItem[] = [
  // =========================================================
  // HOME / FEATURED & USER HELP (MANUAL DE USUARIO SERENA)
  // =========================================================
  {
    id: 'que-es-serena',
    question: '¿Qué es SERENA y para qué sirve dentro del SENA?',
    questionEn: 'What is SERENA and what is it used for at SENA?',
    category: 'users',
    subcategory: 'acceso',
    featuredOnHome: true,
    summary:
      'SERENA es la compañera digital para el bienestar emocional y acompañamiento psicológico de la comunidad SENA (CMTC y centros aliados).',
    summaryEn:
      'SERENA is the digital companion for emotional well-being and psychological guidance across the SENA community.',
    paragraphs: [
      'SERENA ("Tu compañera Digital para el bienestar emocional") es una aplicación web creada para acompañar en el día a día a aprendices, instructores y equipo de Bienestar al Aprendiz dentro del SENA, con enfoque inicial en el Centro de Metalmecánica (CMTC) y proyección hacia centros como CMM y CEET.',
      'La plataforma distingue dos perfiles principales de interacción: Aprendices (autocuidado, registro diario y solicitud de apoyo) y Psicólogos / Orientadores (seguimiento, gestión de agendas y acompañamiento).'
    ],
    bullets: [
      'Registrar cómo te sientes diariamente y observar tus cambios de ánimo en gráficas y calendario.',
      'Escribir reflexiones en un diario personal con control granular de privacidad.',
      'Agendar citas de orientación emocional con los profesionales de Bienestar al Aprendiz.',
      'Consultar publicaciones educativas, hábitos de estudio, mindfulness y encuestas.',
      'Acceder rápidamente a líneas de ayuda telefónica y directorio institucional mediante el botón SOS.'
    ],
    callout: {
      type: 'warning',
      title: 'Aviso fundamental sobre atención clínica',
      text: 'SERENA NO reemplaza la atención médica o psicológica presencial, no emite diagnósticos clínicos ni prescribe tratamientos. En caso de crisis grave o riesgo inminente, comunícate de inmediato con la Línea 106, la Línea 123 o acude al centro de salud más cercano.'
    },
    keywords: [
      'que es',
      'proposito',
      'sena',
      'cmtc',
      'bienestar',
      'aprendiz',
      'psicologo',
      'clinico',
      'diagnostico'
    ]
  },
  {
    id: 'privacidad-diario-personal',
    question: '¿Cómo funciona el Diario Personal y quién puede leer lo que escribo?',
    questionEn: 'How does the Personal Journal work and who can read my entries?',
    category: 'users',
    subcategory: 'animo-diario',
    featuredOnHome: true,
    summary:
      'Es un espacio de escritura libre e introspección. Viene privado por defecto; solo el orientador asignado puede leer las notas donde actives "Compartir con Orientador".',
    summaryEn:
      'It is a free-writing space for self-reflection. Entries are private by default; only your assigned counselor can read notes where you enable sharing.',
    paragraphs: [
      'El Diario Personal te permite expresar pensamientos, preocupaciones o reflexiones de forma segura. Ningún otro aprendiz ni compañero de tu ficha de formación tiene acceso a tus entradas.',
      'Cada nota incluye un interruptor (toggle) de privacidad independiente que viene desactivado por defecto.'
    ],
    steps: [
      'Ingresa al apartado "Diario" desde el menú lateral.',
      'Haz clic en "Nueva Nota" y asígnale un título descriptivo.',
      'Redacta tus reflexiones libremente en el área de texto.',
      'Define si la entrada será Privada (interruptor desactivado, por defecto) o si activas "Compartir con Orientador".',
      'Pulsa "Guardar Nota" para almacenarla en tu historial.'
    ],
    bullets: [
      'Desactivado (Privado - por defecto): La nota solo la puedes ver tú. Ningún orientador ni administrador puede leerla.',
      'Activado (Compartir con Orientador): Autorizas explícitamente a que el psicólogo asignado a tu ficha lea esa entrada específica para brindarte un mejor acompañamiento durante las sesiones.',
      'Nota de ética profesional: Toda entrada autorizada se trata bajo estricta reserva profesional según la normatividad de ética en psicología.'
    ],
    keywords: [
      'como funciona',
      'privacidad',
      'diario',
      'nueva nota',
      'escribir',
      'companeros',
      'psicologo',
      'orientador',
      'compartir',
      'secreto',
      'confidencialidad',
      'escompartido'
    ]
  },
  {
    id: 'registro-cuenta-pasos',
    question: '¿Cómo creo una cuenta nueva en SERENA paso a paso?',
    questionEn: 'How do I create a new SERENA account step by step?',
    category: 'users',
    subcategory: 'acceso',
    featuredOnHome: true,
    summary:
      'Solo necesitas un navegador moderno, tu correo institucional o personal y los datos de tu ficha SENA para completar el asistente en 4 pasos.',
    summaryEn:
      'You only need a modern web browser, your email, and your SENA cohort ("ficha") details to complete the 4-step registration.',
    paragraphs: [
      'Para usar SERENA necesitas un dispositivo con conexión a internet (computador, tablet o celular), un navegador moderno (Google Chrome, Mozilla Firefox, Microsoft Edge o Safari) y tu correo junto a los datos de tu ficha de formación.'
    ],
    steps: [
      'Abre la página principal de SERENA y haz clic en "Registrarse" o "Crear Cuenta".',
      'Paso 1 — Selección de Rol: Elige si te registras como Aprendiz o como Psicólogo.',
      'Paso 2 — Información Académica / Institucional: Selecciona tu Sede y Centro de Formación (ej. Centro de Metalmecánica - CMTC), ingresa tu Programa de Formación y el número de tu Ficha.',
      'Paso 3 — Datos Personales: Escribe tu nombre completo y tu dirección de correo electrónico.',
      'Paso 4 — Seguridad: Define una contraseña segura, confírmala y haz clic en "Completar Registro" para ir directo a tu panel de inicio.'
    ],
    keywords: [
      'registro',
      'crear cuenta',
      'requisitos',
      'ficha',
      'rol',
      'contrasena',
      'navegador',
      'ingresar'
    ]
  },
  {
    id: 'recuperar-cambiar-contrasena',
    question: 'Olvidé mi contraseña o quiero cambiarla en un equipo del SENA, ¿qué debo hacer?',
    questionEn: 'I forgot my password or want to change it on a shared SENA computer, what should I do?',
    category: 'users',
    subcategory: 'acceso',
    featuredOnHome: true,
    summary:
      'Usa "¿Olvidaste tu contraseña?" en el inicio de sesión para recuperarla o entra a "Configuración de Cuenta" para actualizarla.',
    summaryEn:
      'Use "Forgot your password?" on the login screen to recover access, or visit "Account Settings" to change it.',
    paragraphs: [
      'Si olvidaste tu contraseña de acceso, en la pantalla de inicio de sesión haz clic en "¿Olvidaste tu contraseña?", ingresa el correo electrónico con el que te registraste y sigue las instrucciones que recibirás en tu bandeja de entrada.',
      'Si deseas actualizar tu clave manualmente, ingresa a tu perfil, abre "Configuración de Cuenta", escribe tu contraseña actual, ingresa la nueva contraseña y guarda los cambios.'
    ],
    callout: {
      type: 'info',
      title: 'Recomendación en salas compartidas del SENA',
      text: 'Siempre que uses computadores públicos o de las salas de formación del SENA, haz clic en tu nombre o avatar en la esquina superior derecha y selecciona "Cerrar Sesión" al terminar.'
    },
    keywords: [
      'olvide',
      'contrasena',
      'recuperar',
      'cambiar clave',
      'cerrar sesion',
      'login',
      'iniciar sesion'
    ]
  },
  {
    id: 'modulo-estado-animo',
    question: '¿Cómo registro mi estado de ánimo y consulto mi historial emocional?',
    questionEn: 'How do I log my mood and check my emotional history?',
    category: 'users',
    subcategory: 'animo-diario',
    summary:
      'Selecciona una de las 5 emociones disponibles, añade una nota opcional y revisa tu evolución en la gráfica y calendario.',
    summaryEn:
      'Choose one of the 5 available moods, add an optional note, and track trends in your chart and calendar.',
    paragraphs: [
      'El módulo de Estado de Ánimo te permite tomar conciencia diaria de cómo te sientes y detectar patrones a lo largo de días o semanas desde tu Dashboard o menú lateral.'
    ],
    steps: [
      'Haz clic en "Estado de Ánimo" en el menú lateral (o usa el acceso rápido en tu pantalla de inicio).',
      'Elige el icono que mejor represente tu momento: Feliz, Calmado / En Paz, Motivado, Ansioso / Agobiado o Triste.',
      'Opcionalmente, escribe una nota breve explicando el contexto (por ejemplo: "Presenté proyecto final" o "Me siento fatigado por el transporte").',
      'Pulsa "Guardar Registro" y revisa tu historial en la gráfica interactiva y calendario integrados en la misma vista.'
    ],
    keywords: [
      'estado de animo',
      'emociones',
      'feliz',
      'calmado',
      'ansioso',
      'triste',
      'motivado',
      'grafica',
      'calendario'
    ]
  },
  {
    id: 'solicitar-citas-estados',
    question: '¿Cómo solicito una cita de orientación psicológica y qué significan sus estados?',
    questionEn: 'How do I book a counseling appointment and what do the statuses mean?',
    category: 'users',
    subcategory: 'citas-comunidad',
    featuredOnHome: true,
    summary:
      'Elige orientador, fecha, franja horaria y motivo en el módulo Citas; el seguimiento muestra si está Pendiente, Confirmada, Cancelada o Realizada.',
    summaryEn:
      'Pick a counselor, date, time slot, and reason under Appointments; statuses indicate Pending, Confirmed, Cancelled, or Completed.',
    paragraphs: [
      'Desde la sección "Citas" puedes agendar espacios de orientación presencial o virtual con los profesionales de Bienestar al Aprendiz de tu centro de formación.'
    ],
    steps: [
      'Ingresa a la sección "Citas" en el menú y haz clic en "Solicitar Cita".',
      'Selecciona el psicólogo u orientador disponible en tu centro.',
      'Elige una fecha en el calendario y selecciona una franja horaria libre.',
      'Redacta un motivo breve (ej. "Orientación vocacional" o "Manejo del estrés académico") y pulsa "Confirmar Cita".'
    ],
    table: {
      headers: ['Estado', 'Significado', 'Acción recomendada'],
      rows: [
        [
          'Pendiente (Amarillo)',
          'El profesional está revisando su disponibilidad.',
          'Espera la confirmación en jornada laboral o acude a Bienestar si es urgente.'
        ],
        [
          'Confirmada (Verde)',
          'Tu cita fue agendada con lugar o enlace asignado.',
          'Asiste puntualmente en la fecha y hora indicadas.'
        ],
        [
          'Cancelada (Rojo)',
          'La cita no pudo concretarse.',
          'Revisa la justificación o sugerencia de nueva fecha y reprograma.'
        ],
        [
          'Realizada (Gris)',
          'La sesión de orientación ya se llevó a cabo.',
          'Puedes volver a agendar seguimiento cuando lo necesites.'
        ]
      ]
    },
    keywords: [
      'cita',
      'citas',
      'agendar',
      'orientacion',
      'pendiente',
      'confirmada',
      'cancelada',
      'realizada',
      'horario'
    ]
  },
  {
    id: 'cita-pendiente-urgencia',
    question: 'Escribí una solicitud de cita pero sigue en estado "Pendiente", ¿qué hago?',
    questionEn: 'My appointment request is still "Pending", what should I do?',
    category: 'users',
    subcategory: 'citas-comunidad',
    summary:
      'Los psicólogos revisan solicitudes en horario laboral; si requieres atención urgente, acércate a Bienestar al Aprendiz o usa el botón SOS.',
    summaryEn:
      'Counselors review requests during working hours; for urgent support, visit Bienestar al Aprendiz directly or use the SOS button.',
    paragraphs: [
      'Las solicitudes de cita quedan inicialmente en estado Pendiente mientras el orientador verifica su agenda durante su jornada laboral en el centro de formación.',
      'Si necesitas orientación inmediata y tu cita aún no cambia a Confirmada, te recomendamos acercarte personalmente a la oficina de Bienestar al Aprendiz de tu sede o presionar el botón SOS para contactar líneas telefónicas directas.'
    ],
    keywords: ['pendiente', 'demora', 'urgente', 'bienestar', 'esperando cita']
  },
  {
    id: 'comunidades-publicaciones-formularios',
    question: '¿Qué encuentro en Comunidades, Publicaciones de Bienestar y Formularios?',
    questionEn: 'What can I find in Communities, Wellness Posts, and Forms?',
    category: 'users',
    subcategory: 'citas-comunidad',
    summary:
      'Contenidos educativos redactados por Bienestar (mindfulness, respiración, hábitos de estudio) y encuestas breves de caracterización o satisfacción.',
    summaryEn:
      'Educational articles by Wellness staff (mindfulness, breathing, study habits) plus short characterization or satisfaction surveys.',
    paragraphs: [
      'En "Comunidad" / "Publicaciones" puedes leer artículos y guías prácticas sobre hábitos de estudio, ejercicios de respiración, mindfulness y técnicas de autocuidado elaboradas por el equipo de Bienestar.',
      'Puedes filtrar las publicaciones por categorías, reaccionar a ellas o guardar artículos de interés para leerlos más tarde.',
      'En el módulo "Formularios", ocasionalmente el equipo de Bienestar compartirá cuestionarios breves de caracterización o satisfacción: selecciona el formulario activo, responde y haz clic en "Enviar Respuestas".'
    ],
    keywords: [
      'comunidad',
      'publicaciones',
      'articulos',
      'mindfulness',
      'respiracion',
      'formularios',
      'encuestas'
    ]
  },
  {
    id: 'uso-boton-emergencia-sos',
    question: '¿Cómo funciona el Botón de Emergencia (SOS) y envía ayuda automática a mi ubicación?',
    questionEn: 'How does the SOS Emergency Button work and does it dispatch help automatically?',
    category: 'users',
    subcategory: 'sos-config',
    featuredOnHome: true,
    summary:
      'El botón SOS abre acceso rápido a llamadas directas (Línea 106 / 123 / PBX), directorio y solicitud prioritaria, pero NO despacha ambulancias ni patrullas automáticamente.',
    summaryEn:
      'The SOS button provides one-tap calling (Line 106 / 123 / Center PBX), directory contacts, and a priority form—it does NOT automatically dispatch emergency vehicles.',
    paragraphs: [
      'El botón SOS de color rojo está visible de forma permanente en la interfaz para que sepas exactamente a dónde acudir en momentos de alta vulnerabilidad emocional.',
      'Al hacer clic se despliega una ventana flotante con tres recursos: botones de llamada directa desde celular a las líneas nacionales (Línea 106 y Línea 123) y PBX de Bienestar del centro, directorio de correos y oficinas físicas de Bienestar al Aprendiz, y un formulario de solicitud prioritaria.'
    ],
    callout: {
      type: 'danger',
      title: 'Importante sobre el formulario SOS',
      text: 'Guardar un mensaje en el modal de emergencia de la aplicación NO envía de manera automática una patrulla o ambulancia a tu ubicación. Si estás en peligro inminente o crisis grave, llama directamente al 106 o 123 o acude a urgencias médicas.'
    },
    keywords: [
      'sos',
      'emergencia',
      '106',
      '123',
      'crisis',
      'ambulancia',
      'llamar',
      'pbx',
      'peligro'
    ]
  },
  {
    id: 'guia-psicologo-orientador',
    question: 'Soy Psicólogo u Orientador, ¿qué funciones y alertas incluye mi panel?',
    questionEn: 'I am a Psychologist/Counselor, what tools and alerts are included in my dashboard?',
    category: 'users',
    subcategory: 'psicologos',
    summary:
      'Incluye resumen de citas del día, alertas de aprendices con tristeza/ansiedad consecutiva, consulta de fichas, gestión de citas y lectura de diarios autorizados.',
    summaryEn:
      'Includes daily appointment summaries, alerts for consecutive low-energy mood logs, cohort lookup, appointment actions, and authorized journal reading.',
    paragraphs: [
      'Al iniciar sesión con el rol de Psicólogo, SERENA adapta la interfaz para el seguimiento y la gestión del bienestar de los aprendices asignados a tus fichas.'
    ],
    bullets: [
      'Panel de Seguimiento: Muestra el resumen de citas agendadas para el día, solicitudes pendientes por aprobar/rechazar y alertas de aprendices con registros consecutivos de baja energía (tristeza o ansiedad).',
      'Consulta de Aprendices y Fichas: Selecciona una ficha (ej. Ficha 2670123 - CMTC) para ver aprendices matriculados, su historial de citas, estadísticas agregadas de ánimo y diarios compartidos.',
      'Gestión de Citas: Aprueba citas pendientes asignando consultorio presencial o enlace de videollamada, finalízalas como Realizadas y registra notas internas privadas para el equipo profesional.',
      'Diarios Autorizados: Solo se muestran entradas que el aprendiz marcó voluntariamente como compartidas, bajo estricta reserva ética profesional.'
    ],
    keywords: [
      'psicologo',
      'orientador',
      'fichas',
      'seguimiento',
      'alertas',
      'aprobar cita',
      'notas internas',
      'diarios compartidos'
    ]
  },
  {
    id: 'modo-oscuro-idioma-errores',
    question: '¿Cómo cambio el tema (Claro/Oscuro), el idioma (ES/EN) o soluciono errores de carga?',
    questionEn: 'How do I switch Light/Dark mode, change language (ES/EN), or fix loading errors?',
    category: 'users',
    subcategory: 'sos-config',
    summary:
      'Usa el icono Sol/Luna y el selector ES/EN en la barra superior. Ante fallos de red, verifica tu conexión, recarga con F5 o limpia la caché.',
    summaryEn:
      'Use the Sun/Moon toggle and ES/EN selector in the header. For connection errors, check internet access, refresh (F5), or clear cache.',
    paragraphs: [
      'En la barra superior o en tu menú de perfil encontrarás el icono de Sol/Luna para alternar entre Modo Claro (ideal para entornos iluminados) y Modo Oscuro (reduce la fatiga visual y el consumo de batería), junto al selector de idioma ES / EN que traduce botones, menús e instrucciones.'
    ],
    steps: [
      'Si la página no carga o muestra un error de conexión, primero verifica que tu dispositivo tenga acceso a internet.',
      'Recarga la pestaña presionando F5 o Ctrl + R.',
      'Limpia la memoria caché de tu navegador o prueba abrir SERENA en una ventana de incógnito.',
      'Si el inconveniente continúa, repórtalo al administrador del sistema o al equipo de soporte de tu Centro de Formación mediante "Enviar una solicitud".'
    ],
    keywords: [
      'modo oscuro',
      'modo claro',
      'tema',
      'idioma',
      'ingles',
      'espanol',
      'error de conexion',
      'no carga',
      'cache'
    ]
  },

  // =========================================================
  // DEVELOPER HELP (MANUAL TÉCNICO Y ARQUITECTURA DE SOFTWARE)
  // =========================================================
  {
    id: 'stack-arquitectura-multicapa',
    question: '¿Cuál es el stack tecnológico y la arquitectura multicapa de SERENA?',
    questionEn: 'What is the technology stack and multi-layer architecture of SERENA?',
    category: 'developers',
    subcategory: 'arquitectura',
    featuredOnHome: true,
    summary:
      'Arquitectura desacoplada SPA + RESTful Web API: React 19 + TypeScript + Vite + Tailwind CSS 4 en cliente, ASP.NET Core (.NET 8) + EF Core 8 en servidor y SQL Server 2022.',
    summaryEn:
      'Decoupled SPA + RESTful Web API architecture: React 19 + TypeScript + Vite + Tailwind CSS 4 client, ASP.NET Core (.NET 8) + EF Core 8 server, and SQL Server 2022.',
    paragraphs: [
      'SERENA sigue una arquitectura Cliente-Servidor desacoplada en tres capas principales orquestadas mediante contenedores Docker o ejecución local.'
    ],
    table: {
      headers: ['Capa / Componente', 'Tecnología', 'Propósito / Puerto'],
      rows: [
        ['Frontend', 'React 19 + TypeScript + Vite + Tailwind CSS 4 + Lucide React', 'SPA de interfaz para Aprendiz y Psicólogo (Puerto 3000)'],
        ['Backend API', 'C# ASP.NET Core Web API (.NET 8) + Swagger', 'Controladores RESTful y lógica de negocio (Puerto 5185)'],
        ['ORM', 'Entity Framework Core 8', 'Mapeo objeto-relacional vía DatabaseService'],
        ['Base de Datos', 'Microsoft SQL Server 2022', 'Persistencia relacional principal (Puerto 1433)'],
        ['Contenedores', 'Docker & Docker Compose', 'Orquestación de servicios db, backend y frontend']
      ]
    },
    keywords: [
      'arquitectura',
      'stack',
      'react',
      'typescript',
      'vite',
      'tailwind',
      'dotnet',
      'net 8',
      'sql server',
      'ef core'
    ]
  },
  {
    id: 'estructura-frontend-proxy-persistencia',
    question: '¿Cómo se organiza el proyecto Frontend (/frontend), el proxy de Vite y la persistencia híbrida?',
    questionEn: 'How is the Frontend structured, including the Vite proxy and hybrid persistence?',
    category: 'developers',
    subcategory: 'frontend',
    summary:
      'Vite sirve el cliente en el puerto 3000 haciendo proxy de /api hacia localhost:5185; serena-api.service.ts usa fetch con fallback automático a localStorage.',
    summaryEn:
      'Vite serves the client on port 3000 proxying /api to localhost:5185; serena-api.service.ts uses fetch with automatic localStorage fallback.',
    paragraphs: [
      'El cliente React se ubica en /frontend con componentes dedicados por vista (Header.tsx, SidebarLeft.tsx, LoginView.tsx, EstadoDeAnimoView.tsx, DiarioView.tsx, CitasView.tsx, EmergenciaModal.tsx), estado global en App.tsx y tipos en src/types/serena.types.ts.',
      'El archivo vite.config.ts expone el servidor de desarrollo en el puerto 3000 y redirige las solicitudes /api hacia http://localhost:5185 mediante proxy inverso.',
      'La capa src/services/serena-api.service.ts encapsula fetch() (loginEnApi, registrarUsuarioEnApi, getCitasDesdeApi, crearCitaEnApi, getDiariosDesdeApi, crearDiarioEnApi, registrarEstadoAnimoEnApi) e implementa tolerancia a fallos: si la API responde, persiste en SQL Server; si no está disponible, utiliza localStorage del navegador.'
    ],
    codeBlock: {
      title: 'Estructura /frontend y flujo de persistencia híbrida',
      code: `frontend/src/
├── components/ (Header, SidebarLeft, LoginView, EstadoDeAnimoView, DiarioView, CitasView, EmergenciaModal)
├── services/serena-api.service.ts
├── types/serena.types.ts
├── App.tsx
└── index.css

Flujo: Petición -> ¿API Disponible?
  ├── SÍ -> Leer / Guardar en SQL Server (.NET 8)
  └── NO -> Fallback en localStorage del navegador`
    },
    keywords: [
      'frontend',
      'vite',
      'proxy',
      'localstorage',
      'hibrida',
      'serena-api.service.ts',
      'componentes',
      'app.tsx'
    ]
  },
  {
    id: 'catalogo-endpoints-backend',
    question: '¿Cuáles son los controladores y endpoints REST disponibles en el Backend ASP.NET Core?',
    questionEn: 'What REST controllers and endpoints are available in the ASP.NET Core Backend?',
    category: 'developers',
    subcategory: 'backend-api',
    summary:
      'La API en puerto 5185 expone controladores para autenticación (/api/login), citas (/api/cita), diarios (/api/diario), ánimo, publicaciones, formularios y emergencias.',
    summaryEn:
      'The port-5185 API exposes controllers for auth (/api/login), appointments (/api/cita), journals (/api/diario), mood, posts, forms, and emergencies.',
    paragraphs: [
      'El proyecto ASP.NET Core Web API (.NET 8) reside en /backend, habilita CORS abierto en Program.cs, documenta rutas con Swagger en desarrollo y expone los siguientes endpoints principales:'
    ],
    table: {
      headers: ['Controlador', 'Método y Ruta', 'Descripción'],
      rows: [
        ['login_controller', 'POST /api/login', 'Valida credenciales y retorna usuario y token'],
        ['login_controller', 'POST /api/login/registrar', 'Registra nueva cuenta de Aprendiz o Psicólogo'],
        ['cita_Controller', 'GET /api/cita | POST /api/cita | PUT /api/cita/{id}', 'Lista, solicita o actualiza estado de citas'],
        ['diario_controller', 'GET /api/diario/usuario/{id} | POST /api/diario', 'Consulta notas del usuario y crea nuevas entradas'],
        ['estado_animo_usuario_controller', 'GET /api/estado-animo-usuario/usuario/{id} | POST /api/estado-animo-usuario', 'Historial emocional y autoevaluación diaria'],
        ['emergencia_controller', 'POST /api/emergencia', 'Registra solicitud prioritaria SOS'],
        ['publicaciones_controller / formulario_controller', '/api/publicaciones | /api/formulario', 'Publicaciones de bienestar y encuestas']
      ]
    },
    keywords: [
      'endpoints',
      'api',
      'controladores',
      'backend',
      'login',
      'cita',
      'diario',
      'swagger',
      'program.cs',
      'cors'
    ]
  },
  {
    id: 'modelo-base-datos-sql',
    question: '¿Cómo está diseñado el modelo de base de datos SQL Server y Entity Framework Core?',
    questionEn: 'How are the SQL Server database schema and Entity Framework Core DbContext structured?',
    category: 'developers',
    subcategory: 'database',
    summary:
      'DatabaseService hereda de DbContext con 10 tablas principales (Usuarios, Roles, Citas, Diarios, EstadoAnimos, EstadoAnimoUsuarios, Emergencias, Fichas, Publicaciones, Formularios).',
    summaryEn:
      'DatabaseService extends DbContext with 10 core tables including Usuarios, Roles, Citas, Diarios, EstadoAnimos, Emergencias, Fichas, and Publicaciones.',
    paragraphs: [
      'Las entidades C# en /backend/models se mapean mediante DatabaseService.cs. Al iniciar, EF Core aplica migraciones con context.Database.Migrate() y siembra los roles base: 1 = Aprendiz, 2 = Psicologo, 3 = Administrador.'
    ],
    table: {
      headers: ['Tabla', 'Columnas clave', 'Notas'],
      rows: [
        ['Usuarios', 'Id (PK), Nombre, Correo (UNIQUE), PasswordHash, RolId (FK), FichaId (FK)', 'RolId: 1 Aprendiz, 2 Psicólogo, 3 Admin'],
        ['Diarios', 'Id (PK), UsuarioId (FK), Titulo, Contenido, EsCompartido (BIT), FechaCreacion', 'EsCompartido: 0 Privado, 1 Compartido'],
        ['Citas', 'Id (PK), AprendizId (FK), PsicologoId (FK), FechaHora, Estado, Motivo', 'Estado: Pendiente, Confirmada, Cancelada, Realizada']
      ]
    },
    keywords: [
      'base de datos',
      'sql server',
      'databaseservice',
      'tablas',
      'usuarios',
      'diarios',
      'citas',
      'roles',
      'migraciones',
      'seeding'
    ]
  },
  {
    id: 'instalacion-local-docker',
    question: '¿Cómo configuro variables de entorno y levanto SERENA en local o con Docker Compose?',
    questionEn: 'How do I configure environment variables and run SERENA locally or via Docker Compose?',
    category: 'developers',
    subcategory: 'docker-deploy',
    summary:
      'Requiere Node.js v18+, .NET 8 SDK y SQL Server 2022 (o Docker Desktop). Configura SERENA_CONNECTION_STRING y VITE_API_BASE_URL.',
    summaryEn:
      'Requires Node.js v18+, .NET 8 SDK, and SQL Server 2022 (or Docker Desktop). Configure SERENA_CONNECTION_STRING and VITE_API_BASE_URL.',
    paragraphs: [
      'El proyecto incluye orquestación mediante docker-compose.yml con tres contenedores (db en puerto 1433, backend en 5185 y frontend en 3000), además de ejecución manual paso a paso.'
    ],
    codeBlock: {
      title: 'Variables de entorno y comandos de ejecución local',
      code: `# .env
SERENA_CONNECTION_STRING=Server=db;Database=SerenaDb;User Id=sa;Password=YourSecurePassword123!;TrustServerCertificate=True;
VITE_API_BASE_URL=http://localhost:5185/api

# Paso 1: Backend (.NET 8)
cd backend
dotnet restore
dotnet ef database update
dotnet run --urls=http://localhost:5185

# Paso 2: Frontend (React + Vite)
cd ../frontend
npm install
npm run dev`
    },
    keywords: [
      'docker',
      'docker-compose',
      'instalar',
      'ejecutar',
      'variables de entorno',
      'connection string',
      'dotnet',
      'npm run dev'
    ]
  },
  {
    id: 'auditoria-seguridad-deuda-tecnica',
    question: '¿Qué hallazgos de seguridad existen en la auditoría técnica y cómo se mitigan?',
    questionEn: 'What security findings were identified in the technical audit and how should they be mitigated?',
    category: 'developers',
    subcategory: 'seguridad',
    featuredOnHome: true,
    summary:
      'El Manual Técnico documenta 5 brechas críticas/altas (PascalCase en Login, falta de [Authorize] JWT, diarios en texto plano, SOS solo en localStorage y RBAC incompleto) con su plan de mitigación.',
    summaryEn:
      'The Technical Manual documents 5 key gaps (Login casing mismatch, missing JWT [Authorize], plaintext journals, local-only SOS fallback, and RBAC routing) with a mitigation plan.',
    paragraphs: [
      'Antes de llevar la solución a producción institucional, el equipo de desarrollo debe resolver los hallazgos priorizados en la auditoría del código fuente:'
    ],
    table: {
      headers: ['Hallazgo', 'Prioridad', 'Problema y Acción Correctiva'],
      rows: [
        [
          'JSON Naming en Login (1h)',
          'CRÍTICA',
          'login_controller.cs devuelve "Usuario" en PascalCase pero frontend espera "usuario". Configurar JsonNamingPolicy.CamelCase global en Program.cs.'
        ],
        [
          'Autorización JWT (8h)',
          'CRÍTICA',
          'Los controladores carecen de [Authorize] y el cliente no envía Bearer token. Activar JwtBearerDefaults.AuthenticationScheme y adjuntar Authorization header.'
        ],
        [
          'Aislamiento de Salud Mental (12h)',
          'ALTA',
          'Validar en backend que el UsuarioId extraído del token JWT coincida con los registros solicitados en /api/diario y /api/cita.'
        ],
        [
          'Alertas SOS en Tiempo Real (16h)',
          'ALTA',
          'En fallos de API el modal SOS guarda solo en localStorage. Integrar SignalR o envío SMTP inmediato a la oficina de Bienestar.'
        ],
        [
          'Cifrado en Reposo de Diarios (10h)',
          'MEDIA',
          'El campo Contenido se almacena en texto plano. Implementar cifrado simétrico AES-256 (Field-Level Encryption) o Always Encrypted.'
        ],
        [
          'RBAC Admin & Puertos Docker (4h)',
          'MEDIA',
          'Definir rutas y Route Guards dedicados para rol Administrador en App.tsx y sincronizar puertos de Dockerfile frontend con docker-compose.yml.'
        ]
      ]
    },
    keywords: [
      'seguridad',
      'auditoria',
      'jwt',
      'authorize',
      'pascalcase',
      'camelcase',
      'cifrado',
      'aes-256',
      'rbac',
      'signalr',
      'deuda tecnica'
    ]
  },

  // =========================================================
  // BRAND IDENTITY (MANUAL DE IDENTIDAD Y GUÍA DE ESTILO)
  // =========================================================
  {
    id: 'identidad-concepto-mision-valores',
    question: '¿Cuál es el significado de la marca SERENA, su misión, valores y tono de voz?',
    questionEn: 'What is the meaning behind the SERENA brand, its mission, values, and tone of voice?',
    category: 'brand',
    subcategory: 'marca',
    summary:
      'Su arquetipo es El Cuidador/Compañero: cálido, sereno y estructurado; nunca clínico ni alarmista. Basado en Empatía, Confidencialidad, Accesibilidad y Oportunidad.',
    summaryEn:
      'Its archetype is The Caregiver/Companion: warm, calm, and structured—never clinical or alarmist, anchored in Empathy, Confidentiality, Accessibility, and Timeliness.',
    paragraphs: [
      'El imagotipo tradicional de SERENA integra un árbol (estabilidad, crecimiento y protección institucional del SENA) con una figura humana en pausa reflexiva bajo su copa. Su eslogan oficial es: "Tu compañera Digital para el bienestar emocional".',
      'Sus cuatro valores fundamentales son Empatía y Escucha Activa, Confidencialidad y Respeto, Accesibilidad y Sencillez, y Oportunidad y Prevención.'
    ],
    table: {
      headers: ['Contexto', 'Lo que SERENA SÍ dice', 'Lo que SERENA NUNCA dice'],
      rows: [
        [
          'Bienvenida',
          '"Hola, ¿cómo te sientes el día de hoy? Estamos aquí para acompañarte."',
          '"¿Cuál es tu patología hoy? Inicia sesión para continuar."'
        ],
        [
          'Registro de Ánimo',
          '"Gracias por compartir tu estado de ánimo. Guardar lo que sientes es el primer paso."',
          '"Tu nivel de ansiedad es alto. Debes ser corregido."'
        ],
        [
          'Alertas / SOS',
          '"Si sientes que necesitas ayuda inmediata, conéctate con una línea de apoyo directa."',
          '"¡ALERTA MÁXIMA! Su estado mental es crítico."'
        ],
        [
          'Diario Personal',
          '"Este espacio es tuyo. Tú decides si deseas compartir esta nota con tu psicólogo."',
          '"El sistema transmitirá tus pensamientos al administrador."'
        ]
      ]
    },
    keywords: [
      'marca',
      'identidad',
      'mision',
      'vision',
      'valores',
      'eslogan',
      'tono de voz',
      'arquetipo',
      'imagotipo'
    ]
  },
  {
    id: 'paleta-colores-tipografia-wcag',
    question: '¿Cuáles son los colores oficiales, tipografía y reglas de contraste de SERENA?',
    questionEn: 'What are SERENA’s official color tokens, typography, and WCAG contrast rules?',
    category: 'brand',
    subcategory: 'marca',
    summary:
      'Color primario #7E22CE (SERENA Purple), Deep Velvet #581C87, Soft Lavender #F3E8FF, tipografía Plus Jakarta Sans y contraste mínimo WCAG AA/AAA.',
    summaryEn:
      'Primary #7E22CE (SERENA Purple), Deep Velvet #581C87, Soft Lavender #F3E8FF, Plus Jakarta Sans typeface, and WCAG AA/AAA contrast compliance.',
    paragraphs: [
      'La tipografía corporativa oficial es Plus Jakarta Sans (con fallback Inter, system-ui, Segoe UI, Roboto). En composición de textos largos se recomienda alinear a la izquierda y evitar bloques en mayúsculas sostenidas (permitidas solo en siglas como SENA o CMTC).'
    ],
    table: {
      headers: ['Token de Color', 'HEX', 'Uso aprobado'],
      rows: [
        ['SERENA Purple', '#7E22CE', 'Botones primarios, encabezados, iconos destacados y bordes activos'],
        ['Deep Velvet', '#581C87', 'Barras laterales oscuras, texto sobre lavanda claro, énfasis alto'],
        ['Soft Lavender', '#F3E8FF', 'Fondos de tarjetas secundarias, resaltados suaves'],
        ['Pure Tint / Surface', '#FAF9FF / #FFFFFF', 'Fondo de aplicación y paneles en Modo Claro (#0F172A / #1E293B en Modo Oscuro)'],
        ['Verde Esperanza', '#39A900 / #22C55E', 'Confirmaciones, citas aprobadas, ánimo feliz/motivado'],
        ['Alerta SOS / Ámbar / Azul', '#DC2626 / #F59E0B / #3B82F6', 'Botón SOS rojo, ánimo ansioso (ámbar) y ánimo triste (azul)']
      ]
    },
    keywords: [
      'colores',
      '7e22ce',
      'morado',
      'paleta',
      'tipografia',
      'plus jakarta sans',
      'wcag',
      'contraste',
      'design tokens'
    ]
  },
  {
    id: 'convivencia-sena-usos-marca',
    question: '¿Cómo debe convivir el logotipo de SERENA con la imagen institucional del SENA?',
    questionEn: 'How should SERENA’s logo coexist with SENA’s institutional branding?',
    category: 'brand',
    subcategory: 'marca',
    summary:
      'Deben separarse por una línea vertical neutra (#CBD5E1), manteniendo cada marca su color oficial (verde SENA y morado SERENA) y respetando el área de reserva 1X.',
    summaryEn:
      'Separate both logos with a neutral vertical divider (#CBD5E1), preserve each brand’s color (SENA green and SERENA purple), and honor the 1X clear space.',
    paragraphs: [
      'SERENA es un sistema complementario del SENA. Cuando ambos logotipos aparezcan juntos en piezas digitales o afiches impresos:'
    ],
    bullets: [
      'Separar el escudo del SENA y el logotipo de SERENA mediante una línea vertical divisoria neutra (#CBD5E1).',
      'El logo del SENA conserva su verde institucional (o blanco) y SERENA conserva su morado #7E22CE sin alterarse.',
      'Respetar un área de reserva mínima de 1X (altura de la letra "E" de SERENA) en los cuatro costados.',
      'Tamaños mínimos: 120 px de ancho en digital (24x24 px para favicon) y 35 mm en impresión.',
      'En piezas impresas con QR, incluir el mensaje "Escanea y registra tu día en SERENA" evitando fotografías estigmatizantes de angustia.'
    ],
    keywords: [
      'sena',
      'convivencia',
      'logo',
      'area de reserva',
      'impresion',
      'qr',
      'prohibiciones',
      'afiches'
    ]
  }
];
