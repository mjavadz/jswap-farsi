import React, { useState } from 'react';
import { X, Search, AlertCircle } from 'lucide-react';
import { 
  EthereumIcon, 
  SolanaIcon, 
  TonIcon, 
  TronIcon, 
  UsdtIcon,
  BnbIcon,
  ArbitrumIcon,
  PolygonIcon
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
      case 'eth': return <EthereumIcon size={20} />;
      case 'sol': return <SolanaIcon size={20} />;
      case 'ton': return <TonIcon size={20} />;
      case 'trx': return <TronIcon size={20} />;
      case 'usdt': return <UsdtIcon size={20} />;
      case 'bnb': return <BnbIcon size={20} />;
      case 'arb': return <ArbitrumIcon size={20} />;
      case 'pol': return <PolygonIcon size={20} />;
      default:
        return (
          <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-fgSubtle">
            {token.symbol.slice(0, 3)}
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-sm bg-card border border-border rounded-xl shadow-lg overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-border bg-muted/30">
          <div>
            <h3 className="text-sm font-semibold text-fg">انتخاب توکن</h3>
            <span className="text-xs text-fgSubtle">{chainName}</span>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="p-1 rounded-lg text-fgSubtle hover:text-fg hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-2.5 border-b border-border bg-muted/30">
          <div className="relative">
            <input
              type="text"
              placeholder="جستجو با نماد یا نام..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-2.5 pr-8 py-1.5 rounded-lg bg-card border border-border text-xs text-fg placeholder-fgSubtle focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors"
              autoFocus
            />
            <Search size={14} className="absolute right-2 top-2 text-fgSubtle" />
          </div>
        </div>

        {/* Tokens List */}
        <div className="max-h-[300px] overflow-y-auto divide-y divide-border/50 p-1">
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
                  className={`token-row ${isSelected ? 'token-row-selected' : ''}`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="shrink-0">{renderTokenIcon(token)}</div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <strong className="text-sm font-semibold text-fg">{token.symbol}</strong>
                        {token.isNative && (
                          <span className="badge badge-accent text-[9px]">کوین اصلی</span>
                        )}
                      </div>
                      <span className="text-xs text-fgSubtle">{token.name}</span>
                    </div>
                  </div>

                  <div className="text-left">
                    <div className="text-xs font-mono font-bold text-fg" dir="ltr">
                      {userBalance}
                    </div>
                    <span className="text-[10px] text-fgSubtle">
                      ${livePrice < 0.01 ? livePrice.toFixed(6) : livePrice.toFixed(2)}
                    </span>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="py-6 text-center text-fgSubtle text-xs space-y-1">
              <AlertCircle size={20} className="mx-auto text-fgMuted opacity-50" />
              <p>توکنی یافت نشد</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}