// Supported Multi-Chain Networks and Pre-verified Clean Token Lists

export const SUPPORTED_CHAINS = [
  { 
    id: 'ton', 
    name: 'شبکه تون (TON)', 
    nativeSymbol: 'TON', 
    badge: 'کارمزد ناچیز تلگرام',
    color: '#0088CC' 
  },
  { 
    id: 'solana', 
    name: 'سولانا (Solana)', 
    nativeSymbol: 'SOL', 
    badge: 'پرسرعت‌ترین شبکه',
    color: '#9945FF' 
  },
  { 
    id: 'ethereum', 
    name: 'اتریوم (Ethereum EVM)', 
    nativeSymbol: 'ETH', 
    badge: 'بزرگترین نقدینگی دیفای',
    color: '#627EEA' 
  },
  { 
    id: 'tron', 
    name: 'ترون (TRON TRC-20)', 
    nativeSymbol: 'TRX', 
    badge: 'استاندارد انتقال تتر',
    color: '#EF0027' 
  },
  { 
    id: 'bsc', 
    name: 'بایننس چین (BNB Smart Chain)', 
    nativeSymbol: 'BNB', 
    badge: 'شبکه ارزان BEP-20',
    color: '#F3BA2F' 
  },
  { 
    id: 'arbitrum', 
    name: 'آربیتروم (Arbitrum One)', 
    nativeSymbol: 'ETH', 
    badge: 'لایه ۲ با کارمزد پایین',
    color: '#28A0F0' 
  },
  { 
    id: 'polygon', 
    name: 'پالیگان (Polygon PoS)', 
    nativeSymbol: 'POL', 
    badge: 'مقیاس‌پذیر و سریع',
    color: '#8247E5' 
  },
];

export const TOKENS = {
  ton: [
    {
      symbol: 'TON',
      name: 'Toncoin',
      decimals: 9,
      address: 'native',
      priceUSD: 1.60,
      icon: 'ton',
      isNative: true,
      balance: '0.00'
    },
    {
      symbol: 'USDT',
      name: 'Tether USD (TON)',
      decimals: 6,
      address: 'EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs',
      priceUSD: 1.00,
      icon: 'usdt',
      isNative: false,
      balance: '0.00'
    },
    {
      symbol: 'STON',
      name: 'STON.fi Token',
      decimals: 9,
      address: 'EQA2kCVNwVsilYfTqRIdbmBmOC05w4aabG6TrqqJrqO26OHt',
      priceUSD: 3.85,
      icon: 'ston',
      isNative: false,
      balance: '0.00'
    }
  ],

  solana: [
    {
      symbol: 'SOL',
      name: 'Solana',
      decimals: 9,
      address: 'native',
      priceUSD: 117.10,
      icon: 'sol',
      isNative: true,
      balance: '0.00'
    },
    {
      symbol: 'USDT',
      name: 'Tether USD (SPL)',
      decimals: 6,
      address: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
      priceUSD: 1.00,
      icon: 'usdt',
      isNative: false,
      balance: '0.00'
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      priceUSD: 1.00,
      icon: 'usdc',
      isNative: false,
      balance: '0.00'
    },
    {
      symbol: 'JUP',
      name: 'Jupiter',
      decimals: 6,
      address: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
      priceUSD: 0.88,
      icon: 'jup',
      isNative: false,
      balance: '0.00'
    },
    {
      symbol: 'RAY',
      name: 'Raydium',
      decimals: 6,
      address: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
      priceUSD: 2.15,
      icon: 'ray',
      isNative: false,
      balance: '0.00'
    }
  ],

  ethereum: [
    {
      symbol: 'ETH',
      name: 'Ethereum',
      decimals: 18,
      address: 'native',
      priceUSD: 2692.00,
      icon: 'eth',
      isNative: true,
      balance: '0.00'
    },
    {
      symbol: 'USDT',
      name: 'Tether USD (ERC-20)',
      decimals: 6,
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      priceUSD: 1.00,
      icon: 'usdt',
      isNative: false,
      balance: '0.00'
    },
    {
      symbol: 'USDC',
      name: 'USD Coin (ERC-20)',
      decimals: 6,
      address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      priceUSD: 1.00,
      icon: 'usdc',
      isNative: false,
      balance: '0.00'
    },
    {
      symbol: 'WBTC',
      name: 'Wrapped Bitcoin',
      decimals: 8,
      address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
      priceUSD: 64500.00,
      icon: 'wbtc',
      isNative: false,
      balance: '0.00'
    },
    {
      symbol: 'UNI',
      name: 'Uniswap',
      decimals: 18,
      address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
      priceUSD: 7.20,
      icon: 'uni',
      isNative: false,
      balance: '0.00'
    }
  ],

  tron: [
    {
      symbol: 'TRX',
      name: 'TRON',
      decimals: 6,
      address: 'native',
      priceUSD: 0.34,
      icon: 'trx',
      isNative: true,
      balance: '0.00'
    },
    {
      symbol: 'USDT',
      name: 'Tether USD (TRC-20)',
      decimals: 6,
      address: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
      priceUSD: 1.00,
      icon: 'usdt',
      isNative: false,
      balance: '0.00'
    },
    {
      symbol: 'BTT',
      name: 'BitTorrent (TRC-20)',
      decimals: 18,
      address: 'TAFjAVXVtbILFSSu36DmKn5eSJaqxGqtV6',
      priceUSD: 0.00000085,
      icon: 'btt',
      isNative: false,
      balance: '0.00'
    },
    {
      symbol: 'SUN',
      name: 'Sun Token',
      decimals: 18,
      address: 'TSSMHYeV2uE9qYH95DqyoCuNCzEL1NvU3S',
      priceUSD: 0.024,
      icon: 'sun',
      isNative: false,
      balance: '0.00'
    }
  ],

  bsc: [
    {
      symbol: 'BNB',
      name: 'BNB (BEP-20)',
      decimals: 18,
      address: 'native',
      priceUSD: 580.00,
      icon: 'bnb',
      isNative: true,
      balance: '0.00'
    },
    {
      symbol: 'USDT',
      name: 'Tether USD (BEP-20)',
      decimals: 18,
      address: '0x55d398326f99059fF775485246999027B3197955',
      priceUSD: 1.00,
      icon: 'usdt',
      isNative: false,
      balance: '0.00'
    }
  ],

  arbitrum: [
    {
      symbol: 'ETH',
      name: 'Ethereum (Arbitrum One)',
      decimals: 18,
      address: 'native',
      priceUSD: 2692.00,
      icon: 'eth',
      isNative: true,
      balance: '0.00'
    },
    {
      symbol: 'ARB',
      name: 'Arbitrum Token',
      decimals: 18,
      address: '0x912CE59144191C1204E64559FE8253a0e49E6548',
      priceUSD: 0.58,
      icon: 'arb',
      isNative: false,
      balance: '0.00'
    },
    {
      symbol: 'USDT',
      name: 'Tether USD (Arbitrum)',
      decimals: 6,
      address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
      priceUSD: 1.00,
      icon: 'usdt',
      isNative: false,
      balance: '0.00'
    }
  ],

  polygon: [
    {
      symbol: 'POL',
      name: 'Polygon Ecosystem Token',
      decimals: 18,
      address: 'native',
      priceUSD: 0.42,
      icon: 'pol',
      isNative: true,
      balance: '0.00'
    },
    {
      symbol: 'USDT',
      name: 'Tether USD (Polygon)',
      decimals: 6,
      address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
      priceUSD: 1.00,
      icon: 'usdt',
      isNative: false,
      balance: '0.00'
    }
  ]
};
