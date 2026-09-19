import { useEffect } from 'react';

interface HeroSectionProps {
  onSelectPlan?: (planId: string) => void;
}

export default function HeroSection({ onSelectPlan }: HeroSectionProps) {
  useEffect(() => {
    // Remove previous instance of embed script if exists
    const existingScript = document.querySelector('script[src="https://pro-vid-cast.lovable.app/embed.js"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Inject the script so it executes when the pvc-player element is present in DOM
    const script = document.createElement('script');
    script.src = 'https://pro-vid-cast.lovable.app/embed.js';
    script.setAttribute('data-video-id', '67438c53-c438-4278-bd53-688a21fcf691');
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const scrollToOffer = () => {
    const el = document.getElementById('oferta');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative px-4 pt-4 pb-12 sm:pt-8 sm:pb-16 overflow-hidden bg-[#0a0a0a]">
      <div className="max-w-xl mx-auto text-center">
        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white leading-tight">
          DOMINE O <span className="text-[#22c55e] drop-shadow-[0_0_25px_rgba(34,197,94,0.4)]">8 BALL POOL</span>{' '}
          COMO UM <span className="text-[#22c55e] drop-shadow-[0_0_25px_rgba(34,197,94,0.4)]">EXPERT</span>
        </h1>

        {/* Pill Tag */}
        <div className="mt-3 inline-flex items-center justify-center px-6 py-1.5 rounded-full border border-[#22c55e] bg-black/60 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
          <span className="text-[#22c55e] text-sm sm:text-base font-extrabold tracking-wider uppercase">
            ATUALIZADO 2026
          </span>
        </div>

        {/* VSL Embed */}
        <div className="mt-5 w-full">
          <div id="pvc-player-67438c53-c438-4278-bd53-688a21fcf691"></div>
        </div>

        {/* Strong Copy Under Video */}
        <p className="mt-6 text-base sm:text-lg text-neutral-200 font-normal max-w-md mx-auto leading-relaxed text-center">
          Elimine a sorte do seu jogo. Comece a ganhar todas as partidas com apenas 1 clique.
        </p>

        {/* CTA Button matching the photo */}
        <div className="mt-6 flex flex-col items-center">
          <button
            id="hero-cta-button"
            type="button"
            onClick={scrollToOffer}
            className="w-full sm:w-auto min-w-[260px] sm:min-w-[320px] px-8 py-3.5 sm:px-10 sm:py-4 bg-[#22c55e] hover:bg-[#16a34a] active:scale-98 text-white font-extrabold text-base sm:text-lg uppercase tracking-wider rounded-full shadow-lg shadow-emerald-500/30 transition-all duration-200 cursor-pointer flex items-center justify-center text-center"
          >
            GARANTIR MEU ACESSO
          </button>

          {/* Stars & Metric matching photo */}
          <div className="mt-4 flex items-center justify-center gap-2 text-xs sm:text-sm font-extrabold tracking-wider">
            <span className="text-[#22c55e] text-sm sm:text-base tracking-widest">★★★★★</span>
            <span className="text-white uppercase font-bold">
              + DE 12 MIL PLAYERS ATIVOS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
