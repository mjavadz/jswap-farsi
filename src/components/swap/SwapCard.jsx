import React, { useState, useMemo, useEffect } from 'react';
import { 
  ArrowDownUp, 
  Settings2, 
  Sparkles, 
  ChevronDown, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink, 
  RefreshCw 
} from 'lucide-react';
import { 
  EthereumIcon, 
  SolanaIcon, 
  TonIcon, 
  TronIcon, 
  UsdtIcon 
} from '../Icons';
import TokenSelectorModal from './TokenSelectorModal';
import { TOKENS } from '../../data/tokens';
import { getSwapQuote, executeSwap } from '../../services/swapService';
import { useWallet } from '../../context/WalletContext';
import { formatCrypto, formatToman, toPersianDigits } from '../../utils/format';

export default function SwapCard({ onOpenWalletModal }) {
  const { activeChain, isConnected, walletAddress } = useWallet();

  const currentChainTokens = useMemo(() => {
    return TOKENS[activeChain] || [];
  }, [activeChain]);

  // Selected Tokens
  const [fromToken, setFromToken] = useState(currentChainTokens[0] || null);
  const [toToken, setToToken] = useState(currentChainTokens[1] || null);

  // Update tokens when active chain changes
  useEffect(() => {
    const list = TOKENS[activeChain] || [];
    setFromToken(list[0] || null);
    setToToken(list[1] || null);
  }, [activeChain]);

  const [fromAmount, setFromAmount] = useState('');
  const [slippage, setSlippage] = useState('0.5');
  const [showSettings, setShowSettings] = useState(false);
  const [selectorTarget, setSelectorTarget] = useState(null); // 'from' | 'to' | null

  // Execution State
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapResult, setSwapResult] = useState(null);
  const [swapError, setSwapError] = useState(null);

  // Calculate quote
  const quote = useMemo(() => {
    return getSwapQuote({
      chain: activeChain,
      fromToken,
      toToken,
      fromAmount,
      slippage: Number(slippage) || 0.5
    });
  }, [activeChain, fromToken, toToken, fromAmount, slippage]);

  // Invert From/To
  const handleInvert = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    if (quote?.toAmount) {
      setFromAmount(String(quote.toAmount));
    }
  };

  // Max Button
  const handleSetMax = () => {
    if (fromToken?.balance) {
      setFromAmount(fromToken.balance.replace(/,/g, ''));
    }
  };

  // Swap action trigger
  const handlePerformSwap = async () => {
    if (!isConnected) {
      onOpenWalletModal();
      return;
    }
    if (!quote) return;

    setIsSwapping(true);
    setSwapError(null);
    setSwapResult(null);

    try {
      const res = await executeSwap({
        chain: activeChain,
        fromToken,
        toToken,
        quote,
        userAddress: walletAddress
      });
      setSwapResult(res);
    } catch (err) {
      setSwapError(err.message || 'خطا در اجرای سواپ در بلاکچین');
    } finally {
      setIsSwapping(false);
    }
  };

  const renderTokenBadgeIcon = (token) => {
    if (!token) return null;
    switch (token.icon) {
      case 'eth': return <EthereumIcon size={20} />;
      case 'sol': return <SolanaIcon size={20} />;
      case 'ton': return <TonIcon size={20} />;
      case 'trx': return <TronIcon size={20} />;
      case 'usdt': return <UsdtIcon size={20} />;
      default:
        return (
          <div className="w-5 h-5 rounded-full bg-slate-700 flex items-center justify-center text-[10px] font-bold">
            {token.symbol[0]}
          </div>
        );
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      
      {/* Swap Container Card */}
      <div className="glass-card rounded-3xl p-5 sm:p-7 shadow-2xl relative">
        
        {/* Card Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-dark-border/60">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-accent-emerald/20 border border-accent-emerald/40 flex items-center justify-center text-accent-emerald">
              <Sparkles size={16} />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white">سواپ غیرحضانتی رمزارز</h2>
              <p className="text-[11px] text-slate-400">بهترین روت نقدینگی در شبکه {activeChain.toUpperCase()}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-xl border transition-all ${
                showSettings 
                  ? 'bg-accent-emerald/15 border-accent-emerald/40 text-accent-emerald' 
                  : 'bg-dark-surface border-dark-border text-slate-400 hover:text-white'
              }`}
              title="تنظیمات اسلیپیج و کارمزد"
            >
              <Settings2 size={18} />
            </button>
          </div>
        </div>

        {/* Slippage Settings Drawer */}
        {showSettings && (
          <div className="mb-4 p-3.5 rounded-2xl bg-dark-surface/90 border border-dark-border/80 animate-fadeIn space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-300">حد مجاز تلرانس قیمت (Slippage):</span>
              <span className="text-accent-emerald font-mono font-bold">{slippage}%</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {['0.1', '0.5', '1.0'].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setSlippage(val)}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                    slippage === val 
                      ? 'bg-accent-emerald text-dark-bg font-extrabold' 
                      : 'bg-dark-card border border-dark-border text-slate-300 hover:bg-dark-hover'
                  }`}
                >
                  {val}%
                </button>
              ))}
              <div className="relative">
                <input
                  type="text"
                  placeholder="سفارشی"
                  value={['0.1', '0.5', '1.0'].includes(slippage) ? '' : slippage}
                  onChange={(e) => setSlippage(e.target.value.replace(/[^0-9.]/g, ''))}
                  className="w-full h-full text-center py-1.5 rounded-lg bg-dark-card border border-dark-border text-xs text-white placeholder-slate-500 focus:outline-none focus:border-accent-emerald font-bold"
                />
              </div>
            </div>
          </div>
        )}

        {/* Box 1: FROM Input */}
        <div className="p-4 rounded-2xl bg-dark-surface/60 border border-dark-border/80 focus-within:border-accent-emerald/60 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>پرداخت می‌کنید:</span>
            <div className="flex items-center gap-1.5">
              <span>موجودی:</span>
              <span className="font-mono font-bold text-slate-200" dir="ltr">
                {fromToken?.balance || '0.00'}
              </span>
              <button 
                type="button" 
                onClick={handleSetMax}
                className="text-[11px] font-bold text-accent-emerald hover:underline px-1 py-0.5 rounded bg-accent-emerald/10"
              >
                حداکثر
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <input
              type="text"
              inputMode="decimal"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value.replace(/[^0-9.]/g, ''))}
              className="w-full bg-transparent text-2xl sm:text-3xl font-extrabold text-white placeholder-slate-600 focus:outline-none font-mono"
            />

            <button
              type="button"
              onClick={() => setSelectorTarget('from')}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-dark-card border border-dark-border hover:border-slate-500 transition-all shrink-0 group"
            >
              {renderTokenBadgeIcon(fromToken)}
              <span className="font-bold text-sm text-white group-hover:text-accent-emerald transition-colors">
                {fromToken?.symbol || 'انتخاب'}
              </span>
              <ChevronDown size={14} className="text-slate-400" />
            </button>
          </div>

          <div className="mt-2 text-xs text-slate-500">
            ≈ {quote ? `$${quote.fromValueUSD} (${formatToman(Number(quote.fromValueUSD) * 66000)})` : '$0.00'}
          </div>
        </div>

        {/* Invert Swap Button */}
        <div className="relative my-[-10px] z-10 flex justify-center">
          <button
            type="button"
            onClick={handleInvert}
            className="w-10 h-10 rounded-xl bg-dark-card border-2 border-dark-border hover:border-accent-emerald text-slate-300 hover:text-accent-emerald flex items-center justify-center transition-all shadow-md hover:scale-110 active:scale-95"
            title="جابجایی مبدا و مقصد"
          >
            <ArrowDownUp size={16} />
          </button>
        </div>

        {/* Box 2: TO Output */}
        <div className="p-4 rounded-2xl bg-dark-surface/60 border border-dark-border/80 transition-colors">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>دریافت می‌کنید (تخمینی):</span>
            <div className="flex items-center gap-1.5">
              <span>موجودی:</span>
              <span className="font-mono text-slate-300" dir="ltr">
                {toToken?.balance || '0.00'}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <input
              type="text"
              readOnly
              placeholder="0.0"
              value={quote ? quote.toAmount : ''}
              className="w-full bg-transparent text-2xl sm:text-3xl font-extrabold text-accent-emerald placeholder-slate-600 focus:outline-none font-mono"
            />

            <button
              type="button"
              onClick={() => setSelectorTarget('to')}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-dark-card border border-dark-border hover:border-slate-500 transition-all shrink-0 group"
            >
              {renderTokenBadgeIcon(toToken)}
              <span className="font-bold text-sm text-white group-hover:text-accent-emerald transition-colors">
                {toToken?.symbol || 'انتخاب'}
              </span>
              <ChevronDown size={14} className="text-slate-400" />
            </button>
          </div>

          <div className="mt-2 text-xs text-slate-500">
            ≈ {quote ? `$${quote.toValueUSD} (${formatToman(Number(quote.toValueUSD) * 66000)})` : '$0.00'}
          </div>
        </div>

        {/* Live Route & Rate Details */}
        {quote && (
          <div className="mt-4 p-3.5 rounded-2xl bg-dark-bg/60 border border-dark-border/60 text-xs space-y-2 text-slate-400 animate-fadeIn">
            <div className="flex justify-between items-center">
              <span>نرخ مبادله:</span>
              <span className="font-mono text-slate-200" dir="ltr">
                1 {fromToken?.symbol} = {quote.rate} {toToken?.symbol}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>مسیر نقدینگی (Route):</span>
              <span className="text-accent-emerald font-semibold">{quote.protocol}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>حداقل دریافتی (Minimum):</span>
              <span className="font-mono text-slate-200" dir="ltr">
                {quote.minReceived} {toToken?.symbol}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>کارمزد تخمینی شبکه (Gas):</span>
              <span className="text-slate-300 font-mono" dir="ltr">{quote.gasFee.fee} ({quote.gasFee.usd})</span>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-5">
          <button
            type="button"
            disabled={isSwapping || (isConnected && (!fromAmount || Number(fromAmount) <= 0))}
            onClick={handlePerformSwap}
            className={`w-full py-4 rounded-2xl font-black text-base transition-all duration-200 shadow-lg flex items-center justify-center gap-2 ${
              !isConnected
                ? 'bg-gradient-to-r from-accent-emerald to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-dark-bg shadow-glow-emerald hover:scale-[1.01]'
                : !fromAmount || Number(fromAmount) <= 0
                ? 'bg-dark-surface border border-dark-border text-slate-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-accent-emerald via-emerald-500 to-teal-600 hover:opacity-95 text-dark-bg shadow-glow-emerald active:scale-95'
            }`}
          >
            {isSwapping ? (
              <>
                <RefreshCw size={18} className="animate-spin" />
                <span>در حال ارسال و امضای تراکنش در شبکه…</span>
              </>
            ) : !isConnected ? (
              <span>اتصال کیف پول جهت سواپ</span>
            ) : !fromAmount || Number(fromAmount) <= 0 ? (
              <span>مقدار مورد نظر را وارد کنید</span>
            ) : (
              <span>سواپ قطعی (تایید در کیف پول)</span>
            )}
          </button>
        </div>

      </div>

      {/* Token Selector Modal */}
      <TokenSelectorModal
        isOpen={!!selectorTarget}
        onClose={() => setSelectorTarget(null)}
        tokens={currentChainTokens}
        selectedToken={selectorTarget === 'from' ? fromToken : toToken}
        onSelectToken={(t) => {
          if (selectorTarget === 'from') {
            if (t.symbol === toToken?.symbol) setToToken(fromToken);
            setFromToken(t);
          } else {
            if (t.symbol === fromToken?.symbol) setFromToken(toToken);
            setToToken(t);
          }
        }}
        chainName={activeChain.toUpperCase()}
      />

      {/* Swap Success Modal */}
      {swapResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm bg-dark-card border border-accent-emerald/40 rounded-3xl p-6 text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-accent-emerald/20 border-2 border-accent-emerald flex items-center justify-center mx-auto text-accent-emerald shadow-glow-emerald">
              <CheckCircle2 size={36} />
            </div>

            <div>
              <h3 className="text-lg font-black text-white">تراکنش با موفقیت انجام شد!</h3>
              <p className="text-xs text-slate-400 mt-1">دارایی مبادله‌شده به کیف‌پول شما واریز شد.</p>
            </div>

            <div className="p-3 bg-dark-surface rounded-xl border border-dark-border text-xs space-y-1.5 text-right font-mono" dir="ltr">
              <div className="text-slate-400 flex justify-between">
                <span className="font-sans">سواپ شده:</span>
                <span className="text-white font-bold">{swapResult.fromAmount} {swapResult.fromToken} ➔ {swapResult.toAmount} {swapResult.toToken}</span>
              </div>
              <div className="text-slate-400 flex justify-between">
                <span className="font-sans">هش تراکنش:</span>
                <span className="text-accent-emerald truncate max-w-[180px]">{swapResult.txHash}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <a
                href={swapResult.explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-3 rounded-xl bg-dark-surface hover:bg-dark-hover border border-dark-border text-xs font-bold text-slate-200 flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>مشاهده در اکسپلورر</span>
                <ExternalLink size={14} />
              </a>
              <button
                type="button"
                onClick={() => {
                  setSwapResult(null);
                  setFromAmount('');
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-accent-emerald text-dark-bg text-xs font-extrabold hover:bg-emerald-600 transition-colors shadow-glow-emerald"
              >
                بستن و ادامه
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
