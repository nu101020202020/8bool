import { Check, Flame, Shield, Sparkles, Trophy, Zap, ArrowRight } from 'lucide-react';
import { PricingPlan } from '../types';

interface PricingSectionProps {
  onSelectPlan?: (plan: PricingPlan) => void;
}

export default function PricingSection({ onSelectPlan }: PricingSectionProps) {
  const plans = [
    {
      id: 'basic',
      name: 'VERSÃO BÁSICA',
      tag: 'ACESSO LIMITADO',
      originalPrice: '9,99',
      currentPrice: 'R$ 4,99',
      isPopular: false,
      benefits: [
        'Acesso vitalício',
        'Linha Longa Infinita',
        'Anti-Ban Avançado',
        'Garantia de 7 dias',
      ],
      buttonText: 'COMPRAR BÁSICO',
      checkoutUrl: 'https://lyracheckout.vercel.app/c/8iva34n4',
    },
    {
      id: 'vip',
      name: 'VIP SUPREME',
      tag: 'OFERTA ÚNICA / ACESSO COMPLETO',
      originalPrice: '18,99',
      currentPrice: '9,99',
      isPopular: true,
      badge: '🔥 MAIS VENDIDO',
      benefits: [
        'Acesso vitalício',
        'Mira Auto Ativada',
        'Linha Longa + Trajetória',
        'Gerador de Fichas 10x',
        'Anti-Ban Comprovado',
        'Grupo VIP + Suporte 24h',
        'Garantia de 30 dias',
      ],
      buttonText: 'GARANTIR VIP AGORA',
      checkoutUrl: 'https://lyracheckout.vercel.app/c/sqarbie6',
    },
  ];

  const handleCheckout = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <section id="oferta" className="relative px-4 py-12 sm:py-16 bg-[#0a0a0a] scroll-mt-14">
      <div className="max-w-md mx-auto">
        {/* Terminal Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[#09fb31] text-xs font-mono font-bold uppercase tracking-widest mb-2">
            <Zap className="w-3.5 h-3.5 text-[#09fb31]" />
            <span>ACCESS TERMINAL</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase text-white tracking-tight">
            VAGAS LIMITADAS
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-400">
            Escolha seu plano e comece a fechar mesas em menos de 2 minutos
          </p>
        </div>

        {/* Pricing Cards Stack */}
        <div className="space-y-6">
          {plans.map((plan) => {
            const isVip = plan.isPopular;

            return (
              <div
                key={plan.id}
                className={`relative rounded-2xl p-6 sm:p-7 transition-all duration-300 text-center ${
                  isVip
                    ? 'bg-[#0a0a0a] border-2 border-[#22c55e] shadow-2xl shadow-emerald-500/20'
                    : 'bg-[#0a0a0a] border-2 border-[#0a0a0a] shadow-lg'
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 right-4 sm:right-6 bg-gradient-to-r from-emerald-500 via-[#22c55e] to-emerald-600 text-black font-black text-[11px] sm:text-xs uppercase tracking-wider py-1.5 px-3.5 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.5)] border border-emerald-300/40 flex items-center gap-1.5 whitespace-nowrap z-10 select-none">
                    <span>{plan.badge}</span>
                  </div>
                )}

                <h3 className="text-xl sm:text-2xl font-bold uppercase text-white tracking-wide">
                  {plan.name}
                </h3>

                <p className="text-xs uppercase font-semibold text-neutral-400 mt-1 tracking-wider opacity-80">
                  {plan.tag}
                </p>

                {/* Price Display */}
                <div className="my-4">
                  <div className="text-lg sm:text-xl text-neutral-500 line-through font-medium">
                    {plan.originalPrice}
                  </div>
                  <div className="text-4xl sm:text-5xl font-extrabold text-[#22c55e] tracking-tight mt-1">
                    {plan.currentPrice.startsWith('R$') ? plan.currentPrice : `R$ ${plan.currentPrice}`}
                  </div>
                </div>

                <div className="w-full h-px bg-neutral-800/80 my-4" />

                {/* Benefits List */}
                <ul className="text-left space-y-3 mb-6 text-sm">
                  {plan.benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#22c55e] text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className="text-neutral-200 leading-snug">{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* Action CTA Button with exact link and data-href */}
                <button
                  type="button"
                  data-href={plan.checkoutUrl}
                  onClick={() => handleCheckout(plan.checkoutUrl)}
                  className={`w-full py-4 px-6 rounded-xl font-bold text-base tracking-wide transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 text-white ${
                    isVip
                      ? 'bg-[#22c55e] hover:bg-[#1eb054] shadow-lg shadow-[#22c55e]/30 animate-pulse active:scale-98'
                      : 'bg-[#22c55e] hover:bg-[#1eb054] active:scale-98 shadow-md'
                  }`}
                >
                  <span>{plan.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Security Tag */}
                <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-neutral-400">
                  <Shield className="w-3.5 h-3.5 text-[#22c55e]" />
                  <span>Acesso liberado imediatamente após o pagamento</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
