export default function UrgencyBar() {
  return (
    <header className="relative w-full bg-[#16a34a] text-white shadow-md border-b border-emerald-400/20">
      <div className="max-w-4xl mx-auto px-4 py-2.5 sm:py-3 flex items-center justify-center text-center">
        <p className="text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-wider">
          <span className="text-white">DESCONTO </span>
          <span className="text-yellow-300">SÓ HOJE </span>
          <span className="text-white">NESSA PÁGINA</span>
        </p>
      </div>
    </header>
  );
}
