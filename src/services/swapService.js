import { getTokenPrice } from './priceService';

const PROTOCOL_NAMES = {
  ton: 'STON.fi & DeDust Aggregator',
  solana: 'Jupiter Routing v6',
  ethereum: 'Uniswap v3 / 1inch Router',
  tron: 'SunSwap v2.0 DEX',
};

const GAS_FEES = {
  ton: { fee: '0.005 TON', usd: '$0.008' },
  solana: { fee: '0.00005 SOL', usd: '$0.006' },
  ethereum: { fee: '0.0008 ETH', usd: '$2.15' },
  tron: { fee: '3.5 TRX', usd: '$0.52' },
};

export function getSwapQuote({ chain, fromToken, toToken, fromAmount, slippage = 0.5 }) {
  if (!fromToken || !toToken || !fromAmount || isNaN(Number(fromAmount)) || Number(fromAmount) <= 0) {
    return null;
  }

  const inAmount = Number(fromAmount);
  const fromPrice = getTokenPrice(fromToken.symbol);
  const toPrice = getTokenPrice(toToken.symbol);

  if (toPrice <= 0) return null;

  const fromValueUSD = inAmount * fromPrice;
  const rawToAmount = fromValueUSD / toPrice;

  // Real-time market exchange rate
  const rate = fromPrice / toPrice;
  const inverseRate = toPrice / fromPrice;

  // Slippage factor
  const slippageFactor = (Number(slippage) || 0.5) / 100;
  const minReceived = rawToAmount * (1 - slippageFactor);

  const decimals = Math.min(toToken.decimals || 6, 6);

  return {
    fromAmount: inAmount,
    toAmount: Number(rawToAmount.toFixed(decimals)),
    minReceived: Number(minReceived.toFixed(decimals)),
    rate: Number(rate.toFixed(rate < 0.001 ? 8 : 6)),
    inverseRate: Number(inverseRate.toFixed(inverseRate < 0.001 ? 8 : 6)),
    fromPrice,
    toPrice,
    protocol: PROTOCOL_NAMES[chain] || 'DEX Auto-Router',
    gasFee: GAS_FEES[chain] || { fee: '~', usd: '~' },
    route: [fromToken.symbol, `${PROTOCOL_NAMES[chain]}`, toToken.symbol],
    fromValueUSD: fromValueUSD.toFixed(2),
    toValueUSD: fromValueUSD.toFixed(2),
  };
}

export async function executeSwap({ chain, fromToken, toToken, quote, userAddress }) {
  // Simulate network broadcast with realistic transaction delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  let txHash = '';
  let explorerUrl = '';

  if (chain === 'ton') {
    txHash = binToHex(32);
    explorerUrl = `https://tonviewer.com/transaction/${txHash}`;
  } else if (chain === 'solana') {
    txHash = base58Random(88);
    explorerUrl = `https://solscan.io/tx/${txHash}`;
  } else if (chain === 'ethereum') {
    txHash = '0x' + binToHex(32);
    explorerUrl = `https://etherscan.io/tx/${txHash}`;
  } else if (chain === 'tron') {
    txHash = binToHex(32);
    explorerUrl = `https://tronscan.org/#/transaction/${txHash}`;
  }

  return {
    success: true,
    txHash,
    explorerUrl,
    timestamp: Date.now(),
    fromToken: fromToken.symbol,
    toToken: toToken.symbol,
    fromAmount: quote.fromAmount,
    toAmount: quote.toAmount,
    chain
  };
}

function binToHex(len) {
  const chars = '0123456789abcdef';
  let out = '';
  for (let i = 0; i < len * 2; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

function base58Random(len) {
  const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  let out = '';
  for (let i = 0; i < len; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}
