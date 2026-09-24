import React from 'react';
import { ShieldCheck, ExternalLink, Heart, Globe, Terminal } from 'lucide-react';
import { EthereumIcon, SolanaIcon, TonIcon, TronIcon, StarsIcon } from './Icons';

export default function Footer({ onSwitchTab }) {
  return (
    <footer className="w-full border-t border-dark-border/80 bg-dark-bg/95 pt-12 pb-16 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10 border-b border-dark-border/60">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-accent-emerald/20 border border-accent-emerald/40 flex items-center justify-center font-black text-accent-emerald">
                JS
              </div>
              <span className="text-xl font-black text-white">JSWAP Farsi</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              پلتفرم غیرحضانتی (Non-Custodial) سواپ ارزهای دیجیتال و میز اختصاصی مبادله استارز تلگرام بدون واسطه و بدون احراز هویت. دارایی شما در تمام مراحل در کنترل کیف‌پول شخصی خودتان است.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
              <span className="flex items-center gap-1.5 text-accent-emerald">
                <span className="h-2 w-2 rounded-full bg-accent-emerald animate-pulse"></span>
                وضعیت شبکه: عملیاتی و پرسرعت
              </span>
              <span>•</span>
              <span className="font-mono">SSL 256-bit Cloudflare</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">دسترسی سریع</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button onClick={() => onSwitchTab('swap')} className="hover:text-accent-emerald transition-colors">
                  سواپ غیرحضانتی رمزارزها
                </button>
              </li>
              <li>
                <button onClick={() => onSwitchTab('stars')} className="hover:text-accent-gold transition-colors">
                  خرید و فروش استارز تلگرام
                </button>
              </li>
              <li>
                <button onClick={() => onSwitchTab('orders')} className="hover:text-sky-400 transition-colors">
                  پیگیری وضعیت سفارشات
                </button>
              </li>
            </ul>
          </div>

          {/* Supported Networks */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">زنجیره‌های تحت پوشش</h4>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-dark-card border border-dark-border text-slate-300">
                <TonIcon size={14} /> شبکه تون (TON)
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-dark-card border border-dark-border text-slate-300">
                <SolanaIcon size={14} /> سولانا (Solana)
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-dark-card border border-dark-border text-slate-300">
                <EthereumIcon size={14} /> اتریوم (Ethereum)
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-dark-card border border-dark-border text-slate-300">
                <TronIcon size={14} /> ترون (TRON)
              </span>
              <span className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-dark-card border border-accent-gold/40 text-accent-gold">
                <StarsIcon size={14} /> تلگرام استارز (Stars)
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            توسعه‌یافته برای جامعه فارسی‌زبان وب۳ • میزبانی ابری روی دامنه اختصاصی{' '}
            <a href="https://javadnode.top" target="_blank" rel="noopener noreferrer" className="text-slate-400 font-mono underline hover:text-white">
              javadnode.top
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-600">JSWAP v1.0.0 (Release 2026)</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
