/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useMemo, useState } from 'react';
import { BsTerminal } from 'react-icons/bs';
import { BrandGuideView } from './components/BrandGuideView';
import { CategoryHelpView } from './components/CategoryHelpView';
import { ContactCard } from './components/ContactCard';
import { FaqAccordionList } from './components/FaqAccordionList';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { SerenaChatbotModal } from './components/SerenaChatbotModal';
import { SubmitRequestView } from './components/SubmitRequestView';
import { FAQ_ITEMS, MASCOT_IMAGE_URL, SectionId } from './data/faqData';

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionId>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [chatbotInitialQuery, setChatbotInitialQuery] = useState('');
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('serena-help-theme');
      return saved === 'dark';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('serena-help-theme', isDark ? 'dark' : 'light');
    } catch {
      // Ignore storage error
    }
  }, [isDark]);

  const handleNavigate = (section: SectionId) => {
    setActiveSection(section);
    if (section !== 'home') {
      setSearchQuery('');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeSection !== 'home') {
      setActiveSection('home');
    }
    const target = document.getElementById('faq-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const searchResults = useMemo(() => {
    if (!normalizedQuery) return [];
    const stripAccents = (str: string) =>
      str
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();

    const stopwords = new Set([
      'el', 'la', 'los', 'las', 'un', 'una', 'unos', 'unas',
      'de', 'del', 'en', 'y', 'o', 'a', 'al', 'para', 'por', 'con',
      'que', 'como', 'cual', 'cuales', 'quien', 'donde', 'cuando',
      'es', 'son', 'esta', 'estan', 'funciona', 'funcionan', 'sirve',
      'se', 'me', 'mi', 'tu', 'su', 'lo', 'le', 'sobre', 'acerca',
      'the', 'is', 'are', 'how', 'what', 'does', 'work', 'to', 'of', 'in', 'a', 'an',
    ]);

    const rawTokens = stripAccents(normalizedQuery)
      .split(/[^a-z0-9#]+/)
      .filter((t) => t.length > 1);
    const meaningfulTokens = rawTokens.filter((t) => !stopwords.has(t));
    const tokensToMatch = meaningfulTokens.length > 0 ? meaningfulTokens : rawTokens;

    if (tokensToMatch.length === 0) return [];

    return FAQ_ITEMS.filter((item) => {
      const haystack = stripAccents(
        [
          item.question,
          item.questionEn,
          item.summary,
          item.summaryEn,
          ...item.paragraphs,
          ...(item.bullets || []),
          ...(item.steps || []),
          ...item.keywords,
        ].join(' ')
      );
      return tokensToMatch.every((t) => haystack.includes(t));
    });
  }, [normalizedQuery]);

  const hasNoResults = normalizedQuery.length > 0 && searchResults.length === 0;

  const homeFeaturedFaqs = useMemo(
    () => FAQ_ITEMS.filter((item) => item.featuredOnHome),
    []
  );

  const openChatbotWithQuery = () => {
    setChatbotInitialQuery(searchQuery.trim());
    setChatbotOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0B0B0F] text-[#0F172A] dark:text-[#F8FAFC] transition-colors">
      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isDark={isDark}
        onToggleDark={() => setIsDark((prev) => !prev)}
        lang={lang}
        onToggleLang={() => setLang((prev) => (prev === 'es' ? 'en' : 'es'))}
      />

      <main className="flex-1">
        {activeSection === 'home' && (
          <>
            <HeroBanner
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onSearchSubmit={handleSearchSubmit}
              hasNoResults={hasNoResults}
              onOpenChatbot={openChatbotWithQuery}
              lang={lang}
            />

            {/* Two Primary Category Cards directly replicating Reddit Help Center */}
            {!normalizedQuery && (
              <section className="max-w-[960px] mx-auto px-6 mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Card 1: Ayuda para desarrolladores */}
                  <button
                    type="button"
                    onClick={() => handleNavigate('developers')}
                    className="group bg-white dark:bg-[#14141B] rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_30px_rgba(126,34,206,0.14)] hover:border-[#7E22CE]/50 transition-all p-8 text-center cursor-pointer flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7E22CE]"
                  >
                    <span className="w-14 h-14 rounded-2xl bg-[#F3E8FF] dark:bg-[#7E22CE]/25 text-[#7E22CE] dark:text-[#C084FC] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                      <BsTerminal className="w-6 h-6" />
                    </span>
                    <h2 className="text-[18px] font-extrabold text-[#0F172A] dark:text-white">
                      {lang === 'es'
                        ? 'Ayuda para desarrolladores'
                        : 'Developer Help'}
                    </h2>
                    <p className="mt-2 text-[14px] leading-relaxed text-slate-600 dark:text-slate-300 max-w-sm">
                      {lang === 'es'
                        ? 'Información técnica sobre arquitectura React + .NET 8, endpoints REST, SQL Server, Docker y auditoría de seguridad.'
                        : 'Technical guides on React + .NET 8 architecture, REST endpoints, SQL Server, Docker, and security auditing.'}
                    </p>
                  </button>

                  {/* Card 2: Ayuda para usuarios */}
                  <button
                    type="button"
                    onClick={() => handleNavigate('users')}
                    className="group bg-white dark:bg-[#14141B] rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_30px_rgba(126,34,206,0.14)] hover:border-[#7E22CE]/50 transition-all p-8 text-center cursor-pointer flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7E22CE]"
                  >
                    <span className="w-14 h-14 rounded-2xl bg-[#FAF9FF] dark:bg-[#F3E8FF] border border-[#E9D5FF] overflow-hidden flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                      <img
                        src={MASCOT_IMAGE_URL}
                        alt="Ayuda para usuarios SERENA"
                        className="w-12 h-12 object-contain mix-blend-multiply"
                        referrerPolicy="no-referrer"
                      />
                    </span>
                    <h2 className="text-[18px] font-extrabold text-[#0F172A] dark:text-white">
                      {lang === 'es' ? 'Ayuda para usuarios' : 'User Help'}
                    </h2>
                    <p className="mt-2 text-[14px] leading-relaxed text-slate-600 dark:text-slate-300 max-w-sm">
                      {lang === 'es'
                        ? 'Soporte e información para aprendices y psicólogos sobre registro, estado de ánimo, diario privado, citas y SOS.'
                        : 'Support and guides for apprentices and psychologists covering accounts, mood logs, private journals, appointments, and SOS.'}
                    </p>
                  </button>
                </div>
              </section>
            )}

            {/* Preguntas frecuentes Section */}
            <section
              id="faq-section"
              className="max-w-[960px] mx-auto px-6 mt-14 scroll-mt-24"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
                <h2 className="text-[24px] sm:text-[28px] font-extrabold tracking-tight text-[#0F172A] dark:text-white">
                  {normalizedQuery
                    ? lang === 'es'
                      ? `Resultados para "${searchQuery.trim()}" (${searchResults.length})`
                      : `Results for "${searchQuery.trim()}" (${searchResults.length})`
                    : lang === 'es'
                      ? 'Preguntas frecuentes'
                      : 'Frequently Asked Questions'}
                </h2>
                {normalizedQuery ? (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="text-sm font-semibold text-[#7E22CE] dark:text-[#C084FC] hover:underline cursor-pointer"
                  >
                    {lang === 'es'
                      ? 'Ver preguntas frecuentes'
                      : 'Show all frequent questions'}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleNavigate('users')}
                    className="text-sm font-semibold text-[#7E22CE] dark:text-[#C084FC] hover:underline cursor-pointer"
                  >
                    {lang === 'es'
                      ? 'Explorar todas las preguntas →'
                      : 'Browse all questions →'}
                  </button>
                )}
              </div>

              <FaqAccordionList
                items={normalizedQuery ? searchResults : homeFeaturedFaqs}
                lang={lang}
                defaultOpenId={
                  normalizedQuery && searchResults.length === 1
                    ? searchResults[0].id
                    : null
                }
                onOpenChatbot={openChatbotWithQuery}
              />
            </section>

            {/* 3-Column Manual Cards Section matching Screenshot 3 */}
            <section className="max-w-[960px] mx-auto px-6 mt-14">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <button
                  type="button"
                  onClick={() => handleNavigate('users')}
                  className="text-left rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#14141B] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:border-[#7E22CE]/50 hover:shadow-[0_6px_22px_rgba(126,34,206,0.1)] transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-[16px] font-bold text-[#0F172A] dark:text-white">
                      {lang === 'es' ? 'Manual de Usuario' : 'User Manual'}
                    </h3>
                    <p className="mt-2 text-[13.5px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      {lang === 'es'
                        ? 'Paso a paso para aprendices y orientadores: citas, estado de ánimo, diario y botón SOS.'
                        : 'Step-by-step guide for apprentices and counselors: appointments, mood, journal, and SOS.'}
                    </p>
                  </div>
                  <span className="mt-5 inline-block text-xs font-bold text-[#7E22CE] dark:text-[#C084FC]">
                    {lang === 'es' ? 'Ver guía de usuarios →' : 'Open user guide →'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNavigate('developers')}
                  className="text-left rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#14141B] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:border-[#7E22CE]/50 hover:shadow-[0_6px_22px_rgba(126,34,206,0.1)] transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-[16px] font-bold text-[#0F172A] dark:text-white">
                      {lang === 'es'
                        ? 'Manual Técnico y API'
                        : 'Technical & API Manual'}
                    </h3>
                    <p className="mt-2 text-[13.5px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      {lang === 'es'
                        ? 'Controladores .NET 8, modelo SQL Server, Docker Compose y plan de mitigación de seguridad.'
                        : '.NET 8 controllers, SQL Server schema, Docker Compose, and security mitigation plan.'}
                    </p>
                  </div>
                  <span className="mt-5 inline-block text-xs font-bold text-[#7E22CE] dark:text-[#C084FC]">
                    {lang === 'es'
                      ? 'Ver documentación técnica →'
                      : 'Open technical docs →'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNavigate('brand')}
                  className="text-left rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#14141B] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:border-[#7E22CE]/50 hover:shadow-[0_6px_22px_rgba(126,34,206,0.1)] transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-[16px] font-bold text-[#0F172A] dark:text-white">
                      {lang === 'es'
                        ? 'Identidad de Marca'
                        : 'Brand Identity'}
                    </h3>
                    <p className="mt-2 text-[13.5px] text-slate-600 dark:text-slate-300 leading-relaxed">
                      {lang === 'es'
                        ? 'Paleta #7E22CE, tipografía Plus Jakarta Sans, tono de voz empático y convivencia con el SENA.'
                        : '#7E22CE color tokens, Plus Jakarta Sans typography, warm tone of voice, and SENA coexistence.'}
                    </p>
                  </div>
                  <span className="mt-5 inline-block text-xs font-bold text-[#7E22CE] dark:text-[#C084FC]">
                    {lang === 'es'
                      ? 'Ver manual de marca →'
                      : 'Open brand guide →'}
                  </span>
                </button>
              </div>
            </section>
          </>
        )}

        {activeSection === 'developers' && (
          <CategoryHelpView
            mode="developers"
            onNavigate={handleNavigate}
            lang={lang}
          />
        )}

        {activeSection === 'users' && (
          <CategoryHelpView
            mode="users"
            onNavigate={handleNavigate}
            lang={lang}
          />
        )}

        {activeSection === 'brand' && (
          <BrandGuideView onNavigate={handleNavigate} lang={lang} />
        )}

        {activeSection === 'submit' && (
          <SubmitRequestView onNavigate={handleNavigate} lang={lang} />
        )}

        {activeSection !== 'submit' && (
          <ContactCard onNavigate={handleNavigate} lang={lang} />
        )}
      </main>

      <Footer onNavigate={handleNavigate} lang={lang} />

      <SerenaChatbotModal
        isOpen={chatbotOpen}
        onClose={() => setChatbotOpen(false)}
        initialQuery={chatbotInitialQuery}
        lang={lang}
      />
    </div>
  );
}
