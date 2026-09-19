import { useState, useRef, useEffect } from 'react';
import { Crosshair, Play, RotateCcw, ShieldCheck, Zap } from 'lucide-react';

export default function InteractivePoolTable() {
  const [angle, setAngle] = useState(28); // aim angle in degrees
  const [isShotRunning, setIsShotRunning] = useState(false);
  const [pocketed, setPocketed] = useState(false);
  const [cueBallPos, setCueBallPos] = useState({ x: 25, y: 70 });
  const [targetBallPos, setTargetBallPos] = useState({ x: 60, y: 35 });
  const animationRef = useRef<number | null>(null);

  const resetTable = () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    setIsShotRunning(false);
    setPocketed(false);
    setCueBallPos({ x: 25, y: 70 });
    setTargetBallPos({ x: 60, y: 35 });
  };

  const runPerfectShot = () => {
    if (isShotRunning) return;
    setIsShotRunning(true);
    setPocketed(false);
    
    // Set ideal angle for the pocket
    setAngle(32);

    let progress = 0;
    const startCue = { x: 25, y: 70 };
    const impactPoint = { x: 55, y: 38 };
    const pocketPoint = { x: 88, y: 15 };

    const animate = () => {
      progress += 0.035;

      if (progress <= 1) {
        // Cue ball moves to impact
        setCueBallPos({
          x: startCue.x + (impactPoint.x - startCue.x) * progress,
          y: startCue.y + (impactPoint.y - startCue.y) * progress,
        });
        animationRef.current = requestAnimationFrame(animate);
      } else if (progress <= 2) {
        // Target ball moves to pocket
        const targetProg = progress - 1;
        setTargetBallPos({
          x: impactPoint.x + (pocketPoint.x - impactPoint.x) * targetProg,
          y: impactPoint.y + (pocketPoint.y - impactPoint.y) * targetProg,
        });
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setPocketed(true);
        setIsShotRunning(false);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Calculate guide line endpoint based on angle
  const rad = (angle * Math.PI) / 180;
  const guideLength = 65;
  const guideEnd = {
    x: cueBallPos.x + Math.cos(rad) * guideLength,
    y: cueBallPos.y - Math.sin(rad) * guideLength,
  };

  return (
    <div className="w-full max-w-xl mx-auto my-6 bg-neutral-900/90 rounded-2xl p-4 sm:p-5 border border-emerald-500/30 shadow-2xl shadow-emerald-950/40 relative overflow-hidden">
      {/* Top Banner inside table frame */}
      <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-neutral-800 text-xs text-neutral-300">
        <div className="flex items-center gap-1.5 font-bold text-emerald-400">
          <Crosshair className="w-4 h-4 animate-spin text-emerald-400" style={{ animationDuration: '6s' }} />
          <span>SIMULADOR DE MIRA LASER VETORIAL</span>
        </div>
        <div className="flex items-center gap-1 text-[11px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>PRECISÃO 99.8%</span>
        </div>
      </div>

      {/* The Pool Table Canvas Container */}
      <div className="relative w-full aspect-[16/9] bg-emerald-900 rounded-xl border-[8px] sm:border-[12px] border-amber-950 shadow-inner overflow-hidden select-none">
        {/* Felt Texture & Vignette */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-700 via-emerald-800 to-emerald-950 opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.5)_100%)]" />

        {/* 6 Pockets */}
        {/* Top Left */}
        <div className="absolute -top-2 -left-2 w-7 h-7 sm:w-9 sm:h-9 bg-neutral-950 rounded-full border-2 border-amber-900/70 shadow-inner z-10" />
        {/* Top Center */}
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8 bg-neutral-950 rounded-full border-2 border-amber-900/70 shadow-inner z-10" />
        {/* Top Right */}
        <div className="absolute -top-2 -right-2 w-7 h-7 sm:w-9 sm:h-9 bg-neutral-950 rounded-full border-2 border-amber-900/70 shadow-inner z-10" />
        {/* Bottom Left */}
        <div className="absolute -bottom-2 -left-2 w-7 h-7 sm:w-9 sm:h-9 bg-neutral-950 rounded-full border-2 border-amber-900/70 shadow-inner z-10" />
        {/* Bottom Center */}
        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-6 h-6 sm:w-8 sm:h-8 bg-neutral-950 rounded-full border-2 border-amber-900/70 shadow-inner z-10" />
        {/* Bottom Right */}
        <div className="absolute -bottom-2 -right-2 w-7 h-7 sm:w-9 sm:h-9 bg-neutral-950 rounded-full border-2 border-amber-900/70 shadow-inner z-10" />

        {/* Table Head String line */}
        <div className="absolute top-0 bottom-0 left-[28%] w-[1px] bg-white/10" />

        {/* Laser Trajectory Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-20">
          <defs>
            <linearGradient id="laserGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#86efac" stopOpacity="0.4" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Primary Aim Line from Cue Ball */}
          <line
            x1={`${cueBallPos.x}%`}
            y1={`${cueBallPos.y}%`}
            x2={`${guideEnd.x}%`}
            y2={`${guideEnd.y}%`}
            stroke="url(#laserGrad)"
            strokeWidth="2.5"
            strokeDasharray="4 2"
            filter="url(#glow)"
          />

          {/* Extended Prediction Line towards Corner Pocket */}
          <line
            x1={`${targetBallPos.x}%`}
            y1={`${targetBallPos.y}%`}
            x2="88%"
            y2="15%"
            stroke="#22c55e"
            strokeWidth="2"
            strokeDasharray="3 3"
            opacity="0.85"
            filter="url(#glow)"
          />

          {/* Target Impact Marker */}
          <circle
            cx={`${targetBallPos.x}%`}
            cy={`${targetBallPos.y}%`}
            r="10"
            fill="none"
            stroke="#22c55e"
            strokeWidth="1.5"
            strokeDasharray="2 2"
            className="animate-pulse"
          />
        </svg>

        {/* Cue Ball (White) */}
        <div
          className="absolute w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-white via-neutral-100 to-neutral-300 shadow-md transform -translate-x-1/2 -translate-y-1/2 z-30 transition-transform flex items-center justify-center text-[8px] font-bold text-neutral-600"
          style={{ left: `${cueBallPos.x}%`, top: `${cueBallPos.y}%` }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-600/70" />
        </div>

        {/* 8 Ball (Black) */}
        {!pocketed ? (
          <div
            className="absolute w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-gradient-to-br from-neutral-800 via-neutral-900 to-black shadow-lg transform -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center border border-neutral-700"
            style={{ left: `${targetBallPos.x}%`, top: `${targetBallPos.y}%` }}
          >
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white flex items-center justify-center text-[7px] sm:text-[8px] font-extrabold text-black">
              8
            </div>
          </div>
        ) : (
          <div className="absolute top-3 right-3 text-xs font-bold text-emerald-300 bg-black/60 px-2 py-1 rounded border border-emerald-500/40 animate-bounce z-40">
            🎯 CAÇAPA GARANTIDA!
          </div>
        )}

        {/* HUD Data Overlay */}
        <div className="absolute bottom-2 left-2 z-20 flex gap-2">
          <div className="bg-black/70 backdrop-blur-xs border border-white/10 px-2 py-0.5 rounded text-[10px] text-emerald-400 font-mono">
            ÂNGULO: {angle}°
          </div>
          <div className="bg-black/70 backdrop-blur-xs border border-white/10 px-2 py-0.5 rounded text-[10px] text-white/90 font-mono">
            FORÇA: 84%
          </div>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="mt-4 space-y-3">
        <div className="flex items-center justify-between gap-3 text-xs">
          <label htmlFor="angle-slider" className="text-neutral-300 font-medium flex items-center gap-1.5">
            <Crosshair className="w-3.5 h-3.5 text-emerald-400" />
            Ajustar Ângulo da Linha Guia:
          </label>
          <span className="font-mono text-emerald-400 font-bold">{angle}°</span>
        </div>

        <input
          id="angle-slider"
          type="range"
          min="10"
          max="65"
          value={angle}
          disabled={isShotRunning}
          onChange={(e) => setAngle(Number(e.target.value))}
          className="w-full h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-hidden"
        />

        <div className="flex items-center gap-2 pt-1">
          <button
            id="test-shot-button"
            type="button"
            onClick={runPerfectShot}
            disabled={isShotRunning}
            className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 active:scale-95 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm shadow-lg shadow-emerald-900/40 transition-all cursor-pointer disabled:opacity-50"
          >
            <Play className="w-4 h-4 fill-white" />
            {isShotRunning ? 'Calculando Trajetória...' : 'Testar Linha Guia Automática'}
          </button>

          <button
            id="reset-table-button"
            type="button"
            onClick={resetTable}
            title="Resetar Mesa"
            className="inline-flex items-center justify-center p-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded-xl transition cursor-pointer border border-neutral-700"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Feature Micro-Badges below table */}
      <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-neutral-800/80 text-[11px] text-center text-neutral-400">
        <div className="flex flex-col items-center gap-0.5">
          <Zap className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-semibold text-neutral-200">Sem Atraso</span>
          <span className="text-[10px] text-neutral-500">60 FPS Fluido</span>
        </div>
        <div className="flex flex-col items-center gap-0.5 border-x border-neutral-800 px-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-semibold text-neutral-200">Anti-Detecção</span>
          <span className="text-[10px] text-neutral-500">Overlay Seguro</span>
        </div>
        <div className="flex flex-col items-center gap-0.5">
          <Crosshair className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-semibold text-neutral-200">Tabela Dupla</span>
          <span className="text-[10px] text-neutral-500">Cálculo de Rebote</span>
        </div>
      </div>
    </div>
  );
}
