import React, { useState } from 'react';
import { X, Search, Check, AlertCircle } from 'lucide-react';
import { 
  EthereumIcon, 
  SolanaIcon, 
  TonIcon, 
  TronIcon, 
  UsdtIcon 
} from '../Icons';
import { formatCrypto, formatToman, toPersianDigits, shortenAddress } from '../../utils/format';

export default function TokenSelectorModal({ 
  isOpen, 
  onClose, 
  tokens = [], 
  selectedToken, 
  onSelectToken,
  chainName
}) {
  const [search, setSearch] = useState('');

  if (!isOpen) return null;

  const filteredTokens = tokens.filter(t => 
    t.symbol.toLowerCase().includes(search.toLowerCase()) ||
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    (t.address && t.address.toLowerCase().includes(search.toLowerCase()))
  );

  const renderTokenIcon = (token) => {
    switch (token.icon) {
      case 'eth': return <EthereumIcon size={24} />;
      case 'sol': return <SolanaIcon size={24} />;
      case 'ton': return <TonIcon size={24} />;
      case 'trx': return <TronIcon size={24} />;
      case 'usdt': return <UsdtIcon size={24} />;
      default:
        return (
          <div className="w-6 h-6 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center text-[10px] font-black text-slate-300">
            {token.symbol.slice(0, 3)}
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-md bg-dark-card border border-dark-border rounded-2xl shadow-2xl overflow-hidden animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-dark-border bg-dark-surface/50">
          <div>
            <h3 className="text-base font-bold text-white">انتخاب ارز / توکن</h3>
            <span className="text-xs text-slate-400">شبکه فعال: {chainName}</span>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-dark-hover transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b border-dark-border/60 bg-dark-bg/40">
          <div className="relative">
            <input
              type="text"
              placeholder="جستجو با نماد، نام یا آدرس قرارداد توکن..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-dark-surface border border-dark-border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-accent-emerald transition-colors"
              autoFocus
            />
            <Search size={18} className="absolute right-3.5 top-3 text-slate-400" />
          </div>
        </div>

        {/* Tokens List */}
        <div className="max-h-[360px] overflow-y-auto divide-y divide-dark-border/40 p-2">
          {filteredTokens.length > 0 ? (
            filteredTokens.map((token) => {
              const isSelected = selectedToken?.symbol === token.symbol;
              return (
                <button
                  key={token.symbol}
                  type="button"
                  onClick={() => {
                    onSelectToken(token);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all text-right group ${
                    isSelected ? 'bg-accent-emerald/10 border border-accent-emerald/30' : 'hover:bg-dark-surface/80'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="shrink-0">
                      {renderTokenIcon(token)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <strong className="text-sm font-bold text-white group-hover:text-accent-emerald transition-colors">
                          {token.symbol}
                        </strong>
                        {token.isNative && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                            کوین اصلی
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 block">{token.name}</span>
                    </div>
                  </div>

                  <div className="text-left">
                    <div className="text-sm font-mono font-bold text-slate-200" dir="ltr">
                      {token.balance || '0.00'}
                    </div>
                    <span className="text-[11px] text-slate-500 block">
                      ≈ {formatToman(token.priceToman)}
                    </span>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="py-12 text-center text-slate-400 text-sm space-y-2">
              <AlertCircle size={28} className="mx-auto text-slate-500 opacity-60" />
              <p>توکنی با این مشخصات در شبکه یافت نشد.</p>
              <p className="text-xs text-slate-500">می‌توانید آدرس قرارداد را مستقیماً وارد کنید.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
