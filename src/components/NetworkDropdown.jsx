import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { 
  TonIcon, 
  SolanaIcon, 
  EthereumIcon, 
  TronIcon,
  BnbIcon,
  ArbitrumIcon,
  PolygonIcon
} from './Icons';
import { SUPPORTED_CHAINS } from '../data/tokens';

export default function NetworkDropdown({ activeChain, onSelectChain }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const getChainIcon = (id, size = 18) => {
    switch (id) {
      case 'ton': return <TonIcon size={size} />;
      case 'solana': return <SolanaIcon size={size} />;
      case 'ethereum': return <EthereumIcon size={size} />;
      case 'tron': return <TronIcon size={size} />;
      case 'bsc': return <BnbIcon size={size} />;
      case 'arbitrum': return <ArbitrumIcon size={size} />;
      case 'polygon': return <PolygonIcon size={size} />;
      default: return <TonIcon size={size} />;
    }
  };

  const activeChainObj = SUPPORTED_CHAINS.find(c => c.id === activeChain) || SUPPORTED_CHAINS[0];

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-right w-full max-w-xs mx-auto" ref={dropdownRef}>
      
      {/* Dropdown Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl bg-dark-card border border-white/[0.08] hover:border-white/20 transition-all text-xs font-bold text-white shadow-sm"
      >
        <div className="flex items-center gap-2.5 truncate">
          <div className="shrink-0">{getChainIcon(activeChainObj.id, 18)}</div>
          <span className="truncate">{activeChainObj.name}</span>
          <span className="text-[10px] text-zinc-400 font-normal hidden sm:inline">
            ({activeChainObj.badge})
          </span>
        </div>

        <ChevronDown 
          size={16} 
          className={`text-zinc-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      {/* Dropdown Menu List */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1.5 z-50 bg-dark-card border border-white/[0.1] rounded-2xl shadow-2xl p-1.5 space-y-1 animate-fadeIn">
          <div className="px-2.5 py-1 text-[10px] text-zinc-500 font-medium border-b border-white/[0.04]">
            انتخاب شبکه مبادله و سواپ:
          </div>

          <div className="max-h-72 overflow-y-auto space-y-0.5">
            {SUPPORTED_CHAINS.map((ch) => {
              const isSelected = ch.id === activeChain;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => {
                    onSelectChain(ch.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs transition-all ${
                    isSelected
                      ? 'bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20'
                      : 'text-zinc-300 hover:text-white hover:bg-dark-surface'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="shrink-0">{getChainIcon(ch.id, 18)}</div>
                    <div className="text-right">
                      <span className="block font-bold text-xs">{ch.name}</span>
                      <span className="block text-[10px] text-zinc-500">{ch.badge}</span>
                    </div>
                  </div>

                  {isSelected && (
                    <Check size={16} className="text-emerald-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
