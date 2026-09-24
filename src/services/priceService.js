// Live Multi-Chain Crypto Prices & Exchange Rate Feed

// Accurate baseline market prices (updated dynamically from live APIs)
let CACHED_PRICES = {
  ton: 1.60,
  solana: 117.10,
  ethereum: 2692.00,
  tron: 0.34,
  usdt: 1.00,
  usdc: 1.00,
  not: 0.0078,
  dogs: 0.00065,
  jup: 0.88,
  uni: 7.20,
  wbtc: 64500.00,
  btt: 0.00000085,
  sun: 0.024,
  ston: 3.85,
  ray: 2.15,
};

let lastFetchTime = 0;
const CACHE_DURATION = 30000; // 30 seconds cache

export async function fetchLivePrices() {
  const now = Date.now();
  if (now - lastFetchTime < CACHE_DURATION) {
    return CACHED_PRICES;
  }

  try {
    // 1. Fetch live prices from Binance public ticker API (fast, CORS-friendly)
    const binanceUrl = 'https://api.binance.com/api/v3/ticker/price?symbols=%5B%22TONUSDT%22,%22SOLUSDT%22,%22ETHUSDT%22,%22TRXUSDT%22,%22JUPUSDT%22,%22UNIUSDT%22,%22BTCUSDT%22%5D';
    const resp = await fetch(binanceUrl);
    if (resp.ok) {
      const data = await resp.json();
      data.forEach(item => {
        const p = parseFloat(item.price);
        if (!isNaN(p) && p > 0) {
          if (item.symbol === 'TONUSDT') CACHED_PRICES.ton = p;
          if (item.symbol === 'SOLUSDT') CACHED_PRICES.solana = p;
          if (item.symbol === 'ETHUSDT') CACHED_PRICES.ethereum = p;
          if (item.symbol === 'TRXUSDT') CACHED_PRICES.tron = p;
          if (item.symbol === 'JUPUSDT') CACHED_PRICES.jup = p;
          if (item.symbol === 'UNIUSDT') CACHED_PRICES.uni = p;
          if (item.symbol === 'BTCUSDT') CACHED_PRICES.wbtc = p;
        }
      });
      lastFetchTime = now;
      return CACHED_PRICES;
    }
  } catch (e) {
    // 2. Fallback to Cloudflare edge function /api/prices
    try {
      const cfResp = await fetch('/api/prices');
      if (cfResp.ok) {
        const cfData = await cfResp.json();
        if (cfData?.prices) {
          CACHED_PRICES = { ...CACHED_PRICES, ...cfData.prices };
          lastFetchTime = now;
          return CACHED_PRICES;
        }
      }
    } catch (cfErr) {
      console.warn('Using baseline cached prices:', cfErr);
    }
  }

  return CACHED_PRICES;
}

export function getCachedPrices() {
  return CACHED_PRICES;
}

export function getTokenPrice(symbol) {
  const sym = symbol?.toLowerCase();
  switch (sym) {
    case 'ton': return CACHED_PRICES.ton;
    case 'sol':
    case 'solana': return CACHED_PRICES.solana;
    case 'eth':
    case 'ethereum': return CACHED_PRICES.ethereum;
    case 'trx':
    case 'tron': return CACHED_PRICES.tron;
    case 'usdt': return CACHED_PRICES.usdt;
    case 'usdc': return CACHED_PRICES.usdc;
    case 'not': return CACHED_PRICES.not;
    case 'dogs': return CACHED_PRICES.dogs;
    case 'jup': return CACHED_PRICES.jup;
    case 'uni': return CACHED_PRICES.uni;
    case 'wbtc': return CACHED_PRICES.wbtc;
    case 'btt': return CACHED_PRICES.btt;
    case 'sun': return CACHED_PRICES.sun;
    case 'ston': return CACHED_PRICES.ston;
    case 'ray': return CACHED_PRICES.ray;
    default: return 1.0;
  }
}
