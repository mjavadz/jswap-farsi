import React, { useState, useEffect } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Clock, 
  ExternalLink, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';
import { StarsIcon } from '../Icons';
import { updateOrderStatus } from '../../services/starsService';
import { toPersianDigits, formatToman } from '../../utils/format';

export default function StarsInvoiceModal({ order, isOpen, onClose, onOrderUpdated }) {
  if (!isOpen || !order) return null;

  const [copiedAddr, setCopiedAddr] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [txHashInput, setTxHashInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(() => {
    const diff = Math.floor((order.expiresAt - Date.now()) / 1000);
    return Math.max(0, diff);
  });
  const [currentStatus, setCurrentStatus] = useState(order.status);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0 || currentStatus === 'completed') return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, currentStatus]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(order.depositAddress);
    setCopiedAddr(true);
    setTimeout(() => setCopiedAddr(false), 2000);
  };

  const handleCopyAmount = () => {
    navigator.clipboard.writeText(String(order.pricing.cryptoAmount));
    setCopiedAmount(true);
    setTimeout(() => setCopiedAmount(false), 2000);
  };

  const handleConfirmPayment = () => {
    setIsVerifying(true);
    setTimeout(() => {
      const updated = updateOrderStatus(
        order.id, 
        'completed', 
        txHashInput.trim() || `0x${Math.random().toString(16).slice(2)}`
      );
      setCurrentStatus('completed');
      setIsVerifying(false);
      if (onOrderUpdated && updated) onOrderUpdated(updated);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-lg bg-dark-card border border-dark-border rounded-3xl shadow-2xl overflow-hidden animate-scaleUp max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-dark-border bg-dark-surface/60">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-accent-gold/15 border border-accent-gold/40 flex items-center justify-center text-accent-gold">
              <StarsIcon size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white">فاکتور خرید استارز تلگرام</h3>
                <span className="text-xs px-2 py-0.5 rounded-full font-mono font-bold bg-dark-bg text-slate-300 border border-dark-border">
                  {order.id}
                </span>
              </div>
              <p className="text-xs text-slate-400">حساب دریافت‌کننده: <strong className="text-white">{order.username}</strong></p>
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

        {/* Scrollable Body */}
        <div className="p-5 space-y-4 overflow-y-auto">
          
          {/* Status Alert Banner */}
          {currentStatus === 'completed' ? (
            <div className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center gap-3 animate-fadeIn">
              <CheckCircle2 size={24} className="shrink-0" />
              <div>
                <strong className="text-sm font-bold block">پرداخت با موفقیت تایید شد!</strong>
                <p className="text-xs text-emerald-300/80 mt-0.5">
                  تعداد {toPersianDigits(order.stars)} استارز به آیدی {order.username} واریز گردید.
                </p>
              </div>
            </div>
          ) : timeLeft === 0 ? (
            <div className="p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 flex items-center gap-2 text-xs font-bold">
              <AlertCircle size={18} />
              <span>مهلت ۲۰ دقیقه‌ای این پیش‌فاکتور منقضی شد. لطفاً فاکتور جدید ثبت فرمایید.</span>
            </div>
          ) : (
            <div className="flex items-center justify-between p-3 rounded-xl bg-dark-surface border border-accent-gold/30 text-xs">
              <div className="flex items-center gap-2 text-accent-gold font-bold">
                <Clock size={16} />
                <span>مهلت واریز و قفل قیمت:</span>
              </div>
              <div className="font-mono text-sm font-extrabold text-white" dir="ltr">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </div>
            </div>
          )}

          {/* Amount to pay box */}
          <div className="p-4 rounded-2xl bg-dark-surface/90 border border-dark-border text-center space-y-2">
            <span className="text-xs text-slate-400 font-bold block">مبلغ دقیق جهت انتقال ({order.method.name}):</span>
            
            <div className="flex items-center justify-center gap-2">
              <span className="font-mono text-3xl font-black text-accent-gold" dir="ltr">
                {order.pricing.cryptoAmount} {order.method.symbol}
              </span>
              <button
                type="button"
                onClick={handleCopyAmount}
                className="p-1.5 rounded-lg bg-dark-card border border-dark-border hover:border-slate-500 text-slate-300 hover:text-white transition-colors"
                title="کپی مبلغ"
              >
                {copiedAmount ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              </button>
            </div>

            <div className="text-xs text-slate-400">
              معادل {formatToman(order.pricing.totalToman)} • ({toPersianDigits(order.stars)} استارز)
            </div>
          </div>

          {/* Deposit Address Box */}
          <div className="p-4 rounded-2xl bg-dark-surface/90 border border-dark-border space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-bold">آدرس کیف‌پول مقصد ({order.method.network}):</span>
              <button
                type="button"
                onClick={handleCopyAddress}
                className="flex items-center gap-1 text-accent-emerald hover:underline font-bold"
              >
                {copiedAddr ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedAddr ? 'کپی شد' : 'کپی آدرس'}</span>
              </button>
            </div>

            <div className="p-3 bg-dark-bg rounded-xl border border-dark-border/80 font-mono text-xs sm:text-sm text-slate-200 break-all select-all text-center" dir="ltr">
              {order.depositAddress}
            </div>
          </div>

          {/* Transaction ID / Confirmation Section */}
          {currentStatus !== 'completed' && timeLeft > 0 && (
            <div className="p-4 rounded-2xl bg-dark-surface/40 border border-dark-border space-y-3">
              <label className="text-xs font-bold text-slate-300 block">
                کد رهگیری / هش تراکنش (اختیاری):
              </label>
              <input
                type="text"
                placeholder="TXID یا شناسه تراکنش را در صورت تمایل وارد کنید..."
                value={txHashInput}
                onChange={(e) => setTxHashInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-dark-bg border border-dark-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-accent-emerald font-mono"
                dir="ltr"
              />

              <button
                type="button"
                disabled={isVerifying}
                onClick={handleConfirmPayment}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-accent-gold to-amber-600 hover:from-amber-500 hover:to-amber-700 text-dark-bg font-black text-sm transition-all shadow-glow-gold flex items-center justify-center gap-2"
              >
                {isVerifying ? (
                  <>
                    <span className="h-4 w-4 border-2 border-dark-bg border-t-transparent rounded-full animate-spin"></span>
                    <span>در حال استعلام و تایید واریز در شبکه…</span>
                  </>
                ) : (
                  <span>من وجه را واریز کردم (تایید نهایی)</span>
                )}
              </button>
            </div>
          )}

          {/* Guarantee notice */}
          <div className="p-3 rounded-xl bg-dark-bg/60 border border-dark-border/50 text-[11px] text-slate-400 space-y-1 leading-relaxed">
            <p className="flex items-center gap-1.5 font-bold text-slate-300">
              <Sparkles size={14} className="text-accent-gold" />
              <span>پشتیبانی و تحویل آنی:</span>
            </p>
            <p>پس از ارسال رمزارز، استارز به طور مستقیم به ربات/اکانت تلگرام شما شارژ می‌شود. کد پیگیری شما ذخیره گردید.</p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-dark-border bg-dark-surface/60 flex justify-between items-center">
          <span className="text-xs text-slate-400">نیاز به راهنمایی دارید؟</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-dark-card border border-dark-border hover:border-slate-500 text-xs font-bold text-white transition-colors"
          >
            بستن
          </button>
        </div>

      </div>
    </div>
  );
}
