import React from 'react';
import { 
  SparklesIcon, 
  WalletIcon, 
  StarsIcon, 
  ArrowDownUp, 
  Clock, 
  ExternalLinkIcon 
} from 'lucide-react';
import { 
  EthereumIcon, 
  SolanaIcon, 
  TonIcon, 
  TronIcon 
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
      case 'ethereum': return <EthereumIcon size={18} />;
      case 'solana': return <SolanaIcon size={18} />;
      case 'ton': return <TonIcon size={18} />;
      case 'tron': return <TronIcon size={18} />;
      default: return <SparklesIcon size={18} className="text-accent-emerald" />;
    }
  };

  const getChainName = () => {
    switch (activeChain) {
      case 'ethereum': return 'اتریوم (EVM)';
      case 'solana': return 'سولانا (SOL)';
      case 'ton': return 'تون (TON)';
      case 'tron': return 'ترون (TRON)';
      default: return 'انتخاب شبکه';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-dark-border/80 bg-dark-bg/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-6">
          <a href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent-emerald/20 via-dark-surface to-dark-card border border-accent-emerald/30 flex items-center justify-center shadow-glow-emerald group-hover:scale-105 transition-transform duration-200">
              <span className="text-xl font-black bg-gradient-to-r from-accent-emerald to-accent-cyan bg-clip-text text-transparent">JS</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold text-white tracking-tight">JSWAP</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-accent-emerald/15 text-accent-emerald border border-accent-emerald/30">فارسی</span>
              </div>
              <span className="text-[11px] text-slate-400 block -mt-0.5 font-mono">javadnode.top</span>
            </div>
          </a>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1.5 p-1 bg-dark-card border border-dark-border rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab('swap')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'swap' 
                  ? 'bg-accent-emerald/15 text-accent-emerald border border-accent-emerald/30 shadow-sm' 
                  : 'text-slate-400 hover:text-white hover:bg-dark-hover'
              }`}
            >
              <ArrowDownUp size={16} />
              <span>سواپ کریپتو</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('stars')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'stars' 
                  ? 'bg-accent-gold/15 text-accent-gold border border-accent-gold/30 shadow-sm' 
                  : 'text-slate-400 hover:text-white hover:bg-dark-hover'
              }`}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-gold"></span>
              </span>
              <span>خرید و فروش استارز</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === 'orders' 
                  ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30 shadow-sm' 
                  : 'text-slate-400 hover:text-white hover:bg-dark-hover'
              }`}
            >
              <Clock size={16} />
              <span>پیگیری سفارشات</span>
            </button>
          </nav>
        </div>

        {/* Right Actions: Chain Selector + Wallet Connect Button */}
        <div className="flex items-center gap-3">
          
          {/* Active Chain Button */}
          <button
            type="button"
            onClick={onOpenChainSelector}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-dark-card border border-dark-border hover:border-slate-500 transition-all text-xs font-bold text-slate-200"
            title="تغییر شبکه بلاکچین"
          >
            {getChainIcon()}
            <span className="hidden sm:inline">{getChainName()}</span>
          </button>

          {/* Connect / Connected Wallet Button */}
          <button
            type="button"
            onClick={onOpenWalletModal}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm ${
              walletAddress
                ? 'bg-dark-surface border border-accent-emerald/40 text-emerald-400 hover:bg-dark-hover'
                : 'bg-gradient-to-r from-accent-emerald to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-dark-bg font-extrabold shadow-glow-emerald hover:scale-[1.02]'
            }`}
          >
            <WalletIcon size={18} className={walletAddress ? 'text-accent-emerald' : 'text-dark-bg'} />
            <span>
              {walletAddress ? shortenAddress(walletAddress) : 'اتصال کیف پول'}
            </span>
          </button>
        </div>

      </div>
    </header>
  );
}
