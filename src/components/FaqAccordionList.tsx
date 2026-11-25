import React, { useState } from 'react';
import {
  BsCheck2,
  BsChevronDown,
  BsClipboard,
  BsExclamationTriangle,
  BsInfoCircle,
  BsShieldExclamation,
} from 'react-icons/bs';
import { FaqItem } from '../data/faqData';

interface FaqAccordionListProps {
  items: FaqItem[];
  lang: 'es' | 'en';
  defaultOpenId?: string | null;
  emptyMessage?: string;
  onOpenChatbot?: () => void;
}

export const FaqAccordionList: React.FC<FaqAccordionListProps> = ({
  items,
  lang,
  defaultOpenId = null,
  emptyMessage,
  onOpenChatbot,
}) => {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>(() =>
    defaultOpenId ? { [defaultOpenId]: true } : {}
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCopyCode = async (id: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    } catch {
      // Ignore clipboard restriction
    }
  };

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#14141B] p-8 text-center space-y-2.5">
        <p className="text-[15px] font-medium text-slate-600 dark:text-slate-300">
          {emptyMessage ||
            (lang === 'es'
              ? 'No encontramos respuestas que coincidan con tu búsqueda.'
              : 'No matching articles were found for your search.')}
        </p>
        {onOpenChatbot && (
          <p className="text-[13px] text-slate-500 dark:text-slate-400">
            {lang === 'es'
              ? '¿No encontraste lo que buscabas? '
              : "Didn't find what you were looking for? "}
            <button
              type="button"
              onClick={onOpenChatbot}
              className="font-semibold text-[#7E22CE] dark:text-[#C084FC] underline underline-offset-2 hover:text-[#581C87] dark:hover:text-white cursor-pointer"
            >
              {lang === 'es' ? 'Intenta aquí' : 'Try here'}
            </button>
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const isOpen = !!openIds[item.id];
        const categoryLabel =
          item.category === 'developers'
            ? lang === 'es'
              ? 'Desarrolladores'
              : 'Developers'
            : item.category === 'brand'
              ? lang === 'es'
                ? 'Identidad de Marca'
                : 'Brand Guide'
              : lang === 'es'
                ? 'Usuarios'
                : 'Users';

        return (
          <div
            key={item.id}
            className={`rounded-lg border transition-colors bg-white dark:bg-[#14141B] ${
              isOpen
                ? 'border-[#7E22CE]/50 dark:border-[#A855F7]/50 shadow-[0_4px_18px_rgba(126,34,206,0.08)]'
                : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
            }`}
          >
            <button
              type="button"
              onClick={() => toggleItem(item.id)}
              aria-expanded={isOpen}
              className="w-full px-6 py-4.5 flex items-center justify-between gap-4 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7E22CE] rounded-lg"
            >
              <span className="text-[15px] font-semibold text-[#0F172A] dark:text-slate-100 leading-snug">
                {lang === 'es' ? item.question : item.questionEn}
              </span>
              <BsChevronDown
                className={`w-4 h-4 text-[#7E22CE] dark:text-[#C084FC] shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
                aria-hidden="true"
              />
            </button>

            {isOpen && (
              <div className="px-6 pb-6 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[14.5px] leading-relaxed text-slate-700 dark:text-slate-300 space-y-4">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                  <span className="text-[#7E22CE] dark:text-[#C084FC] font-semibold">
                    {categoryLabel}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {lang === 'es'
                      ? 'Documentación oficial SERENA'
                      : 'Official SERENA Documentation'}
                  </span>
                </div>

                <p className="font-semibold text-[#0F172A] dark:text-white">
                  {lang === 'es' ? item.summary : item.summaryEn}
                </p>

                {item.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}

                {item.steps && item.steps.length > 0 && (
                  <ol className="space-y-2 pl-1">
                    {item.steps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#F3E8FF] dark:bg-[#7E22CE]/25 text-[#7E22CE] dark:text-[#C084FC] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 tabular-nums">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                )}

                {item.bullets && item.bullets.length > 0 && (
                  <ul className="space-y-2 list-disc pl-5 marker:text-[#7E22CE] dark:marker:text-[#C084FC]">
                    {item.bullets.map((b, idx) => (
                      <li key={idx}>{b}</li>
                    ))}
                  </ul>
                )}

                {item.table && (
                  <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
                    <table className="w-full text-left border-collapse text-[13.5px]">
                      <thead>
                        <tr className="bg-[#FAF9FF] dark:bg-[#1B1B24] border-b border-slate-200 dark:border-slate-800">
                          {item.table.headers.map((header, idx) => (
                            <th
                              key={idx}
                              className="px-4 py-2.5 font-semibold text-[#0F172A] dark:text-slate-100 whitespace-nowrap"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {item.table.rows.map((row, rIdx) => (
                          <tr
                            key={rIdx}
                            className="hover:bg-slate-50/70 dark:hover:bg-slate-800/30"
                          >
                            {row.map((cell, cIdx) => (
                              <td
                                key={cIdx}
                                className={`px-4 py-2.5 align-top ${
                                  cIdx === 0
                                    ? 'font-semibold text-[#0F172A] dark:text-slate-100'
                                    : 'text-slate-600 dark:text-slate-300'
                                }`}
                              >
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {item.codeBlock && (
                  <div className="rounded-lg border border-slate-200 dark:border-slate-800 bg-[#0F172A] text-slate-100 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800 text-xs text-slate-300">
                      <span className="font-medium">
                        {item.codeBlock.title || 'Código / Configuración'}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyCode(item.id, item.codeBlock!.code)
                        }
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white cursor-pointer"
                      >
                        {copiedId === item.id ? (
                          <>
                            <BsCheck2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span>{lang === 'es' ? 'Copiado' : 'Copied'}</span>
                          </>
                        ) : (
                          <>
                            <BsClipboard className="w-3.5 h-3.5" />
                            <span>{lang === 'es' ? 'Copiar' : 'Copy'}</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 text-[12.5px] leading-relaxed overflow-x-auto">
                      <code>{item.codeBlock.code}</code>
                    </pre>
                  </div>
                )}

                {item.callout && (
                  <div
                    className={`rounded-lg border p-4 flex items-start gap-3 ${
                      item.callout.type === 'danger'
                        ? 'bg-red-50/70 dark:bg-red-950/25 border-red-200 dark:border-red-900/60 text-red-950 dark:text-red-200'
                        : item.callout.type === 'warning'
                          ? 'bg-amber-50/70 dark:bg-amber-950/25 border-amber-200 dark:border-amber-900/60 text-amber-950 dark:text-amber-200'
                          : 'bg-[#FAF9FF] dark:bg-[#7E22CE]/15 border-[#E9D5FF] dark:border-[#7E22CE]/40 text-[#0F172A] dark:text-slate-100'
                    }`}
                  >
                    {item.callout.type === 'danger' ? (
                      <BsShieldExclamation className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                    ) : item.callout.type === 'warning' ? (
                      <BsExclamationTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                    ) : (
                      <BsInfoCircle className="w-4 h-4 text-[#7E22CE] dark:text-[#C084FC] shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1 text-[13.5px]">
                      <p className="font-bold">{item.callout.title}</p>
                      <p className="opacity-90">{item.callout.text}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
