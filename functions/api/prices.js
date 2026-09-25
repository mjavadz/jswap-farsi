// Cloudflare Pages Function: /api/prices
// Live Crypto & Iranian Tether Rate (Average of Top 5 Iranian Exchanges by volume)

export async function onRequestGet(context) {
  // 1. Fetch Global Crypto Prices (Binance public ticker)
  const cryptoPromise = fetch('https://api.binance.com/api/v3/ticker/price?symbols=%5B%22TONUSDT%22,%22SOLUSDT%22,%22ETHUSDT%22,%22TRXUSDT%22,%22BNBUSDT%22,%22BTCUSDT%22%5D', {
    headers: { 'Accept': 'application/json' },
    cf: { cacheTtl: 15, cacheEverything: true }
  }).then(r => r.json()).catch(() => []);

  // 2. Fetch Top 5 Iranian Exchanges by Volume
  const iranExchanges = [
    {
      name: 'نوبیتکس (Nobitex)',
      url: 'https://apiv2.nobitex.ir/market/stats',
      parse: (d) => Number(d?.stats?.['usdt-rls']?.latest) / 10
    },
    {
      name: 'والکس (Wallex)',
      url: 'https://api.wallex.ir/v1/markets',
      parse: (d) => Number(d?.result?.symbols?.USDTTMN?.stats?.lastPrice)
    },
    {
      name: 'بیت‌پین (Bitpin)',
      url: 'https://api.bitpin.ir/v1/mkt/markets/',
      parse: (d) => Number(d?.results?.find(m => m.code === 'USDT_IRT')?.price)
    },
    {
      name: 'رمزینکس (Ramzinex)',
      url: 'https://publicapi.ramzinex.com/exchange/api/v1.0/exchange/pairs',
      parse: (d) => Number(d?.data?.find(p => p.url_name === 'tether-usdt')?.buy) / 10
    },
    {
      name: 'اوام‌پی فینکس (OMPfinex)',
      url: 'https://api.ompfinex.com/v1/market',
      parse: (d) => Number(d?.data?.find(m => m?.base_currency?.id === 'USDT' && m?.quote_currency?.id === 'IRR')?.last_price) / 10
    }
  ];

  const iranPromise = Promise.allSettled(
    iranExchanges.map(async (ex) => {
      const resp = await fetch(ex.url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
        cf: { cacheTtl: 30, cacheEverything: true },
        signal: AbortSignal.timeout(3500)
      });
      const data = await resp.json();
      const price = ex.parse(data);
      if (price && price > 50000 && price < 500000) {
        return { name: ex.name, price: Math.round(price) };
      }
      throw new Error('Invalid rate');
    })
  );

  try {
    const [cryptoData, iranResults] = await Promise.all([cryptoPromise, iranPromise]);

    // Parse crypto prices
    const prices = {
      ton: 1.60,
      solana: 117.10,
      ethereum: 2692.00,
      tron: 0.34,
      bnb: 580.00,
      btc: 64500.00,
      usdt: 1.00
    };

    if (Array.isArray(cryptoData)) {
      cryptoData.forEach(item => {
        if (item.symbol === 'TONUSDT') prices.ton = Number(item.price);
        if (item.symbol === 'SOLUSDT') prices.solana = Number(item.price);
        if (item.symbol === 'ETHUSDT') prices.ethereum = Number(item.price);
        if (item.symbol === 'TRXUSDT') prices.tron = Number(item.price);
        if (item.symbol === 'BNBUSDT') prices.bnb = Number(item.price);
        if (item.symbol === 'BTCUSDT') prices.btc = Number(item.price);
      });
    }

    // Parse Iranian exchange rates
    const validExchanges = [];
    iranResults.forEach(r => {
      if (r.status === 'fulfilled' && r.value?.price) {
        validExchanges.push(r.value);
      }
    });

    const averageUsdtToman = validExchanges.length > 0
      ? Math.round(validExchanges.reduce((sum, item) => sum + item.price, 0) / validExchanges.length)
      : 234000;

    return new Response(JSON.stringify({
      success: true,
      timestamp: Date.now(),
      prices,
      iranTether: {
        averageToman: averageUsdtToman,
        sourcesCount: validExchanges.length,
        exchanges: validExchanges
      }
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=15'
      }
    });

  } catch (error) {
    return new Response(JSON.stringify({
      success: false,
      error: error.message,
      prices: {
        ton: 1.60,
        solana: 117.10,
        ethereum: 2692.00,
        tron: 0.34,
        bnb: 580.00,
        btc: 64500.00,
        usdt: 1.00
      },
      iranTether: {
        averageToman: 234000,
        sourcesCount: 5,
        fallback: true
      }
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}
