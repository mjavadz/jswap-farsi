import React, { useState } from 'react';
import { 
  CreditCard, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  Clock,
  TrendingUp,
  Cpu,
  ChevronDown,
  Building2
} from 'lucide-react';
import { 
  TonIcon, 
  SolanaIcon, 
  EthereumIcon, 
  TronIcon, 
  UsdtIcon, 
  StarsIcon 
} from '../Icons';
import { detectBankFromIBAN } from '../../utils/bankDetector';
import { formatToman } from '../../utils/format';
import { getTokenPrice, getIranTetherRate, getIranExchangesBreakdown } from '../../services/priceService';

const IRAN_CASHOUT_ASSETS = [
  { id: 'usdt_trc20', name: 'تتر (TRC-20)', symbol: 'USDT', icon: <UsdtIcon size={20} />, min: 10 },
  { id: 'usdt_ton', name: 'تتر شبکه تون (TON)', symbol: 'USDT', icon: <UsdtIcon size={20} />, min: 5 },
  { id: 'ton', name: 'تون‌کوین (Toncoin)', symbol: 'TON', icon: <TonIcon size={20} />, min: 2 },
  { id: 'stars', name: 'استارز تلگرام (Stars)', symbol: 'Stars', icon: <StarsIcon size={20} />, min: 100 },
];

export default function IranToolkit() {
  const [subTab, setSubTab] = useState('cashout'); // 'cashout' | 'gas_tracker' | 'anti_sanction'
  const [showExchangesList, setShowExchangesList] = useState(false);

  // Cashout State
  const [selectedAsset, setSelectedAsset] = useState(IRAN_CASHOUT_ASSETS[0]);
  const [assetAmount, setAssetAmount] = useState('100');
  const [shebaNumber, setShebaNumber] = useState('');
  const [accountOwner, setAccountOwner] = useState('');
  const [detectedBank, setDetectedBank] = useState(null);
  const [cashoutInvoice, setCashoutInvoice] = useState(null);
  const [copied, setCopied] = useState(false);
  const [formError, setFormError] = useState('');

  // Toman live rate from Top 5 Iranian Exchanges
  const tomanRate = getIranTetherRate() || 234000;
  const exchanges = getIranExchangesBreakdown();

  // Calculator state
  const [calcInput, setCalcInput] = useState('100');

  // Calculate Cashout
  const getAssetPriceUSD = (assetId) => {
    if (assetId.startsWith('usdt')) return 1.0;
    if (assetId === 'ton') return getTokenPrice('TON') || 1.60;
    if (assetId === 'stars') return 0.014;
    return 1.0;
  };

  const assetUSDPrice = getAssetPriceUSD(selectedAsset.id);
  const totalUSDValue = (Number(assetAmount) || 0) * assetUSDPrice;
  const finalTomanPayout = Math.round(totalUSDValue * tomanRate * 0.992);

  // Handle Sheba input
  const handleShebaChange = (val) => {
    let clean = val.replace(/[^0-9a-zA-Z]/g, '').toUpperCase();
    if (!clean.startsWith('IR') && clean.length > 0) {
      clean = 'IR' + clean;
    }
    if (clean.length > 26) clean = clean.slice(0, 26);
    setShebaNumber(clean);

    const bank = detectBankFromIBAN(clean);
    setDetectedBank(bank);
  };

  const handleCreateCashout = (e) => {
    e.preventDefault();
    setFormError('');

    const num = Number(assetAmount);
    if (!num || num < selectedAsset.min) {
      setFormError(`حداقل مقدار نقد کردن برای این دارایی ${selectedAsset.min} ${selectedAsset.symbol} است.`);
      return;
    }

    if (shebaNumber.length < 26) {
      setFormError('شماره شبا باید به طور کامل (۲۶ نویسه شامل IR) وارد شود.');
      return;
    }

    if (!accountOwner.trim()) {
      setFormError('نام و نام خانوادگی صاحب حساب جهت واریز بانکی الزامی است.');
      return;
    }

    const orderId = 'IR-' + Math.floor(100000 + Math.random() * 900000);
    const depositAddress = selectedAsset.id === 'ton' || selectedAsset.id === 'usdt_ton' || selectedAsset.id === 'stars'
      ? 'UQDAq1m9F4wHqQ7xL2k8PvR_TonDepositDesk'
      : 'TJSwP89IranianTreasuryPayoutTronUSDT99';

    setCashoutInvoice({
      orderId,
      asset: selectedAsset,
      amount: num,
      usdValue: totalUSDValue.toFixed(2),
      tomanPayout: finalTomanPayout,
      shebaNumber,
      accountOwner: accountOwner.trim(),
      bankName: detectedBank?.name || 'شبکه شتاب ایران',
      depositAddress,
      expiresAt: Date.now() + 15 * 60 * 1000,
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-5">
      
      {/* Sub-Tabs Navigation */}
      <div className="flex items-center justify-center p-1 bg-dark-card border border-white/[0.08] rounded-xl max-w-fit mx-auto">
        <button
          type="button"
          onClick={() => setSubTab('cashout')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
            subTab === 'cashout'
              ? 'bg-dark-surface text-emerald-400 border border-white/[0.08] shadow-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <CreditCard size={14} />
          <span>نقد کردن به تومان</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab('gas_tracker')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
            subTab === 'gas_tracker'
              ? 'bg-dark-surface text-amber-300 border border-white/[0.08] shadow-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <TrendingUp size={14} />
          <span>نرخ ۵ صرافی و کارمزد</span>
        </button>

        <button
          type="button"
          onClick={() => setSubTab('anti_sanction')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
            subTab === 'anti_sanction'
              ? 'bg-dark-surface text-sky-400 border border-white/[0.08] shadow-sm'
              : 'text-zinc-400 hover:text-white'
          }`}
        >
          <ShieldCheck size={14} />
          <span>راهنمای ضدتحریم</span>
        </button>
      </div>

      {/* Top 5 Exchanges Live Rate Banner */}
      <div className="bg-dark-card border border-white/[0.08] rounded-xl p-3 text-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-300 font-medium">
              نرخ تتر: <strong>میانگین ۵ صرافی برتر ایران بر اساس حجم معاملات</strong>
            </span>
          </div>
          
          <button
            type="button"
            onClick={() => setShowExchangesList(!showExchangesList)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-dark-surface border border-white/[0.08] hover:border-emerald-500/40 text-emerald-400 font-mono font-bold transition-all"
          >
            <span>{formatToman(tomanRate)} تومان</span>
            <ChevronDown size={14} className={`transition-transform duration-200 ${showExchangesList ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* 5 Exchanges Rate Breakdown Drawer */}
        {showExchangesList && (
          <div className="mt-3 pt-3 border-t border-white/[0.06] space-y-1.5 animate-fadeIn">
            <span className="text-[11px] text-zinc-400 block mb-1">
              استعلام زنده از ۵ صرافی اول ایران (حجم بازار):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {exchanges.map((ex, idx) => (
                <div key={idx} className="flex justify-between items-center p-2 rounded-lg bg-dark-surface border border-white/[0.04]">
                  <span className="text-[11px] text-zinc-300 flex items-center gap-1.5">
                    <Building2 size={12} className="text-zinc-500" />
                    {ex.name}
                  </span>
                  <span className="font-mono text-[11px] text-emerald-400 font-bold" dir="ltr">
                    {formatToman(ex.price)} تومان
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* SUBTAB 1: CASHOUT TO TOMAN */}
      {/* ======================================================== */}
      {subTab === 'cashout' && (
        <div className="bg-dark-card border border-white/[0.08] rounded-2xl p-5 shadow-xl space-y-5 animate-fadeIn">
          
          <div className="pb-3 border-b border-white/[0.06]">
            <h2 className="text-sm font-bold text-white">فروش رمزارز و استارز تلگرام با واریز به حساب بانکی ایران</h2>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              تسویه مستقیم پایا و کارت به کارت به کلیه بانک‌های عضو شتاب
            </p>
          </div>

          {!cashoutInvoice ? (
            <form onSubmit={handleCreateCashout} className="space-y-4">
              
              {/* Asset Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-300">
                  ۱. دارایی مورد نظر جهت فروش:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {IRAN_CASHOUT_ASSETS.map((asset) => {
                    const isSelected = selectedAsset.id === asset.id;
                    return (
                      <button
                        key={asset.id}
                        type="button"
                        onClick={() => setSelectedAsset(asset)}
                        className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-right transition-all ${
                          isSelected
                            ? 'bg-emerald-500/10 border-emerald-500/40 text-white'
                            : 'bg-dark-surface border-white/[0.06] text-zinc-400 hover:text-white'
                        }`}
                      >
                        <div className="shrink-0">{asset.icon}</div>
                        <div>
                          <strong className="text-xs block text-white">{asset.symbol}</strong>
                          <span className="text-[10px] text-zinc-400">{asset.name}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Amount Input */}
              <div className="p-3 rounded-xl bg-dark-surface border border-white/[0.06] space-y-1.5">
                <div className="flex justify-between items-center text-xs text-zinc-400">
                  <span>مقدار دارایی برای فروش:</span>
                  <span className="text-[10px] text-zinc-500">حداقل: {selectedAsset.min} {selectedAsset.symbol}</span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="0"
                    value={assetAmount}
                    onChange={(e) => setAssetAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                    className="w-full bg-transparent text-xl font-bold text-white placeholder-zinc-600 focus:outline-none font-mono"
                  />
                  <span className="text-xs font-bold text-zinc-300 px-2 py-1 bg-dark-card rounded-lg border border-white/[0.06]">
                    {selectedAsset.symbol}
                  </span>
                </div>

                <div className="text-[11px] text-zinc-500">
                  ≈ ${totalUSDValue.toFixed(2)} دلار
                </div>
              </div>

              {/* Bank Sheba */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-300">
                  ۲. حساب بانکی ایران جهت دریافت وجه:
                </label>

                <input
                  type="text"
                  placeholder="شماره شبا (مثال: IR120120000000001234567890)"
                  value={shebaNumber}
                  onChange={(e) => handleShebaChange(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-dark-surface border border-white/[0.08] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-mono"
                  dir="ltr"
                />

                {detectedBank && (
                  <div className="flex items-center gap-1.5 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400">
                    <CheckCircle2 size={13} />
                    <span>بانک مقصد: <strong>{detectedBank.name}</strong></span>
                  </div>
                )}

                <input
                  type="text"
                  placeholder="نام صاحب حساب (مطابق کارت بانکی)"
                  value={accountOwner}
                  onChange={(e) => setAccountOwner(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-dark-surface border border-white/[0.08] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Payout Summary */}
              <div className="p-3 rounded-xl bg-dark-surface/60 border border-white/[0.04] space-y-1.5 text-xs">
                <div className="flex justify-between items-center text-zinc-400">
                  <span>نرخ مبنا (میانگین ۵ صرافی):</span>
                  <span className="font-mono text-zinc-200">{formatToman(tomanRate)} تومان</span>
                </div>
                <div className="flex justify-between items-center text-zinc-400 pt-1 border-t border-white/[0.04]">
                  <span className="font-bold text-white">مبلغ واریزی به حساب بانکی:</span>
                  <strong className="text-emerald-400 font-bold text-sm">
                    {formatToman(finalTomanPayout)} تومان
                  </strong>
                </div>
              </div>

              {formError && (
                <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-1.5">
                  <AlertTriangle size={14} />
                  <span>{formError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition-all"
              >
                ثبت پیش‌فاکتور فروش
              </button>

            </form>
          ) : (
            /* Cashout Invoice Card */
            <div className="space-y-3.5 animate-scaleUp">
              <div className="p-4 rounded-xl bg-dark-surface border border-emerald-500/30 space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.06]">
                  <div>
                    <span className="text-[10px] text-zinc-400 block">شناسه پیش‌فاکتور فروش</span>
                    <strong className="text-xs text-emerald-400 font-mono">{cashoutInvoice.orderId}</strong>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-amber-300">
                    <Clock size={13} />
                    <span>مهلت واریز: ۱۵ دقیقه</span>
                  </div>
                </div>

                <div className="p-2.5 bg-dark-card rounded-lg border border-white/[0.06] space-y-1.5">
                  <div className="flex justify-between text-zinc-400">
                    <span>مبلغ واریزی به حساب شما:</span>
                    <strong className="text-emerald-400 font-bold">{formatToman(cashoutInvoice.tomanPayout)} تومان</strong>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>بانک و صاحب حساب:</span>
                    <span className="text-white">{cashoutInvoice.bankName} • {cashoutInvoice.accountOwner}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400 font-mono text-[11px]" dir="ltr">
                    <span>{cashoutInvoice.shebaNumber}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-zinc-300 block">
                    آدرس کیف‌پول جهت انتقال {cashoutInvoice.amount} {cashoutInvoice.asset.symbol}:
                  </span>
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-dark-card border border-white/[0.08]">
                    <span className="font-mono text-[11px] text-zinc-200 truncate flex-1" dir="ltr">
                      {cashoutInvoice.depositAddress}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(cashoutInvoice.depositAddress)}
                      className="p-1 rounded bg-dark-surface text-zinc-300 hover:text-white"
                    >
                      {copied ? <CheckCircle2 size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>

                <p className="text-[10px] text-zinc-400 leading-relaxed">
                  به محض تایید تراکنش در بلاکچین، مبلغ ریالی به صورت آنی به شماره شبای شما واریز خواهد شد.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setCashoutInvoice(null)}
                className="w-full py-2.5 rounded-xl bg-dark-surface border border-white/[0.08] text-xs font-bold text-zinc-300 hover:text-white"
              >
                معامله جدید
              </button>
            </div>
          )}

        </div>
      )}

      {/* ======================================================== */}
      {/* SUBTAB 2: GAS TRACKER & 5-EXCHANGE CALCULATOR */}
      {/* ======================================================== */}
      {subTab === 'gas_tracker' && (
        <div className="bg-dark-card border border-white/[0.08] rounded-2xl p-5 shadow-xl space-y-5 animate-fadeIn">
          <div>
            <h2 className="text-sm font-bold text-white">ماشین‌حساب تتر و مقایسه کارمزد به تومان</h2>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              محاسبه بر اساس نرخ میانگین ۵ صرافی برتر ایران ({formatToman(tomanRate)} تومان)
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-dark-surface border border-white/[0.06] space-y-2.5">
            <span className="text-xs font-bold text-zinc-300 block">ماشین‌حساب تبدیل تتر ➔ تومان:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 items-center">
              <div>
                <label className="text-[10px] text-zinc-400 block mb-0.5">مقدار به تتر (USDT):</label>
                <input
                  type="text"
                  value={calcInput}
                  onChange={(e) => setCalcInput(e.target.value.replace(/[^0-9.]/g, ''))}
                  className="w-full px-3 py-1.5 rounded-lg bg-dark-card border border-white/[0.08] text-xs text-white font-mono focus:outline-none focus:border-emerald-500"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="text-[10px] text-zinc-400 block mb-0.5">معادل به تومان آزاد:</label>
                <div className="px-3 py-1.5 rounded-lg bg-dark-card border border-white/[0.08] text-xs text-emerald-400 font-bold font-mono">
                  {formatToman(Math.round((Number(calcInput) || 0) * tomanRate))} تومان
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-zinc-300 block">مقایسه کارمزد ریالی انتقال در شبکه‌ها:</span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="p-3 rounded-xl bg-dark-surface border border-white/[0.06] space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <TonIcon size={16} />
                    <span className="text-xs font-bold text-white">تون (TON)</span>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 font-bold">بسیار کم</span>
                </div>
                <div className="flex justify-between items-baseline pt-1">
                  <span className="text-[11px] text-zinc-400">کارمزد:</span>
                  <div className="text-left font-mono">
                    <strong className="text-xs text-white block">~0.005 TON</strong>
                    <span className="text-[10px] text-emerald-400 block">≈ {formatToman(Math.round(0.005 * (getTokenPrice('TON') || 1.6) * tomanRate))} تومان</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-dark-surface border border-white/[0.06] space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <SolanaIcon size={16} />
                    <span className="text-xs font-bold text-white">سولانا (Solana)</span>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 font-bold">سریع</span>
                </div>
                <div className="flex justify-between items-baseline pt-1">
                  <span className="text-[11px] text-zinc-400">کارمزد:</span>
                  <div className="text-left font-mono">
                    <strong className="text-xs text-white block">~0.00005 SOL</strong>
                    <span className="text-[10px] text-emerald-400 block">≈ {formatToman(Math.round(0.00005 * (getTokenPrice('SOL') || 117) * tomanRate))} تومان</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-dark-surface border border-white/[0.06] space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <TronIcon size={16} />
                    <span className="text-xs font-bold text-white">ترون (TRON TRC-20)</span>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-400 font-bold">متداول</span>
                </div>
                <div className="flex justify-between items-baseline pt-1">
                  <span className="text-[11px] text-zinc-400">کارمزد:</span>
                  <div className="text-left font-mono">
                    <strong className="text-xs text-white block">~13.5 TRX</strong>
                    <span className="text-[10px] text-amber-300 block">≈ {formatToman(Math.round(13.5 * (getTokenPrice('TRX') || 0.34) * tomanRate))} تومان</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-dark-surface border border-white/[0.06] space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <EthereumIcon size={16} />
                    <span className="text-xs font-bold text-white">اتریوم (EVM)</span>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400">گران</span>
                </div>
                <div className="flex justify-between items-baseline pt-1">
                  <span className="text-[11px] text-zinc-400">کارمزد:</span>
                  <div className="text-left font-mono">
                    <strong className="text-xs text-white block">~0.0008 ETH</strong>
                    <span className="text-[10px] text-rose-400 block">≈ {formatToman(Math.round(0.0008 * (getTokenPrice('ETH') || 2690) * tomanRate))} تومان</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ======================================================== */}
      {/* SUBTAB 3: ANTI-SANCTION */}
      {/* ======================================================== */}
      {subTab === 'anti_sanction' && (
        <div className="bg-dark-card border border-white/[0.08] rounded-2xl p-5 shadow-xl space-y-4 animate-fadeIn">
          <div>
            <h2 className="text-sm font-bold text-white">سپر ضدتحریم و راهنمای امنیتی کاربران ایرانی</h2>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              راهکارهای جلوگیری از مسدودسازی آدرس‌های کریپتو و خطای ۴۰۳ تحریم
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-dark-surface border border-white/[0.06] space-y-1.5">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <Cpu size={15} />
                <span>۱. ارتباط مستقیم با نودهای کلودفلر (بدون نیاز به وی‌پی‌ان)</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                پلتفرم JSWAP Farsi با استفاده از توابع لبه کلودفلر، درخواست‌های بلاکچین را بدون نیاز به سرورهای تحریم‌کننده نظیر Infura و Alchemy عبور می‌دهد.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-dark-surface border border-white/[0.06] space-y-1.5">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-bold">
                <ShieldCheck size={15} />
                <span>۲. تنظیم DNS ضدتحریم روی سیستم یا گوشی</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                جهت باز شدن سریع کیف‌پول‌ها در مرورگر، DNSهای ضدتحریم زیر را در تنظیمات کارت شبکه ثبت فرمایید:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs">
                <div className="p-2 rounded bg-dark-card border border-white/[0.06] text-zinc-300">
                  <span className="font-sans text-[10px] text-zinc-500 block">شکن:</span>
                  178.22.122.100 • 185.51.200.2
                </div>
                <div className="p-2 rounded bg-dark-card border border-white/[0.06] text-zinc-300">
                  <span className="font-sans text-[10px] text-zinc-500 block">کلودفلر:</span>
                  1.1.1.1 • 1.0.0.1
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
