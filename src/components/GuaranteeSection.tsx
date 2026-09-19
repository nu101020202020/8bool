export default function GuaranteeSection() {
  return (
    <section className="relative px-4 pt-12 pb-6 bg-[#0a0a0a]">
      <div className="max-w-xl mx-auto text-center">
        {/* Subtle green line above */}
        <div className="w-full max-w-md mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#22c55e]/60 to-transparent mb-8" />

        {/* 7-day guarantee badge with the user's uploaded 7 image */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-28 h-28 sm:w-36 sm:h-36 flex items-center justify-center relative select-none">
            <img
              src="/fezjj27.png"
              onError={(e) => {
                // Fallback to high-definition matching vector if file was not placed in public root
                (e.currentTarget as HTMLImageElement).src = '/seven-guarantee.svg';
              }}
              alt="Garantia de 7 Dias"
              className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(255,26,43,0.35)]"
              referrerPolicy="no-referrer"
            />
          </div>

          <span className="text-[#22c55e] font-black text-xs sm:text-sm tracking-[0.3em] uppercase mt-1 drop-shadow-[0_0_10px_rgba(34,197,94,0.3)]">
            GARANTIA
          </span>
        </div>

        {/* Subtle green line below */}
        <div className="w-full max-w-md mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#22c55e]/60 to-transparent mt-8" />
      </div>
    </section>
  );
}
