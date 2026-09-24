import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Copy, 
  ExternalLink, 
  LogOut, 
  ShieldCheck, 
  AlertCircle 
} from 'lucide-react';
import { 
  EthereumIcon, 
  SolanaIcon, 
  TonIcon, 
  TronIcon 
} from './Icons';
import { useWallet } from '../context/WalletContext';
import { shortenAddress } from '../utils/format';

const WALLET_PROVIDERS = {
  ton: [
    { id: 'tonkeeper', name: 'Tonkeeper', desc: 'محبوب‌ترین کیف‌پول اکوسیستم تون', badge: 'پیشنهادی' },
    { id: 'mytonwallet', name: 'MyTonWallet', desc: 'پشتیبانی از مولتی‌اکانت و استیکینگ' },
    { id: 'telegram_wallet', name: 'Telegram Wallet (@wallet)', desc: 'کیف‌پول داخلی و رسمی تلگرام' },
  ],
  solana: [
    { id: 'phantom', name: 'Phantom', desc: 'کیف‌پول سریع و امن سولانا', badge: 'پیشنهادی' },
    { id: 'solflare', name: 'Solflare', desc: 'پشتیبانی تخصصی از اکوسیستم دیفای سولانا' },
  ],
  ethereum: [
    { id: 'metamask', name: 'MetaMask', desc: 'کیف‌پول استاندارد اتریوم و EVM', badge: 'پیشنهادی' },
    { id: 'rabby', name: 'Rabby Wallet', desc: 'امن‌ترین ولت دسکتاپ با آنالیز تراکنش' },
    { id: 'trustwallet', name: 'Trust Wallet', desc: 'کیف‌پول چند ارزی معتبر' },
  ],
  tron: [
    { id: 'tronlink', name: 'TronLink', desc: 'کیف‌پول رسمی شبکه ترون برای TRC-20', badge: 'پیشنهادی' },
  ]
};

export default function WalletModal({ isOpen, onClose }) {
  const { 
    activeChain, 
    setActiveChain, 
    connectedWallets, 
    activeWallet, 
    connectWallet, 
    disconnectWallet, 
    isConnecting 
  } = useWallet();

  const [selectedChainTab, setSelectedChainTab] = useState(activeChain);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentWallet = connectedWallets[selectedChainTab];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectWallet = async (wallet) => {
    try {
      await connectWallet(selectedChainTab, wallet.name);
      onClose();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDisconnect = () => {
    disconnectWallet(selectedChainTab);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-md bg-dark-card border border-dark-border rounded-2xl shadow-2xl overflow-hidden animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-dark-border bg-dark-surface/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-accent-emerald/15 border border-accent-emerald/30 flex items-center justify-center text-accent-emerald">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">اتصال به کیف پول (غیرحضانتی)</h3>
              <p className="text-xs text-slate-400">یک شبکه و ولت را جهت امضای تراکنش انتخاب کنید</p>
            </div>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-dark-hover transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Chain Selector Tabs */}
        <div className="p-3 bg-dark-bg/60 border-b border-dark-border flex gap-1.5 overflow-x-auto">
          <button
            type="button"
            onClick={() => setSelectedChainTab('ton')}
            className={`flex-1 min-w-[70px] flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold transition-all ${
              selectedChainTab === 'ton' 
                ? 'bg-[#0088CC]/20 border border-[#0088CC]/50 text-[#0088CC]' 
                : 'text-slate-400 hover:bg-dark-surface'
            }`}
          >
            <TonIcon size={16} /> <span>TON</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedChainTab('solana')}
            className={`flex-1 min-w-[70px] flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold transition-all ${
              selectedChainTab === 'solana' 
                ? 'bg-[#9945FF]/20 border border-[#9945FF]/50 text-[#9945FF]' 
                : 'text-slate-400 hover:bg-dark-surface'
            }`}
          >
            <SolanaIcon size={16} /> <span>سولانا</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedChainTab('ethereum')}
            className={`flex-1 min-w-[70px] flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold transition-all ${
              selectedChainTab === 'ethereum' 
                ? 'bg-[#627EEA]/20 border border-[#627EEA]/50 text-[#627EEA]' 
                : 'text-slate-400 hover:bg-dark-surface'
            }`}
          >
            <EthereumIcon size={16} /> <span>اتریوم</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedChainTab('tron')}
            className={`flex-1 min-w-[70px] flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-xl text-xs font-bold transition-all ${
              selectedChainTab === 'tron' 
                ? 'bg-[#EF0027]/20 border border-[#EF0027]/50 text-[#EF0027]' 
                : 'text-slate-400 hover:bg-dark-surface'
            }`}
          >
            <TronIcon size={16} /> <span>ترون</span>
          </button>
        </div>

        {/* Modal Body: If Connected on this chain, show details; otherwise list wallets */}
        <div className="p-5">
          {currentWallet ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-dark-surface border border-accent-emerald/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-accent-emerald animate-pulse"></span>
                    <span className="text-xs font-bold text-accent-emerald">متصل به شبکه {selectedChainTab.toUpperCase()}</span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">{currentWallet.walletName}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 bg-dark-bg/80 border border-dark-border rounded-lg">
                  <span className="font-mono text-sm text-slate-200" dir="ltr">
                    {shortenAddress(currentWallet.address, 7)}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(currentWallet.address)}
                    className="flex items-center gap-1 text-xs text-accent-emerald hover:text-emerald-300 font-bold px-2 py-1 rounded bg-accent-emerald/10 transition-colors"
                  >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied ? 'کپی شد' : 'کپی'}</span>
                  </button>
                </div>
              </div>

              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setActiveChain(selectedChainTab);
                    onClose();
                  }}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-accent-emerald hover:bg-emerald-600 text-dark-bg font-bold text-sm transition-all shadow-glow-emerald"
                >
                  استفاده از این شبکه
                </button>
                <button
                  type="button"
                  onClick={handleDisconnect}
                  className="p-2.5 rounded-xl border border-red-500/30 hover:bg-red-500/10 text-red-400 transition-colors"
                  title="قطع اتصال این کیف پول"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-2.5">
              <div className="text-xs font-bold text-slate-400 mb-2">کیف‌پول‌های پیشنهادی:</div>
              {WALLET_PROVIDERS[selectedChainTab]?.map((wallet) => (
                <button
                  key={wallet.id}
                  type="button"
                  disabled={isConnecting}
                  onClick={() => handleSelectWallet(wallet)}
                  className="w-full flex items-center justify-between p-3.5 rounded-xl bg-dark-surface hover:bg-dark-hover border border-dark-border hover:border-slate-500 transition-all text-right group"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-white group-hover:text-accent-emerald transition-colors">
                        {wallet.name}
                      </span>
                      {wallet.badge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-accent-emerald/15 text-accent-emerald border border-accent-emerald/30">
                          {wallet.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{wallet.desc}</p>
                  </div>
                  <span className="text-xs font-bold text-slate-500 group-hover:text-accent-emerald transition-colors">
                    اتصال ➔
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Security Guarantee Note */}
          <div className="mt-5 p-3 rounded-xl bg-dark-bg border border-dark-border/60 flex items-start gap-2.5 text-[11px] text-slate-400 leading-relaxed">
            <AlertCircle size={15} className="text-accent-gold shrink-0 mt-0.5" />
            <span>
              <strong>امنیت صد درصدی:</strong> هیچ کلید خصوصی یا دسترسی حساسی از شما درخواست نمی‌شود. اتصال تنها برای استعلام موجودی و تایید تراکنش با مجوز شماست.
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
