import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchLivePrices } from '../services/priceService';

const WalletContext = createContext(null);

const STORAGE_KEY_CHAIN = 'jswap_active_chain';
const STORAGE_KEY_WALLETS = 'jswap_connected_wallets';

const DEMO_ADDRESSES = {
  ton: 'EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N',
  solana: '7XwP6fC9dGkPZ91e2K5yBqJ8fG9m82La9Dk4eM5b6P81',
  ethereum: '0x71C8A6929944fcA312521C78D82A5239f88c5E91',
  tron: 'TMuA6YqfCeX8EhbfYg5y7SNNGLqxUX8e89'
};

export function WalletProvider({ children }) {
  const [activeChain, setActiveChain] = useState(() => {
    return localStorage.getItem(STORAGE_KEY_CHAIN) || 'ton';
  });

  const [connectedWallets, setConnectedWallets] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_WALLETS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [walletBalances, setWalletBalances] = useState({});
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectError, setConnectError] = useState(null);

  // Sync chain & wallets to storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CHAIN, activeChain);
  }, [activeChain]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_WALLETS, JSON.stringify(connectedWallets));
  }, [connectedWallets]);

  // Initial and periodic price fetch
  useEffect(() => {
    fetchLivePrices();
    const interval = setInterval(fetchLivePrices, 25000);
    return () => clearInterval(interval);
  }, []);

  // Fetch on-chain balances for connected wallet
  const fetchAddressBalance = useCallback(async (chain, address) => {
    if (!address) {
      setWalletBalances(prev => ({ ...prev, [chain]: {} }));
      return;
    }

    try {
      const bMap = {};
      if (chain === 'ethereum' && window.ethereum) {
        const hex = await window.ethereum.request({ method: 'eth_getBalance', params: [address, 'latest'] });
        const eth = (parseInt(hex, 16) / 1e18).toFixed(4);
        bMap['ETH'] = eth;
      } else if (chain === 'solana') {
        const resp = await fetch('https://api.mainnet-beta.solana.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'getBalance', params: [address] })
        });
        const d = await resp.json();
        const sol = ((d?.result?.value || 0) / 1e9).toFixed(4);
        bMap['SOL'] = sol;
      } else if (chain === 'ton') {
        const resp = await fetch(`https://toncenter.com/api/v2/getAddressBalance?address=${address}`);
        const d = await resp.json();
        const tons = (parseInt(d?.result || '0', 10) / 1e9).toFixed(4);
        bMap['TON'] = tons;
      } else if (chain === 'tron' && window.tronWeb?.trx) {
        const sun = await window.tronWeb.trx.getBalance(address);
        bMap['TRX'] = (sun / 1e6).toFixed(2);
      }

      setWalletBalances(prev => ({ ...prev, [chain]: bMap }));
    } catch (e) {
      console.warn('Balance query fallback:', e);
    }
  }, []);

  // Trigger balance fetch when active chain or wallet changes
  useEffect(() => {
    const cur = connectedWallets[activeChain];
    if (cur?.address) {
      fetchAddressBalance(activeChain, cur.address);
    }
  }, [activeChain, connectedWallets, fetchAddressBalance]);

  // Connect handler
  const connectWallet = useCallback(async (chain, walletName) => {
    setIsConnecting(true);
    setConnectError(null);

    try {
      let detectedAddress = null;

      if (chain === 'ethereum' && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          if (accounts?.[0]) detectedAddress = accounts[0];
        } catch (e) {
          console.warn('EVM provider rejected', e);
        }
      } else if (chain === 'solana' && (window.solana?.isPhantom || window.solflare)) {
        try {
          const provider = window.phantom?.solana || window.solana;
          const resp = await provider.connect();
          detectedAddress = resp.publicKey.toString();
        } catch (e) {
          console.warn('Solana provider rejected', e);
        }
      } else if (chain === 'tron' && window.tronWeb?.defaultAddress?.base58) {
        detectedAddress = window.tronWeb.defaultAddress.base58;
      }

      const finalAddress = detectedAddress || DEMO_ADDRESSES[chain] || '0x71C8A6929944fcA312521C78D82A5239f88c5E91';

      setConnectedWallets(prev => ({
        ...prev,
        [chain]: {
          address: finalAddress,
          walletName: walletName || 'کیف پول متصل',
          connectedAt: Date.now()
        }
      }));

      setActiveChain(chain);
      fetchAddressBalance(chain, finalAddress);
      return finalAddress;
    } catch (err) {
      setConnectError(err.message || 'خطا در اتصال به کیف پول');
      throw err;
    } finally {
      setIsConnecting(false);
    }
  }, [fetchAddressBalance]);

  // Disconnect handler
  const disconnectWallet = useCallback((chain) => {
    setConnectedWallets(prev => {
      const copy = { ...prev };
      delete copy[chain];
      return copy;
    });
    setWalletBalances(prev => ({ ...prev, [chain]: {} }));
  }, []);

  const activeWallet = connectedWallets[activeChain] || null;

  const getTokenBalance = useCallback((symbol) => {
    if (!activeWallet?.address) return '0.00';
    const chainBals = walletBalances[activeChain] || {};
    return chainBals[symbol] || '0.00';
  }, [activeWallet, walletBalances, activeChain]);

  const value = {
    activeChain,
    setActiveChain,
    connectedWallets,
    activeWallet,
    walletAddress: activeWallet?.address || null,
    isConnected: !!activeWallet?.address,
    isConnecting,
    connectError,
    connectWallet,
    disconnectWallet,
    getTokenBalance,
    refetchBalances: () => activeWallet?.address && fetchAddressBalance(activeChain, activeWallet.address)
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) throw new Error('useWallet must be used within a WalletProvider');
  return context;
}
