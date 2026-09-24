import React from 'react';
import { 
  WalletIcon, 
  ArrowDownUp, 
  Clock, 
  Sparkles,
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
      default: return <Sparkles size={16} className="text-emerald-400" />;
    }
  };

  const getChainName = () => {
    switch (activeChain) {
      case 'ethereum': return 'اتریوم';
      case 'solana': return 'سولانا';
      case 'ton': return 'تون';
      case 'tron': return 'ترون';
      default: return 'شبکه';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.06] bg-dark-bg/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-6">
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <span className="text-xs font-black text-emerald-400">JS</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold text-white tracking-tight">JSWAP</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/[0.06] text-zinc-400">فارسی</span>
            </div>
          </a>

          {/* Navigation Tabs (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 p-1 bg-dark-card border border-white/[0.06] rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab('swap')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'swap' 
                  ? 'bg-dark-surface text-white border border-white/[0.08]' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <ArrowDownUp size={14} />
              <span>سواپ</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('stars')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'stars' 
                  ? 'bg-dark-surface text-amber-300 border border-white/[0.08]' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <StarsIcon size={14} />
              <span>استارز تلگرام</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('iran')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'iran' 
                  ? 'bg-dark-surface text-emerald-400 border border-white/[0.08]' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <CreditCard size={14} />
              <span>تسویه و ابزار ایران</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('orders')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'orders' 
                  ? 'bg-dark-surface text-sky-400 border border-white/[0.08]' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Clock size={14} />
              <span>سفارشات</span>
            </button>
          </nav>
        </div>

        {/* Right Actions: Chain Selector + Wallet Button */}
        <div className="flex items-center gap-2">
          
          {/* Active Chain Button */}
          <button
            type="button"
            onClick={onOpenChainSelector}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-dark-card border border-white/[0.06] hover:border-white/20 transition-all text-xs font-bold text-zinc-300"
            title="انتخاب شبکه"
          >
            {getChainIcon()}
            <span className="hidden sm:inline">{getChainName()}</span>
          </button>

          {/* Connect / Connected Wallet Button */}
          <button
            type="button"
            onClick={onOpenWalletModal}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              walletAddress
                ? 'bg-dark-surface border border-emerald-500/30 text-emerald-400 hover:bg-dark-hover'
                : 'bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold'
            }`}
          >
            {walletAddress ? (
              <>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
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
