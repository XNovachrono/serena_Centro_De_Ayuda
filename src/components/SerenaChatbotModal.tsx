import React, { useEffect, useRef, useState } from 'react';
import { BsSend, BsXLg } from 'react-icons/bs';
import { SerenaVectorLogo } from './SerenaVectorLogo';

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

interface SerenaChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
  lang: 'es' | 'en';
}

const SUPPORT_EMAIL = 'serenaadsosoporte@gamil.com';

function renderMessageWithEmailLink(text: string): React.ReactNode {
  const parts = text.split(/(serenaadsosoporte@gamil\.com)/gi);
  return parts.map((part, idx) => {
    if (part.toLowerCase() === SUPPORT_EMAIL) {
      return (
        <a
          key={idx}
          href={`mailto:${SUPPORT_EMAIL}`}
          className="font-semibold underline text-[#7E22CE] dark:text-[#C084FC] break-all"
        >
          {part}
        </a>
      );
    }
    return <React.Fragment key={idx}>{part}</React.Fragment>;
  });
}

export const SerenaChatbotModal: React.FC<SerenaChatbotModalProps> = ({
  isOpen,
  onClose,
  initialQuery = '',
  lang,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const threadRef = useRef<HTMLDivElement | null>(null);
  const lastAutoSentQueryRef = useRef<string>('');

  const sendToAssistant = async (
    nextHistory: ChatMessage[],
    clearInput: boolean
  ) => {
    if (clearInput) setInput('');
    setErrorMsg('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextHistory.map((m) => ({ role: m.role, text: m.text })),
        }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };

      if (!res.ok || !data.reply) {
        setErrorMsg(
          data.error ||
            (lang === 'es'
              ? `No pudimos responder tu duda en este momento. Escríbenos a ${SUPPORT_EMAIL}.`
              : `We could not answer right now. Please email ${SUPPORT_EMAIL}.`)
        );
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `m-${Date.now()}`,
            role: 'model',
            text: data.reply!,
          },
        ]);
      }
    } catch {
      setErrorMsg(
        lang === 'es'
          ? `Error de conexión con el asistente. Puedes comunicarte a ${SUPPORT_EMAIL}.`
          : `Connection error. Please write to ${SUPPORT_EMAIL}.`
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const welcomeMsg: ChatMessage = {
      id: 'welcome',
      role: 'model',
      text:
        lang === 'es'
          ? `Hola, soy el asistente de SERENA. Pregúntame cualquier duda sobre cómo funciona la plataforma (cuentas, ánimo, diario, citas, SOS, API o marca). Si no encuentro la respuesta, te indicaré cómo escribir a ${SUPPORT_EMAIL}.`
          : `Hi, I am the SERENA Help Assistant. Ask me anything about how SERENA works (accounts, mood, journal, appointments, SOS, API, or brand). If I cannot answer, I will guide you to ${SUPPORT_EMAIL}.`,
    };

    const trimmedInitial = initialQuery.trim();
    if (trimmedInitial && lastAutoSentQueryRef.current !== trimmedInitial && !isLoading) {
      lastAutoSentQueryRef.current = trimmedInitial;
      const userMsg: ChatMessage = {
        id: `u-${Date.now()}`,
        role: 'user',
        text: trimmedInitial,
      };
      const seeded = [welcomeMsg, userMsg];
      setMessages(seeded);
      void sendToAssistant([userMsg], false);
    } else if (messages.length === 0) {
      setMessages([welcomeMsg]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialQuery]);

  useEffect(() => {
    if (threadRef.current) {
      threadRef.current.scrollTop = threadRef.current.scrollHeight;
    }
  }, [messages, isLoading, errorMsg]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };
    const updated = [...messages, userMsg];
    setMessages(updated);

    const historyForApi = updated.filter((m) => m.id !== 'welcome');
    void sendToAssistant(historyForApi, true);
  };

  const handleRetryLast = () => {
    if (isLoading) return;
    const historyForApi = messages.filter((m) => m.id !== 'welcome');
    if (historyForApi.length > 0 && historyForApi[historyForApi.length - 1].role === 'user') {
      void sendToAssistant(historyForApi, false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={lang === 'es' ? 'Asistente virtual SERENA' : 'SERENA Virtual Assistant'}
      className="fixed bottom-5 right-5 z-50 w-[calc(100vw-2.5rem)] sm:w-[400px] h-[520px] max-h-[82vh] rounded-2xl bg-white dark:bg-[#14141B] border border-slate-200 dark:border-slate-800 shadow-[0_20px_50px_rgba(15,23,42,0.28)] flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="bg-[#7E22CE] text-white px-4 py-3.5 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-8 h-8 rounded-full bg-white text-[#7E22CE] flex items-center justify-center shrink-0 p-1">
            <SerenaVectorLogo className="w-full h-full" />
          </span>
          <div className="min-w-0">
            <p className="text-[14px] font-bold leading-tight truncate">
              {lang === 'es' ? 'Asistente SERENA' : 'SERENA Assistant'}
            </p>
            <p className="text-[11.5px] text-white/85 truncate">
              {lang === 'es'
                ? 'Respuestas basadas en los manuales oficiales'
                : 'Answers grounded in official SERENA docs'}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label={lang === 'es' ? 'Cerrar asistente' : 'Close assistant'}
          className="w-8 h-8 rounded-full hover:bg-white/15 flex items-center justify-center transition-colors cursor-pointer shrink-0"
        >
          <BsXLg className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Scrollable Thread */}
      <div
        ref={threadRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#FAF9FF] dark:bg-[#0B0B0F]"
      >
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[13.5px] leading-relaxed whitespace-pre-wrap ${
                  isUser
                    ? 'bg-[#7E22CE] text-white rounded-br-sm'
                    : 'bg-white dark:bg-[#1A1A24] text-[#0F172A] dark:text-slate-100 border border-slate-200/80 dark:border-slate-800 rounded-bl-sm'
                }`}
              >
                {isUser ? msg.text : renderMessageWithEmailLink(msg.text)}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-[#1A1A24] border border-slate-200/80 dark:border-slate-800 rounded-2xl rounded-bl-sm px-4 py-2.5 text-[13px] text-slate-500 dark:text-slate-400">
              {lang === 'es' ? 'Consultando documentación...' : 'Checking docs...'}
            </div>
          </div>
        )}

        {errorMsg && (
          <div className="rounded-xl border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/30 px-3.5 py-2.5 text-[12.5px] text-red-800 dark:text-red-200 space-y-2">
            <p>{renderMessageWithEmailLink(errorMsg)}</p>
            <button
              type="button"
              onClick={handleRetryLast}
              className="text-xs font-bold underline text-[#7E22CE] dark:text-[#C084FC] cursor-pointer"
            >
              {lang === 'es' ? 'Reintentar consulta' : 'Retry request'}
            </button>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <form
        onSubmit={handleSubmit}
        className="p-3 bg-white dark:bg-[#14141B] border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          value={input}
          disabled={isLoading}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            lang === 'es'
              ? 'Escribe tu pregunta sobre SERENA...'
              : 'Ask your question about SERENA...'
          }
          className="flex-1 rounded-full border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-[#0B0B0F] px-4 py-2 text-[13.5px] text-[#0F172A] dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7E22CE] disabled:opacity-60 min-w-0"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          aria-label={lang === 'es' ? 'Enviar mensaje' : 'Send message'}
          className="w-9 h-9 rounded-full bg-[#7E22CE] hover:bg-[#6B21A8] disabled:opacity-45 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
        >
          <BsSend className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
