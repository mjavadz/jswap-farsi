// TON (The Open Network) Provider & Balance Adapter

export async function connectTONWallet() {
  if (typeof window === 'undefined') {
    throw new Error('مرورگر در دسترس نیست.');
  }

  // Check for tonkeeper or injected TonConnect providers
  if (window.tonkeeper?.tonconnect || window.ton?.isTonkeeper) {
    try {
      const accounts = await (window.tonkeeper?.tonconnect || window.ton).send('ton_requestAccounts');
      if (accounts?.[0]) return accounts[0];
    } catch {
      // Fall through to manual/standard prompt
    }
  }

  // If no injected provider, suggest Tonkeeper installation or deep link
  throw new Error('افزونه Tonkeeper یا کیف‌پول سازگار با TON در مرورگر شناسایی نشد. لطفاً از طریق اپلیکیشن یا افزونه وارد شوید.');
}

export async function fetchTONBalance(address) {
  if (!address) return '0.0000';

  const endpoints = [
    `https://toncenter.com/api/v2/getAddressBalance?address=${encodeURIComponent(address)}`
  ];

  for (const url of endpoints) {
    try {
      const resp = await fetch(url, { signal: AbortSignal.timeout(4000) });
      const data = await resp.json();
      if (data?.ok && data?.result) {
        const nano = BigInt(data.result);
        return (Number(nano) / 1e9).toFixed(4);
      }
    } catch {
      continue;
    }
  }

  return '0.0000';
}
