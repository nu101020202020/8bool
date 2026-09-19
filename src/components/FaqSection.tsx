import { useState } from 'react';

export default function FaqSection() {
  // Items as explicitly specified by the user
  const faqs = [
    {
      question: 'Em quais dispositivos funciona?',
      answer: 'Compatível com Android, iPhone/iPad e PC.',
    },
    {
      question: 'Quando recebo meu acesso?',
      answer: 'O acesso é liberado após a confirmação da compra.',
    },
    {
      question: 'Tenho garantia?',
      answer: 'Sim. Você conta com garantia conforme o prazo informado na oferta.',
    },
  ];

  // Start with all closed so the user clicks to view one by one
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="relative px-4 pt-4 pb-12 sm:pb-16 bg-[#0a0a0a]">
      <div className="max-w-2xl mx-auto">
        {/* Title Header matching the reference image */}
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-[#22c55e] font-black text-xs sm:text-sm tracking-[0.3em] uppercase block drop-shadow-[0_0_12px_rgba(34,197,94,0.4)]">
            PERGUNTAS FREQUENTES
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-2.5">
            Tire suas dúvidas antes de entrar
          </h2>
        </div>

        {/* FAQ list with rounded dark pill cards and green triangle icons */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="bg-[#0c0c0e] rounded-2xl border border-neutral-800/80 px-5 sm:px-6 py-4 sm:py-5 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:border-emerald-500/30"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left flex items-center justify-between gap-4 cursor-pointer group"
                >
                  <span className="text-sm sm:text-base font-extrabold text-white group-hover:text-emerald-400 transition-colors">
                    {faq.question}
                  </span>
                  
                  {/* Green Triangle Arrow: Pointing DOWN (▼) by default when closed, UP (▲) when open */}
                  <span
                    className={`text-[#22c55e] text-xs sm:text-sm transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-emerald-400' : 'rotate-0'
                    }`}
                    style={{ display: 'inline-block' }}
                  >
                    ▼
                  </span>
                </button>

                {isOpen && (
                  <div className="mt-3 pt-3 text-xs sm:text-sm text-neutral-400 font-normal leading-relaxed border-t border-neutral-800/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
