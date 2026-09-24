import React, { useState } from 'react';
import { X, Search, AlertCircle } from 'lucide-react';
import { 
  EthereumIcon, 
  SolanaIcon, 
  TonIcon, 
  TronIcon, 
  UsdtIcon 
} from '../Icons';
import { getTokenPrice } from '../../services/priceService';
import { formatToman } from '../../utils/format';

export default function TokenSelectorModal({ 
  isOpen, 
  onClose, 
  tokens = [], 
  selectedToken, 
  onSelectToken,
  chainName,
  getTokenBalance
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
          <div className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] font-bold text-zinc-300">
            {token.symbol.slice(0, 3)}
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-md bg-dark-card border border-white/[0.08] rounded-2xl shadow-2xl overflow-hidden animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/[0.06] bg-dark-surface/40">
          <div>
            <h3 className="text-sm font-bold text-white">انتخاب توکن</h3>
            <span className="text-[11px] text-zinc-400">شبکه {chainName}</span>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-dark-hover transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-3 border-b border-white/[0.06] bg-dark-bg/50">
          <div className="relative">
            <input
              type="text"
              placeholder="جستجو با نماد یا نام توکن..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-3 pr-9 py-2 rounded-xl bg-dark-surface border border-white/[0.08] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
              autoFocus
            />
            <Search size={16} className="absolute right-3 top-2.5 text-zinc-400" />
          </div>
        </div>

        {/* Tokens List */}
        <div className="max-h-[340px] overflow-y-auto divide-y divide-white/[0.04] p-1.5">
          {filteredTokens.length > 0 ? (
            filteredTokens.map((token) => {
              const isSelected = selectedToken?.symbol === token.symbol;
              const livePrice = getTokenPrice(token.symbol) || token.priceUSD || 1;
              const userBalance = getTokenBalance ? getTokenBalance(token.symbol) : '0.00';

              return (
                <button
                  key={token.symbol}
                  type="button"
                  onClick={() => {
                    onSelectToken(token);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all text-right group ${
                    isSelected ? 'bg-emerald-500/10 border border-emerald-500/20' : 'hover:bg-dark-surface/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="shrink-0">
                      {renderTokenIcon(token)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <strong className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                          {token.symbol}
                        </strong>
                        {token.isNative && (
                          <span className="text-[9px] px-1 py-0.2 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                            اصلی
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-zinc-400 block">{token.name}</span>
                    </div>
                  </div>

                  <div className="text-left">
                    <div className="text-xs font-mono font-bold text-zinc-200" dir="ltr">
                      {userBalance}
                    </div>
                    <span className="text-[10px] text-zinc-500 block">
                      ${livePrice < 0.01 ? livePrice.toFixed(6) : livePrice.toFixed(2)}
                    </span>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="py-10 text-center text-zinc-400 text-xs space-y-1">
              <AlertCircle size={22} className="mx-auto text-zinc-500 opacity-60" />
              <p>توکنی یافت نشد.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
