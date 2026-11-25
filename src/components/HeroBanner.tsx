import React from 'react';
import { BsSearch, BsXLg } from 'react-icons/bs';
import { MASCOT_IMAGE_URL } from '../data/faqData';

interface HeroBannerProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  hasNoResults: boolean;
  onOpenChatbot: () => void;
  lang: 'es' | 'en';
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  hasNoResults,
  onOpenChatbot,
  lang,
}) => {
  return (
    <section className="relative w-full bg-[#7E22CE] overflow-hidden">
      <div className="max-w-[1040px] mx-auto px-6 pt-12 pb-20 md:pt-14 md:pb-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-8">
          {/* Left Headline & Search */}
          <div className="md:col-span-7">
            <h1 className="text-white font-extrabold text-[2.35rem] sm:text-[2.85rem] md:text-[3.2rem] leading-[1.08] tracking-tight max-w-[440px]">
              {lang === 'es' ? (
                <>
                  ¿En qué
                  <br />
                  podemos
                  <br />
                  ayudarte hoy?
                </>
              ) : (
                <>
                  How can
                  <br />
                  we help
                  <br />
                  you today?
                </>
              )}
            </h1>

            <p className="mt-3.5 text-[15px] sm:text-[15.5px] font-medium text-white/90">
              {lang === 'es'
                ? 'Te damos la bienvenida al Centro de ayuda de SERENA'
                : 'Welcome to the SERENA Help Center'}
            </p>

            {/* Pill Search Bar matching Reddit Help Center */}
            <form onSubmit={onSearchSubmit} className="mt-7 max-w-[540px]">
              <div className="flex items-center bg-white dark:bg-[#14141B] rounded-full p-1.5 pl-5 shadow-[0_6px_24px_rgba(0,0,0,0.16)] border border-transparent focus-within:ring-2 focus-within:ring-white/70">
                <BsSearch
                  className="w-4 h-4 text-slate-600 dark:text-slate-300 mr-3 shrink-0"
                  aria-hidden="true"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder={
                    lang === 'es'
                      ? 'como funciona el diario, citas, API, JWT...'
                      : 'how journals work, appointments, API, JWT...'
                  }
                  aria-label={
                    lang === 'es'
                      ? 'Buscar en el Centro de ayuda de SERENA'
                      : 'Search the SERENA Help Center'
                  }
                  className="flex-1 bg-transparent text-[14.5px] text-[#0F172A] dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none min-w-0"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => onSearchChange('')}
                    aria-label={lang === 'es' ? 'Limpiar búsqueda' : 'Clear search'}
                    className="p-1.5 mr-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                  >
                    <BsXLg className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-[#0F172A] hover:bg-black dark:bg-[#7E22CE] dark:hover:bg-[#9333EA] text-white font-bold text-[13.5px] px-7 py-2.5 rounded-full transition-colors cursor-pointer shrink-0 whitespace-nowrap"
                >
                  {lang === 'es' ? 'Buscar' : 'Search'}
                </button>
              </div>

              {/* Small prompt shown when search yields zero matches */}
              {hasNoResults && (
                <p className="mt-2.5 pl-4 text-[12.5px] text-white/95">
                  {lang === 'es'
                    ? '¿No encontraste lo que buscabas? '
                    : "Didn't find what you were looking for? "}
                  <button
                    type="button"
                    onClick={onOpenChatbot}
                    className="font-bold underline underline-offset-2 text-white hover:text-[#F3E8FF] cursor-pointer"
                  >
                    {lang === 'es' ? 'Intenta aquí' : 'Try here'}
                  </button>
                </p>
              )}
            </form>
          </div>

          {/* Right Mascot inside Speech Bubble Container */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="relative">
              <div className="relative w-[235px] h-[235px] sm:w-[270px] sm:h-[260px] rounded-[2.25rem] bg-[#FAF9FF] shadow-[0_14px_34px_rgba(15,23,42,0.22)] flex items-center justify-center p-3">
                <img
                  src={MASCOT_IMAGE_URL}
                  alt={
                    lang === 'es'
                      ? 'Mascota de SERENA con signo de interrogación'
                      : 'SERENA mascot with question mark'
                  }
                  className="w-full h-full object-contain mix-blend-multiply select-none"
                  referrerPolicy="no-referrer"
                />
                <span
                  aria-hidden="true"
                  className="absolute -bottom-3 left-7 w-7 h-7 bg-[#FAF9FF] rotate-45 rounded-br-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Signature Reddit-style slanted diagonal bottom cut */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none leading-none">
        <svg
          viewBox="0 0 1440 72"
          preserveAspectRatio="none"
          className="w-full h-10 sm:h-14 block"
          aria-hidden="true"
        >
          <polygon
            points="0,48 1440,6 1440,72 0,72"
            className="fill-[#A855F7]/35 dark:fill-[#581C87]/70"
          />
          <polygon
            points="0,66 1440,22 1440,72 0,72"
            className="fill-white dark:fill-[#0B0B0F]"
          />
        </svg>
      </div>
    </section>
  );
};
