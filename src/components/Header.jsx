import React from 'react';
import { 
  WalletIcon, 
  Clock, 
  CreditCard 
} from 'lucide-react';
import { 
  EthereumIcon, 
  SolanaIcon, 
  TonIcon, 
  TronIcon,
  StarsIcon
} from './Icons';
import { shortenAddress } from '../utils/format';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  activeChain, 
  walletAddress, 
  onOpenWalletModal,
  onOpenChainSelector
}) {
  const getChainIcon = () => {
    switch (activeChain) {
      case 'ethereum': return <EthereumIcon size={16} />;
      case 'solana': return <SolanaIcon size={16} />;
      case 'ton': return <TonIcon size={16} />;
      case 'tron': return <TronIcon size={16} />;
      case 'bsc': return (
        <svg width={16} height={16} viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="16" fill="#F3BA2F" />
          <path d="M16 6.5l3.3 3.3-3.3 3.3-3.3-3.3L16 6.5zm-5.7 5.7l3.3 3.3-3.3 3.3-3.3-3.3 3.3-3.3zm11.4 0l3.3 3.3-3.3 3.3-3.3-3.3 3.3-3.3zm-5.7 3.8l1.9 1.9-1.9 1.9-1.9-1.9 1.9-1.9zm-5.7 5.7l3.3 3.3-3.3 3.3-3.3-3.3 3.3-3.3zm11.4 0l3.3 3.3-3.3 3.3-3.3-3.3 3.3-3.3zm-5.7 3.8l3.3 3.3-3.3 3.3-3.3-3.3 3.3-3.3z" fill="#fff" />
        </svg>
      );
      case 'base': return (
        <svg width={16} height={16} viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="16" fill="#0052FF" />
          <path d="M16 7a9 9 0 100 18 9 9 0 000-18zm-2.8 11.8c-1.5 0-2.8-1.3-2.8-2.8s1.3-2.8 2.8-2.8c1.3 0 2.4.9 2.7 2.1h3.4c-.4-3-3-5.3-6.1-5.3-3.4 0-6.2 2.8-6.2 6.2s2.8 6.2 6.2 6.2c3.1 0 5.7-2.3 6.1-5.3h-3.4c-.3 1.2-1.4 2.1-2.7 2.1z" fill="#fff" />
        </svg>
      );
      case 'arbitrum': return (
        <svg width={16} height={16} viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="16" fill="#28A0F0" />
          <path d="M16 7l7.5 13-3.8 2.2L16 16.3l-3.7 5.9-3.8-2.2L16 7z" fill="#fff" />
          <path d="M16 18.5l2.2 3.5h-4.4l2.2-3.5z" fill="#28A0F0" />
        </svg>
      );
      case 'optimism': return (
        <svg width={16} height={16} viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="16" fill="#FF0420" />
          <path d="M10.8 12.2c-2.4 0-4.3 1.8-4.3 4.2 0 2.4 1.9 4.2 4.3 4.2 2.4 0 4.3-1.8 4.3-4.2 0-2.4-1.9-4.2-4.3-4.2zm0 6.2c-1.2 0-2.1-1-2.1-2 0-1 .9-2 2.1-2 1.2 0 2.1 1 2.1 2 0 1-.9 2-2.1 2zm8.5-6.2h3.4c2.4 0 4 1.5 4 3.7 0 2.2-1.6 3.7-4 3.7h-1.3v3h-2.1v-10.4zm2.1 5.3h1.3c1.2 0 1.9-.8 1.9-1.6 0-.8-.7-1.6-1.9-1.6h-1.3v3.2z" fill="#fff" />
        </svg>
      );
      case 'polygon': return (
        <svg width={16} height={16} viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="16" fill="#8247E5" />
          <path d="M21.5 13.5l-4-2.3a3 3 0 00-3 0l-4 2.3a3 3 0 00-1.5 2.6v4.6a3 3 0 001.5 2.6l4 2.3a3 3 0 003 0l4-2.3a3 3 0 001.5-2.6v-4.6a3 3 0 00-1.5-2.6zm-1.5 5.5l-3.5 2a1 1 0 01-1 0l-3.5-2v-4a1 1 0 01.5-.9l3.5-2a1 1 0 011 0l3.5 2a1 1 0 01.5.9v4z" fill="#fff" />
        </svg>
      );
      case 'avalanche': return (
        <svg width={16} height={16} viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="16" fill="#E84142" />
          <path d="M18.8 9.3c.7-1.2 2.4-1.2 3.1 0l5.8 10.4c.7 1.2-.2 2.7-1.6 2.7h-3.8c-.8 0-1.5-.4-1.9-1.1l-4.7-8.5c-.3-.5-.3-1.1 0-1.6l3.1-1.9zm-8.2 5.5l5.2 9.4c.4.7-.1 1.6-.9 1.6H5.7c-1.4 0-2.3-1.5-1.6-2.7l7.4-13.3c.7-1.2 2.4-1.2 3.1 0l1.4 2.5-4.4 7.9c-.3.5-.7.8-1.2.8h-2.4c-.6 0-.9-.6-.6-1.1l3.2-5.1z" fill="#fff" />
        </svg>
      );
      default: return (
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
          <path d="M5 3v4" />
          <path d="M19 17v4" />
        </svg>
      );
    }
  };

  const getChainName = () => {
    const names = {
      ethereum: 'اتریوم',
      solana: 'سولانا',
      ton: 'تون',
      tron: 'ترون',
      bsc: 'بایننس چین',
      base: 'بیس',
      arbitrum: 'آربیتروم',
      optimism: 'آپتیمیزم',
      polygon: 'پالیگان',
      avalanche: 'آوالانچ',
      zksync: 'زد‌کی‌سینک',
      linea: 'لینیا',
      blast: 'بلاست',
      sui: 'سویی',
      aptos: 'آپتوس',
    };
    return names[activeChain] || 'شبکه';
  };

  const tabs = [
    { id: 'swap', label: 'سواپ', icon: <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/></svg> },
    { id: 'stars', label: 'استارز', icon: <StarsIcon size={14} /> },
    { id: 'iran', label: 'ایران', icon: <CreditCard size={14} /> },
    { id: 'orders', label: 'سفارشات', icon: <Clock size={14} /> },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-bg/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        
        {/* Brand */}
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 group" aria-label="JSWAP Home">
            <div className="w-7 h-7 rounded-lg bg-accentSoft border border-accent/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <span className="text-xs font-bold text-accent">JS</span>
            </div>
            <span className="text-lg font-bold text-fg tracking-tight hidden sm:block">JSWAP</span>
          </a>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-0.5 px-1 bg-muted/50 border border-border rounded-lg" aria-label="Main navigation">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-card text-fg border border-border shadow-sm'
                    : 'text-fgSubtle hover:text-fg hover:bg-card/50'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          
          {/* Active Chain Selector */}
          <button
            type="button"
            onClick={onOpenChainSelector}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-muted/50 border border-border hover:border-accent/40 transition-all text-xs font-semibold text-fgMuted hover:text-fg"
            title="انتخاب شبکه مبادله"
            aria-label="Select network"
          >
            {getChainIcon()}
            <span className="hidden sm:inline">{getChainName()}</span>
          </button>

          {/* Wallet Connect Button */}
          <button
            type="button"
            onClick={onOpenWalletModal}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              walletAddress
                ? 'bg-muted border border-accent/30 text-accent hover:bg-card'
                : 'bg-accent text-bg font-bold hover:bg-accentHover active:scale-[0.98]'
            }`}
            aria-label={walletAddress ? 'Wallet connected' : 'Connect wallet'}
          >
            {walletAddress ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" aria-hidden="true" />
                <span>{shortenAddress(walletAddress)}</span>
              </>
            ) : (
              <>
                <WalletIcon size={14} />
                <span>اتصال کیف پول</span>
              </>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}