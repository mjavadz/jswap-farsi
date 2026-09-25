import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SwapCard from './components/swap/SwapCard';
import StarsDesk from './components/stars/StarsDesk';
import OrderTracker from './components/orders/OrderTracker';
import IranToolkit from './components/iran/IranToolkit';
import WalletModal from './components/WalletModal';
import { useWallet } from './context/WalletContext';
import { Clock, ShieldCheck, CreditCard } from 'lucide-react';

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

  return (
    <div className="min-h-screen flex flex-col bg-bg text-fg selection:bg-accent selection:text-bg">
      
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
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-8 sm:py-10">
        
        {/* Minimal Hero Header */}
        <div className="text-center max-w-lg mx-auto mb-8 space-y-2">
          <h1 className="text-xl sm:text-2xl font-semibold text-fg tracking-tight">
            صرافی غیرحضانتی چندزنجیره‌ای
          </h1>
          <p className="text-sm text-fgMuted">
            مبادله مستقیم توکن‌ها، خرید و فروش استارز تلگرام و تسویه بانکی به تومان
          </p>
        </div>

        {/* Tab 1: Multi-Chain Crypto Swap */}
        {activeTab === 'swap' && (
          <div className="animate-fade-in space-y-4">
            <SwapCard onOpenWalletModal={() => setIsWalletModalOpen(true)} />
          </div>
        )}

        {/* Tab 2: Direct Telegram Stars OTC Desk */}
        {activeTab === 'stars' && (
          <div className="animate-fade-in">
            <StarsDesk />
          </div>
        )}

        {/* Tab 3: Iran Web3 Toolkit */}
        {activeTab === 'iran' && (
          <div className="animate-fade-in">
            <IranToolkit />
          </div>
        )}

        {/* Tab 4: Order Tracker */}
        {activeTab === 'orders' && (
          <div className="animate-fade-in">
            <OrderTracker />
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer onSwitchTab={(tab) => setActiveTab(tab)} />

      {/* Mobile Floating Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-sm border-t border-border px-3 py-2 flex items-center justify-around">
        <button
          type="button"
          onClick={() => setActiveTab('swap')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg transition-all ${
            activeTab === 'swap' ? 'text-accent font-semibold' : 'text-fgSubtle'
          }`}
        >
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 16 4 4 4-4" />
            <path d="M7 20V4" />
            <path d="m21 8-4-4-4 4" />
            <path d="M17 4v16" />
          </svg>
          <span className="text-xs">سواپ</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('stars')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg transition-all ${
            activeTab === 'stars' ? 'text-amber-400 font-semibold' : 'text-fgSubtle'
          }`}
        >
          <svg width={16} height={16} viewBox="0 0 32 32" fill="none">
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
          <span className="text-xs">استارز</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('iran')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg transition-all ${
            activeTab === 'iran' ? 'text-accent font-semibold' : 'text-fgSubtle'
          }`}
        >
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="14" height="18" x="5" y="3" rx="2" />
            <line x1="5" x2="19" y1="9" y2="9" />
            <path d="M5 15h14" />
          </svg>
          <span className="text-xs">ایران</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('orders')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg transition-all ${
            activeTab === 'orders' ? 'text-sky-400 font-semibold' : 'text-fgSubtle'
          }`}
        >
          <Clock size={16} />
          <span className="text-xs">سفارشات</span>
        </button>

        <button
          type="button"
          onClick={() => setIsWalletModalOpen(true)}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg transition-all ${
            isConnected ? 'text-accent font-semibold' : 'text-fgSubtle'
          }`}
        >
          <ShieldCheck size={16} />
          <span className="text-xs">{isConnected ? 'ولت' : 'اتصال'}</span>
        </button>
      </div>

      {/* Multi-Chain Wallet Connect Modal */}
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />

      {/* Network / Chain Switcher Modal */}
      {isChainModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div 
            className="w-full max-w-sm bg-card border border-border rounded-xl p-4 space-y-3 shadow-lg animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2.5 border-b border-border">
              <h3 className="text-sm font-semibold text-fg">انتخاب شبکه</h3>
              <button 
                type="button" 
                onClick={() => setIsChainModalOpen(false)}
                className="text-fgSubtle hover:text-fg p-1 text-sm"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-fgSubtle mb-2">یک شبکه برای مبادله انتخاب کنید</p>
          </div>
        </div>
      )}

    </div>
  );
}