import React, { useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { FAQ_ITEMS, SectionId } from '../data/faqData';
import { FaqAccordionList } from './FaqAccordionList';

interface CategoryHelpViewProps {
  mode: 'users' | 'developers';
  onNavigate: (section: SectionId) => void;
  lang: 'es' | 'en';
}

export const CategoryHelpView: React.FC<CategoryHelpViewProps> = ({
  mode,
  onNavigate,
  lang,
}) => {
  const [subFilter, setSubFilter] = useState<string>('all');

  const userTabs = [
    { id: 'all', es: 'Todas', en: 'All' },
    { id: 'acceso', es: 'Acceso y Cuenta', en: 'Access & Account' },
    { id: 'animo-diario', es: 'Ánimo y Diario', en: 'Mood & Journal' },
    { id: 'citas-comunidad', es: 'Citas y Comunidad', en: 'Appointments & Posts' },
    { id: 'psicologos', es: 'Psicólogos', en: 'Psychologists' },
    { id: 'sos-config', es: 'SOS y Preferencias', en: 'SOS & Settings' },
  ];

  const devTabs = [
    { id: 'all', es: 'Todas', en: 'All' },
    { id: 'arquitectura', es: 'Arquitectura', en: 'Architecture' },
    { id: 'frontend', es: 'Frontend & Proxy', en: 'Frontend & Proxy' },
    { id: 'backend-api', es: 'Backend .NET y API', en: '.NET API' },
    { id: 'database', es: 'SQL Server', en: 'SQL Server' },
    { id: 'docker-deploy', es: 'Docker y Local', en: 'Docker & Local' },
    { id: 'seguridad', es: 'Auditoría y Seguridad', en: 'Security Audit' },
  ];

  const tabs = mode === 'users' ? userTabs : devTabs;
  const allItems = FAQ_ITEMS.filter((item) => item.category === mode);
  const filteredItems =
    subFilter === 'all'
      ? allItems
      : allItems.filter((item) => item.subcategory === subFilter);

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
          {mode === 'users'
            ? lang === 'es'
              ? 'Ayuda para usuarios'
              : 'User Help'
            : lang === 'es'
              ? 'Ayuda para desarrolladores'
              : 'Developer Help'}
        </span>
      </div>

      <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <h1 className="text-[28px] sm:text-[32px] font-extrabold tracking-tight text-[#0F172A] dark:text-white leading-tight">
          {mode === 'users'
            ? lang === 'es'
              ? 'Ayuda para usuarios'
              : 'User Help'
            : lang === 'es'
              ? 'Ayuda para desarrolladores'
              : 'Developer Help'}
        </h1>
        <p className="mt-1.5 text-[15px] text-slate-600 dark:text-slate-300 max-w-2xl">
          {mode === 'users'
            ? lang === 'es'
              ? 'Manual completo para aprendices y psicólogos/orientadores sobre registro, ánimo, diario privado, citas, comunidad y SOS.'
              : 'Complete manual for apprentices and counselors covering registration, mood tracking, private journal, appointments, and SOS.'
            : lang === 'es'
              ? 'Documentación técnica de arquitectura SPA + ASP.NET Core .NET 8, SQL Server, Docker Compose y auditoría de seguridad.'
              : 'Technical documentation for SPA + ASP.NET Core .NET 8 architecture, SQL Server, Docker Compose, and security audit.'}
        </p>
      </div>

      <div className="mt-6 mb-7 flex flex-wrap items-center gap-2">
        {tabs.map((tab) => {
          const active = subFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSubFilter(tab.id)}
              className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                active
                  ? 'bg-[#7E22CE] text-white'
                  : 'bg-slate-100 dark:bg-[#14141B] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-[#7E22CE]/50'
              }`}
            >
              {lang === 'es' ? tab.es : tab.en}
            </button>
          );
        })}
      </div>

      <FaqAccordionList
        items={filteredItems}
        lang={lang}
        defaultOpenId={filteredItems[0]?.id}
      />
    </section>
  );
};
