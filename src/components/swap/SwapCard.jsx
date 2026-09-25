import React, { useState, useMemo, useEffect } from 'react';
import { 
  ArrowDownUp, 
  Settings2, 
  ChevronDown, 
  CheckCircle2, 
  ExternalLink, 
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { 
  EthereumIcon, 
  SolanaIcon, 
  TonIcon, 
  TronIcon, 
  UsdtIcon,
  BnbIcon,
  ArbitrumIcon,
  PolygonIcon
} from '../Icons';
import TokenSelectorModal from './TokenSelectorModal';
import { TOKENS } from '../../data/tokens';
import { getSwapQuote, executeSwap } from '../../services/swapService';
import { useWallet } from '../../context/WalletContext';
import { formatToman } from '../../utils/format';

export default function SwapCard({ onOpenWalletModal }) {
  const { 
    activeChain, 
    isConnected, 
    walletAddress, 
    getTokenBalance,
    refetchBalances 
  } = useWallet();

  const currentChainTokens = useMemo(() => {
    return TOKENS[activeChain] || [];
  }, [activeChain]);

  // Selected Tokens
  const [fromToken, setFromToken] = useState(currentChainTokens[0] || null);
  const [toToken, setToToken] = useState(currentChainTokens[1] || null);

  useEffect(() => {
    const list = TOKENS[activeChain] || [];
    setFromToken(list[0] || null);
    setToToken(list[1] || null);
  }, [activeChain]);

  const [fromAmount, setFromAmount] = useState('');
  const [slippage, setSlippage] = useState('0.5');
  const [showSettings, setShowSettings] = useState(false);
  const [selectorTarget, setSelectorTarget] = useState(null);

  // Execution State
  const [isSwapping, setIsSwapping] = useState(false);
  const [swapResult, setSwapResult] = useState(null);
  const [swapError, setSwapError] = useState(null);

  // Dynamic user balances for selected tokens
  const fromBalance = getTokenBalance(fromToken?.symbol);
  const toBalance = getTokenBalance(toToken?.symbol);

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

  // Validate balance
  const numFromAmount = Number(fromAmount);
  const numFromBalance = Number(fromBalance);
  const isInsufficientBalance = isConnected && numFromAmount > 0 && numFromAmount > numFromBalance;

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
    if (numFromBalance > 0) {
      setFromAmount(String(numFromBalance));
    }
  };

  // Swap action trigger
  const handlePerformSwap = async () => {
    if (!isConnected) {
      onOpenWalletModal();
      return;
    }
    if (!quote || isInsufficientBalance) return;

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
      if (refetchBalances) refetchBalances();
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
      case 'bnb': return <BnbIcon size={20} />;
      case 'arb': return <ArbitrumIcon size={20} />;
      case 'pol': return <PolygonIcon size={20} />;
      default:
        return (
          <div className="w-5 h-5 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-300">
            {token.symbol[0]}
          </div>
        );
    }
  };

  const getButtonText = () => {
    if (isSwapping) return 'در حال ارسال و امضای تراکنش…';
    if (!isConnected) return 'اتصال کیف پول جهت سواپ';
    if (!fromAmount || numFromAmount <= 0) return 'مقدار مورد نظر را وارد کنید';
    if (isInsufficientBalance) return `موجودی ناکافی است (${fromBalance} ${fromToken?.symbol})`;
    return `سواپ ${fromToken?.symbol} به ${toToken?.symbol}`;
  };

  const isButtonDisabled = isSwapping || (isConnected && (!fromAmount || numFromAmount <= 0 || isInsufficientBalance));

  return (
    <div className="w-full max-w-md mx-auto">
      
      {/* Minimal Swap Card */}
      <div className="bg-dark-card border border-white/[0.08] rounded-2xl p-4 sm:p-5 shadow-xl relative">
        
        {/* Card Header */}
        <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/[0.06]">
          <div>
            <h2 className="text-sm font-bold text-white">سواپ ارز دیجیتال</h2>
            <span className="text-[11px] text-zinc-400">شبکه {activeChain.toUpperCase()}</span>
          </div>

          <button
            type="button"
            onClick={() => setShowSettings(!showSettings)}
            className={`p-1.5 rounded-lg border transition-all ${
              showSettings 
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' 
                : 'bg-dark-surface border-white/[0.06] text-zinc-400 hover:text-white'
            }`}
            title="تنظیمات تلرانس قیمت (Slippage)"
          >
            <Settings2 size={16} />
          </button>
        </div>

        {/* Slippage Settings Drawer */}
        {showSettings && (
          <div className="mb-3 p-3 rounded-xl bg-dark-surface border border-white/[0.06] space-y-2 text-xs animate-fadeIn">
            <div className="flex items-center justify-between text-zinc-300">
              <span>حد مجاز نوسان قیمت (Slippage):</span>
              <span className="text-emerald-400 font-mono font-bold">{slippage}%</span>
            </div>
            <div className="grid grid-cols-4 gap-1.5">
              {['0.1', '0.5', '1.0'].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setSlippage(val)}
                  className={`py-1 rounded-lg text-xs font-bold transition-all ${
                    slippage === val 
                      ? 'bg-emerald-500 text-black font-extrabold' 
                      : 'bg-dark-card border border-white/[0.08] text-zinc-300 hover:bg-dark-hover'
                  }`}
                >
                  {val}%
                </button>
              ))}
              <input
                type="text"
                placeholder="سفارشی"
                value={['0.1', '0.5', '1.0'].includes(slippage) ? '' : slippage}
                onChange={(e) => setSlippage(e.target.value.replace(/[^0-9.]/g, ''))}
                className="w-full text-center py-1 rounded-lg bg-dark-card border border-white/[0.08] text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-bold"
              />
            </div>
          </div>
        )}

        {/* Box 1: FROM Input */}
        <div className="p-3.5 rounded-xl bg-dark-surface/90 border border-white/[0.06] focus-within:border-white/20 transition-colors">
          <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1.5">
            <span>پرداخت می‌کنید:</span>
            <div className="flex items-center gap-1.5">
              <span>موجودی:</span>
              <span className="font-mono text-zinc-200" dir="ltr">
                {fromBalance}
              </span>
              {isConnected && numFromBalance > 0 && (
                <button 
                  type="button" 
                  onClick={handleSetMax}
                  className="font-bold text-emerald-400 hover:underline px-1 rounded bg-emerald-500/10 text-[10px]"
                >
                  حداکثر
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <input
              type="text"
              inputMode="decimal"
              placeholder="0"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value.replace(/[^0-9.]/g, ''))}
              className="w-full bg-transparent text-2xl font-bold text-white placeholder-zinc-600 focus:outline-none font-mono"
            />

            <button
              type="button"
              onClick={() => setSelectorTarget('from')}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-dark-card border border-white/[0.08] hover:border-white/20 transition-all shrink-0"
            >
              {renderTokenBadgeIcon(fromToken)}
              <span className="font-bold text-xs text-white">
                {fromToken?.symbol || 'انتخاب'}
              </span>
              <ChevronDown size={14} className="text-zinc-400" />
            </button>
          </div>

          <div className="mt-1 text-[11px] text-zinc-500">
            ≈ {quote ? `$${quote.fromValueUSD} (${formatToman(Number(quote.fromValueUSD) * 66000)})` : '$0.00'}
          </div>
        </div>

        {/* Invert Swap Button */}
        <div className="relative my-[-8px] z-10 flex justify-center">
          <button
            type="button"
            onClick={handleInvert}
            className="w-8 h-8 rounded-lg bg-dark-card border border-white/[0.1] hover:border-emerald-500 text-zinc-300 hover:text-emerald-400 flex items-center justify-center transition-all shadow-sm active:scale-95"
            title="جابجایی مبدا و مقصد"
          >
            <ArrowDownUp size={14} />
          </button>
        </div>

        {/* Box 2: TO Output */}
        <div className="p-3.5 rounded-xl bg-dark-surface/90 border border-white/[0.06] transition-colors">
          <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1.5">
            <span>دریافت می‌کنید:</span>
            <div className="flex items-center gap-1.5">
              <span>موجودی:</span>
              <span className="font-mono text-zinc-300" dir="ltr">
                {toBalance}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <input
              type="text"
              readOnly
              placeholder="0"
              value={quote ? quote.toAmount : ''}
              className="w-full bg-transparent text-2xl font-bold text-emerald-400 placeholder-zinc-600 focus:outline-none font-mono"
            />

            <button
              type="button"
              onClick={() => setSelectorTarget('to')}
              className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-dark-card border border-white/[0.08] hover:border-white/20 transition-all shrink-0"
            >
              {renderTokenBadgeIcon(toToken)}
              <span className="font-bold text-xs text-white">
                {toToken?.symbol || 'انتخاب'}
              </span>
              <ChevronDown size={14} className="text-zinc-400" />
            </button>
          </div>

          <div className="mt-1 text-[11px] text-zinc-500">
            ≈ {quote ? `$${quote.toValueUSD} (${formatToman(Number(quote.toValueUSD) * 66000)})` : '$0.00'}
          </div>
        </div>

        {/* Rate & Route Information */}
        {quote && (
          <div className="mt-3 p-3 rounded-xl bg-dark-surface/40 border border-white/[0.04] text-[11px] space-y-1.5 text-zinc-400">
            <div className="flex justify-between items-center">
              <span>نرخ لحظه‌ای:</span>
              <span className="font-mono text-zinc-200" dir="ltr">
                1 {fromToken?.symbol} = {quote.rate} {toToken?.symbol}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>مسیر نقدینگی:</span>
              <span className="text-emerald-400 font-semibold">{quote.protocol}</span>
            </div>
            <div className="flex justify-between items-center">
              <span>حداقل دریافتی:</span>
              <span className="font-mono text-zinc-300" dir="ltr">
                {quote.minReceived} {toToken?.symbol}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>کارمزد تخمینی شبکه:</span>
              <span className="text-zinc-300 font-mono" dir="ltr">{quote.gasFee.fee} ({quote.gasFee.usd})</span>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="mt-4">
          <button
            type="button"
            disabled={isButtonDisabled}
            onClick={handlePerformSwap}
            className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-150 flex items-center justify-center gap-2 ${
              !isConnected
                ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-sm'
                : isInsufficientBalance
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/[0.05]'
                : !fromAmount || numFromAmount <= 0
                ? 'bg-dark-surface border border-white/[0.06] text-zinc-500 cursor-not-allowed'
                : 'bg-emerald-500 hover:bg-emerald-400 text-black active:scale-[0.98]'
            }`}
          >
            {isSwapping ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                <span>در حال ارسال تراکنش…</span>
              </>
            ) : (
              <span>{getButtonText()}</span>
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
        getTokenBalance={getTokenBalance}
      />

      {/* Swap Success Modal */}
      {swapResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm bg-dark-card border border-white/[0.1] rounded-2xl p-5 text-center space-y-3.5 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 size={28} />
            </div>

            <div>
              <h3 className="text-base font-bold text-white">تراکنش با موفقیت انجام شد</h3>
              <p className="text-xs text-zinc-400 mt-0.5">دارایی به کیف‌پول شما واریز گردید.</p>
            </div>

            <div className="p-3 bg-dark-surface rounded-xl border border-white/[0.06] text-xs space-y-1 text-right font-mono" dir="ltr">
              <div className="text-zinc-400 flex justify-between">
                <span className="font-sans">سواپ:</span>
                <span className="text-white font-bold">{swapResult.fromAmount} {swapResult.fromToken} ➔ {swapResult.toAmount} {swapResult.toToken}</span>
              </div>
              <div className="text-zinc-400 flex justify-between">
                <span className="font-sans">هش تراکنش:</span>
                <span className="text-emerald-400 truncate max-w-[160px]">{swapResult.txHash}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <a
                href={swapResult.explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 px-3 rounded-xl bg-dark-surface hover:bg-dark-hover border border-white/[0.08] text-xs font-bold text-zinc-300 flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>اکسپلورر</span>
                <ExternalLink size={12} />
              </a>
              <button
                type="button"
                onClick={() => {
                  setSwapResult(null);
                  setFromAmount('');
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-emerald-500 text-black text-xs font-bold hover:bg-emerald-400 transition-colors"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
