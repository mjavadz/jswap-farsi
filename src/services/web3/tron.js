// TRON (TRC-20) Provider & Balance Adapter

export async function connectTronWallet() {
  if (typeof window === 'undefined') {
    throw new Error('مرورگر در دسترس نیست.');
  }

  if (!window.tronLink && !window.tronWeb) {
    throw new Error('افزونه TronLink در مرورگر شما نصب نیست.');
  }

  try {
    // Request account access via TronLink
    if (window.tronLink?.request) {
      await window.tronLink.request({ method: 'tron_requestAccounts' });
    }

    const addr = window.tronWeb?.defaultAddress?.base58;
    if (!addr) {
      throw new Error('آدرس ترون یافت نشد. لطفاً قفل TronLink را باز کنید.');
    }
    return addr;
  } catch (err) {
    if (err.code === 4001) {
      throw new Error('درخواست اتصال ترون توسط کاربر لغو شد.');
    }
    throw new Error(err.message || 'خطا در اتصال به TronLink');
  }
}

export async function fetchTronBalance(address) {
  if (!address) return '0.00';

  if (typeof window !== 'undefined' && window.tronWeb?.trx) {
    try {
      const sun = await window.tronWeb.trx.getBalance(address);
      return (sun / 1e6).toFixed(2);
    } catch {
      // Continue to public api
    }
  }

  try {
    const resp = await fetch(`https://api.trongrid.io/v1/accounts/${encodeURIComponent(address)}`, {
      signal: AbortSignal.timeout(4000)
    });
    const data = await resp.json();
    const balance = data?.data?.[0]?.balance || 0;
    return (balance / 1e6).toFixed(2);
  } catch {
    return '0.00';
  }
}
