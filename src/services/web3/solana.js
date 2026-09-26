// Solana Provider & Balance Adapter

export async function connectSolanaWallet() {
  if (typeof window === 'undefined') {
    throw new Error('محیط مرورگر در دسترس نیست.');
  }

  const provider = window.phantom?.solana || window.solflare || window.solana;
  if (!provider) {
    throw new Error('کیف‌پول فانتوم (Phantom) یا سولفلر (Solflare) در مرورگر شما نصب نیست.');
  }

  try {
    const resp = await provider.connect();
    const pubkey = resp.publicKey ? resp.publicKey.toString() : provider.publicKey?.toString();
    if (!pubkey) throw new Error('کلید عمومی دریافت نشد.');
    return pubkey;
  } catch (err) {
    if (err.code === 4001) {
      throw new Error('درخواست اتصال توسط کاربر لغو شد.');
    }
    throw new Error(err.message || 'خطا در اتصال به کیف‌پول سولانا');
  }
}

export async function fetchSolanaBalance(address, customRpcs) {
  if (!address) return '0.0000';

  const rpcs = customRpcs || [
    'https://api.mainnet-beta.solana.com',
    'https://solana-rpc.publicnode.com'
  ];

  for (const rpc of rpcs) {
    try {
      const resp = await fetch(rpc, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'getBalance',
          params: [address]
        }),
        signal: AbortSignal.timeout(4000)
      });
      const data = await resp.json();
      if (typeof data?.result?.value === 'number') {
        return (data.result.value / 1e9).toFixed(4);
      }
    } catch {
      continue;
    }
  }

  return '0.0000';
}
