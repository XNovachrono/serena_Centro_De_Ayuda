import React from 'react';
import { BsChevronUp } from 'react-icons/bs';
import { SectionId } from '../data/faqData';
import { SerenaVectorLogo } from './SerenaVectorLogo';

interface FooterProps {
  onNavigate: (section: SectionId) => void;
  lang: 'es' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, lang }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0B0F] transition-colors">
      <div className="max-w-[960px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-start">
          {/* Left Vectorized Logo Mark matching Reddit footer */}
          <div className="sm:col-span-4 flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="flex items-center gap-2 cursor-pointer group"
              aria-label="Volver al inicio de SERENA"
            >
              <SerenaVectorLogo className="w-9 h-8 text-[#450066] dark:text-[#C084FC] shrink-0" />
              <span className="text-lg font-extrabold tracking-tight text-[#7E22CE] dark:text-[#C084FC]">
                serena
              </span>
            </button>
          </div>

          {/* Column 1: Plataforma */}
          <div className="sm:col-span-4 space-y-2.5 text-[13.5px]">
            <h3 className="font-bold text-[#0F172A] dark:text-white mb-3">
              {lang === 'es' ? 'Plataforma' : 'Platform'}
            </h3>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('users')}
                  className="hover:text-[#7E22CE] dark:hover:text-[#C084FC] transition-colors cursor-pointer"
                >
                  {lang === 'es' ? 'Acerca de SERENA' : 'About SERENA'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('users')}
                  className="hover:text-[#7E22CE] dark:hover:text-[#C084FC] transition-colors cursor-pointer"
                >
                  {lang === 'es' ? 'Guía para Aprendices' : 'Apprentice Guide'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('users')}
                  className="hover:text-[#7E22CE] dark:hover:text-[#C084FC] transition-colors cursor-pointer"
                >
                  {lang === 'es'
                    ? 'Guía para Psicólogos'
                    : 'Psychologist Guide'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('users')}
                  className="hover:text-[#7E22CE] dark:hover:text-[#C084FC] transition-colors cursor-pointer"
                >
                  {lang === 'es'
                    ? 'Botón de Emergencia SOS'
                    : 'SOS Emergency Button'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('submit')}
                  className="hover:text-[#7E22CE] dark:hover:text-[#C084FC] transition-colors cursor-pointer"
                >
                  {lang === 'es'
                    ? 'Bienestar al Aprendiz (CMTC)'
                    : 'Student Wellness (CMTC)'}
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Recursos */}
          <div className="sm:col-span-4 space-y-2.5 text-[13.5px]">
            <h3 className="font-bold text-[#0F172A] dark:text-white mb-3">
              {lang === 'es' ? 'Recursos' : 'Resources'}
            </h3>
            <ul className="space-y-2 text-slate-600 dark:text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('users')}
                  className="hover:text-[#7E22CE] dark:hover:text-[#C084FC] transition-colors cursor-pointer"
                >
                  {lang === 'es' ? 'Ayuda para usuarios' : 'User Help'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('developers')}
                  className="hover:text-[#7E22CE] dark:hover:text-[#C084FC] transition-colors cursor-pointer"
                >
                  {lang === 'es'
                    ? 'Ayuda para desarrolladores'
                    : 'Developer Help'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('brand')}
                  className="hover:text-[#7E22CE] dark:hover:text-[#C084FC] transition-colors cursor-pointer"
                >
                  {lang === 'es'
                    ? 'Manual de Identidad de Marca'
                    : 'Brand Identity Guide'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('submit')}
                  className="hover:text-[#7E22CE] dark:hover:text-[#C084FC] transition-colors cursor-pointer"
                >
                  {lang === 'es' ? 'Enviar una solicitud' : 'Submit a request'}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-100 dark:border-slate-800/70 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <span>
            SERENA — Tu compañera Digital para el bienestar emocional · SENA CMTC
          </span>
          <span>Soporte: serenaadsosoporte@gamil.com · Líneas 106 / 123</span>
        </div>
      </div>

      {/* Bottom-left back-to-top square button matching Reddit footer */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label={lang === 'es' ? 'Volver arriba' : 'Back to top'}
        title={lang === 'es' ? 'Volver arriba' : 'Back to top'}
        className="fixed bottom-5 left-5 z-30 w-10 h-10 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#14141B] text-[#7E22CE] dark:text-[#C084FC] hover:border-[#7E22CE] dark:hover:border-[#A855F7] shadow-sm flex items-center justify-center transition-colors cursor-pointer"
      >
        <BsChevronUp className="w-4 h-4" />
      </button>
    </footer>
  );
};
