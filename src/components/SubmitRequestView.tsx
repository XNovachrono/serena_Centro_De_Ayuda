import React, { useState } from 'react';
import {
  BsArrowLeft,
  BsCheckCircle,
  BsShieldExclamation,
  BsTelephone,
} from 'react-icons/bs';
import { SectionId } from '../data/faqData';

interface SubmitRequestViewProps {
  onNavigate: (section: SectionId) => void;
  lang: 'es' | 'en';
}

export const SubmitRequestView: React.FC<SubmitRequestViewProps> = ({
  onNavigate,
  lang,
}) => {
  const [requestType, setRequestType] = useState('usuario');
  const [role, setRole] = useState('Aprendiz');
  const [center, setCenter] = useState('Centro de Metalmecánica (CMTC)');
  const [ficha, setFicha] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<{
    id: string;
    subject: string;
    email: string;
    type: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !subject.trim() || !description.trim()) {
      setError(
        lang === 'es'
          ? 'Por favor completa tu nombre, correo electrónico, asunto y descripción.'
          : 'Please complete your name, email address, subject, and description.'
      );
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      setError(
        lang === 'es'
          ? 'Ingresa un correo electrónico válido.'
          : 'Please enter a valid email address.'
      );
      return;
    }

    setError('');
    const ticketNumber = `SER-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedTicket({
      id: ticketNumber,
      subject: subject.trim(),
      email: email.trim(),
      type: requestType,
    });
  };

  const resetForm = () => {
    setSubmittedTicket(null);
    setSubject('');
    setDescription('');
    setError('');
  };

  return (
    <section className="max-w-[820px] mx-auto px-6 py-10 md:py-14">
      <div className="mb-6 flex items-center gap-2 text-[13px] font-medium text-slate-500 dark:text-slate-400">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="inline-flex items-center gap-1.5 text-[#7E22CE] dark:text-[#C084FC] hover:underline cursor-pointer"
        >
          <BsArrowLeft className="w-3.5 h-3.5" />
          <span>{lang === 'es' ? 'Centro de ayuda' : 'Help Center'}</span>
        </button>
        <span aria-hidden="true">/</span>
        <span>{lang === 'es' ? 'Enviar una solicitud' : 'Submit a request'}</span>
      </div>

      <h1 className="text-[28px] sm:text-[34px] font-extrabold tracking-tight text-[#0F172A] dark:text-white">
        {lang === 'es' ? 'Enviar una solicitud' : 'Submit a request'}
      </h1>
      <p className="mt-2 text-[15px] text-slate-600 dark:text-slate-300">
        {lang === 'es'
          ? '¿Tienes dudas sobre tu cuenta, citas, diario personal, integración de API o identidad de marca? Envíanos tu consulta o escríbenos a serenaadsosoporte@gamil.com.'
          : 'Have questions about your account, appointments, journal, API integration, or brand guidelines? Send us your request or write to serenaadsosoporte@gamil.com.'}
      </p>

      <div className="mt-6 rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50/80 dark:bg-red-950/25 p-4.5 flex items-start gap-3.5">
        <BsShieldExclamation className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
        <div className="text-[13.5px] text-red-950 dark:text-red-200 space-y-1">
          <p className="font-bold">
            {lang === 'es'
              ? '¿Necesitas atención emocional inmediata o estás en crisis?'
              : 'Need immediate emotional support or in crisis?'}
          </p>
          <p className="opacity-90">
            {lang === 'es'
              ? 'Este formulario es para soporte técnico y orientación general. No envía asistencia de emergencia en tiempo real. Si estás en riesgo inminente, llama de inmediato a la Línea 106, Línea 123 o acude al centro de salud más cercano.'
              : 'This form is for technical support and general inquiries. It does not dispatch emergency help. In an urgent crisis, call Line 106 or 123 immediately.'}
          </p>
          <div className="pt-1 flex flex-wrap items-center gap-4 font-semibold text-red-700 dark:text-red-300">
            <a href="tel:106" className="inline-flex items-center gap-1.5 hover:underline">
              <BsTelephone className="w-3.5 h-3.5" />
              <span>Línea 106</span>
            </a>
            <a href="tel:123" className="inline-flex items-center gap-1.5 hover:underline">
              <BsTelephone className="w-3.5 h-3.5" />
              <span>Línea 123</span>
            </a>
          </div>
        </div>
      </div>

      {submittedTicket ? (
        <div className="mt-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#14141B] p-8 sm:p-10 shadow-sm text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-[#39A900] dark:text-emerald-400 flex items-center justify-center">
            <BsCheckCircle className="w-7 h-7" />
          </div>
          <h2 className="text-2xl font-extrabold text-[#0F172A] dark:text-white">
            {lang === 'es'
              ? 'Solicitud registrada correctamente'
              : 'Request submitted successfully'}
          </h2>
          <p className="text-[14.5px] text-slate-600 dark:text-slate-300 max-w-md mx-auto">
            {lang === 'es' ? (
              <>
                Hemos recibido tu solicitud{' '}
                <span className="font-mono font-bold text-[#7E22CE] dark:text-[#C084FC]">
                  {submittedTicket.id}
                </span>{' '}
                sobre &ldquo;{submittedTicket.subject}&rdquo;. Te responderemos al correo{' '}
                <span className="font-semibold text-[#0F172A] dark:text-white">
                  {submittedTicket.email}
                </span>
                .
              </>
            ) : (
              <>
                We received your ticket{' '}
                <span className="font-mono font-bold text-[#7E22CE] dark:text-[#C084FC]">
                  {submittedTicket.id}
                </span>{' '}
                regarding &ldquo;{submittedTicket.subject}&rdquo;. We will follow up at{' '}
                <span className="font-semibold text-[#0F172A] dark:text-white">
                  {submittedTicket.email}
                </span>
                .
              </>
            )}
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={resetForm}
              className="rounded-full bg-[#7E22CE] hover:bg-[#6B21A8] text-white font-semibold text-sm px-6 py-2.5 transition-colors cursor-pointer"
            >
              {lang === 'es' ? 'Enviar otra solicitud' : 'Submit another request'}
            </button>
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="rounded-full border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-[#0F172A] dark:text-slate-100 font-semibold text-sm px-6 py-2.5 transition-colors cursor-pointer"
            >
              {lang === 'es' ? 'Volver al inicio' : 'Back to home'}
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#14141B] p-6 sm:p-8 shadow-sm space-y-5"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="req-type"
                className="block text-[13.5px] font-semibold text-[#0F172A] dark:text-slate-100 mb-1.5"
              >
                {lang === 'es' ? 'Área de ayuda' : 'Help area'}
              </label>
              <select
                id="req-type"
                value={requestType}
                onChange={(e) => setRequestType(e.target.value)}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0B0F] px-3.5 py-2.5 text-sm text-[#0F172A] dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#7E22CE]"
              >
                <option value="usuario">
                  {lang === 'es'
                    ? 'Ayuda para usuarios (Cuenta, Ánimo, Diario, Citas)'
                    : 'User Help (Account, Mood, Journal, Appointments)'}
                </option>
                <option value="desarrollador">
                  {lang === 'es'
                    ? 'Ayuda para desarrolladores (API .NET, SQL, Docker, Seguridad)'
                    : 'Developer Help (.NET API, SQL, Docker, Security)'}
                </option>
                <option value="psicologo">
                  {lang === 'es'
                    ? 'Orientación / Panel de Psicólogos y Fichas'
                    : 'Counselor Dashboard & Cohort Tracking'}
                </option>
                <option value="marca">
                  {lang === 'es'
                    ? 'Identidad de Marca y Material Institucional'
                    : 'Brand Identity & Institutional Assets'}
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="req-role"
                className="block text-[13.5px] font-semibold text-[#0F172A] dark:text-slate-100 mb-1.5"
              >
                {lang === 'es' ? 'Tu perfil en SERENA' : 'Your SERENA role'}
              </label>
              <select
                id="req-role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0B0F] px-3.5 py-2.5 text-sm text-[#0F172A] dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#7E22CE]"
              >
                <option value="Aprendiz">Aprendiz SENA</option>
                <option value="Psicólogo">Psicólogo / Orientador</option>
                <option value="Desarrollador">Desarrollador / Soporte Técnico</option>
                <option value="Administrador">Administrador / Bienestar</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="req-center"
                className="block text-[13.5px] font-semibold text-[#0F172A] dark:text-slate-100 mb-1.5"
              >
                {lang === 'es' ? 'Centro de Formación SENA' : 'SENA Training Center'}
              </label>
              <select
                id="req-center"
                value={center}
                onChange={(e) => setCenter(e.target.value)}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0B0F] px-3.5 py-2.5 text-sm text-[#0F172A] dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-[#7E22CE]"
              >
                <option value="Centro de Metalmecánica (CMTC)">
                  Centro de Metalmecánica (CMTC)
                </option>
                <option value="Centro de Materiales y Ensayos (CMM)">
                  Centro de Materiales y Ensayos (CMM)
                </option>
                <option value="Centro de Electricidad, Electrónica y Telecomunicaciones (CEET)">
                  Centro CEET
                </option>
                <option value="Otro Centro SENA">Otro Centro SENA</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="req-ficha"
                className="block text-[13.5px] font-semibold text-[#0F172A] dark:text-slate-100 mb-1.5"
              >
                {lang === 'es'
                  ? 'Número de Ficha (opcional)'
                  : 'Cohort / Ficha number (optional)'}
              </label>
              <input
                id="req-ficha"
                type="text"
                value={ficha}
                onChange={(e) => setFicha(e.target.value)}
                placeholder="Ej. 2670123"
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0B0F] px-3.5 py-2.5 text-sm text-[#0F172A] dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7E22CE]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="req-name"
                className="block text-[13.5px] font-semibold text-[#0F172A] dark:text-slate-100 mb-1.5"
              >
                {lang === 'es' ? 'Nombre completo *' : 'Full name *'}
              </label>
              <input
                id="req-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={lang === 'es' ? 'Tu nombre' : 'Your name'}
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0B0F] px-3.5 py-2.5 text-sm text-[#0F172A] dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7E22CE]"
              />
            </div>

            <div>
              <label
                htmlFor="req-email"
                className="block text-[13.5px] font-semibold text-[#0F172A] dark:text-slate-100 mb-1.5"
              >
                {lang === 'es' ? 'Correo electrónico *' : 'Email address *'}
              </label>
              <input
                id="req-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nombre@soy.sena.edu.co"
                className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0B0F] px-3.5 py-2.5 text-sm text-[#0F172A] dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7E22CE]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="req-subject"
              className="block text-[13.5px] font-semibold text-[#0F172A] dark:text-slate-100 mb-1.5"
            >
              {lang === 'es' ? 'Asunto *' : 'Subject *'}
            </label>
            <input
              id="req-subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder={
                lang === 'es'
                  ? 'Ej. No puedo confirmar mi cita / Error CORS en API .NET'
                  : 'E.g. Cannot confirm appointment / .NET API CORS error'
              }
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0B0F] px-3.5 py-2.5 text-sm text-[#0F172A] dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7E22CE]"
            />
          </div>

          <div>
            <label
              htmlFor="req-desc"
              className="block text-[13.5px] font-semibold text-[#0F172A] dark:text-slate-100 mb-1.5"
            >
              {lang === 'es' ? 'Descripción detallada *' : 'Detailed description *'}
            </label>
            <textarea
              id="req-desc"
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={
                lang === 'es'
                  ? 'Cuéntanos qué ocurrió, pasos para reproducirlo o en qué módulo de SERENA necesitas apoyo...'
                  : 'Describe what happened, steps to reproduce, or which SERENA module you need help with...'
              }
              className="w-full rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#0B0B0F] px-3.5 py-2.5 text-sm text-[#0F172A] dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7E22CE]"
            />
          </div>

          {error && (
            <p className="text-sm font-medium text-red-600 dark:text-red-400">
              {error}
            </p>
          )}

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="rounded-full border border-slate-300 dark:border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {lang === 'es' ? 'Cancelar' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="rounded-full bg-[#0F172A] hover:bg-black dark:bg-[#7E22CE] dark:hover:bg-[#9333EA] text-white font-bold text-sm px-7 py-2.5 transition-colors cursor-pointer"
            >
              {lang === 'es' ? 'Enviar solicitud' : 'Submit request'}
            </button>
          </div>
        </form>
      )}
    </section>
  );
};
