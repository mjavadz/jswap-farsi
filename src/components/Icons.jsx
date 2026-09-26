import React from 'react';

export const EthereumIcon = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="16" fill="#627EEA" />
    <path d="M16.498 4v8.87l7.497 3.35L16.498 4z" fill="#fff" fillOpacity=".6" />
    <path d="M16.498 4L9 16.22l7.498-3.35V4z" fill="#fff" />
    <path d="M16.498 21.968v6.027L24 17.616l-7.502 4.352z" fill="#fff" fillOpacity=".6" />
    <path d="M16.498 27.995v-6.028L9 17.616l7.498 10.38z" fill="#fff" />
    <path d="M16.498 20.573l7.497-4.353-7.497-3.348v7.701z" fill="#fff" fillOpacity=".2" />
    <path d="M9 16.22l7.498 4.353v-7.701L9 16.22z" fill="#fff" fillOpacity=".6" />
  </svg>
);

export const SolanaIcon = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="16" fill="#0D0D12" stroke="#1F2937" />
    <path d="M9.1 19.9a.8.8 0 01.5-.2h14.8c.4 0 .7.6.4.9l-2.6 2.6a.8.8 0 01-.5.2H6.9c-.4 0-.7-.6-.4-.9l2.6-2.6z" fill="url(#sol_g1)" />
    <path d="M9.1 8.9a.8.8 0 01.5-.2h14.8c.4 0 .7.6.4.9l-2.6 2.6a.8.8 0 01-.5.2H6.9c-.4 0-.7-.6-.4-.9l2.6-2.6z" fill="url(#sol_g2)" />
    <path d="M22.9 14.4a.8.8 0 01-.5.2H7.6c-.4 0-.7-.6-.4-.9l2.6-2.6a.8.8 0 01.5-.2h14.8c.4 0 .7.6.4.9l-2.6 2.6z" fill="url(#sol_g3)" />
    <defs>
      <linearGradient id="sol_g1" x1="6.5" y1="21.5" x2="24.8" y2="21.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00FFA3" />
        <stop offset="1" stopColor="#DC1FFF" />
      </linearGradient>
      <linearGradient id="sol_g2" x1="6.5" y1="10.5" x2="24.8" y2="10.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#00FFA3" />
        <stop offset="1" stopColor="#DC1FFF" />
      </linearGradient>
      <linearGradient id="sol_g3" x1="7.2" y1="13" x2="25.5" y2="13" gradientUnits="userSpaceOnUse">
        <stop stopColor="#DC1FFF" />
        <stop offset="1" stopColor="#00FFA3" />
      </linearGradient>
    </defs>
  </svg>
);

export const TonIcon = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="16" fill="#0098EA" />
    <path d="M16 6.5l8 4.6-8 14.4-8-14.4 8-4.6z" fill="#fff" />
    <path d="M16 6.5v19l8-14.4-8-4.6z" fill="#EBF4FB" />
    <path d="M16 11.2l5.5 3.2L16 23.5l-5.5-9.1 5.5-3.2z" fill="#0098EA" />
    <path d="M16 11.2v12.3l5.5-9.1-5.5-3.2z" fill="#2CB5FF" />
  </svg>
);

export const TronIcon = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="16" fill="#EF0027" />
    <path d="M7 8l16 5-7 12L7 8zm2 2.2l5.4 9.4 4.5-7.7-9.9-1.7zm12.3 2.1l-4.1 7.1 4.1-1.7V12.3z" fill="#fff" />
  </svg>
);

export const UsdtIcon = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="16" fill="#26A17B" />
    <path d="M17.9 14.5v-1.9h5.1V10H9v2.6h5.1v1.9c-4.2.2-7.3 1-7.3 2s3.1 1.8 7.3 2v6.6h3.8v-6.6c4.2-.2 7.3-1 7.3-2s-3.1-1.8-7.3-2zm0 3.2c-3.4.2-6.1-.5-6.1-1.2s2.7-1.4 6.1-1.2v2.4zm-1.8 0c-3.4-.2-6.1-.5-6.1-1.2s2.7-1.4 6.1-1.2v2.4z" fill="#fff" />
  </svg>
);

export const StarsIcon = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="16" fill="url(#star_bg)" />
    <path d="M16 6.5l2.9 6 6.6.9-4.8 4.7 1.1 6.6-5.8-3.1-5.8 3.1 1.1-6.6-4.8-4.7 6.6-.9L16 6.5z" fill="#FFF" />
    <path d="M16 8.5l2.2 4.6 5.1.7-3.7 3.6.9 5.1-4.5-2.4-4.5 2.4.9-5.1-3.7-3.6 5.1-.7L16 8.5z" fill="#FBBF24" />
    <defs>
      <linearGradient id="star_bg" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F59E0B" />
        <stop offset="1" stopColor="#D97706" />
      </linearGradient>
    </defs>
  </svg>
);

export const ArrowDownUp = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m3 16 4 4 4-4" />
    <path d="M7 20V4" />
    <path d="m21 8-4-4-4 4" />
    <path d="M17 4v16" />
  </svg>
);

export const WalletIcon = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
    <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
  </svg>
);

export const CheckIcon = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const CopyIcon = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </svg>
);

export const ExternalLinkIcon = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" x2="21" y1="14" y2="3" />
  </svg>
);

export const SparklesIcon = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
  </svg>
);

export const ShieldCheckIcon = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const BnbIcon = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="16" fill="#F3BA2F" />
    <path d="M16 6.5l3.3 3.3-3.3 3.3-3.3-3.3L16 6.5zm-5.7 5.7l3.3 3.3-3.3 3.3-3.3-3.3 3.3-3.3zm11.4 0l3.3 3.3-3.3 3.3-3.3-3.3 3.3-3.3zm-5.7 3.8l1.9 1.9-1.9 1.9-1.9-1.9 1.9-1.9zm-5.7 5.7l3.3 3.3-3.3 3.3-3.3-3.3 3.3-3.3zm11.4 0l3.3 3.3-3.3 3.3-3.3-3.3 3.3-3.3zm-5.7 3.8l3.3 3.3-3.3 3.3-3.3-3.3 3.3-3.3z" fill="#fff" />
  </svg>
);

export const ArbitrumIcon = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="16" fill="#28A0F0" />
    <path d="M16 7l7.5 13-3.8 2.2L16 16.3l-3.7 5.9-3.8-2.2L16 7z" fill="#fff" />
    <path d="M16 18.5l2.2 3.5h-4.4l2.2-3.5z" fill="#28A0F0" />
  </svg>
);

export const PolygonIcon = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="16" fill="#8247E5" />
    <path d="M21.5 13.5l-4-2.3a3 3 0 00-3 0l-4 2.3a3 3 0 00-1.5 2.6v4.6a3 3 0 001.5 2.6l4 2.3a3 3 0 003 0l4-2.3a3 3 0 001.5-2.6v-4.6a3 3 0 00-1.5-2.6zm-1.5 5.5l-3.5 2a1 1 0 01-1 0l-3.5-2v-4a1 1 0 01.5-.9l3.5-2a1 1 0 011 0l3.5 2a1 1 0 01.5.9v4z" fill="#fff" />
  </svg>
);

export const BaseIcon = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="16" fill="#0052FF" />
    <path d="M16 7a9 9 0 100 18 9 9 0 000-18zm-2.8 11.8c-1.5 0-2.8-1.3-2.8-2.8s1.3-2.8 2.8-2.8c1.3 0 2.4.9 2.7 2.1h3.4c-.4-3-3-5.3-6.1-5.3-3.4 0-6.2 2.8-6.2 6.2s2.8 6.2 6.2 6.2c3.1 0 5.7-2.3 6.1-5.3h-3.4c-.3 1.2-1.4 2.1-2.7 2.1z" fill="#fff" />
  </svg>
);

export const OptimismIcon = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="16" fill="#FF0420" />
    <path d="M10.8 12.2c-2.4 0-4.3 1.8-4.3 4.2 0 2.4 1.9 4.2 4.3 4.2 2.4 0 4.3-1.8 4.3-4.2 0-2.4-1.9-4.2-4.3-4.2zm0 6.2c-1.2 0-2.1-1-2.1-2 0-1 .9-2 2.1-2 1.2 0 2.1 1 2.1 2 0 1-.9 2-2.1 2zm8.5-6.2h3.4c2.4 0 4 1.5 4 3.7 0 2.2-1.6 3.7-4 3.7h-1.3v3h-2.1v-10.4zm2.1 5.3h1.3c1.2 0 1.9-.8 1.9-1.6 0-.8-.7-1.6-1.9-1.6h-1.3v3.2z" fill="#fff" />
  </svg>
);

export const AvalancheIcon = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="16" fill="#E84142" />
    <path d="M18.8 9.3c.7-1.2 2.4-1.2 3.1 0l5.8 10.4c.7 1.2-.2 2.7-1.6 2.7h-3.8c-.8 0-1.5-.4-1.9-1.1l-4.7-8.5c-.3-.5-.3-1.1 0-1.6l3.1-1.9zm-8.2 5.5l5.2 9.4c.4.7-.1 1.6-.9 1.6H5.7c-1.4 0-2.3-1.5-1.6-2.7l7.4-13.3c.7-1.2 2.4-1.2 3.1 0l1.4 2.5-4.4 7.9c-.3.5-.7.8-1.2.8h-2.4c-.6 0-.9-.6-.6-1.1l3.2-5.1z" fill="#fff" />
  </svg>
);

export const ZkSyncIcon = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="16" fill="#000" stroke="#333" />
    <path d="M7 11.5l8.5-5 8.5 5v9l-8.5 5-8.5-5v-9zm4.2 2.5v4l4.3 2.5 4.3-2.5v-4L15.5 11.5 11.2 14z" fill="#8C8DFC" />
  </svg>
);

export const SuiIcon = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="16" fill="#4DA2FF" />
    <path d="M16 6.5C14.2 9.5 9 17.5 9 20.8a7 7 0 0014 0c0-3.3-5.2-11.3-7-14.3zm0 18.5a4.5 4.5 0 01-4.5-4.5c0-1.6 2-5.4 4.5-8.7 2.5 3.3 4.5 7.1 4.5 8.7a4.5 4.5 0 01-4.5 4.5z" fill="#fff" />
  </svg>
);

export const AptosIcon = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="16" fill="#202020" stroke="#333" />
    <path d="M7 19.5h18l-3-3H10l-3 3zm2.5-5.5h13l-3-3h-7l-3 3zm3-5.5h7l-3.5-3.5L12.5 8.5zM6 25h20l-2.5-2.5H8.5L6 25z" fill="#fff" />
  </svg>
);

export const LineaIcon = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="16" fill="#121212" stroke="#222" />
    <path d="M11 9h3v11h7v3H11V9z" fill="#61DFFF" />
  </svg>
);

export const BlastIcon = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="16" fill="#FCFC03" />
    <path d="M11 8h6a4 4 0 013.5 6 4.5 4.5 0 01-3.5 8H11V8zm3 5h3a1.5 1.5 0 000-3h-3v3zm0 6h3.5a1.8 1.8 0 000-3.6H14V19z" fill="#000" />
  </svg>
);

export const MetaMaskIcon = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <path d="M28.2 4.4l-10.5 7.8 1.9-4.7L28.2 4.4z" fill="#E2761B" />
    <path d="M3.8 4.4l10.4 7.8-1.9-4.7L3.8 4.4z" fill="#E4761B" />
    <path d="M24.4 21.6l-2.8 4.3 6.1 1.7 1.8-6.1-5.1.1z" fill="#E4761B" />
    <path d="M7.6 21.6l2.8 4.3-6.1 1.7-1.8-6.1 5.1.1z" fill="#E4761B" />
    <path d="M10.2 14.2l-1.8 2.7 6.3.3-.2-6.8-4.3 3.8z" fill="#E4761B" />
    <path d="M21.8 14.2l1.8 2.7-6.3.3.2-6.8 4.3 3.8z" fill="#E4761B" />
    <path d="M10.4 25.9l3.6-1.8-3.1-2.4-.5 4.2z" fill="#E4761B" />
    <path d="M21.6 25.9l-3.6-1.8 3.1-2.4.5 4.2z" fill="#E4761B" />
    <path d="M18 24.1l3.6 1.8 6.1-1.7-2.8-4.3h-5.2l-1.7 4.2z" fill="#D7C1B3" />
    <path d="M14 24.1l-3.6 1.8-6.1-1.7 2.8-4.3h5.2l1.7 4.2z" fill="#D7C1B3" />
    <path d="M14.2 19.9l-4-2.8-1.8 2.7 5.2.1.6-1z" fill="#233447" />
    <path d="M17.8 19.9l4-2.8 1.8 2.7-5.2.1-.6-1z" fill="#233447" />
    <path d="M10.4 25.9l.5-4.2-3.3-.1 2.8 4.3z" fill="#CD6116" />
    <path d="M21.6 25.9l-.5-4.2 3.3-.1-2.8 4.3z" fill="#CD6116" />
    <path d="M23.6 17.1l-1.8-2.9-4.3 3.8 2.1 1.9 4-2.8z" fill="#CD6116" />
    <path d="M8.4 17.1l1.8-2.9 4.3 3.8-2.1 1.9-4-2.8z" fill="#CD6116" />
    <path d="M14.5 18l-4.3-3.8 4.3-6.7.2 6.8-.2 3.7z" fill="#E4751F" />
    <path d="M17.5 18l4.3-3.8-4.3-6.7-.2 6.8.2 3.7z" fill="#E4751F" />
  </svg>
);

export const PhantomIcon = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="16" fill="#AB9FF2" />
    <path d="M22.5 16c0-3.6-2.9-6.5-6.5-6.5S9.5 12.4 9.5 16c0 4.2 3 7.8 7.2 7.8 1.3 0 2-.6 2.5-1.2.4-.6.6-1.3 1.2-1.3.5 0 .9.5 1.1 1.1.6-.8 1-1.6 1-2.4z" fill="#fff" />
    <circle cx="13.2" cy="15" r="1.3" fill="#AB9FF2" />
    <circle cx="17.2" cy="15" r="1.3" fill="#AB9FF2" />
  </svg>
);

export const SolflareIcon = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="16" fill="#FC8C03" />
    <path d="M16 7l2.5 6.5 6.5 2.5-6.5 2.5L16 25l-2.5-6.5L7 16l6.5-2.5L16 7z" fill="#fff" />
  </svg>
);

export const TonkeeperIcon = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="16" fill="#1C2D42" />
    <path d="M16 7l6.5 3.8-6.5 11.7-6.5-11.7L16 7z" fill="#0098EA" />
    <path d="M16 7v15.5l6.5-11.7L16 7z" fill="#2CB5FF" />
    <path d="M16 10.8l4.5 2.6L16 20.8l-4.5-7.4 4.5-2.6z" fill="#fff" />
  </svg>
);

export const TrustWalletIcon = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="16" fill="#0500FF" />
    <path d="M16 7s6 2.5 8 3.5c0 6.5-2.5 12-8 15-5.5-3-8-8.5-8-15 2-1 8-3.5 8-3.5z" fill="#fff" />
    <path d="M16 9.5s4.5 1.8 6 2.6c0 5-1.9 9.2-6 11.4V9.5z" fill="#0500FF" />
  </svg>
);

export const RabbyIcon = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="16" fill="#8697FF" />
    <path d="M11 11c0-2.2 1.8-4 4-4s4 1.8 4 4v4h-8v-4z" fill="#fff" />
    <circle cx="13.5" cy="12" r="1" fill="#8697FF" />
    <circle cx="16.5" cy="12" r="1" fill="#8697FF" />
    <path d="M9 16c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v6c0 2.2-1.8 4-4 4h-6c-2.2 0-4-1.8-4-4v-6z" fill="#fff" />
  </svg>
);

export const TronLinkIcon = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="16" fill="#231815" />
    <path d="M16 6.5l8 4.5v10L16 25.5 8 21v-10l8-4.5z" fill="#FF1E38" />
    <path d="M16 9.5l5.5 3.2v6.6L16 22.5 10.5 19.3v-6.6L16 9.5z" fill="#fff" />
    <path d="M16 11.5l3.5 2v4L16 19.5 12.5 17.5v-4l3.5-2z" fill="#FF1E38" />
  </svg>
);

export const SuiWalletIcon = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="16" fill="#4DA2FF" />
    <path d="M16 7c-2 3.5-7 11.5-7 14.8a7 7 0 0014 0c0-3.3-5-11.3-7-14.8z" fill="#fff" />
  </svg>
);

export const PetraIcon = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
    <circle cx="16" cy="16" r="16" fill="#F03D3D" />
    <path d="M11 8h7a5 5 0 010 10h-3v6h-4V8zm4 7h3a2 2 0 000-4h-3v4z" fill="#fff" />
  </svg>
);

export const getWalletIcon = (walletId, size = 22) => {
  switch (walletId) {
    case 'metamask':
      return <MetaMaskIcon size={size} />;
    case 'rabby':
      return <RabbyIcon size={size} />;
    case 'trustwallet':
      return <TrustWalletIcon size={size} />;
    case 'phantom':
      return <PhantomIcon size={size} />;
    case 'solflare':
      return <SolflareIcon size={size} />;
    case 'tonkeeper':
      return <TonkeeperIcon size={size} />;
    case 'mytonwallet':
      return <TonIcon size={size} />;
    case 'tronlink':
      return <TronLinkIcon size={size} />;
    case 'suiet':
    case 'suiwallet':
      return <SuiWalletIcon size={size} />;
    case 'petra':
    case 'pontem':
      return <PetraIcon size={size} />;
    default:
      return <WalletIcon size={size} />;
  }
};

export const getChainIcon = (chainId, size = 20, className = '') => {
  switch (chainId) {
    case 'ethereum':
      return <EthereumIcon size={size} className={className} />;
    case 'solana':
      return <SolanaIcon size={size} className={className} />;
    case 'ton':
      return <TonIcon size={size} className={className} />;
    case 'tron':
      return <TronIcon size={size} className={className} />;
    case 'bsc':
      return <BnbIcon size={size} className={className} />;
    case 'arbitrum':
      return <ArbitrumIcon size={size} className={className} />;
    case 'base':
      return <BaseIcon size={size} className={className} />;
    case 'polygon':
      return <PolygonIcon size={size} className={className} />;
    case 'avalanche':
      return <AvalancheIcon size={size} className={className} />;
    case 'optimism':
      return <OptimismIcon size={size} className={className} />;
    case 'zksync':
      return <ZkSyncIcon size={size} className={className} />;
    case 'sui':
      return <SuiIcon size={size} className={className} />;
    case 'aptos':
      return <AptosIcon size={size} className={className} />;
    case 'linea':
      return <LineaIcon size={size} className={className} />;
    case 'blast':
      return <BlastIcon size={size} className={className} />;
    default:
      return <EthereumIcon size={size} className={className} />;
  }
};



