import React from 'react';
import { ShieldCheck, ExternalLink, Heart, Terminal } from 'lucide-react';
import { TonIcon, SolanaIcon, EthereumIcon, TronIcon, StarsIcon } from './Icons';

export default function Footer({ onSwitchTab }) {
  const networks = [
    { id: 'ton', name: 'تون', icon: <TonIcon size={12} />, badge: 'Non-custodial' },
    { id: 'solana', name: 'سولانا', icon: <SolanaIcon size={12} />, badge: 'High speed' },
    { id: 'ethereum', name: 'اتریوم', icon: <EthereumIcon size={12} />, badge: 'DeFi liquidity' },
    { id: 'tron', name: 'ترون', icon: <TronIcon size={12} />, badge: 'USDT standard' },
    { id: 'bsc', name: 'BNB Chain', icon: <svg width={12} height={12} viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#F3BA2F"/><path d="M16 6.5l3.3 3.3-3.3 3.3-3.3-3.3L16 6.5zm-5.7 5.7l3.3 3.3-3.3 3.3-3.3-3.3 3.3-3.3zm11.4 0l3.3 3.3-3.3 3.3-3.3-3.3 3.3-3.3zm-5.7 3.8l1.9 1.9-1.9 1.9-1.9-1.9 1.9-1.9zm-5.7 5.7l3.3 3.3-3.3 3.3-3.3-3.3 3.3-3.3zm11.4 0l3.3 3.3-3.3 3.3-3.3-3.3 3.3-3.3zm-5.7 3.8l3.3 3.3-3.3 3.3-3.3-3.3 3.3-3.3z" fill="#fff"/></svg>, badge: 'BEP-20' },
    { id: 'base', name: 'بیس', icon: <svg width={12} height={12} viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#0052FF"/><path d="M16 7a9 9 0 100 18 9 9 0 000-18zm-2.8 11.8c-1.5 0-2.8-1.3-2.8-2.8s1.3-2.8 2.8-2.8c1.3 0 2.4.9 2.7 2.1h3.4c-.4-3-3-5.3-6.1-5.3-3.4 0-6.2 2.8-6.2 6.2s2.8 6.2 6.2 6.2c3.1 0 5.7-2.3 6.1-5.3h-3.4c-.3 1.2-1.4 2.1-2.7 2.1z" fill="#fff"/></svg>, badge: 'Coinbase L2' },
    { id: 'arbitrum', name: 'آربیتروم', icon: <svg width={12} height={12} viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#28A0F0"/><path d="M16 7l7.5 13-3.8 2.2L16 16.3l-3.7 5.9-3.8-2.2L16 7z" fill="#fff"/><path d="M16 18.5l2.2 3.5h-4.4l2.2-3.5z" fill="#28A0F0"/></svg>, badge: 'L2' },
    { id: 'optimism', name: 'آپتیمیزم', icon: <svg width={12} height={12} viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#FF0420"/><path d="M10.8 12.2c-2.4 0-4.3 1.8-4.3 4.2 0 2.4 1.9 4.2 4.3 4.2 2.4 0 4.3-1.8 4.3-4.2 0-2.4-1.9-4.2-4.3-4.2zm0 6.2c-1.2 0-2.1-1-2.1-2 0-1 .9-2 2.1-2 1.2 0 2.1 1 2.1 2 0 1-.9 2-2.1 2zm8.5-6.2h3.4c2.4 0 4 1.5 4 3.7 0 2.2-1.6 3.7-4 3.7h-1.3v3h-2.1v-10.4zm2.1 5.3h1.3c1.2 0 1.9-.8 1.9-1.6 0-.8-.7-1.6-1.9-1.6h-1.3v3.2z" fill="#fff"/></svg>, badge: 'Superchain' },
    { id: 'polygon', name: 'پالیگان', icon: <svg width={12} height={12} viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#8247E5"/><path d="M21.5 13.5l-4-2.3a3 3 0 00-3 0l-4 2.3a3 3 0 00-1.5 2.6v4.6a3 3 0 001.5 2.6l4 2.3a3 3 0 003 0l4-2.3a3 3 0 001.5-2.6v-4.6a3 3 0 00-1.5-2.6zm-1.5 5.5l-3.5 2a1 1 0 01-1 0l-3.5-2v-4a1 1 0 01.5-.9l3.5-2a1 1 0 011 0l3.5 2a1 1 0 01.5.9v4z" fill="#fff"/></svg>, badge: 'PoS' },
    { id: 'avalanche', name: 'آوالانچ', icon: <svg width={12} height={12} viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="16" fill="#E84142"/><path d="M18.8 9.3c.7-1.2 2.4-1.2 3.1 0l5.8 10.4c.7 1.2-.2 2.7-1.6 2.7h-3.8c-.8 0-1.5-.4-1.9-1.1l-4.7-8.5c-.3-.5-.3-1.1 0-1.6l3.1-1.9zm-8.2 5.5l5.2 9.4c.4.7-.1 1.6-.9 1.6H5.7c-1.4 0-2.3-1.5-1.6-2.7l7.4-13.3c.7-1.2 2.4-1.2 3.1 0l1.4 2.5-4.4 7.9c-.3.5-.7.8-1.2.8h-2.4c-.6 0-.9-.6-.6-1.1l3.2-5.1z" fill="#fff"/></svg>, badge: 'Subnets' },
    { id: 'stars', name: 'استارز', icon: <StarsIcon size={12} />, badge: 'Telegram' },
  ];

  const links = [
    { label: 'سواپ غیرحضانتی', tab: 'swap' },
    { label: 'استارز تلگرام', tab: 'stars' },
    { label: 'ابزارهای ایران', tab: 'iran' },
    { label: 'سفارشات', tab: 'orders' },
  ];

  return (
    <footer className="w-full border-t border-border bg-card/50 pt-8 pb-10 mt-auto">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Networks Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-8">
          {networks.map((net) => (
            <button
              key={net.id}
              type="button"
              onClick={() => onSwitchTab(net.id === 'stars' ? 'stars' : 'swap')}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 border border-border text-xs text-fgSubtle hover:text-fg hover:bg-card hover:border-accent/30 transition-all"
              title={net.badge}
            >
              <span className="shrink-0">{net.icon}</span>
              <span className="font-medium truncate">{net.name}</span>
            </button>
          ))}
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap gap-2 mb-8 text-xs text-fgSubtle">
          {links.map((link) => (
            <button
              key={link.tab}
              type="button"
              onClick={() => onSwitchTab(link.tab)}
              className="hover:text-accent transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-fgSubtle">
          <div className="flex items-center gap-2">
            <span>توسعه برای وب۳ فارسی</span>
            <span className="text-fgMuted">•</span>
            <a 
              href="https://javadnode.top" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="font-mono underline hover:text-fg"
            >
              javadnode.top
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-fgMuted">v1.0.0</span>
            <span className="flex items-center gap-1">
              <Heart size={10} className="text-rose-500" />
              <span>JSWAP</span>
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}