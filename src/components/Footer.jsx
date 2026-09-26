import React from 'react';
import { getChainIcon, StarsIcon } from './Icons';

export default function Footer({ onSwitchTab }) {
  const networks = [
    { id: 'ethereum', name: 'اتریوم', badge: 'DeFi liquidity' },
    { id: 'solana', name: 'سولانا', badge: 'High speed' },
    { id: 'ton', name: 'تون', badge: 'Non-custodial' },
    { id: 'tron', name: 'ترون', badge: 'USDT standard' },
    { id: 'bsc', name: 'BNB Chain', badge: 'BEP-20' },
    { id: 'arbitrum', name: 'آربیتروم', badge: 'Arbitrum One' },
    { id: 'base', name: 'بیس', badge: 'Coinbase L2' },
    { id: 'polygon', name: 'پالیگان', badge: 'PoS' },
    { id: 'optimism', name: 'آپتیمیزم', badge: 'Superchain' },
    { id: 'avalanche', name: 'آوالانچ', badge: 'Subnets' },
    { id: 'sui', name: 'سویی', badge: 'Move L1' },
    { id: 'stars', name: 'استارز', badge: 'Telegram' },
  ];

  const links = [
    { label: 'سواپ غیرحضانتی', tab: 'swap' },
    { label: 'استارز تلگرام', tab: 'stars' },
    { label: 'ابزارهای ایران', tab: 'iran' },
    { label: 'سفارشات', tab: 'orders' },
  ];

  return (
    <footer className="w-full border-t border-border bg-card/50 pt-8 pb-16 md:pb-12 mt-auto">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Networks Grid (Clean 12-item symmetric grid with authentic official logos) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-8">
          {networks.map((net) => (
            <button
              key={net.id}
              type="button"
              onClick={() => onSwitchTab(net.id === 'stars' ? 'stars' : 'swap')}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-card border border-border text-xs text-muted-foreground hover:text-foreground hover:border-accent/40 transition-all justify-center group"
              title={net.badge}
            >
              <span className="shrink-0 transition-transform group-hover:scale-110">
                {net.id === 'stars' ? <StarsIcon size={16} /> : getChainIcon(net.id, 16)}
              </span>
              <span className="font-semibold truncate">{net.name}</span>
            </button>
          ))}
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-8 text-xs text-muted-foreground">
          {links.map((link) => (
            <button
              key={link.tab}
              type="button"
              onClick={() => onSwitchTab(link.tab)}
              className="hover:text-accent transition-colors font-medium"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Bottom Bar — Clean, decentralized, no tracking or version info */}
        <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>پروتکل مبادله غیرحضانتی و امن</span>
            <span>•</span>
            <span>توسعه‌یافته برای وب۳ فارسی</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-sans font-bold text-foreground">JSWAP</span>
            <span>—</span>
            <span>آزادی و حریم خصوصی مالی</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
