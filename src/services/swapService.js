// Multi-chain DEX quote calculation and routing service

const PROTOCOL_NAMES = {
  ton: 'STON.fi & DeDust Aggregator',
  solana: 'Jupiter Routing v6',
  ethereum: 'Uniswap v3 / 1inch Router',
  tron: 'SunSwap v2.0 DEX',
};

const GAS_FEES = {
  ton: { fee: '0.005 TON', usd: '$0.02' },
  solana: { fee: '0.00005 SOL', usd: '$0.008' },
  ethereum: { fee: '0.0008 ETH', usd: '$2.20' },
  tron: { fee: '3.5 TRX', usd: '$0.58' },
};

export function getSwapQuote({ chain, fromToken, toToken, fromAmount, slippage = 0.5 }) {
  if (!fromToken || !toToken || !fromAmount || isNaN(Number(fromAmount)) || Number(fromAmount) <= 0) {
    return null;
  }

  const inAmount = Number(fromAmount);
  const fromValueUSD = inAmount * (fromToken.priceUSD || 1);
  const toPriceUSD = toToken.priceUSD || 1;
  const rawToAmount = fromValueUSD / toPriceUSD;

  // Tiny realistic market impact (0.02% - 0.15%)
  const priceImpact = Math.min(1.2, 0.04 + (inAmount > 1000 ? 0.08 : 0.01));
  const effectiveToAmount = rawToAmount * (1 - priceImpact / 100);

  const slippageFactor = Number(slippage) / 100;
  const minReceived = effectiveToAmount * (1 - slippageFactor);

  const rate = (fromToken.priceUSD || 1) / toPriceUSD;
  const inverseRate = toPriceUSD / (fromToken.priceUSD || 1);

  return {
    fromAmount: inAmount,
    toAmount: Number(effectiveToAmount.toFixed(toToken.decimals > 6 ? 6 : toToken.decimals)),
    minReceived: Number(minReceived.toFixed(toToken.decimals > 6 ? 6 : toToken.decimals)),
    rate: Number(rate.toFixed(6)),
    inverseRate: Number(inverseRate.toFixed(6)),
    priceImpact: `${priceImpact.toFixed(2)}%`,
    protocol: PROTOCOL_NAMES[chain] || 'DEX Auto-Router',
    gasFee: GAS_FEES[chain] || { fee: '~', usd: '~' },
    route: [fromToken.symbol, `${PROTOCOL_NAMES[chain]}`, toToken.symbol],
    fromValueUSD: fromValueUSD.toFixed(2),
    toValueUSD: (effectiveToAmount * toPriceUSD).toFixed(2),
  };
}

export async function executeSwap({ chain, fromToken, toToken, quote, userAddress }) {
  // Simulate network broadcast with realistic transaction delay
  await new Promise(resolve => setTimeout(resolve, 2200));

  // Generate explorer transaction hash matching chain conventions
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
