import React from 'react';
import { MASCOT_IMAGE_URL, SectionId } from '../data/faqData';

interface ContactCardProps {
  onNavigate: (section: SectionId) => void;
  lang: 'es' | 'en';
}

export const ContactCard: React.FC<ContactCardProps> = ({
  onNavigate,
  lang,
}) => {
  return (
    <section className="max-w-[960px] mx-auto px-6 my-16">
      <div className="bg-white dark:bg-[#14141B] rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-[0_6px_28px_rgba(0,0,0,0.06)] px-8 py-10 md:px-14 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md text-center md:text-left">
            <h2 className="text-[24px] font-extrabold tracking-tight text-[#0F172A] dark:text-white">
              {lang === 'es' ? 'Contacta con nosotros' : 'Contact us'}
            </h2>
            <p className="mt-3 text-[14.5px] leading-relaxed text-slate-600 dark:text-slate-300">
              {lang === 'es' ? (
                <>
                  ¿Aún tienes preguntas? Si no has encontrado lo que necesitas,
                  ponte en contacto con nuestro equipo o explora la{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('users')}
                    className="text-[#7E22CE] dark:text-[#C084FC] font-semibold hover:underline cursor-pointer"
                  >
                    ayuda para usuarios
                  </button>{' '}
                  para recibir más asistencia.
                </>
              ) : (
                <>
                  Still have questions? If you haven&apos;t found what you need,
                  reach out to our team or browse{' '}
                  <button
                    type="button"
                    onClick={() => onNavigate('users')}
                    className="text-[#7E22CE] dark:text-[#C084FC] font-semibold hover:underline cursor-pointer"
                  >
                    user help
                  </button>{' '}
                  for more support.
                </>
              )}
            </p>
            <button
              type="button"
              onClick={() => onNavigate('submit')}
              className="mt-7 inline-flex items-center justify-center rounded-full bg-[#0F172A] hover:bg-black dark:bg-[#7E22CE] dark:hover:bg-[#9333EA] text-white font-bold text-[13.5px] px-7 py-3 transition-colors cursor-pointer"
            >
              {lang === 'es' ? 'Enviar una solicitud' : 'Submit a request'}
            </button>
          </div>

          <div className="shrink-0">
            <div className="w-44 h-44 sm:w-48 sm:h-48 rounded-3xl bg-[#FAF9FF] dark:bg-[#F3E8FF] p-3 flex items-center justify-center">
              <img
                src={MASCOT_IMAGE_URL}
                alt={
                  lang === 'es'
                    ? 'Mascota SERENA lista para ayudarte'
                    : 'SERENA mascot ready to help'
                }
                className="w-full h-full object-contain mix-blend-multiply select-none"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
