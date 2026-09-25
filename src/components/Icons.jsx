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
    <circle cx="16" cy="16" r="16" fill="#0088CC" />
    <path d="M23.3 10.2L8.7 15.6c-.9.4-.9 1.1-.2 1.3l3.7 1.2 8.7-5.5c.4-.3.8-.1.5.2l-7 6.4v.1l-.3 3.9c.4 0 .6-.2.8-.4l2-2 4.2 3.1c.8.4 1.3.2 1.5-.7l2.8-13.2c.3-1.1-.4-1.6-1.4-1.1z" fill="#fff" />
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
