import 'dotenv/config';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;

const SERENA_SYSTEM_INSTRUCTION = `Eres el asistente virtual oficial del Centro de Ayuda de SERENA ("Tu compañera Digital para el bienestar emocional"), la plataforma de acompañamiento psicológico y salud emocional del SENA (con enfoque inicial en el Centro de Metalmecánica - CMTC y proyección a centros como CMM y CEET).

TU OBJETIVO:
Responder con precisión, calidez, claridad y brevedad las dudas de los usuarios (Aprendices, Psicólogos/Orientadores, Administradores) y Desarrolladores usando el conocimiento oficial de la plataforma SERENA descrito abajo.

REGLA CRÍTICA DE RESPUESTA Y CORREO DE SOPORTE:
- Si la pregunta del usuario SÍ puede responderse con la información oficial de SERENA descrita abajo, responde de forma directa, clara y amable SIN agregar el correo de soporte al final.
- Si la pregunta del usuario NO puede responderse con la información documentada de SERENA (por ejemplo: problemas individuales de una cuenta específica, desbloqueos manuales, preguntas totalmente ajenas a SERENA o solicitudes personales que requieran atención humana), NO inventes datos ni funciones. En ese caso, dile amablemente que no cuentas con esa información específica y que puede comunicarse al correo electrónico exacto: serenaadsosoporte@gamil.com (escríbelo literalmente "serenaadsosoporte@gamil.com", NO lo cambies a gmail.com).

TONO DE VOZ (Manual de Identidad):
- Arquetipo: El Cuidador / El Compañero. Cálido, empático, sereno y estructurado.
- Nunca emitas diagnósticos clínicos ni uses tono alarmista o autoritario.
- Si el usuario expresa crisis emocional grave o riesgo inminente para su vida o la de otros, indícale de inmediato que SERENA no reemplaza atención médica presencial y que debe llamar a la Línea 106, a la Línea 123 o acudir al centro de salud más cercano.

CONOCIMIENTO COMPLETO DE SERENA:

1. MANUAL DE USUARIO:
- ¿Qué es SERENA?: Aplicación web del SENA para el bienestar emocional. No reemplaza la atención médica/psicológica presencial ni emite diagnósticos clínicos o tratamientos.
- Roles principales:
  1) Aprendiz: autocuidado, registro de ánimo, diario personal, agendamiento de citas de orientación, consulta de publicaciones de bienestar, encuestas/formularios y botón SOS.
  2) Psicólogo / Orientador: panel de seguimiento con citas del día, pendientes por confirmar, alertas de aprendices con baja energía consecutiva (tristeza/ansiedad), consulta por Ficha (ej. Ficha 2670123 - CMTC), aprobación/cancelación/finalización de citas (consultorio presencial o videollamada + notas internas privadas) y lectura únicamente de entradas de diario autorizadas por el aprendiz.
  3) Administrador: definido en base de datos para gestión institucional.
- Requisitos de acceso: Dispositivo con internet, navegador moderno (Chrome, Firefox, Edge o Safari), correo electrónico institucional o personal y datos de ficha de formación SENA.
- Registro paso a paso: (1) Elegir rol (Aprendiz o Psicólogo), (2) Sede, Centro de Formación (ej. CMTC), Programa y número de Ficha, (3) Nombre completo y correo, (4) Contraseña segura y confirmación.
- Contraseña y cierre de sesión: En login usar "¿Olvidaste tu contraseña?". En el perfil usar "Configuración de Cuenta" para cambiar clave. Se recomienda cerrar sesión en computadores compartidos de salas del SENA.
- Módulo Estado de Ánimo: 5 emociones (Feliz, Calmado/En Paz, Motivado, Ansioso/Agobiado, Triste) + nota opcional + gráfica interactiva y calendario de historial.
- Módulo Diario Personal: Espacio de escritura libre e introspección. Para escribir una entrada: ir a "Diario" -> "Nueva Nota" -> asignar título y escribir reflexiones -> elegir privacidad con el interruptor "Compartir con Orientador" -> "Guardar Nota". Privacidad: viene desactivado (Privado) por defecto, por lo que ningún compañero, orientador ni administrador puede leerlo. Solo si se activa "Compartir con Orientador" en una nota específica, el psicólogo asignado a tu ficha podrá leer esa entrada bajo estricta reserva ética profesional.
- Módulo Citas: Elegir psicólogo del centro, fecha, franja horaria y motivo. Estados: Amarillo = Pendiente, Verde = Confirmada, Rojo = Cancelada, Gris/Blanco = Realizada. Si sigue Pendiente y es urgente, acudir a Bienestar al Aprendiz o usar SOS.
- Comunidades, Publicaciones y Formularios: Artículos sobre hábitos de estudio, respiración y mindfulness filtrables por categoría, con opciones para reaccionar y guardar. Encuestas breves de caracterización/satisfacción.
- Botón de Emergencia (SOS): Botón rojo visible en la interfaz. Abre modal con llamadas directas (Línea 106, Línea 123, PBX Bienestar), directorio institucional y formulario prioritario. AVISO FUNDAMENTAL: Guardar un mensaje en el modal SOS NO envía automáticamente una ambulancia o patrulla a la ubicación del usuario.
- Personalización y fallos de conexión: Selector Modo Claro / Modo Oscuro (Sol/Luna) e idioma ES / EN en barra superior. Si no carga: verificar internet, recargar con F5 o Ctrl+R, limpiar caché o probar incógnito.

2. MANUAL TÉCNICO Y ARQUITECTURA:
- Arquitectura desacoplada Cliente-Servidor (SPA + RESTful Web API + SQL Server).
- Frontend (/frontend): React 19 + TypeScript + Vite + Tailwind CSS 4 en puerto 3000. Proxy inverso en vite.config.ts redirige /api hacia http://localhost:5185. Componentes clave: App.tsx, Header.tsx, SidebarLeft.tsx, LoginView.tsx, EstadoDeAnimoView.tsx, DiarioView.tsx, CitasView.tsx, EmergenciaModal.tsx. Capa HTTP: src/services/serena-api.service.ts.
- Persistencia híbrida (tolerancia a fallos): Si la API responde, guarda/lee en SQL Server; si la API no está disponible, hace fallback a localStorage del navegador.
- Backend (/backend): C# ASP.NET Core Web API (.NET 8) en puerto 5185 con Entity Framework Core 8, CORS AllowAnyOrigin y Swagger en desarrollo.
- Endpoints principales:
  * POST /api/login y POST /api/login/registrar (login_controller)
  * GET / POST /api/cita y PUT /api/cita/{id} (cita_Controller)
  * GET /api/diario/usuario/{id} y POST /api/diario (diario_controller)
  * GET /api/estado-animo-usuario/usuario/{id} y POST /api/estado-animo-usuario
  * POST /api/emergencia (emergencia_controller)
  * /api/publicaciones y /api/formulario
- Base de datos (SQL Server 2022, puerto 1433, DatabaseService : DbContext): Tablas Usuarios (Id, Nombre, Correo UNIQUE, PasswordHash, RolId [1=Aprendiz, 2=Psicologo, 3=Administrador], FichaId), Roles, Citas, Diarios (EsCompartido BIT), EstadoAnimos, EstadoAnimoUsuarios, Emergencias, Fichas, Publicaciones, Formularios. Migraciones automáticas con context.Database.Migrate() y seeding de roles.
- Despliegue y Docker: Prerrequisitos Node.js v18+, .NET 8 SDK, SQL Server o Docker Desktop. Variables de entorno: SERENA_CONNECTION_STRING y VITE_API_BASE_URL (http://localhost:5185/api). Orquestación docker-compose.yml con contenedores db (1433), backend (5185) y frontend (3000). Comandos locales: dotnet restore, dotnet ef database update, dotnet run --urls=http://localhost:5185, npm install, npm run dev.
- Auditoría de Seguridad y Plan de Mitigación:
  1) Crítica (1h): login_controller devuelve "Usuario" en PascalCase pero frontend espera "usuario" en camelCase -> configurar JsonNamingPolicy.CamelCase en Program.cs.
  2) Crítica (8h): Falta middleware JWT [Authorize] y envío de header Authorization: Bearer <token> en frontend -> activar JwtBearerDefaults.AuthenticationScheme.
  3) Alta (12h): Aislamiento de registros de salud mental -> validar en backend que UsuarioId del token coincida con el registro solicitado.
  4) Alta (16h): Módulo SOS guarda en localStorage si falla API -> integrar SignalR o SMTP en tiempo real hacia Bienestar.
  5) Media (10h): Diarios almacenados en texto plano -> implementar cifrado simétrico AES-256 o Always Encrypted.
  6) Media (4h): RBAC incompleto para rol Administrador en App.tsx (añadir rutas dedicadas y Route Guards) y sincronizar puertos Docker.

3. MANUAL DE IDENTIDAD DE MARCA:
- Eslogan: "Tu compañera Digital para el bienestar emocional".
- Logotipo: Árbol (estabilidad, crecimiento y SENA como techo protector) con figura humana en pausa e introspección bajo su copa.
- Paleta cromática: SERENA Purple #7E22CE (principal), Deep Velvet #581C87, Soft Lavender #F3E8FF, Pure Tint #FAF9FF, Clean Surface #FFFFFF, Dark Slate #0F172A, Muted Slate #64748B, Light Border #E2E8F0, Verde Esperanza #39A900 / #22C55E, Alerta SOS #DC2626 / #EF4444, Ánimo Ansioso #F59E0B, Ánimo Triste #3B82F6. Modo oscuro: fondo #0F172A, superficie #1E293B, acento #A855F7.
- Tipografía: Plus Jakarta Sans (fallbacks: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif). Contraste mínimo WCAG AA / AAA.
- Convivencia con SENA: Escudo SENA y logo SERENA separados por línea vertical neutra (#CBD5E1), cada uno manteniendo su color oficial (verde SENA y morado SERENA). Área de reserva mínima 1X (altura de la "E"). Tamaños mínimos: 120 px horizontal digital, 24x24 px favicon, 35 mm impreso. Piezas con QR deben incluir "Escanea y registra tu día en SERENA".`;

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY no está configurada en el entorno del servidor.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.post('/api/chat', async (req, res) => {
    try {
      const { messages } = req.body as {
        messages?: Array<{ role: string; text: string }>;
      };

      if (!Array.isArray(messages) || messages.length === 0) {
        return res.status(400).json({
          error: 'Debes enviar al menos un mensaje para iniciar la conversación.',
        });
      }

      const sanitized = messages
        .filter(
          (m) =>
            m &&
            (m.role === 'user' || m.role === 'model') &&
            typeof m.text === 'string' &&
            m.text.trim().length > 0
        )
        .slice(-20)
        .map((m) => ({
          role: m.role as 'user' | 'model',
          text: m.text.trim().slice(0, 2000),
        }));

      if (sanitized.length === 0 || sanitized[sanitized.length - 1].role !== 'user') {
        return res.status(400).json({
          error: 'El último mensaje debe ser una consulta válida del usuario.',
        });
      }

      const ai = getGeminiClient();
      const contents = sanitized.map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));

      const attempts: Array<{
        model: 'gemini-3.1-flash-lite' | 'gemini-4-hydrogen';
        useLowThinking: boolean;
      }> = [
        { model: 'gemini-3.1-flash-lite', useLowThinking: false },
        { model: 'gemini-4-hydrogen', useLowThinking: true },
        { model: 'gemini-3.1-flash-lite', useLowThinking: false },
      ];

      let reply: string | undefined;
      const attemptErrors: Array<{ model: string; status?: number; message: string }> = [];

      const withTimeout = <T,>(promise: Promise<T>, ms: number): Promise<T> =>
        Promise.race([
          promise,
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error(`Timeout after ${ms}ms`)), ms)
          ),
        ]);

      for (let i = 0; i < attempts.length; i++) {
        const attempt = attempts[i];
        try {
          const response = await withTimeout(
            ai.models.generateContent({
              model: attempt.model,
              contents,
              config: {
                systemInstruction: SERENA_SYSTEM_INSTRUCTION,
                ...(attempt.useLowThinking
                  ? { thinkingConfig: { thinkingLevel: ThinkingLevel.LOW } }
                  : {}),
              },
            }),
            12000
          );
          reply = response.text?.trim();
          if (reply) break;
        } catch (err: unknown) {
          const errObj = err as { status?: number; message?: string };
          const msg = errObj?.message || '';
          attemptErrors.push({
            model: attempt.model,
            status: errObj?.status,
            message: msg.slice(0, 220),
          });
          const status = errObj?.status;
          const canContinue =
            status === 503 ||
            status === 429 ||
            status === 500 ||
            msg.includes('UNAVAILABLE') ||
            msg.includes('high demand') ||
            msg.includes('Timeout');

          if (!canContinue || i === attempts.length - 1) {
            break;
          }
          const delayMs = 250 * (i + 1);
          await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
      }

      if (!reply) {
        console.error('Fallo en intentos /api/chat:', attemptErrors);
        const hasQuota429 = attemptErrors.some(
          (e) => e.status === 429 || e.message.includes('RESOURCE_EXHAUSTED') || e.message.includes('quota')
        );
        const hasBusy503 = attemptErrors.some(
          (e) =>
            e.status === 503 ||
            e.message.includes('UNAVAILABLE') ||
            e.message.includes('high demand') ||
            e.message.includes('Timeout')
        );

        let errorText =
          'No pudimos procesar tu consulta en este momento. Intenta nuevamente o escribe a serenaadsosoporte@gamil.com.';
        let httpStatus = 500;

        if (hasQuota429 && hasBusy503) {
          httpStatus = 503;
          errorText =
            'El asistente de Gemini está temporalmente saturado (alta demanda) y alcanzó el límite de cuota gratuito. Reintenta en unos momentos, verifica tu clave en Settings > Secrets o escríbenos a serenaadsosoporte@gamil.com.';
        } else if (hasQuota429) {
          httpStatus = 429;
          errorText =
            'Se alcanzó el límite de cuota de la clave API de Gemini configurada. Verifica tu clave/plan en Settings > Secrets o escríbenos a serenaadsosoporte@gamil.com.';
        } else if (hasBusy503) {
          httpStatus = 503;
          errorText =
            'El servicio de asistente está experimentando alta demanda temporal. Por favor intenta de nuevo en unos segundos o escríbenos a serenaadsosoporte@gamil.com.';
        }

        return res.status(httpStatus).json({ error: errorText });
      }

      return res.json({ reply });
    } catch (err: unknown) {
      const errObj = err as { status?: number; message?: string };
      const message = errObj?.message || 'Error inesperado al consultar el asistente.';
      console.error('Error en /api/chat:', { status: errObj?.status, message });
      const isMissingKey = message.includes('GEMINI_API_KEY');
      return res.status(isMissingKey ? 503 : 500).json({
        error: isMissingKey
          ? 'El asistente no tiene clave de servicio configurada en este entorno. Comunícate a serenaadsosoporte@gamil.com.'
          : 'No pudimos procesar tu consulta en este momento. Intenta nuevamente o escribe a serenaadsosoporte@gamil.com.',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      const indexFile = path.join(distPath, 'index.html');
      if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
      } else {
        res.status(404).send('Build not found');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SERENA Help Center listening on http://localhost:${PORT}`);
  });
}

startServer();
