import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SwapCard from './components/swap/SwapCard';
import StarsDesk from './components/stars/StarsDesk';
import OrderTracker from './components/orders/OrderTracker';
import WalletModal from './components/WalletModal';
import { useWallet } from './context/WalletContext';
import { 
  ArrowDownUp, 
  StarsIcon, 
  TonIcon, 
  SolanaIcon, 
  EthereumIcon, 
  TronIcon 
} from './components/Icons';
import { 
  Clock, 
  ShieldCheck, 
  Zap, 
  ExternalLink, 
  Sparkles, 
  ChevronRight 
} from 'lucide-react';

export default function App() {
  const { 
    activeChain, 
    setActiveChain, 
    walletAddress, 
    isConnected 
  } = useWallet();

  const [activeTab, setActiveTab] = useState('swap'); // 'swap' | 'stars' | 'orders'
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isChainModalOpen, setIsChainModalOpen] = useState(false);

  const chainsList = [
    { id: 'ton', name: 'شبکه تون (TON)', icon: <TonIcon size={20} />, badge: 'کمترین کارمزد' },
    { id: 'solana', name: 'سولانا (Solana)', icon: <SolanaIcon size={20} />, badge: 'سرعت بالا' },
    { id: 'ethereum', name: 'اتریوم (EVM)', icon: <EthereumIcon size={20} />, badge: 'بزرگترین نقدینگی' },
    { id: 'tron', name: 'ترون (TRON)', icon: <TronIcon size={20} />, badge: 'استاندارد USDT' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-dark-bg text-slate-100 relative selection:bg-accent-emerald selection:text-black">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-b from-accent-emerald/10 via-accent-gold/5 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeChain={activeChain}
        walletAddress={walletAddress}
        onOpenWalletModal={() => setIsWalletModalOpen(true)}
        onOpenChainSelector={() => setIsChainModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Top Hero Trust Metrics */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-surface border border-accent-emerald/30 text-accent-emerald text-xs font-bold animate-fadeIn shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-accent-emerald animate-ping" />
            <span>پلتفرم غیرحضانتی JSWAP • نسخه رسمی فارسی روی javadnode.top</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-snug">
            مبادله سریع رمزارزها و خرید مستقیم <span className="bg-gradient-to-r from-accent-gold via-amber-400 to-yellow-300 bg-clip-text text-transparent">استارز تلگرام</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            بدون احراز هویت، بدون بلوکه شدن دارایی و با اتصال مستقیم کیف‌پول شخصی در شبکه‌های تون، سولانا، اتریوم و ترون.
          </p>
        </div>

        {/* Tab 1: Multi-Chain Crypto Swap */}
        {activeTab === 'swap' && (
          <div className="animate-fadeIn">
            {/* Quick Chain Pill Switcher on Mobile/Tablet */}
            <div className="flex items-center justify-center gap-1.5 mb-6 overflow-x-auto p-1.5 max-w-fit mx-auto bg-dark-card border border-dark-border rounded-2xl">
              {chainsList.map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => setActiveChain(ch.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeChain === ch.id 
                      ? 'bg-dark-surface border border-accent-emerald/50 text-white shadow-sm' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {ch.icon}
                  <span>{ch.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            <SwapCard onOpenWalletModal={() => setIsWalletModalOpen(true)} />
          </div>
        )}

        {/* Tab 2: Direct Telegram Stars OTC Desk */}
        {activeTab === 'stars' && (
          <div className="animate-fadeIn">
            <StarsDesk />
          </div>
        )}

        {/* Tab 3: Order Tracker */}
        {activeTab === 'orders' && (
          <div className="animate-fadeIn">
            <OrderTracker />
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer onSwitchTab={(tab) => setActiveTab(tab)} />

      {/* Mobile Floating Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-dark-card/95 backdrop-blur-lg border-t border-dark-border px-4 py-2 flex items-center justify-around shadow-2xl">
        <button
          type="button"
          onClick={() => setActiveTab('swap')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            activeTab === 'swap' ? 'text-accent-emerald font-bold' : 'text-slate-400'
          }`}
        >
          <ArrowDownUp size={18} />
          <span className="text-[11px]">سواپ</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('stars')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            activeTab === 'stars' ? 'text-accent-gold font-bold' : 'text-slate-400'
          }`}
        >
          <StarsIcon size={18} />
          <span className="text-[11px]">استارز</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('orders')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            activeTab === 'orders' ? 'text-sky-400 font-bold' : 'text-slate-400'
          }`}
        >
          <Clock size={18} />
          <span className="text-[11px]">پیگیری</span>
        </button>

        <button
          type="button"
          onClick={() => setIsWalletModalOpen(true)}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            isConnected ? 'text-emerald-400 font-bold' : 'text-slate-400'
          }`}
        >
          <ShieldCheck size={18} />
          <span className="text-[11px]">{isConnected ? 'ولت متصل' : 'کیف پول'}</span>
        </button>
      </div>

      {/* Multi-Chain Wallet Connect Modal */}
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />

      {/* Network / Chain Switcher Modal */}
      {isChainModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div 
            className="w-full max-w-sm bg-dark-card border border-dark-border rounded-2xl p-5 space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-dark-border">
              <h3 className="text-base font-bold text-white">انتخاب شبکه مبادله</h3>
              <button 
                type="button" 
                onClick={() => setIsChainModalOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2">
              {chainsList.map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => {
                    setActiveChain(ch.id);
                    setIsChainModalOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-right transition-all group ${
                    activeChain === ch.id 
                      ? 'bg-accent-emerald/15 border-accent-emerald text-white' 
                      : 'bg-dark-surface border-dark-border hover:border-slate-500 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {ch.icon}
                    <div>
                      <strong className="text-sm font-bold block text-white group-hover:text-accent-emerald transition-colors">
                        {ch.name}
                      </strong>
                      <span className="text-[11px] text-slate-400">{ch.badge}</span>
                    </div>
                  </div>
                  {activeChain === ch.id && (
                    <span className="text-xs font-bold text-accent-emerald">فعال ✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
