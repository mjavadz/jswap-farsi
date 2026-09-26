// EIP-1193 EVM Web3 Connector & Balance Service

export async function connectEVMWallet() {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('کیف‌پول EVM (مانند متامسک، ربی یا تراست‌ولت) در مرورگر شما شناسایی نشد.');
  }

  try {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });

    if (!accounts || accounts.length === 0) {
      throw new Error('هیچ حسابی توسط کاربر انتخاب نشد.');
    }

    return accounts[0];
  } catch (err) {
    if (err.code === 4001) {
      throw new Error('درخواست اتصال توسط کاربر لغو شد.');
    }
    throw new Error(err.message || 'خطا در اتصال به کیف‌پول EVM');
  }
}

export async function switchEVMNetwork(chainConfig) {
  if (typeof window === 'undefined' || !window.ethereum || !chainConfig?.chainIdHex) {
    return false;
  }

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: chainConfig.chainIdHex }]
    });
    return true;
  } catch (switchError) {
    // Error code 4902: Unrecognized chain, needs to be added first
    if (switchError.code === 4902 || switchError.data?.originalError?.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: chainConfig.chainIdHex,
              chainName: chainConfig.englishName || chainConfig.name,
              nativeCurrency: {
                name: chainConfig.nativeSymbol,
                symbol: chainConfig.nativeSymbol,
                decimals: chainConfig.decimals || 18
              },
              rpcUrls: chainConfig.rpcUrls || [],
              blockExplorerUrls: chainConfig.blockExplorer ? [chainConfig.blockExplorer] : []
            }
          ]
        });
        return true;
      } catch (addError) {
        console.warn('Failed to add EVM chain:', addError);
        return false;
      }
    }
    console.warn('Failed to switch EVM chain:', switchError);
    return false;
  }
}

export async function fetchEVMBalance(rpcUrls, address) {
  if (!address) return '0.0000';

  // 1. Try injected provider first if available and active
  if (typeof window !== 'undefined' && window.ethereum) {
    try {
      const hex = await window.ethereum.request({
        method: 'eth_getBalance',
        params: [address, 'latest']
      });
      if (hex) {
        const wei = BigInt(hex);
        const eth = Number(wei) / 1e18;
        return eth.toFixed(4);
      }
    } catch {
      // Fallback to public RPC endpoints below
    }
  }

  // 2. Query fallback public RPCs
  const urls = Array.isArray(rpcUrls) ? rpcUrls : ['https://eth.llamarpc.com'];
  for (const url of urls) {
    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'eth_getBalance',
          params: [address, 'latest']
        }),
        signal: AbortSignal.timeout(4000)
      });
      const data = await resp.json();
      if (data?.result) {
        const wei = BigInt(data.result);
        const eth = Number(wei) / 1e18;
        return eth.toFixed(4);
      }
    } catch {
      continue;
    }
  }

  return '0.0000';
}
