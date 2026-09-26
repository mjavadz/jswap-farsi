import React, { useState, useMemo } from 'react';
import { X, Search, Check, Layers, Zap, Shield, Cpu } from 'lucide-react';
import { 
  TonIcon, 
  SolanaIcon, 
  EthereumIcon, 
  TronIcon,
  BnbIcon,
  ArbitrumIcon,
  PolygonIcon,
  BaseIcon,
  OptimismIcon,
  AvalancheIcon,
  ZkSyncIcon,
  SuiIcon,
  AptosIcon,
  LineaIcon,
  BlastIcon
} from './Icons';
import { CHAINS, CHAIN_CATEGORIES, isEVMChain } from '../config/chains';

export default function ChainSelectorModal({ isOpen, onClose, activeChain, onSelectChain }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const chainList = useMemo(() => Object.values(CHAINS), []);

  const filteredChains = useMemo(() => {
    return chainList.filter(c => {
      const matchesCategory = selectedCategory === 'all' || c.category === selectedCategory;
      const q = search.trim().toLowerCase();
      const matchesSearch = !q || 
        c.name.toLowerCase().includes(q) ||
        c.englishName.toLowerCase().includes(q) ||
        c.nativeSymbol.toLowerCase().includes(q) ||
        c.mainDex.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [chainList, selectedCategory, search]);

  if (!isOpen) return null;

  const renderIcon = (id, size = 20) => {
    switch (id) {
      case 'ton': return <TonIcon size={size} />;
      case 'solana': return <SolanaIcon size={size} />;
      case 'ethereum': return <EthereumIcon size={size} />;
      case 'tron': return <TronIcon size={size} />;
      case 'bsc': return <BnbIcon size={size} />;
      case 'arbitrum': return <ArbitrumIcon size={size} />;
      case 'polygon': return <PolygonIcon size={size} />;
      case 'base': return <BaseIcon size={size} />;
      case 'optimism': return <OptimismIcon size={size} />;
      case 'avalanche': return <AvalancheIcon size={size} />;
      case 'zksync': return <ZkSyncIcon size={size} />;
      case 'sui': return <SuiIcon size={size} />;
      case 'aptos': return <AptosIcon size={size} />;
      case 'linea': return <LineaIcon size={size} />;
      case 'blast': return <BlastIcon size={size} />;
      default: return <EthereumIcon size={size} />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-border bg-muted/30">
          <div>
            <h3 className="text-base font-bold text-fg">انتخاب شبکه مبادله (۱۵ زنجیره دیفای)</h3>
            <p className="text-xs text-fgMuted mt-0.5">پوشش کامل دکس‌های اصلی، روتینگ هوشمند و کارمزد لحظه‌ای</p>
          </div>
          <button 
            type="button" 
            onClick={onClose}
            className="p-1.5 rounded-lg text-fgSubtle hover:text-fg hover:bg-muted transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-3 border-b border-border bg-bg/50">
          <div className="relative">
            <input
              type="text"
              placeholder="جستجوی نام شبکه، نماد یا دکس (بیس، آربیتروم، یونی‌سواپ...)"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-3 pr-9 py-2 rounded-xl bg-card border border-border text-sm text-fg placeholder-fgSubtle focus:outline-none focus:border-accent font-sans"
              autoFocus
            />
            <Search size={16} className="absolute right-3 top-2.5 text-fgSubtle" />
          </div>

          {/* Category Filter Pills */}
          <div className="flex gap-1 mt-2.5 overflow-x-auto no-scrollbar pb-0.5">
            {CHAIN_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-accentSoft text-accent border border-accent/30'
                    : 'text-fgSubtle hover:text-fg hover:bg-muted'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Chain List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredChains.length > 0 ? (
            filteredChains.map((chain) => {
              const isSelected = chain.id === activeChain;
              return (
                <button
                  key={chain.id}
                  type="button"
                  onClick={() => {
                    onSelectChain(chain.id);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all text-right group ${
                    isSelected
                      ? 'bg-accentSoft border border-accent/40 text-fg'
                      : 'hover:bg-muted/70 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-muted/80 border border-border flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      {renderIcon(chain.id, 20)}
                    </div>
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-fg truncate">
                          {chain.name}
                        </span>
                        <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded bg-muted text-fgMuted border border-border/80">
                          {chain.nativeSymbol}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-xs text-fgSubtle">
                        <span>{chain.mainDex}</span>
                        <span>•</span>
                        <span className="text-[11px] text-accent/80 font-mono" dir="ltr">{chain.defaultGas}</span>
                      </div>
                    </div>
                  </div>

                  {isSelected ? (
                    <div className="flex items-center gap-1.5 text-accent text-xs font-bold pl-2 shrink-0">
                      <Check size={16} />
                      <span>فعال</span>
                    </div>
                  ) : (
                    <span className="text-xs text-fgSubtle group-hover:text-accent transition-colors pl-2 shrink-0">
                      انتخاب ➔
                    </span>
                  )}
                </button>
              );
            })
          ) : (
            <div className="text-center py-8 text-xs text-fgSubtle">
              شبکه‌ای با این مشخصات یافت نشد.
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-muted/20 border-t border-border flex items-center justify-between text-[11px] text-fgMuted px-4">
          <span>روتر غیرحضانتی هوشمند JSWAP</span>
          <span className="text-accent font-mono font-medium">۱۵ شبکه وب۳</span>
        </div>
      </div>
    </div>
  );
}
