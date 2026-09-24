// Cloudflare Pages Function: /api/prices
// Proxies live crypto prices with edge caching & CORS headers

export async function onRequestGet(context) {
  const cacheKey = 'https://api.coingecko.com/api/v3/simple/price?ids=the-open-network,solana,ethereum,tron,tether&vs_currencies=usd';

  try {
    const response = await fetch(cacheKey, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'JSWAP-Farsi/1.0 (Cloudflare Edge)'
      },
      cf: {
        cacheTtl: 30, // Cache for 30s at the edge
        cacheEverything: true
      }
    });

    if (!response.ok) {
      throw new Error(`Upstream error: ${response.status}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify({
      success: true,
      timestamp: Date.now(),
      prices: {
        ton: data['the-open-network']?.usd || 5.40,
        solana: data['solana']?.usd || 152.80,
        ethereum: data['ethereum']?.usd || 2780.00,
        tron: data['tron']?.usd || 0.165,
        usdt: 1.00
      }
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=30'
      }
    });
  } catch (error) {
    // Fallback safe values
    return new Response(JSON.stringify({
      success: true,
      fallback: true,
      timestamp: Date.now(),
      prices: {
        ton: 5.40,
        solana: 152.80,
        ethereum: 2780.00,
        tron: 0.165,
        usdt: 1.00
      }
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}
