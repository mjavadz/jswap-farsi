// Cloudflare Pages Function: /api/quote
// Secure Proxy for Solana Jupiter Aggregator API

const SECURITY_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY'
};

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: SECURITY_HEADERS
  });
}

export async function onRequestGet(context) {
  const { searchParams } = new URL(context.request.url);
  const inputMint = searchParams.get('inputMint')?.trim();
  const outputMint = searchParams.get('outputMint')?.trim();
  const amount = searchParams.get('amount')?.trim();
  const slippageBps = searchParams.get('slippageBps')?.trim() || '50';

  // Strict parameter validation
  if (!inputMint || !outputMint || !amount) {
    return new Response(JSON.stringify({ error: 'Missing required parameters (inputMint, outputMint, amount)' }), {
      status: 400,
      headers: SECURITY_HEADERS
    });
  }

  // Base58 regex or native token keyword
  const base58Regex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
  if (!base58Regex.test(inputMint) || !base58Regex.test(outputMint)) {
    return new Response(JSON.stringify({ error: 'Invalid mint format' }), {
      status: 400,
      headers: SECURITY_HEADERS
    });
  }

  // Positive integer check for amount and slippage
  if (!/^\d+$/.test(amount) || BigInt(amount) <= 0n) {
    return new Response(JSON.stringify({ error: 'Amount must be a positive integer' }), {
      status: 400,
      headers: SECURITY_HEADERS
    });
  }

  const numSlippage = Number(slippageBps);
  if (!Number.isInteger(numSlippage) || numSlippage < 1 || numSlippage > 5000) {
    return new Response(JSON.stringify({ error: 'Slippage must be between 1 and 5000 bps' }), {
      status: 400,
      headers: SECURITY_HEADERS
    });
  }

  const jupUrl = `https://quote-api.jup.ag/v6/quote?inputMint=${encodeURIComponent(inputMint)}&outputMint=${encodeURIComponent(outputMint)}&amount=${encodeURIComponent(amount)}&slippageBps=${numSlippage}`;

  try {
    const res = await fetch(jupUrl, {
      headers: { 'Accept': 'application/json' },
      cf: { cacheTtl: 10, cacheEverything: true },
      signal: AbortSignal.timeout(4500)
    });

    if (!res.ok) {
      throw new Error(`Jupiter quote failed with status ${res.status}`);
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: {
        ...SECURITY_HEADERS,
        'Cache-Control': 'public, max-age=10'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || 'Routing quote failed' }), {
      status: 502,
      headers: SECURITY_HEADERS
    });
  }
}
