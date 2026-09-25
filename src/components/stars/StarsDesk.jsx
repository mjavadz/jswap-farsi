import React, { useState } from 'react';
import { 
  StarsIcon, 
  TonIcon, 
  SolanaIcon, 
  TronIcon, 
  UsdtIcon 
} from '../Icons';
import { 
  Sparkles, 
  Send, 
  Check, 
  ArrowLeftRight, 
  HelpCircle, 
  Clock, 
  ShieldCheck, 
  AtSign, 
  Wallet 
} from 'lucide-react';
import StarsInvoiceModal from './StarsInvoiceModal';
import { 
  STARS_PACKAGES, 
  PAYMENT_METHODS, 
  calculateStarsPrice, 
  createStarsOrder 
} from '../../services/starsService';
import { toPersianDigits, formatToman, formatUSD } from '../../utils/format';

export default function StarsDesk({ onOrderCreated }) {
  const [mode, setMode] = useState('buy'); // 'buy' | 'sell'
  const [selectedStars, setSelectedStars] = useState(500);
  const [customStars, setCustomStars] = useState('');
  const [telegramUsername, setTelegramUsername] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('ton');

  // Sell Stars state
  const [sellStarsAmount, setSellStarsAmount] = useState('500');
  const [sellPayoutAddress, setSellPayoutAddress] = useState('');
  const [sellPayoutMethod, setSellPayoutMethod] = useState('ton');

  // Active Invoice Modal
  const [activeInvoice, setActiveInvoice] = useState(null);
  const [validationError, setValidationError] = useState('');

  const currentStarsCount = customStars ? Number(customStars) : selectedStars;
  const pricing = calculateStarsPrice(currentStarsCount, selectedMethod);

  // Sell pricing calculation (buying back at 92% rate)
  const sellPricing = calculateStarsPrice(Number(sellStarsAmount) || 100, sellPayoutMethod);
  const sellPayoutUSD = (Number(sellPricing.totalUSD) * 0.92).toFixed(2);
  const sellPayoutToman = Math.round(sellPricing.totalToman * 0.92);

  const handlePackageClick = (stars) => {
    setSelectedStars(stars);
    setCustomStars('');
  };

  const handleCustomChange = (val) => {
    const clean = val.replace(/[^0-9]/g, '');
    setCustomStars(clean);
  };

  const handleCreateBuyOrder = (e) => {
    e.preventDefault();
    setValidationError('');

    const cleanUsername = telegramUsername.trim();
    if (!cleanUsername) {
      setValidationError('لطفاً آیدی اکانت یا کانال تلگرام را وارد فرمایید.');
      return;
    }

    if (!cleanUsername.replace('@', '').match(/^[a-zA-Z0-9_]{4,32}$/)) {
      setValidationError('فرمت آیدی تلگرام نامعتبر است (تنها حروف انگلیسی، عدد و _ مجاز است).');
      return;
    }

    if (currentStarsCount < 50) {
      setValidationError('حداقل تعداد خرید استارز ۵۰ عدد است.');
      return;
    }

    const order = createStarsOrder({
      type: 'buy',
      stars: currentStarsCount,
      username: cleanUsername,
      methodId: selectedMethod
    });

    setActiveInvoice(order);
    if (onOrderCreated) onOrderCreated(order);
  };

  const handleCreateSellOrder = (e) => {
    e.preventDefault();
    setValidationError('');

    const count = Number(sellStarsAmount);
    if (count < 100) {
      setValidationError('حداقل تعداد استارز جهت فروش به پلتفرم ۱۰۰ عدد می‌باشد.');
      return;
    }

    if (!sellPayoutAddress.trim()) {
      setValidationError('لطفاً آدرس کیف‌پول جهت دریافت معادل ارزی را وارد فرمایید.');
      return;
    }

    const order = createStarsOrder({
      type: 'sell',
      stars: count,
      username: telegramUsername.trim() || '@seller',
      methodId: sellPayoutMethod,
      payoutAddress: sellPayoutAddress.trim()
    });

    setActiveInvoice(order);
    if (onOrderCreated) onOrderCreated(order);
  };

  const renderMethodIcon = (id) => {
    switch (id) {
      case 'ton': return <TonIcon size={20} />;
      case 'usdt_trc20': return <UsdtIcon size={20} />;
      case 'sol': return <SolanaIcon size={20} />;
      case 'trx': return <TronIcon size={20} />;
      default: return null;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      
      {/* Top Desk Card */}
      <div className="glass-card rounded-3xl p-5 sm:p-8 shadow-2xl relative">
        
        {/* Header Title & Switch */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-dark-border/60">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-accent-gold/20 border border-accent-gold/40 flex items-center justify-center text-accent-gold shadow-glow-gold">
              <StarsIcon size={24} />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">میز مستقیم استارز تلگرام (Telegram Stars)</h2>
              <p className="text-xs text-slate-400">خرید و فروش آنی با تتر، تون، سولانا و ترون بدون کارت بانکی</p>
            </div>
          </div>

          {/* Mode Switch (Buy / Sell) */}
          <div className="p-1 bg-dark-bg border border-dark-border rounded-xl flex items-center shrink-0">
            <button
              type="button"
              onClick={() => { setMode('buy'); setValidationError(''); }}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                mode === 'buy'
                  ? 'bg-accent-gold text-dark-bg font-extrabold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              خرید استارز
            </button>
            <button
              type="button"
              onClick={() => { setMode('sell'); setValidationError(''); }}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                mode === 'sell'
                  ? 'bg-emerald-500 text-dark-bg font-extrabold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              فروش به پلتفرم
            </button>
          </div>
        </div>

        {/* Validation Error Banner */}
        {validationError && (
          <div className="mt-4 p-3 rounded-lg bg-destructiveSoft border border-destructive/30 text-destructive text-xs font-semibold flex items-center gap-2 animate-fade-in">
            <HelpCircle size={16} />
            <span>{validationError}</span>
          </div>
        )}

        {/* =========================================================
            MODE 1: BUY STARS
           ========================================================= */}
        {mode === 'buy' && (
          <form onSubmit={handleCreateBuyOrder} className="mt-6 space-y-6">
            
            {/* Step 1: Telegram Username */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>۱. نام کاربری تلگرام (اکانت شخصی یا ربات/کانال دریافت‌کننده):</span>
                <span className="text-[11px] text-slate-500 font-normal">نیازی به عضویت نیست</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="مثال: javad_crypto یا @mybot"
                  value={telegramUsername}
                  onChange={(e) => setTelegramUsername(e.target.value)}
                  className="w-full pl-4 pr-11 py-3.5 rounded-2xl bg-dark-surface border border-dark-border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-accent-gold font-mono"
                  dir="ltr"
                />
                <AtSign size={18} className="absolute right-4 top-4 text-slate-400" />
              </div>
            </div>

            {/* Step 2: Select Package */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-300">
                  ۲. انتخاب پکیج استارز:
                </label>
                <span className="text-[11px] text-accent-gold font-bold">
                  نرخ هر استارز ≈ {formatToman(pricing.unitPriceToman)}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {STARS_PACKAGES.map((pkg) => {
                  const isSelected = !customStars && selectedStars === pkg.stars;
                  return (
                    <button
                      key={pkg.stars}
                      type="button"
                      onClick={() => handlePackageClick(pkg.stars)}
                      className={`p-3 rounded-2xl border text-right transition-all relative overflow-hidden group ${
                        isSelected 
                          ? 'bg-accent-gold/15 border-accent-gold shadow-glow-gold' 
                          : 'bg-dark-surface/70 border-dark-border hover:border-slate-500'
                      }`}
                    >
                      {pkg.badge && (
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold block w-fit mb-1 ${
                          pkg.popular ? 'bg-amber-500 text-black' : 'bg-slate-800 text-slate-300'
                        }`}>
                          {pkg.badge}
                        </span>
                      )}
                      <div className="flex items-center gap-1.5 font-black text-base text-white group-hover:text-accent-gold transition-colors">
                        <StarsIcon size={16} />
                        <span>{toPersianDigits(pkg.stars)}</span>
                      </div>
                      <span className="text-[11px] text-slate-400 block mt-1">
                        {formatToman(calculateStarsPrice(pkg.stars, selectedMethod).totalToman)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Custom Stars Input */}
              <div className="pt-2">
                <input
                  type="text"
                  placeholder="یا تعداد دلخواه استارز را وارد فرمایید (حداقل ۵۰)..."
                  value={customStars}
                  onChange={(e) => handleCustomChange(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-dark-surface/50 border border-dark-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-accent-gold font-mono"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">
                ۳. ارز پرداختی جهت تسویه:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {PAYMENT_METHODS.map((m) => {
                  const isSelected = selectedMethod === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelectedMethod(m.id)}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border text-right transition-all ${
                        isSelected 
                          ? 'bg-accent-emerald/15 border-accent-emerald text-white' 
                          : 'bg-dark-surface border-dark-border text-slate-400 hover:text-white'
                      }`}
                    >
                      {renderMethodIcon(m.id)}
                      <div>
                        <strong className="text-xs block text-white">{m.symbol}</strong>
                        <span className="text-[10px] text-slate-400">{m.network.split(' ')[0]}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Summary Breakdown */}
            <div className="p-4 rounded-2xl bg-dark-bg/80 border border-dark-border/80 space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-400">
                <span>تعداد استارز انتخابی:</span>
                <strong className="text-white font-mono">{toPersianDigits(currentStarsCount)} Stars</strong>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span>مبلغ کل به تومان:</span>
                <strong className="text-accent-gold font-bold text-sm">{formatToman(pricing.totalToman)}</strong>
              </div>
              <div className="flex justify-between items-center text-slate-400 pt-1 border-t border-dark-border/40">
                <span>مبلغ نهایی قابل واریز کریپتو:</span>
                <strong className="text-emerald-400 font-mono text-base" dir="ltr">
                  {pricing.cryptoAmount} {PAYMENT_METHODS.find(m => m.id === selectedMethod)?.symbol}
                </strong>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-accent-gold via-amber-500 to-yellow-600 hover:opacity-95 text-dark-bg font-black text-base transition-all shadow-glow-gold active:scale-95 flex items-center justify-center gap-2"
            >
              <span>ثبت سفارش و صدور پیش‌فاکتور آنی</span>
              <Send size={18} />
            </button>
          </form>
        )}

        {/* =========================================================
            MODE 2: SELL STARS
           ========================================================= */}
        {mode === 'sell' && (
          <form onSubmit={handleCreateSellOrder} className="mt-6 space-y-6 animate-fadeIn">
            <div className="p-3.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs leading-relaxed">
              💡 <strong>راهنمای نقد کردن استارز:</strong> استارزهای دریافتی از کانال یا بات خود را با بالاترین نرخ نقد کنید. معادل کریپتو به کیف‌پول شما واریز می‌گردد.
            </div>

            {/* Stars to Sell */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">
                تعداد استارز جهت فروش (حداقل ۱۰۰ عدد):
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="100"
                  required
                  placeholder="مثال: 1000"
                  value={sellStarsAmount}
                  onChange={(e) => setSellStarsAmount(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl bg-dark-surface border border-dark-border text-base text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                  dir="ltr"
                />
              </div>
            </div>

            {/* Payout Currency */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">
                ارز دریافتی شما:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSellPayoutMethod('ton')}
                  className={`flex items-center gap-2 p-3 rounded-xl border text-right transition-all ${
                    sellPayoutMethod === 'ton' 
                      ? 'bg-[#0088CC]/20 border-[#0088CC] text-white' 
                      : 'bg-dark-surface border-dark-border text-slate-400'
                  }`}
                >
                  <TonIcon size={20} />
                  <div>
                    <strong className="text-xs block text-white">Toncoin (TON)</strong>
                    <span className="text-[10px] text-slate-400">شبکه TON</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSellPayoutMethod('usdt_trc20')}
                  className={`flex items-center gap-2 p-3 rounded-xl border text-right transition-all ${
                    sellPayoutMethod === 'usdt_trc20' 
                      ? 'bg-emerald-500/20 border-emerald-500 text-white' 
                      : 'bg-dark-surface border-dark-border text-slate-400'
                  }`}
                >
                  <UsdtIcon size={20} />
                  <div>
                    <strong className="text-xs block text-white">Tether (USDT TRC-20)</strong>
                    <span className="text-[10px] text-slate-400">شبکه ترون</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Payout Destination Address */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">
                آدرس ولت شما جهت واریز ارز دریافتی:
              </label>
              <input
                type="text"
                required
                placeholder="آدرس کیف‌پول مقصد را وارد فرمایید..."
                value={sellPayoutAddress}
                onChange={(e) => setSellPayoutAddress(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-dark-surface border border-dark-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                dir="ltr"
              />
            </div>

            {/* Sell Summary */}
            <div className="p-4 rounded-2xl bg-dark-bg/80 border border-dark-border/80 space-y-2 text-xs">
              <div className="flex justify-between items-center text-slate-400">
                <span>مبلغ دریافتی شما به تومان:</span>
                <strong className="text-white font-bold text-sm">{formatToman(sellPayoutToman)}</strong>
              </div>
              <div className="flex justify-between items-center text-slate-400 pt-1 border-t border-dark-border/40">
                <span>معادل ارز واریزی به ولت شما:</span>
                <strong className="text-emerald-400 font-mono text-base" dir="ltr">
                  ≈ {sellPayoutUSD} USD
                </strong>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:opacity-95 text-dark-bg font-black text-base transition-all shadow-glow-emerald active:scale-95"
            >
              ثبت درخواست فروش استارز
            </button>
          </form>
        )}

      </div>

      {/* Invoice Modal */}
      <StarsInvoiceModal
        order={activeInvoice}
        isOpen={!!activeInvoice}
        onClose={() => setActiveInvoice(null)}
        onOrderUpdated={(up) => setActiveInvoice(up)}
      />

    </div>
  );
}
