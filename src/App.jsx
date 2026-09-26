import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SwapCard from './components/swap/SwapCard';
import StarsDesk from './components/stars/StarsDesk';
import OrderTracker from './components/orders/OrderTracker';
import IranToolkit from './components/iran/IranToolkit';
import WalletModal from './components/WalletModal';
import ChainSelectorModal from './components/ChainSelectorModal';
import { useWallet } from './context/WalletContext';
import { Clock, ShieldCheck, CreditCard, ArrowDownUp, HelpCircle } from 'lucide-react';
import { StarsIcon } from './components/Icons';

// VibeFarsi RTL Components & Backgrounds
import { ScrollProgress } from '@/components/animations/scroll-progress';
import { GridBackground } from '@/components/backgrounds/grid';
import { TextShimmer } from '@/components/animations/text-shimmer';
import { SpotlightCard } from '@/components/animations/spotlight-card';
import { Stat } from '@/components/ui/stat';
import { Accordion } from '@/components/ui/accordion';

export default function App() {
  const { 
    activeChain, 
    setActiveChain, 
    walletAddress, 
    isConnected,
    isDemo 
  } = useWallet();

  const [activeTab, setActiveTab] = useState('swap');
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isChainModalOpen, setIsChainModalOpen] = useState(false);

  // VibeFarsi FAQ Accordion items
  const faqItems = [
    {
      id: 'faq-1',
      title: 'صرافی غیرحضانتی (Non-Custodial) به چه معناست؟',
      content: 'در JSWAP دارایی‌های شما هرگز در کیف‌پول پلتفرم امانت گرفته نمی‌شود. تمام تراکنش‌ها به صورت همتا‌به‌همتا (P2P) و مستقیم از کیف‌پول شخصی شما روی استخرهای نقدینگی برتر (STON.fi, Jupiter, Uniswap, SunSwap) امضا و تسویه می‌گردند.'
    },
    {
      id: 'faq-2',
      title: 'میز اختصاصی استارز تلگرام (Telegram Stars) چگونه کار می‌کند؟',
      content: 'شما می‌توانید بدون نیاز به کارت‌های بین‌المللی مسترکارت یا ویزا، با پرداخت ارزهای دیجیتال (TON, USDT, SOL, TRX) یا معادل تومانی، استارز رسمی تلگرام را با بهترین نرخ لحظه‌ای خریداری یا نقد کرده و در کمتر از چند دقیقه تحویل بگیرید.'
    },
    {
      id: 'faq-3',
      title: 'آیا برای مبادله ارزها یا خرید استارز به احراز هویت (KYC) نیاز است؟',
      content: 'خیر. JSWAP بر پایه آزادی مالی وب۳ طراحی شده و برای مبادله غیرحضانتی هیچ‌گونه ثبت‌نام اجباری، بارگذاری مدارک هویتی یا ثبت ایمیل نیاز نیست.'
    },
    {
      id: 'faq-4',
      title: 'کارمزد تراکنش‌ها در کدام شبکه اقتصادی‌تر است؟',
      content: 'شبکه‌های تون (TON)، سولانا (Solana) و لایه‌های دوم اتریوم (Arbitrum, Base, Polygon) سریع‌ترین سرعت تایید (کمتر از چند ثانیه) و کمترین کارمزد گس (کمتر از چند سنت) را برای مبادلات فراهم می‌کنند.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-accent selection:text-background relative overflow-x-hidden">
      
      {/* VibeFarsi RTL Scroll Progress */}
      <ScrollProgress className="h-0.5 bg-accent z-[60]" />

      {/* VibeFarsi Technical Grid Background */}
      <GridBackground size={48} className="opacity-20 pointer-events-none" />

      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        activeChain={activeChain}
        walletAddress={walletAddress}
        isDemo={isDemo}
        onOpenWalletModal={() => setIsWalletModalOpen(true)}
        onOpenChainSelector={() => setIsChainModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8 sm:py-10 relative z-10 space-y-8">
        
        {/* Minimal Hero Header with VibeFarsi TextShimmer */}
        <div className="text-center max-w-xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <TextShimmer className="text-xs font-mono font-bold text-accent" duration={2.5}>
              JSWAP • پروتکل غیرحضانتی مبادله میان‌زنجیره‌ای و استارز
            </TextShimmer>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-foreground tracking-tight leading-tight">
            صرافی غیرحضانتی چندزنجیره‌ای
          </h1>
          
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
            مبادله مستقیم در استخرهای نقدینگی ۱۵ شبکه وب۳، خرید و فروش استارز تلگرام و تسویه بانکی به تومان
          </p>
        </div>

        {/* VibeFarsi Live DEX Metrics Ticker */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Stat
            size="sm"
            label="حجم معاملات ۲۴ ساعته"
            value="۱٬۴۵۰٬۰۰۰"
            unit="$"
            delta={14}
            deltaLabel="رشد روزانه"
          />
          <Stat
            size="sm"
            label="میانگین سرعت تسویه"
            value="۲٫۴"
            unit="ثانیه"
            delta={-8}
            deltaLabel="بهبود کارایی شبکه"
          />
          <Stat
            size="sm"
            label="نرخ استارز تلگرام"
            value="۱٬۳۴۰"
            unit="تومان"
            delta={3}
            deltaLabel="قیمت لحظه‌ای"
          />
          <Stat
            size="sm"
            label="شبکه‌های فعال متصل"
            value="۱۵"
            unit="زنجیره"
          />
        </div>

        {/* Interactive Tab Content (Wrapped in VibeFarsi SpotlightCard) */}
        <SpotlightCard className="shadow-2xl">
          <div className="p-4 sm:p-6">
            {/* Tab 1: Multi-Chain Crypto Swap */}
            {activeTab === 'swap' && (
              <div className="animate-fade-in space-y-4">
                <SwapCard 
                  onOpenWalletModal={() => setIsWalletModalOpen(true)} 
                  onOpenChainSelector={() => setIsChainModalOpen(true)}
                />
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
          </div>
        </SpotlightCard>

        {/* VibeFarsi Interactive Knowledge Base / FAQ Accordion */}
        <div className="pt-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <HelpCircle className="w-4 h-4 text-accent" />
            <h2 className="text-sm font-bold text-foreground">
              راهنما و پرسش‌های متداول JSWAP
            </h2>
          </div>
          <Accordion items={faqItems} multiple defaultOpen={['faq-1']} />
        </div>

      </main>

      {/* Footer */}
      <Footer onSwitchTab={(tab) => setActiveTab(tab)} />

      {/* Mobile Floating Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-sm border-t border-border px-3 py-2 flex items-center justify-around">
        <button
          type="button"
          onClick={() => setActiveTab('swap')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg transition-all ${
            activeTab === 'swap' ? 'text-accent font-semibold' : 'text-muted-foreground'
          }`}
        >
          <ArrowDownUp size={16} />
          <span className="text-xs">سواپ</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('stars')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg transition-all ${
            activeTab === 'stars' ? 'text-amber-400 font-semibold' : 'text-muted-foreground'
          }`}
        >
          <StarsIcon size={16} />
          <span className="text-xs">استارز</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('iran')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg transition-all ${
            activeTab === 'iran' ? 'text-accent font-semibold' : 'text-muted-foreground'
          }`}
        >
          <CreditCard size={16} />
          <span className="text-xs">ایران</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('orders')}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg transition-all ${
            activeTab === 'orders' ? 'text-sky-400 font-semibold' : 'text-muted-foreground'
          }`}
        >
          <Clock size={16} />
          <span className="text-xs">سفارشات</span>
        </button>

        <button
          type="button"
          onClick={() => setIsWalletModalOpen(true)}
          className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-lg transition-all ${
            isConnected ? 'text-accent font-semibold' : 'text-muted-foreground'
          }`}
        >
          <ShieldCheck size={16} />
          <span className="text-xs">{isConnected ? (isDemo ? 'دمو' : 'ولت') : 'اتصال'}</span>
        </button>
      </div>

      {/* Multi-Chain Wallet Connect Modal */}
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
      />

      {/* Complete Network / Chain Switcher Modal */}
      <ChainSelectorModal
        isOpen={isChainModalOpen}
        onClose={() => setIsChainModalOpen(false)}
        activeChain={activeChain}
        onSelectChain={(chain) => setActiveChain(chain)}
      />

    </div>
  );
}
