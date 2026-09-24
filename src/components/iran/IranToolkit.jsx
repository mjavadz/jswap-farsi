import React, { useState } from 'react';
import { 
  CreditCard, 
  ArrowLeftRight, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  Copy, 
  Clock,
  Sparkles,
  HelpCircle,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { 
  TonIcon, 
  SolanaIcon, 
  EthereumIcon, 
  TronIcon, 
  UsdtIcon, 
  StarsIcon 
} from '../Icons';
import { detectBankFromIBAN, detectBankFromCard, formatIBAN } from '../../utils/bankDetector';
import { formatToman, toPersianDigits, shortenAddress } from '../../utils/format';
import { getTokenPrice } from '../../services/priceService';

const IRAN_CASHOUT_ASSETS = [
  { id: 'usdt_trc20', name: 'تتر (TRC-20)', symbol: 'USDT', icon: <UsdtIcon size={20} />, min: 10 },
  { id: 'usdt_ton', name: 'تتر شبکه تون (TON)', symbol: 'USDT', icon: <UsdtIcon size={20} />, min: 5 },
  { id: 'ton', name: 'تون‌کوین (Toncoin)', symbol: 'TON', icon: <TonIcon size={20} />, min: 2 },
  { id: 'stars', name: 'استارز تلگرام (Stars)', symbol: 'Stars', icon: <StarsIcon size={20} />, min: 100 },
  { id: 'dogs', name: 'داگز (DOGS Token)', symbol: 'DOGS', icon: <div className="w-5 h-5 rounded-full bg-zinc-800 text-[10px] font-bold flex items-center justify-center text-zinc-300">🦴</div>, min: 5000 },
  { id: 'not', name: 'نات‌کوین (Notcoin)', symbol: 'NOT', icon: <div className="w-5 h-5 rounded-full bg-zinc-800 text-[10px] font-bold flex items-center justify-center text-zinc-300">🪙</div>, min: 1000 },
];

export default function IranToolkit() {
  const [subTab, setSubTab] = useState('cashout'); // 'cashout' | 'gas_tracker' | 'anti_sanction'

  // Cashout State
  const [selectedAsset, setSelectedAsset] = useState(IRAN_CASHOUT_ASSETS[0]);
  const [assetAmount, setAssetAmount] = useState('100');
  const [shebaNumber, setShebaNumber] = useState('');
  const [accountOwner, setAccountOwner] = useState('');
  const [detectedBank, setDetectedBank] = useState(null);
  const [cashoutInvoice, setCashoutInvoice] = useState(null);
  const [copied, setCopied] = useState(false);
  const [formError, setFormError] = useState('');

  // Toman live rate
  const [tomanRate, setTomanRate] = useState(66500);

  // Calculator state
  const [calcInput, setCalcInput] = useState('100');
  const [calcDirection, setCalcDirection] = useState('usdt_to_toman'); // 'usdt_to_toman' | 'toman_to_usdt'

  // Calculate Cashout
  const getAssetPriceUSD = (assetId) => {
    if (assetId.startsWith('usdt')) return 1.0;
    if (assetId === 'ton') return getTokenPrice('TON') || 1.60;
    if (assetId === 'stars') return 0.014; // OTC buyback rate
    if (assetId === 'dogs') return getTokenPrice('DOGS') || 0.00065;
    if (assetId === 'not') return getTokenPrice('NOT') || 0.0078;
    return 1.0;
  };

  const assetUSDPrice = getAssetPriceUSD(selectedAsset.id);
  const totalUSDValue = (Number(assetAmount) || 0) * assetUSDPrice;
  // 0.8% processing/payout fee
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

    // Generate cashout deposit invoice
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
    <div className="w-full max-w-3xl mx-auto space-y-6">
      
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
          <span>نقد کردن به تومان (شبا/کارت)</span>
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
          <span>محاسبه‌گر تتر و کارمزد شبکه</span>
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
          <span>راهنمای ضدتحریم و DNS</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* SUBTAB 1: CASHOUT TO TOMAN */}
      {/* ======================================================== */}
      {subTab === 'cashout' && (
        <div className="bg-dark-card border border-white/[0.08] rounded-2xl p-5 sm:p-6 shadow-xl space-y-6 animate-fadeIn">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/[0.06]">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <span>فروش رمزارز و استارز تلگرام با واریز به حساب بانکی ایران</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">تسویه پایا / کارت به کارت</span>
              </h2>
              <p className="text-[11px] text-zinc-400 mt-1">
                تبدیل مستقیم بدون احراز هویت سنگین، با تسویه سریع به تمام بانک‌های عضو شتاب
              </p>
            </div>

            <div className="text-left bg-dark-surface px-3 py-1.5 rounded-xl border border-white/[0.06]">
              <span className="text-[10px] text-zinc-400 block">نرخ لحظه‌ای تتر</span>
              <strong className="text-xs text-emerald-400 font-mono font-bold">
                {formatToman(tomanRate)} تومان
              </strong>
            </div>
          </div>

          {!cashoutInvoice ? (
            <form onSubmit={handleCreateCashout} className="space-y-5">
              
              {/* Step 1: Select Asset */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-300">
                  ۱. ارزی که قصد فروش و نقد کردن آن را دارید انتخاب کنید:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {IRAN_CASHOUT_ASSETS.map((asset) => {
                    const isSelected = selectedAsset.id === asset.id;
                    return (
                      <button
                        key={asset.id}
                        type="button"
                        onClick={() => setSelectedAsset(asset)}
                        className={`flex items-center gap-2.5 p-3 rounded-xl border text-right transition-all ${
                          isSelected
                            ? 'bg-emerald-500/10 border-emerald-500/40 text-white'
                            : 'bg-dark-surface border-white/[0.06] text-zinc-400 hover:text-white'
                        }`}
                      >
                        <div className="shrink-0">{asset.icon}</div>
                        <div>
                          <strong className="text-xs block text-white">{asset.symbol}</strong>
                          <span className="text-[10px] text-zinc-400 truncate block">{asset.name}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Amount to Cashout */}
              <div className="p-3.5 rounded-xl bg-dark-surface border border-white/[0.06] space-y-2">
                <div className="flex justify-between items-center text-xs text-zinc-400">
                  <span>مقدار دارایی برای نقد شدن:</span>
                  <span className="text-[11px] text-zinc-500">حداقل: {selectedAsset.min} {selectedAsset.symbol}</span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="0"
                    value={assetAmount}
                    onChange={(e) => setAssetAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                    className="w-full bg-transparent text-2xl font-bold text-white placeholder-zinc-600 focus:outline-none font-mono"
                  />
                  <span className="text-sm font-bold text-zinc-300 px-2 py-1 bg-dark-card rounded-lg border border-white/[0.06]">
                    {selectedAsset.symbol}
                  </span>
                </div>

                <div className="text-[11px] text-zinc-500">
                  ≈ ${totalUSDValue.toFixed(2)} دلار
                </div>
              </div>

              {/* Step 3: Bank Account / Sheba */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-zinc-300">
                  ۲. مشخصات حساب بانکی ایران جهت دریافت تومان:
                </label>

                <div className="space-y-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="شماره شبا (مثال: IR120120000000001234567890)"
                      value={shebaNumber}
                      onChange={(e) => handleShebaChange(e.target.value)}
                      className="w-full pl-3 pr-4 py-2.5 rounded-xl bg-dark-surface border border-white/[0.08] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-mono"
                      dir="ltr"
                    />
                  </div>

                  {detectedBank && (
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400">
                      <CheckCircle2 size={14} />
                      <span>بانک شناسایی شد: <strong>{detectedBank.name}</strong></span>
                    </div>
                  )}

                  <input
                    type="text"
                    placeholder="نام و نام خانوادگی صاحب حساب (دقیقاً مطابق کارت بانکی)"
                    value={accountOwner}
                    onChange={(e) => setAccountOwner(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-dark-surface border border-white/[0.08] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              {/* Step 4: Summary Breakdown */}
              <div className="p-4 rounded-xl bg-dark-surface/50 border border-white/[0.06] space-y-2 text-xs">
                <div className="flex justify-between items-center text-zinc-400">
                  <span>ارز ارسالی شما:</span>
                  <span className="font-mono text-white font-bold">{assetAmount} {selectedAsset.symbol}</span>
                </div>
                <div className="flex justify-between items-center text-zinc-400">
                  <span>نرخ تبدیل تتر مبنا:</span>
                  <span className="font-mono text-zinc-200">{formatToman(tomanRate)} تومان</span>
                </div>
                <div className="flex justify-between items-center text-zinc-400 pt-2 border-t border-white/[0.04]">
                  <span className="font-bold text-white">مبلغ نهایی واریزی به حساب بانکی شما:</span>
                  <strong className="text-emerald-400 font-bold text-sm">
                    {formatToman(finalTomanPayout)} تومان
                  </strong>
                </div>
              </div>

              {formError && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                  <AlertTriangle size={16} />
                  <span>{formError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm transition-all"
              >
                ثبت درخواست فروش و دریافت آدرس واریز
              </button>

            </form>
          ) : (
            /* Cashout Invoice Card */
            <div className="space-y-4 animate-scaleUp">
              <div className="p-4 rounded-xl bg-dark-surface border border-emerald-500/30 space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.06]">
                  <div>
                    <span className="text-[10px] text-zinc-400 block">شناسه پیش‌فاکتور فروش</span>
                    <strong className="text-xs text-emerald-400 font-mono">{cashoutInvoice.orderId}</strong>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-amber-300">
                    <Clock size={14} />
                    <span>مهلت واریز: ۱۵ دقیقه</span>
                  </div>
                </div>

                <div className="p-3 bg-dark-card rounded-lg border border-white/[0.06] text-xs space-y-2">
                  <div className="flex justify-between text-zinc-400">
                    <span>مبلغ واریزی به حساب شما:</span>
                    <strong className="text-emerald-400 font-bold text-sm">{formatToman(cashoutInvoice.tomanPayout)} تومان</strong>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>بانک و صاحب حساب:</span>
                    <span className="text-white font-medium">{cashoutInvoice.bankName} • {cashoutInvoice.accountOwner}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400 font-mono text-[11px]" dir="ltr">
                    <span>{cashoutInvoice.shebaNumber}</span>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-zinc-300 block">
                    آدرس کیف‌پول صرافی جهت انتقال {cashoutInvoice.amount} {cashoutInvoice.asset.symbol}:
                  </span>
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-dark-card border border-white/[0.08]">
                    <span className="font-mono text-xs text-zinc-200 truncate flex-1" dir="ltr">
                      {cashoutInvoice.depositAddress}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(cashoutInvoice.depositAddress)}
                      className="p-1.5 rounded-lg bg-dark-surface text-zinc-300 hover:text-white"
                      title="کپی آدرس"
                    >
                      {copied ? <CheckCircle2 size={16} className="text-emerald-400" /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>

                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  به محض انتقال و تایید تراکنش در بلاکچین، وجه ریالی معادل از طریق پایا یا کارت به کارت آنی به حساب بالا منتقل می‌شود.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setCashoutInvoice(null)}
                className="w-full py-2.5 rounded-xl bg-dark-surface border border-white/[0.08] text-xs font-bold text-zinc-300 hover:text-white"
              >
                بازگشت و ثبت معامله جدید
              </button>
            </div>
          )}

        </div>
      )}

      {/* ======================================================== */}
      {/* SUBTAB 2: GAS TRACKER & CALCULATOR */}
      {/* ======================================================== */}
      {subTab === 'gas_tracker' && (
        <div className="bg-dark-card border border-white/[0.08] rounded-2xl p-5 sm:p-6 shadow-xl space-y-6 animate-fadeIn">
          
          <div>
            <h2 className="text-sm font-bold text-white">مقایسه‌گر کارمزد شبکه‌ها و ماشین‌حساب تتر به تومان</h2>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              محاسبه ریالی دقیق کارمزد تراکنش‌ها در شبکه‌های مختلف برای انتخاب اقتصادی‌ترین روش انتقال
            </p>
          </div>

          {/* Quick Calculator */}
          <div className="p-4 rounded-xl bg-dark-surface border border-white/[0.06] space-y-3">
            <span className="text-xs font-bold text-zinc-300 block">ماشین‌حساب تبدیل آنی تتر / تومان:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
              <div>
                <label className="text-[10px] text-zinc-400 block mb-1">مقدار به تتر (USDT):</label>
                <input
                  type="text"
                  value={calcInput}
                  onChange={(e) => setCalcInput(e.target.value.replace(/[^0-9.]/g, ''))}
                  className="w-full px-3 py-2 rounded-lg bg-dark-card border border-white/[0.08] text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="text-[10px] text-zinc-400 block mb-1">معادل به تومان آزاد:</label>
                <div className="px-3 py-2 rounded-lg bg-dark-card border border-white/[0.08] text-sm text-emerald-400 font-bold font-mono">
                  {formatToman(Math.round((Number(calcInput) || 0) * tomanRate))} تومان
                </div>
              </div>
            </div>
          </div>

          {/* Live Gas Fee Comparison Table */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-zinc-300 block">مقایسه کارمزد انتقال بین شبکه‌ها:</span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              
              {/* TON */}
              <div className="p-3.5 rounded-xl bg-dark-surface border border-white/[0.06] space-y-1.5 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TonIcon size={18} />
                    <span className="text-xs font-bold text-white">شبکه تون (TON)</span>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">بسیار ارزان</span>
                </div>
                <div className="flex justify-between items-baseline pt-1">
                  <span className="text-[11px] text-zinc-400">کارمزد انتقال:</span>
                  <div className="text-left font-mono">
                    <strong className="text-xs text-white block">~0.005 TON</strong>
                    <span className="text-[10px] text-emerald-400 block">≈ {formatToman(Math.round(0.005 * (getTokenPrice('TON') || 1.6) * tomanRate))} تومان</span>
                  </div>
                </div>
              </div>

              {/* Solana */}
              <div className="p-3.5 rounded-xl bg-dark-surface border border-white/[0.06] space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <SolanaIcon size={18} />
                    <span className="text-xs font-bold text-white">سولانا (Solana)</span>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">سریع‌ترین</span>
                </div>
                <div className="flex justify-between items-baseline pt-1">
                  <span className="text-[11px] text-zinc-400">کارمزد انتقال:</span>
                  <div className="text-left font-mono">
                    <strong className="text-xs text-white block">~0.00005 SOL</strong>
                    <span className="text-[10px] text-emerald-400 block">≈ {formatToman(Math.round(0.00005 * (getTokenPrice('SOL') || 117) * tomanRate))} تومان</span>
                  </div>
                </div>
              </div>

              {/* TRON */}
              <div className="p-3.5 rounded-xl bg-dark-surface border border-white/[0.06] space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TronIcon size={18} />
                    <span className="text-xs font-bold text-white">ترون (TRON TRC-20)</span>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold">محبوب صرافی‌ها</span>
                </div>
                <div className="flex justify-between items-baseline pt-1">
                  <span className="text-[11px] text-zinc-400">کارمزد انتقال:</span>
                  <div className="text-left font-mono">
                    <strong className="text-xs text-white block">~13.5 TRX</strong>
                    <span className="text-[10px] text-amber-300 block">≈ {formatToman(Math.round(13.5 * (getTokenPrice('TRX') || 0.34) * tomanRate))} تومان</span>
                  </div>
                </div>
              </div>

              {/* Ethereum */}
              <div className="p-3.5 rounded-xl bg-dark-surface border border-white/[0.06] space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <EthereumIcon size={18} />
                    <span className="text-xs font-bold text-white">اتریوم (EVM / ERC-20)</span>
                  </div>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">گران</span>
                </div>
                <div className="flex justify-between items-baseline pt-1">
                  <span className="text-[11px] text-zinc-400">کارمزد انتقال:</span>
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
      {/* SUBTAB 3: ANTI-SANCTION & CLEAN RPC */}
      {/* ======================================================== */}
      {subTab === 'anti_sanction' && (
        <div className="bg-dark-card border border-white/[0.08] rounded-2xl p-5 sm:p-6 shadow-xl space-y-6 animate-fadeIn">
          
          <div>
            <h2 className="text-sm font-bold text-white">سپر ضدتحریم و راهنمای امنیتی کاربران ایرانی</h2>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              راهکارهای جلوگیری از مسدودسازی آدرس‌های کریپتو و خطای ۴۰۳ ناشی از تحریم سرویس‌های خارجی
            </p>
          </div>

          <div className="space-y-4">
            
            {/* Advice 1: Clean RPC */}
            <div className="p-4 rounded-xl bg-dark-surface border border-white/[0.06] space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                <Cpu size={16} />
                <span>۱. استفاده از RPCهای عمومی ضدتحریم</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                سرویس‌های مشهوری مثل Infura و Alchemy بر اساس تحریم‌ها درخواست‌های آی‌پی‌های ایران را مسدود می‌کنند. پلتفرم JSWAP Farsi با مسیریابی مستقیم از نودهای غیرمتمرکز کلودفلر، بدون نیاز به فیلترشکن تراکنش‌های شما را مخابره می‌کند.
              </p>
            </div>

            {/* Advice 2: DNS Config */}
            <div className="p-4 rounded-xl bg-dark-surface border border-white/[0.06] space-y-2">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-bold">
                <ShieldCheck size={16} />
                <span>۲. تنظیم DNS ضدتحریم روی سیستم یا موبایل</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                برای جلوگیری از خطای ۴۰۳ در متامسک یا سایت‌های تحلیل چارت، DNS کارت شبکه را روی یکی از گزینه‌های معتبر ضدتحریم زیر تنظیم فرمایید:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs">
                <div className="p-2 rounded bg-dark-card border border-white/[0.06] text-zinc-300">
                  <span className="font-sans text-[10px] text-zinc-500 block">شکن (Shecan):</span>
                  178.22.122.100 • 185.51.200.2
                </div>
                <div className="p-2 rounded bg-dark-card border border-white/[0.06] text-zinc-300">
                  <span className="font-sans text-[10px] text-zinc-500 block">کلودفلر ایمن (Cloudflare):</span>
                  1.1.1.1 • 1.0.0.1
                </div>
              </div>
            </div>

            {/* Advice 3: MTProto Proxies */}
            <div className="p-4 rounded-xl bg-dark-surface border border-white/[0.06] space-y-2">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
                <Zap size={16} />
                <span>۳. اتصال پایدار تلگرام جهت تبادلات استارز</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                جهت اطمینان از واریز آنی استارز تلگرام، پیشنهاد می‌شود از پروکسی‌های مستقیم بدون فیلترشکن استفاده نمایید تا قطعی ارتباط رخ ندهد.
              </p>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
