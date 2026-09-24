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
import { Clock, ShieldCheck } from 'lucide-react';

export default function App() {
  const { 
    activeChain, 
    setActiveChain, 
    walletAddress, 
    isConnected 
  } = useWallet();

  const [activeTab, setActiveTab] = useState('swap');
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isChainModalOpen, setIsChainModalOpen] = useState(false);

  const chainsList = [
    { id: 'ton', name: 'تون (TON)', icon: <TonIcon size={16} /> },
    { id: 'solana', name: 'سولانا (SOL)', icon: <SolanaIcon size={16} /> },
    { id: 'ethereum', name: 'اتریوم (EVM)', icon: <EthereumIcon size={16} /> },
    { id: 'tron', name: 'ترون (TRON)', icon: <TronIcon size={16} /> },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-dark-bg text-slate-100 selection:bg-emerald-500 selection:text-black">
      
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
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 sm:py-10">
        
        {/* Minimal Hero Header */}
        <div className="text-center max-w-lg mx-auto mb-8 space-y-2">
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            صرافی غیرحضانتی چندزنجیره‌ای
          </h1>
          <p className="text-xs text-zinc-400">
            مبادله مستقیم توکن‌ها و خرید استارز تلگرام بدون واسطه و بدون احراز هویت
          </p>
        </div>

        {/* Tab 1: Multi-Chain Crypto Swap */}
        {activeTab === 'swap' && (
          <div className="animate-fadeIn">
            {/* Minimal Chain Switcher */}
            <div className="flex items-center justify-center gap-1 mb-5 p-1 max-w-fit mx-auto bg-dark-card border border-white/[0.06] rounded-xl">
              {chainsList.map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => setActiveChain(ch.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeChain === ch.id 
                      ? 'bg-dark-surface border border-white/[0.08] text-white shadow-sm' 
                      : 'text-zinc-400 hover:text-white'
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
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-dark-card/95 backdrop-blur-md border-t border-white/[0.06] px-4 py-2 flex items-center justify-around">
        <button
          type="button"
          onClick={() => setActiveTab('swap')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            activeTab === 'swap' ? 'text-emerald-400 font-bold' : 'text-zinc-400'
          }`}
        >
          <ArrowDownUp size={16} />
          <span className="text-[10px]">سواپ</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('stars')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            activeTab === 'stars' ? 'text-amber-300 font-bold' : 'text-zinc-400'
          }`}
        >
          <StarsIcon size={16} />
          <span className="text-[10px]">استارز</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('orders')}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            activeTab === 'orders' ? 'text-sky-400 font-bold' : 'text-zinc-400'
          }`}
        >
          <Clock size={16} />
          <span className="text-[10px]">سفارشات</span>
        </button>

        <button
          type="button"
          onClick={() => setIsWalletModalOpen(true)}
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
            isConnected ? 'text-emerald-400 font-bold' : 'text-zinc-400'
          }`}
        >
          <ShieldCheck size={16} />
          <span className="text-[10px]">{isConnected ? 'ولت متصل' : 'کیف پول'}</span>
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
            className="w-full max-w-sm bg-dark-card border border-white/[0.08] rounded-2xl p-4 space-y-3 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.06]">
              <h3 className="text-sm font-bold text-white">انتخاب شبکه مبادله</h3>
              <button 
                type="button" 
                onClick={() => setIsChainModalOpen(false)}
                className="text-zinc-400 hover:text-white p-1 text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1.5">
              {chainsList.map((ch) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => {
                    setActiveChain(ch.id);
                    setIsChainModalOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl border text-right transition-all group ${
                    activeChain === ch.id 
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-white' 
                      : 'bg-dark-surface border-white/[0.06] hover:border-white/20 text-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {ch.icon}
                    <strong className="text-xs font-bold block text-white group-hover:text-emerald-400 transition-colors">
                      {ch.name}
                    </strong>
                  </div>
                  {activeChain === ch.id && (
                    <span className="text-[11px] font-bold text-emerald-400">فعال ✓</span>
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
