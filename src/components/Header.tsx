import React, { useState } from 'react';
import { BsGlobe2, BsList, BsMoon, BsSun, BsXLg } from 'react-icons/bs';
import { SectionId } from '../data/faqData';
import { SerenaVectorLogo } from './SerenaVectorLogo';

interface HeaderProps {
  activeSection: SectionId;
  onNavigate: (section: SectionId) => void;
  isDark: boolean;
  onToggleDark: () => void;
  lang: 'es' | 'en';
  onToggleLang: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  isDark,
  onToggleDark,
  lang,
  onToggleLang,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: SectionId; labelEs: string; labelEn: string }[] = [
    {
      id: 'developers',
      labelEs: 'Ayuda para desarrolladores',
      labelEn: 'Developer Help',
    },
    {
      id: 'users',
      labelEs: 'Ayuda para usuarios',
      labelEn: 'User Help',
    },
    {
      id: 'brand',
      labelEs: 'Guía de marca',
      labelEn: 'Brand Guide',
    },
    {
      id: 'submit',
      labelEs: 'Enviar una solicitud',
      labelEn: 'Submit a Request',
    },
  ];

  const handleSelect = (id: SectionId) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#0B0B0F]/95 backdrop-blur-sm border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 h-[74px] flex items-center justify-between gap-4">
        {/* Brand Logo: Vectorized SVG Tree+Figure + SERENA */}
        <button
          type="button"
          onClick={() => handleSelect('home')}
          className="flex items-center gap-2 shrink-0 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7E22CE] rounded-lg py-1 pr-2"
          aria-label="SERENA Centro de Ayuda"
        >
          <SerenaVectorLogo className="w-10 h-9 text-[#450066] dark:text-[#C084FC] shrink-0 transition-transform group-hover:scale-105" />
          <span className="text-[22px] font-extrabold tracking-tight text-[#7E22CE] dark:text-[#C084FC] whitespace-nowrap">
            serena
          </span>
        </button>

        {/* Desktop Nav Links */}
        <nav
          aria-label={lang === 'es' ? 'Navegación principal' : 'Primary navigation'}
          className="hidden lg:flex items-center justify-center gap-7 flex-1"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelect(item.id)}
                className={`relative py-2 text-[13.5px] font-semibold whitespace-nowrap shrink-0 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7E22CE] rounded ${
                  isActive
                    ? 'text-[#7E22CE] dark:text-[#C084FC]'
                    : 'text-[#0F172A] dark:text-slate-200 hover:text-[#7E22CE] dark:hover:text-[#C084FC]'
                }`}
              >
                {lang === 'es' ? item.labelEs : item.labelEn}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#7E22CE] dark:bg-[#C084FC] rounded-full"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Theme Toggle + Language Box */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onToggleDark}
            aria-label={
              isDark
                ? lang === 'es'
                  ? 'Cambiar a modo claro'
                  : 'Switch to light mode'
                : lang === 'es'
                  ? 'Cambiar a modo oscuro'
                  : 'Switch to dark mode'
            }
            title={
              isDark
                ? lang === 'es'
                  ? 'Modo claro'
                  : 'Light mode'
                : lang === 'es'
                  ? 'Modo oscuro'
                  : 'Dark mode'
            }
            className="w-10 h-10 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#14141B] text-[#0F172A] dark:text-slate-100 hover:border-[#7E22CE] dark:hover:border-[#A855F7] hover:text-[#7E22CE] dark:hover:text-[#C084FC] flex items-center justify-center transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7E22CE]"
          >
            {isDark ? <BsSun className="w-4 h-4" /> : <BsMoon className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={onToggleLang}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 h-10 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#14141B] text-[13px] font-semibold text-[#0F172A] dark:text-slate-100 hover:border-[#7E22CE] dark:hover:border-[#A855F7] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7E22CE]"
          >
            <BsGlobe2 className="w-3.5 h-3.5 text-[#7E22CE] dark:text-[#C084FC]" />
            <span>{lang === 'es' ? 'Español (CO)' : 'English (US)'}</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={lang === 'es' ? 'Abrir menú' : 'Open menu'}
            className="lg:hidden w-10 h-10 rounded-md border border-slate-300 dark:border-slate-700 flex items-center justify-center text-[#0F172A] dark:text-slate-100 cursor-pointer"
          >
            {mobileMenuOpen ? <BsXLg className="w-4 h-4" /> : <BsList className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0B0F] px-4 py-4 space-y-2">
          <button
            type="button"
            onClick={() => handleSelect('home')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold cursor-pointer ${
              activeSection === 'home'
                ? 'bg-[#F3E8FF] text-[#7E22CE] dark:bg-[#7E22CE]/20 dark:text-[#C084FC]'
                : 'text-[#0F172A] dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {lang === 'es' ? 'Inicio' : 'Home'}
          </button>
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelect(item.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold cursor-pointer ${
                activeSection === item.id
                  ? 'bg-[#F3E8FF] text-[#7E22CE] dark:bg-[#7E22CE]/20 dark:text-[#C084FC]'
                  : 'text-[#0F172A] dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {lang === 'es' ? item.labelEs : item.labelEn}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={onToggleLang}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-slate-300 dark:border-slate-700 text-xs font-semibold text-[#0F172A] dark:text-slate-100 cursor-pointer"
            >
              <BsGlobe2 className="w-3.5 h-3.5 text-[#7E22CE] dark:text-[#C084FC]" />
              <span>{lang === 'es' ? 'Español (CO)' : 'English (US)'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
