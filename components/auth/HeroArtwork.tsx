import { useState } from 'react';
import { Icon } from './Icon';

/** The illustration is a clean crop of the provided reference, not a remote asset. */
export function HeroArtwork() {
  const [imageFailed, setImageFailed] = useState(false);
  return <div className="hero-art" aria-hidden="true">
    {!imageFailed && <img
      className="hero-art__image"
      src="/images/medical-cosmos.webp"
      alt="" width="970" height="990"
      fetchPriority="high" decoding="async"
      onError={() => setImageFailed(true)}
    />}
    {imageFailed && <CosmicFallback />}
    <div className="art-shade" />
    <div className="art-aura" />
    <div className="glass-widget glass-widget--one">
      <span className="widget-icon"><Icon name="shield" size={25} /></span>
      <div className="widget-lines"><i /><i /><i /></div>
      <span className="widget-check"><Icon name="check" size={12} /></span>
    </div>
    <div className="glass-widget glass-widget--two">
      <Icon name="chart" size={33} />
      <span className="tiny-bar" /><span className="tiny-bar" /><span className="tiny-bar" />
    </div>
    <div className="digital-spark digital-spark--one">✦</div>
    <div className="digital-spark digital-spark--two">✧</div>
    <div className="digital-spark digital-spark--three">✦</div>
  </div>;
}

/** Editable SVG safety net, used only if the local WebP is unavailable. */
function CosmicFallback() {
  return <svg className="cosmic-fallback" viewBox="0 0 900 1000" preserveAspectRatio="xMidYMax slice" fill="none">
    <defs>
      <radialGradient id="space"><stop stopColor="#123d57" /><stop offset="1" stopColor="#0D1117" /></radialGradient>
      <radialGradient id="earth"><stop stopColor="#4db9c9" /><stop offset=".55" stopColor="#116d91" /><stop offset="1" stopColor="#07233e" /></radialGradient>
      <linearGradient id="beam" x1="350" y1="840" x2="600" y2="160" gradientUnits="userSpaceOnUse"><stop stopColor="#37dfe7" /><stop offset="1" stopColor="#e7bc6d" /></linearGradient>
      <filter id="glow"><feGaussianBlur stdDeviation="14" /></filter>
    </defs>
    <path fill="url(#space)" d="M0 0h900v1000H0z" />
    {Array.from({ length: 65 }, (_, i) => <circle key={i} cx={(i * 137 + 23) % 880} cy={(i * 71 + 33) % 640} r={i % 4 === 0 ? 2 : 1} fill={i % 3 === 0 ? '#e7bc6d' : '#c8faff'} opacity=".6" />)}
    <path d="M355 820C170 450 840 500 690 240S100 180 170 390" stroke="url(#beam)" strokeWidth="32" opacity=".4" filter="url(#glow)" />
    {[0, 1, 2].map(i => <ellipse key={i} cx="440" cy="320" rx={270 + i * 26} ry={85 + i * 24} transform={`rotate(${-24 + i * 5} 440 320)`} stroke={i === 1 ? '#e7bc6d' : '#37dfe7'} opacity=".65" />)}
    <circle cx="410" cy="280" r="142" fill="#37dfe7" opacity=".5" filter="url(#glow)" />
    <circle cx="410" cy="280" r="135" fill="url(#earth)" stroke="#85faff" strokeWidth="3" />
    <path d="m345 174 66-18 44 29-29 20-12 40-39 20-16-24-30-15Zm46 98 46 17 17 42-24 50-23-11-5-47-22-22Z" fill="#67b7a0" opacity=".8" />
    <circle cx="691" cy="170" r="31" fill="#a57755" /><circle cx="179" cy="421" r="23" fill="#8b6556" />
    <path d="M354 815C325 550 685 560 678 280M363 815C430 560 759 460 676 258" stroke="url(#beam)" strokeWidth="4" />
    {[0, 1, 2, 3].map(i => <g key={i} transform={`translate(${510 + i * 38} ${540 - i * 73})`}><rect width="55" height="64" rx="10" fill="#173b50" stroke="#6adce1" /><path d="M12 20h29M12 31h24M12 42h18" stroke="#e7bc6d" strokeWidth="3" /></g>)}
    <g fill="#e7bc6d" fontSize="38" fontFamily="sans-serif"><text x="110" y="190">?</text><text x="180" y="130">?</text><text x="90" y="310">?</text></g>
    <path d="M0 700h900v300H0Z" fill="#0a1e2c" /><path d="M30 740h170v260H30Zm690-40h150v300H720Z" fill="#123345" />
    <path d="M70 650v320m-35-310h70" stroke="#7aa6b5" strokeWidth="5" /><rect x="58" y="675" width="32" height="76" rx="8" fill="#88d9df" fillOpacity=".5" />
    <path d="m290 880 420 10 90 70-510-8Z" fill="#9fb9bf" /><path d="M295 950v50m490-40v40" stroke="#6a8997" strokeWidth="12" />
    <ellipse cx="425" cy="864" rx="40" ry="27" fill="#c69b82" /><path d="m457 863 195 21 74 52-253-8Z" fill="#b4dadc" />
    <g><path d="M230 1000V801q0-57 48-57t48 57v199" fill="#166478" /><circle cx="279" cy="705" r="36" fill="#c8a18a" /><path d="M239 710q-5-65 50-47 42 12 23 55l-13-33-60 25Z" fill="#131c29" /><path d="m305 823 63-35" stroke="#c8a18a" strokeWidth="17" strokeLinecap="round" /><rect x="342" y="751" width="35" height="59" rx="6" transform="rotate(18 342 751)" fill="#37dfe7" /></g>
    <g><circle cx="593" cy="688" r="34" fill="#c8a18a" /><path d="M540 870V782q0-47 53-47t53 47v88" fill="#d4e5e9" /><path d="m578 735 16 77 16-77" fill="#316378" /><path d="M569 753v48q28 33 48 0v-48" stroke="#1b3345" strokeWidth="5" /></g>
    <g><circle cx="748" cy="740" r="30" fill="#be9177" /><path d="M710 739q-3-62 44-51 33 8 31 51" fill="#267c7c" /><path d="M700 919V817q0-40 48-40t48 40v102" fill="#378d89" /></g>
  </svg>;
}
