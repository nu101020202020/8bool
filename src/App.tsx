import { useState } from 'react';
import UrgencyBar from './components/UrgencyBar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import TestimonialsSection from './components/TestimonialsSection';
import PricingSection from './components/PricingSection';
import GuaranteeSection from './components/GuaranteeSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import CheckoutModal from './components/CheckoutModal';
import ExitIntentModal from './components/ExitIntentModal';
import RecentPurchaseToast from './components/RecentPurchaseToast';
import { PricingPlan } from './types';

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);

  const defaultVipPlan: PricingPlan = {
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
  };

  const handleSelectPlan = (planOrId: PricingPlan | string) => {
    if (typeof planOrId === 'string') {
      setSelectedPlan(defaultVipPlan);
    } else {
      setSelectedPlan(planOrId);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col selection:bg-emerald-500 selection:text-black">
      {/* Urgency countdown ticker at the top */}
      <UrgencyBar />

      {/* Main Single-View Landing Page Flow */}
      <main className="flex-1 w-full max-w-4xl mx-auto shadow-2xl bg-[#0a0a0a] border-x border-neutral-900/50">
        <HeroSection onSelectPlan={handleSelectPlan} />
        <FeaturesSection />
        <TestimonialsSection />
        <PricingSection onSelectPlan={handleSelectPlan} />
        <GuaranteeSection />
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Live Recent Purchase Notification in Bottom Corner */}
      <RecentPurchaseToast />

      {/* Interactive Checkout Modal */}
      <CheckoutModal
        plan={selectedPlan}
        onClose={() => setSelectedPlan(null)}
      />

      {/* Exit-Intent Promotion Modal: triggers when user intends to leave */}
      <ExitIntentModal
        onAcceptOffer={(discountedPlan) => setSelectedPlan(discountedPlan)}
      />
    </div>
  );
}

