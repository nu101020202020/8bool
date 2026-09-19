/**
 * ==========================================================================
 * SCRIPT PRINCIPAL - 8 BALL POOL VIP (HTML/CSS/JS VANILLA)
 * Pronto para hospedagem em qualquer servidor web estático
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // URLs Oficiais de Checkout
  const CHECKOUT_URL_BASIC = 'https://lyracheckout.vercel.app/c/8iva34n4';
  const CHECKOUT_URL_VIP = 'https://lyracheckout.vercel.app/c/sqarbie6';

  /* ========================================================================
     1. ROLAGEM SUAVE ATÉ A OFERTA (#oferta)
     ======================================================================== */
  const scrollToOffer = () => {
    const offerSection = document.getElementById('oferta');
    if (offerSection) {
      offerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Botão CTA Hero
  const heroCtaBtn = document.getElementById('hero-cta-button');
  if (heroCtaBtn) {
    heroCtaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToOffer();
    });
  }

  // Links internos com href="#oferta"
  document.querySelectorAll('a[href="#oferta"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToOffer();
    });
  });

  /* ========================================================================
     2. BOTÕES DE CHECKOUT DOS PLANOS
     ======================================================================== */
  const btnPlanBasic = document.getElementById('btn-checkout-basic');
  if (btnPlanBasic) {
    btnPlanBasic.addEventListener('click', () => {
      window.open(CHECKOUT_URL_BASIC, '_blank');
    });
  }

  const btnPlanVip = document.getElementById('btn-checkout-vip');
  if (btnPlanVip) {
    btnPlanVip.addEventListener('click', () => {
      window.open(CHECKOUT_URL_VIP, '_blank');
    });
  }

  /* ========================================================================
     3. FAQ ACCORDION (PERGUNTAS FREQUENTES)
     ======================================================================== */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const trigger = item.querySelector('.faq-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');

        // Fecha todos os outros itens para manter o comportamento limpo
        faqItems.forEach((other) => {
          if (other !== item) {
            other.classList.remove('open');
          }
        });

        // Alterna o atual
        if (isOpen) {
          item.classList.remove('open');
        } else {
          item.classList.add('open');
        }
      });
    }
  });

  /* ========================================================================
     4. NOTIFICAÇÃO AO VIVO DE COMPRA RECENTE (TOAST)
     ======================================================================== */
  const purchaseToast = document.getElementById('recent-purchase-toast');
  const toastCloseBtn = document.getElementById('toast-close-btn');
  const toastBuyerName = document.getElementById('toast-buyer-name');
  const toastBuyerInfo = document.getElementById('toast-buyer-info');

  const buyers = [
    { name: 'Lucas S.', city: 'São Paulo - SP', item: 'VIP Supreme' },
    { name: 'Gabriel M.', city: 'Belo Horizonte - MG', item: 'VIP Supreme' },
    { name: 'Matheus R.', city: 'Rio de Janeiro - RJ', item: 'Versão Básica' },
    { name: 'Larissa K.', city: 'Curitiba - PR', item: 'VIP Supreme' },
    { name: 'Rodrigo A.', city: 'Fortaleza - CE', item: 'VIP Supreme' },
    { name: 'Felipe B.', city: 'Porto Alegre - RS', item: 'Versão Básica' },
  ];

  let buyerIndex = 0;
  let toastInterval = null;

  const updateToastBuyer = () => {
    const buyer = buyers[buyerIndex];
    if (toastBuyerName) {
      toastBuyerName.textContent = `${buyer.name} acabou de adquirir`;
    }
    if (toastBuyerInfo) {
      toastBuyerInfo.innerHTML = `${buyer.item} • <span style="color: #a3a3a3; font-weight: 400;">${buyer.city}</span>`;
    }
  };

  if (purchaseToast) {
    // Delay inicial de 3.5 segundos
    setTimeout(() => {
      updateToastBuyer();
      purchaseToast.classList.remove('hidden-toast');

      // Ciclo contínuo a cada 9 segundos
      toastInterval = setInterval(() => {
        purchaseToast.classList.add('hidden-toast');
        setTimeout(() => {
          buyerIndex = (buyerIndex + 1) % buyers.length;
          updateToastBuyer();
          purchaseToast.classList.remove('hidden-toast');
        }, 1500);
      }, 9000);
    }, 3500);

    if (toastCloseBtn) {
      toastCloseBtn.addEventListener('click', () => {
        purchaseToast.classList.add('hidden-toast');
        if (toastInterval) clearInterval(toastInterval);
      });
    }
  }

  /* ========================================================================
     6. VSL EMBED SCRIPT (PRO-VID-CAST / LOVABLE PLAYER)
     ======================================================================== */
  const initVslScript = () => {
    const existing = document.querySelector('script[src="https://pro-vid-cast.lovable.app/embed.js"]');
    if (!existing) {
      const script = document.createElement('script');
      script.src = 'https://pro-vid-cast.lovable.app/embed.js';
      script.setAttribute('data-video-id', '67438c53-c438-4278-bd53-688a21fcf691');
      script.async = true;
      document.body.appendChild(script);
    }
  };
  initVslScript();
});
