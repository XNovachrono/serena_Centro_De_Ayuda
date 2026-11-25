import React, { useState } from 'react';
import { BsArrowLeft, BsCheck2, BsClipboard } from 'react-icons/bs';
import { FAQ_ITEMS, SectionId } from '../data/faqData';
import { FaqAccordionList } from './FaqAccordionList';

interface BrandGuideViewProps {
  onNavigate: (section: SectionId) => void;
  lang: 'es' | 'en';
}

const COLOR_TOKENS = [
  {
    name: 'SERENA Purple',
    hex: '#7E22CE',
    role: 'Color principal, CTAs, encabezados e iconos activos',
    textLight: true,
  },
  {
    name: 'Deep Velvet',
    hex: '#581C87',
    role: 'Énfasis alto, barras oscuras y texto sobre lavanda',
    textLight: true,
  },
  {
    name: 'Soft Lavender',
    hex: '#F3E8FF',
    role: 'Fondos secundarios y resaltados suaves',
    textLight: false,
  },
  {
    name: 'Pure Tint',
    hex: '#FAF9FF',
    role: 'Canvas claro de aplicación',
    textLight: false,
  },
  {
    name: 'Verde Esperanza',
    hex: '#39A900',
    role: 'Confirmaciones, citas aprobadas y balance',
    textLight: true,
  },
  {
    name: 'Alerta SOS',
    hex: '#DC2626',
    role: 'Botón de emergencia y avisos críticos',
    textLight: true,
  },
];

export const BrandGuideView: React.FC<BrandGuideViewProps> = ({
  onNavigate,
  lang,
}) => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const brandFaqs = FAQ_ITEMS.filter((item) => item.category === 'brand');

  const copyColor = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 1500);
    } catch {
      // Ignore clipboard restriction
    }
  };

  return (
    <section className="max-w-[960px] mx-auto px-6 py-10 md:py-14">
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
        <span>
          {lang === 'es'
            ? 'Manual de Identidad de Marca'
            : 'Brand Identity Guide'}
        </span>
      </div>

      <h1 className="text-[28px] sm:text-[34px] font-extrabold tracking-tight text-[#0F172A] dark:text-white">
        {lang === 'es'
          ? 'Manual de Identidad de Marca SERENA'
          : 'SERENA Brand Identity Guide'}
      </h1>
      <p className="mt-2 text-[15px] text-slate-600 dark:text-slate-300 max-w-2xl">
        {lang === 'es'
          ? 'Lineamientos oficiales de paleta cromática, tipografía Plus Jakarta Sans, tono de voz y convivencia institucional con el SENA.'
          : 'Official guidelines for SERENA’s color palette, Plus Jakarta Sans typography, tone of voice, and SENA institutional coexistence.'}
      </p>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {COLOR_TOKENS.map((token) => (
          <button
            key={token.hex}
            type="button"
            onClick={() => copyColor(token.hex)}
            className="text-left rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#14141B] overflow-hidden hover:border-[#7E22CE]/60 transition-colors cursor-pointer group"
          >
            <div
              className="h-20 px-4 py-3 flex items-end justify-between"
              style={{ backgroundColor: token.hex }}
            >
              <span
                className={`font-mono text-xs font-semibold ${
                  token.textLight ? 'text-white' : 'text-[#0F172A]'
                }`}
              >
                {token.hex}
              </span>
              <span
                className={`inline-flex items-center gap-1 text-xs font-medium ${
                  token.textLight ? 'text-white/90' : 'text-[#0F172A]/80'
                }`}
              >
                {copiedHex === token.hex ? (
                  <>
                    <BsCheck2 className="w-3.5 h-3.5" />
                    <span>{lang === 'es' ? 'Copiado' : 'Copied'}</span>
                  </>
                ) : (
                  <>
                    <BsClipboard className="w-3.5 h-3.5 opacity-75 group-hover:opacity-100" />
                    <span>{lang === 'es' ? 'Copiar' : 'Copy'}</span>
                  </>
                )}
              </span>
            </div>
            <div className="p-4">
              <p className="font-bold text-sm text-[#0F172A] dark:text-white">
                {token.name}
              </p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                {token.role}
              </p>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-[22px] font-extrabold text-[#0F172A] dark:text-white mb-5">
          {lang === 'es'
            ? 'Preguntas sobre identidad y comunicación'
            : 'Brand and communication questions'}
        </h2>
        <FaqAccordionList
          items={brandFaqs}
          lang={lang}
          defaultOpenId={brandFaqs[0]?.id}
        />
      </div>
    </section>
  );
};
