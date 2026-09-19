import { useState } from 'react';
import { X, CheckCircle, Copy, Shield, QrCode, CreditCard, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';
import { PricingPlan } from '../types';

interface CheckoutModalProps {
  plan: PricingPlan | null;
  onClose: () => void;
}

export default function CheckoutModal({ plan, onClose }: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [copied, setCopied] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!plan) return null;

  const mockPixKey = '00020126580014br.gov.bcb.pix0136e921d7b1-8444-43f6-8272-db03a357f1f852040000530398654054.995802BR59208BALLPOOL EXPERT6009SAO PAULO62070503***6304E8A1';

  const copyPix = () => {
    navigator.clipboard.writeText(mockPixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const simulateSuccess = () => {
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-neutral-900 border border-emerald-500/40 rounded-2xl p-5 sm:p-6 shadow-2xl text-white">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar modal"
          className="absolute top-4 right-4 text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div>
            {/* Modal Title */}
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Checkout Seguro</span>
            </div>

            <h3 className="text-xl font-extrabold text-white">
              Garantir {plan.name}
            </h3>

            <div className="mt-2 flex items-baseline gap-2 pb-4 border-b border-neutral-800">
              <span className="text-2xl font-black text-[#22c55e] font-mono">
                {plan.currentPrice.startsWith('R$') ? plan.currentPrice : `R$ ${plan.currentPrice}`}
              </span>
              <span className="text-xs text-neutral-400 line-through">
                {plan.originalPrice.startsWith('R$') ? plan.originalPrice : `R$ ${plan.originalPrice}`}
              </span>
              <span className="ml-auto text-[11px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded font-semibold">
                {plan.tag || 'Acesso Imediato'}
              </span>
            </div>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-2 gap-2 my-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('pix')}
                className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition cursor-pointer ${
                  paymentMethod === 'pix'
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                    : 'bg-neutral-800/50 border-neutral-700 text-neutral-400 hover:bg-neutral-800'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>PIX (Instantâneo)</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`py-2 px-3 rounded-xl border flex items-center justify-center gap-2 text-xs font-bold transition cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                    : 'bg-neutral-800/50 border-neutral-700 text-neutral-400 hover:bg-neutral-800'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Cartão de Crédito</span>
              </button>
            </div>

            {/* Pix View */}
            {paymentMethod === 'pix' && (
              <div className="space-y-3 bg-neutral-950 p-4 rounded-xl border border-neutral-800 text-center">
                <div className="w-32 h-32 mx-auto bg-white p-2 rounded-lg flex items-center justify-center shadow-inner">
                  {/* Visual QR Code Representation */}
                  <div className="w-full h-full border-4 border-black p-1 flex flex-col justify-between">
                    <div className="flex justify-between">
                      <div className="w-6 h-6 bg-black" />
                      <div className="w-6 h-6 bg-black" />
                    </div>
                    <div className="flex items-center justify-center">
                      <QrCode className="w-8 h-8 text-black" />
                    </div>
                    <div className="flex justify-between">
                      <div className="w-6 h-6 bg-black" />
                      <div className="w-4 h-4 bg-black" />
                    </div>
                  </div>
                </div>

                <div className="text-xs text-neutral-300 font-medium">
                  Escaneie o QR Code ou use o código Pix Copia e Cola:
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={mockPixKey}
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-1.5 px-2 text-[11px] font-mono text-neutral-400 truncate focus:outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={copyPix}
                    className="shrink-0 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-1.5 px-3 rounded-lg flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={simulateSuccess}
                  className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-md transition cursor-pointer"
                >
                  Já Realizei o Pagamento
                </button>
              </div>
            )}

            {/* Card View */}
            {paymentMethod === 'card' && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  simulateSuccess();
                }}
                className="space-y-3 bg-neutral-950 p-4 rounded-xl border border-neutral-800 text-xs"
              >
                <div>
                  <label className="block text-neutral-400 mb-1">Número do Cartão</label>
                  <input
                    type="text"
                    placeholder="•••• •••• •••• ••••"
                    required
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-white placeholder-neutral-500 focus:border-emerald-400 focus:outline-hidden font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-neutral-400 mb-1">Validade (MM/AA)</label>
                    <input
                      type="text"
                      placeholder="12/28"
                      required
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-white placeholder-neutral-500 focus:border-emerald-400 focus:outline-hidden font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-neutral-400 mb-1">CVV</label>
                    <input
                      type="text"
                      placeholder="•••"
                      required
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 text-white placeholder-neutral-500 focus:border-emerald-400 focus:outline-hidden font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-lg shadow-md transition cursor-pointer"
                >
                  Pagar {plan.currentPrice} com Segurança
                </button>
              </form>
            )}

            {/* Direct Checkout External Link */}
            <div className="mt-4 pt-3 border-t border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                Ambiente Criptografado 256-Bit
              </span>
              <a
                href={plan.checkoutUrl}
                target="_blank"
                rel="noreferrer"
                className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Checkout Direto</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        ) : (
          /* Payment Approved Screen */
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border-2 border-emerald-400 animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-extrabold text-white">
              Acesso Aprovado!
            </h3>

            <p className="text-xs sm:text-sm text-neutral-300">
              Seu acesso ao <strong>{plan.name}</strong> foi liberado com sucesso. Enviamos as instruções completas para seu e-mail.
            </p>

            <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-400">Plano:</span>
                <span className="font-bold text-emerald-400">{plan.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Status:</span>
                <span className="font-bold text-green-400">Ativo / Vitalício</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Suporte 24h:</span>
                <span className="text-white">Liberado via WhatsApp VIP</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Acessar Painel Agora</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
