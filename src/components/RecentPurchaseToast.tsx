import { useState, useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';

export default function RecentPurchaseToast() {
  const buyers = [
    { name: 'Lucas S.', city: 'São Paulo - SP', item: 'VIP Supreme' },
    { name: 'Gabriel M.', city: 'Belo Horizonte - MG', item: 'VIP Supreme' },
    { name: 'Matheus R.', city: 'Rio de Janeiro - RJ', item: 'Versão Básica' },
    { name: 'Larissa K.', city: 'Curitiba - PR', item: 'VIP Supreme' },
    { name: 'Rodrigo A.', city: 'Fortaleza - CE', item: 'VIP Supreme' },
    { name: 'Felipe B.', city: 'Porto Alegre - RS', item: 'Versão Básica' },
  ];

  const [visible, setVisible] = useState(false);
  const [buyerIndex, setBuyerIndex] = useState(0);

  useEffect(() => {
    // Initial delay
    const initialTimeout = setTimeout(() => {
      setVisible(true);
    }, 3500);

    // Periodic loop
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setBuyerIndex((prev) => (prev + 1) % buyers.length);
        setVisible(true);
      }, 1500);
    }, 9000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [buyers.length]);

  if (!visible) return null;

  const currentBuyer = buyers[buyerIndex];

  return (
    <aside aria-label="Notificação de compra recente" className="fixed bottom-4 left-4 z-40 max-w-xs bg-neutral-900/95 border border-emerald-500/40 text-white p-3 rounded-xl shadow-2xl shadow-emerald-950/50 backdrop-blur-md animate-in slide-in-from-bottom-5 duration-300 flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center shrink-0">
        <CheckCircle2 className="w-5 h-5" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold text-white truncate">
          {currentBuyer.name} acabou de adquirir
        </p>
        <p className="text-[11px] text-emerald-400 font-semibold truncate">
          {currentBuyer.item} • <span className="text-neutral-400 font-normal">{currentBuyer.city}</span>
        </p>
      </div>

      <button
        type="button"
        onClick={() => setVisible(false)}
        aria-label="Fechar notificação"
        className="text-neutral-400 hover:text-white p-1 rounded-md transition cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </aside>
  );
}
