import { Cpu, Target, Sparkles } from 'lucide-react';

export default function FeaturesSection() {
  return (
    <section className="relative px-4 py-12 sm:py-16 bg-[#0a0a0a] border-y border-neutral-800">
      <div className="max-w-xl mx-auto">
        {/* Solution Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#09fb31] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#09fb31]" />
            <span>A SOLUÇÃO DEFINITIVA</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-[#22c55e] tracking-tight">
            Painel Inteligente
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400">
            Você não precisa de sorte quando a matemática joga ao seu favor.
          </p>
        </div>

        {/* Featured Solution Images and Explanations */}
        <div className="space-y-6">
          {/* Card 1: Advanced Cybernetic Precision */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl hover:border-emerald-500/30 transition-all">
            <div className="relative aspect-video bg-neutral-900 overflow-hidden">
              <img
                src="https://pub-e1f5fdc45b674261b2ccda7b284afbb9.r2.dev/images/c7d95864-bcd6-4819-90f3-322f20c5bdbe/1787532299_fe3588ce8656.jpg"
                alt="Tecnologia avançada para dominar todas as mesas do 8 Ball Pool com precisão cibernética"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-sm border border-emerald-500/30 text-[#09fb31] text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full flex items-center gap-1">
                <Target className="w-3 h-3" />
                <span>MIRA VETORIAL ATIVA</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                Domine Cada Tacada com Precisão
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Mais precisão em cada tacada. Calcule trajetórias, melhores ângulos e jogue com muito mais confiança. Veja como funciona.
              </p>
            </div>
          </div>

          {/* Card 2: Compensation for Bad Sensitivity */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl hover:border-emerald-500/30 transition-all">
            <div className="relative aspect-video bg-neutral-900 overflow-hidden">
              <img
                src="https://pub-e1f5fdc45b674261b2ccda7b284afbb9.r2.dev/images/c7d95864-bcd6-4819-90f3-322f20c5bdbe/1787532342_d1d3f27366c0.jpg"
                alt="🔥 Sua mira não acompanha seu nível?"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-sm border border-emerald-500/30 text-[#09fb31] text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full flex items-center gap-1">
                <Cpu className="w-3 h-3" />
                <span>CALIBRAÇÃO INTELIGENTE</span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="text-base sm:text-lg font-bold text-white mb-2">
                🔥 Sua mira não acompanha seu nível?
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Ajuste sua mira e tenha mais precisão nas jogadas.{' '}
                <a
                  href="#oferta"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById('oferta');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center text-emerald-400 hover:text-emerald-300 font-bold transition-colors cursor-pointer hover:underline"
                >
                  👉 Quero testar agora
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
