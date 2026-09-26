import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Copy, 
  LogOut, 
  ShieldCheck, 
  AlertCircle,
  ExternalLink,
  Sparkles,
  Info
} from 'lucide-react';
import { 
  EthereumIcon, 
  SolanaIcon, 
  TonIcon, 
  TronIcon,
  BnbIcon,
  ArbitrumIcon,
  BaseIcon
} from './Icons';
import { useWallet } from '../context/WalletContext';
import { CHAINS, getChainById, isEVMChain } from '../config/chains';
import { shortenAddress } from '../utils/format';

const WALLET_OPTIONS = {
  evm: [
    { 
      id: 'metamask', 
      name: 'MetaMask', 
      desc: 'پرکاربردترین کیف‌پول وب۳ و افزونه مرورگر', 
      badge: 'پیشنهادی', 
      checkInstalled: () => typeof window !== 'undefined' && Boolean(window.ethereum?.isMetaMask),
      installUrl: 'https://metamask.io/download/'
    },
    { 
      id: 'rabby', 
      name: 'Rabby Wallet', 
      desc: 'امن‌ترین ولت دسکتاپ با شبیه‌سازی پیشرفته تراکنش', 
      badge: 'امنیت بالا',
      checkInstalled: () => typeof window !== 'undefined' && Boolean(window.ethereum?.isRabby),
      installUrl: 'https://rabby.io/'
    },
    { 
      id: 'trustwallet', 
      name: 'Trust Wallet', 
      desc: 'کیف‌پول چند ارزی بایننس برای موبایل و وب',
      checkInstalled: () => typeof window !== 'undefined' && Boolean(window.ethereum?.isTrust),
      installUrl: 'https://trustwallet.com/'
    },
    { 
      id: 'injected', 
      name: 'کیف‌پول مرورگر (Injected)', 
      desc: 'اتصال به هر افزونه استاندارد اتریوم و EVM',
      checkInstalled: () => typeof window !== 'undefined' && Boolean(window.ethereum),
      installUrl: null
    }
  ],
  solana: [
    { 
      id: 'phantom', 
      name: 'Phantom', 
      desc: 'کیف‌پول سریع و امن سولانا و بیت‌کوین', 
      badge: 'پیشنهادی',
      checkInstalled: () => typeof window !== 'undefined' && Boolean(window.phantom?.solana || window.solana?.isPhantom),
      installUrl: 'https://phantom.app/'
    },
    { 
      id: 'solflare', 
      name: 'Solflare', 
      desc: 'پشتیبانی تخصصی از اکوسیستم دیفای سولانا',
      checkInstalled: () => typeof window !== 'undefined' && Boolean(window.solflare),
      installUrl: 'https://solflare.com/'
    }
  ],
  ton: [
    { 
      id: 'tonkeeper', 
      name: 'Tonkeeper', 
      desc: 'محبوب‌ترین کیف‌پول اکوسیستم تلگرام و تون', 
      badge: 'پیشنهادی',
      checkInstalled: () => typeof window !== 'undefined' && Boolean(window.tonkeeper || window.ton),
      installUrl: 'https://tonkeeper.com/'
    },
    { 
      id: 'mytonwallet', 
      name: 'MyTonWallet', 
      desc: 'پشتیبانی از چند حسابه و استیکینگ توکن‌های TON',
      checkInstalled: () => typeof window !== 'undefined' && Boolean(window.mytonwallet),
      installUrl: 'https://mytonwallet.io/'
    }
  ],
  tron: [
    { 
      id: 'tronlink', 
      name: 'TronLink', 
      desc: 'کیف‌پول رسمی شبکه ترون برای توکن‌های TRC-20', 
      badge: 'پیشنهادی',
      checkInstalled: () => typeof window !== 'undefined' && Boolean(window.tronLink || window.tronWeb),
      installUrl: 'https://www.tronlink.org/'
    }
  ]
};

export default function WalletModal({ isOpen, onClose }) {
  const { 
    activeChain, 
    setActiveChain, 
    connectedWallets, 
    activeWallet, 
    connectWallet, 
    connectDemoMode,
    disconnectWallet, 
    isConnecting,
    connectError 
  } = useWallet();

  const [selectedChainTab, setSelectedChainTab] = useState(activeChain);
  const [copied, setCopied] = useState(false);
  const [localError, setLocalError] = useState(null);

  if (!isOpen) return null;

  const chainConfig = getChainById(selectedChainTab);
  const currentWallet = connectedWallets[selectedChainTab];

  // Resolve wallet options depending on chain type
  const chainType = chainConfig?.type || 'evm';
  const availableWallets = WALLET_OPTIONS[chainType] || WALLET_OPTIONS.evm;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectWallet = async (wallet) => {
    setLocalError(null);
    try {
      await connectWallet(selectedChainTab, wallet.name);
      onClose();
    } catch (e) {
      setLocalError(e.message || 'خطا در برقراری ارتباط');
    }
  };

  const handleEnableDemo = () => {
    connectDemoMode(selectedChainTab);
    onClose();
  };

  const handleDisconnect = () => {
    disconnectWallet(selectedChainTab);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-border bg-muted/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-accentSoft border border-accent/30 flex items-center justify-center text-accent">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-fg">اتصال به کیف‌پول (غیرحضانتی)</h3>
              <p className="text-xs text-fgMuted">کلیدهای خصوصی هرگز از دستگاه شما خارج نمی‌شوند</p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="p-1.5 rounded-lg text-fgSubtle hover:text-fg hover:bg-muted transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Chain Selector Quick Pills */}
        <div className="p-2.5 bg-bg/50 border-b border-border flex gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'ton', name: 'TON', icon: <TonIcon size={15} /> },
            { id: 'solana', name: 'سولانا', icon: <SolanaIcon size={15} /> },
            { id: 'ethereum', name: 'اتریوم', icon: <EthereumIcon size={15} /> },
            { id: 'arbitrum', name: 'آربیتروم', icon: <ArbitrumIcon size={15} /> },
            { id: 'base', name: 'بیس', icon: <BaseIcon size={15} /> },
            { id: 'bsc', name: 'BNB', icon: <BnbIcon size={15} /> },
            { id: 'tron', name: 'ترون', icon: <TronIcon size={15} /> }
          ].map(c => {
            const isTabActive = selectedChainTab === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setSelectedChainTab(c.id);
                  setLocalError(null);
                }}
                className={`flex-1 min-w-[75px] flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-xl text-xs font-bold transition-all ${
                  isTabActive 
                    ? 'bg-accentSoft border border-accent/40 text-accent' 
                    : 'text-fgSubtle hover:text-fg hover:bg-muted/60'
                }`}
              >
                {c.icon}
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>

        {/* Error notification if any */}
        {(localError || connectError) && (
          <div className="mx-4 mt-3 p-3 rounded-xl bg-destructiveSoft border border-destructive/30 flex items-start gap-2.5 text-xs text-red-300">
            <AlertCircle size={15} className="text-destructive shrink-0 mt-0.5" />
            <div className="flex-1">
              <span>{localError || connectError}</span>
            </div>
          </div>
        )}

        {/* Modal Body: Connected view vs Provider list */}
        <div className="p-4 sm:p-5">
          {currentWallet ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-muted/40 border border-accent/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent animate-pulse"></span>
                    <span className="text-xs font-bold text-accent">
                      متصل به شبکه {chainConfig.name}
                    </span>
                  </div>
                  <span className="text-xs text-fgMuted font-medium">
                    {currentWallet.walletName}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-card border border-border rounded-lg">
                  <span className="font-mono text-sm text-fg" dir="ltr">
                    {shortenAddress(currentWallet.address, 8)}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(currentWallet.address)}
                    className="flex items-center gap-1 text-xs text-accent hover:text-emerald-300 font-bold px-2 py-1 rounded bg-accentSoft transition-colors"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied ? 'کپی شد' : 'کپی'}</span>
                  </button>
                </div>

                {currentWallet.isDemo && (
                  <div className="flex items-center gap-1.5 text-[11px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md">
                    <Info size={13} />
                    <span>حالت مشاهده آزمایشی فعال است (تراکنش‌های واقعی ثبت نمی‌شوند).</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setActiveChain(selectedChainTab);
                    onClose();
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-accent hover:bg-accentHover text-bg font-bold text-sm transition-all"
                >
                  استفاده از این شبکه
                </button>
                <button
                  type="button"
                  onClick={handleDisconnect}
                  className="p-2.5 rounded-xl border border-destructive/30 hover:bg-destructiveSoft text-destructive transition-colors"
                  title="قطع اتصال این کیف‌پول"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-fgMuted mb-2 px-1">
                <span>کیف‌پول‌های پیشنهادی برای {chainConfig.name}:</span>
                <span className="font-mono text-[11px] text-fgSubtle">{chainConfig.nativeSymbol}</span>
              </div>

              {availableWallets.map((wallet) => {
                const isInstalled = wallet.checkInstalled();
                return (
                  <button
                    key={wallet.id}
                    type="button"
                    disabled={isConnecting}
                    onClick={() => handleSelectWallet(wallet)}
                    className="w-full flex items-center justify-between p-3.5 rounded-xl bg-muted/40 hover:bg-muted border border-border hover:border-zinc-500 transition-all text-right group"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-fg group-hover:text-accent transition-colors">
                          {wallet.name}
                        </span>
                        {isInstalled && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-accentSoft text-accent border border-accent/20">
                            نصب شده
                          </span>
                        )}
                        {wallet.badge && !isInstalled && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-muted text-fgMuted border border-border">
                            {wallet.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-fgSubtle mt-0.5">{wallet.desc}</p>
                    </div>

                    <span className="text-xs font-bold text-fgSubtle group-hover:text-accent transition-colors">
                      اتصال ➔
                    </span>
                  </button>
                );
              })}

              {/* Demo Mode Button for testing/reviewing */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleEnableDemo}
                  className="w-full py-2 px-3 rounded-xl border border-dashed border-border hover:border-accent/40 text-xs text-fgMuted hover:text-fg flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Sparkles size={14} className="text-accent" />
                  <span>مشاهده رابط در حالت آزمایشی (Demo Mode)</span>
                </button>
              </div>
            </div>
          )}

          {/* Security Guarantee Note */}
          <div className="mt-4 p-3 rounded-xl bg-bg border border-border/60 flex items-start gap-2.5 text-[11px] text-fgMuted leading-relaxed">
            <AlertCircle size={15} className="text-accent shrink-0 mt-0.5" />
            <span>
              <strong>امنیت ۱۰۰٪ تضمین‌شده:</strong> ارتباط شما صرفاً از طریق استاندارد رسمی امضای Web3 برقرار می‌شود. هیچ رمز، کلید خصوصی یا دسترسی حساسی از شما خواسته نخواهد شد.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
