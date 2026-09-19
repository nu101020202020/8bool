import React, { useState, useEffect } from 'react';
import { X, Flame, ShieldCheck, Zap, ArrowRight, Clock } from 'lucide-react';
import { PricingPlan } from '../types';

interface ExitIntentModalProps {
  onAcceptOffer: (discountedPlan: PricingPlan) => void;
}

export default function ExitIntentModal({ onAcceptOffer }: ExitIntentModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3-minute urgency countdown

  const discountedVipPlan: PricingPlan = {
    id: 'vip-exit-promo',
    name: 'VIP SUPREME (DESCONTO DE SAÍDA)',
    tag: 'OFERTA ÚNICA DE SAÍDA',
    originalPrice: '9,99',
    currentPrice: '6,98',
    isPopular: true,
    badge: '🔥 ÚLTIMA CHANCE',
    benefits: [
      'Acesso vitalício ao Painel Dantrick',
      'Mira Auto Ativada + Linha Longa',
      'Anti-Ban 100% Atualizado',
      'Grupo VIP + Suporte no WhatsApp',
      'Garantia Incondicional',
    ],
    buttonText: 'RESGATAR POR R$ 6,98',
    checkoutUrl: 'https://lyracheckout.vercel.app/c/sqarbie6',
  };

  useEffect(() => {
    // Check if already dismissed in this session
    const dismissed = sessionStorage.getItem('exit_intent_dismissed');
    if (dismissed) {
      setHasTriggered(true);
      return;
    }

    // 1. Desktop: Trigger when cursor moves out of the top viewport boundary (intent to close/change tab)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !hasTriggered) {
        setIsOpen(true);
        setHasTriggered(true);
        sessionStorage.setItem('exit_intent_dismissed', 'true');
      }
    };

    // 2. Mobile fallback: If user attempts back button or switches tab visibility
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && !hasTriggered) {
        setHasTriggered(true);
        sessionStorage.setItem('exit_intent_dismissed', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [hasTriggered]);

  // Urgency timer countdown when modal is open
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleAccept = () => {
    setIsOpen(false);
    onAcceptOffer(discountedVipPlan);
  };

  if (!isOpen) return null;

  return (
    <div
      id="exit-intent-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        id="exit-intent-card"
        className="relative w-full max-w-md bg-[#0a0a0c] border-2 border-[#22c55e]/60 rounded-3xl p-6 sm:p-7 shadow-[0_0_50px_rgba(34,197,94,0.25)] text-white text-center overflow-hidden"
      >
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-[#22c55e]/15 blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          id="exit-intent-close-btn"
          onClick={handleClose}
          aria-label="Fechar promoção"
          className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-xl hover:bg-neutral-800 transition cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge Warning */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-black uppercase tracking-wider mb-4">
          <Flame className="w-3.5 h-3.5 text-red-500 animate-pulse" />
          <span>ESPERE! NÃO FECHE ESTA PÁGINA</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
          PROMOÇÃO ÚNICA DE SAÍDA
        </h3>

        <p className="mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-sm mx-auto">
          Liberamos agora uma condição exclusiva e irrecusável para você não ficar de fora do grupo VIP:
        </p>

        {/* Price Box */}
        <div className="my-5 p-4 rounded-2xl bg-neutral-950/80 border border-neutral-800/80 flex flex-col items-center justify-center relative">
          <div className="text-xs text-neutral-400 line-through font-semibold mb-0.5">
            De R$ 9,99 por apenas
          </div>
          <div className="flex items-baseline gap-1 text-[#22c55e]">
            <span className="text-base font-bold">R$</span>
            <span className="text-4xl sm:text-5xl font-black tracking-tight drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]">
              6,98
            </span>
          </div>
          <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] font-bold text-neutral-400">
            <Clock className="w-3.5 h-3.5 text-[#22c55e]" />
            <span>Oferta expira em: <strong className="text-[#22c55e] font-mono">{formatTime(timeLeft)}</strong></span>
          </div>
        </div>

        {/* Call to Action Button */}
        <button
          type="button"
          id="exit-intent-claim-btn"
          onClick={handleAccept}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#22c55e] to-emerald-500 hover:from-emerald-400 hover:to-[#22c55e] text-black font-black text-sm sm:text-base uppercase tracking-wider shadow-[0_0_25px_rgba(34,197,94,0.4)] hover:shadow-[0_0_35px_rgba(34,197,94,0.6)] transition-all cursor-pointer flex items-center justify-center gap-2 group transform active:scale-98"
        >
          <span>QUERO APROVEITAR POR R$ 6,98</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Dismiss subtle text */}
        <button
          type="button"
          id="exit-intent-decline-btn"
          onClick={handleClose}
          className="mt-3 text-[11px] text-neutral-500 hover:text-neutral-400 underline transition cursor-pointer"
        >
          Não, prefiro pagar o preço normal de R$ 9,99 depois
        </button>

        {/* Trust Badges */}
        <div className="mt-4 pt-3 border-t border-neutral-900 flex items-center justify-center gap-4 text-[11px] text-neutral-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#22c55e]" />
            Garantia Incondicional
          </span>
          <span className="flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-[#22c55e]" />
            Acesso Imediato
          </span>
        </div>
      </div>
    </div>
  );
}
