export default function TestimonialsSection() {
  const feedbacks = [
    {
      id: 'f1',
      src: 'https://pub-e1f5fdc45b674261b2ccda7b284afbb9.r2.dev/images/c7d95864-bcd6-4819-90f3-322f20c5bdbe/1787532149_019a318b4630.png',
      alt: 'Depoimento Cliente 8 Ball Pool',
    },
    {
      id: 'f2',
      src: 'https://pub-e1f5fdc45b674261b2ccda7b284afbb9.r2.dev/images/c7d95864-bcd6-4819-90f3-322f20c5bdbe/1787532158_eae3088d46da.png',
      alt: 'Depoimento Lorrana',
    },
    {
      id: 'f3',
      src: 'https://pub-e1f5fdc45b674261b2ccda7b284afbb9.r2.dev/images/c7d95864-bcd6-4819-90f3-322f20c5bdbe/1787532179_7d30087f93c0.png',
      alt: 'Depoimento Vinicius 8 Ball Pool',
    },
  ];

  // Repeat items for continuous, uninterrupted infinite scrolling
  const infiniteList = [
    ...feedbacks,
    ...feedbacks,
    ...feedbacks,
    ...feedbacks,
  ];

  return (
    <section className="relative py-12 sm:py-16 bg-[#0a0a0a] overflow-hidden">
      {/* Title Header matching user request */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-8 sm:mb-10">
        {/* Subtle glowing separator line above DEPOIMENTOS */}
        <div className="w-full max-w-md mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#22c55e]/60 to-transparent mb-6 sm:mb-8" />
        
        <span className="text-[#22c55e] font-black text-xs sm:text-sm tracking-[0.3em] uppercase block drop-shadow-[0_0_12px_rgba(34,197,94,0.4)]">
          DEPOIMENTOS
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-2.5">
          Veja resultados reais
        </h2>
      </div>

      {/* Infinite Scrolling Carousel */}
      <div className="relative w-full overflow-hidden">
        {/* Soft edge fade masks for smooth entrance/exit */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 sm:w-28 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />

        {/* Continuous Infinite Track */}
        <div className="animate-infinite-scroll flex gap-4 sm:gap-6 py-2 px-3">
          {infiniteList.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="w-[280px] sm:w-[340px] md:w-[370px] shrink-0 flex items-center justify-center bg-transparent transition-transform hover:scale-[1.02] duration-300"
            >
              <img
                src={item.src}
                alt={item.alt}
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.85)] select-none pointer-events-none rounded-xl"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
