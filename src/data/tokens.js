// Pre-verified default tokens list for all 4 chains supported by JSWAP Farsi

export const SUPPORTED_CHAINS = [
  { id: 'ton', name: 'شبکه تون (TON)', nativeSymbol: 'TON', color: '#0088CC' },
  { id: 'solana', name: 'سولانا (Solana)', nativeSymbol: 'SOL', color: '#9945FF' },
  { id: 'ethereum', name: 'اتریوم (Ethereum)', nativeSymbol: 'ETH', color: '#627EEA' },
  { id: 'tron', name: 'ترون (TRON)', nativeSymbol: 'TRX', color: '#EF0027' },
];

export const TOKENS = {
  ton: [
    {
      symbol: 'TON',
      name: 'Toncoin',
      decimals: 9,
      address: 'native',
      priceUSD: 5.40,
      priceToman: 356400,
      icon: 'ton',
      isNative: true,
      balance: '12.4500'
    },
    {
      symbol: 'USDT',
      name: 'Tether USD (TON)',
      decimals: 6,
      address: 'EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs',
      priceUSD: 1.00,
      priceToman: 66000,
      icon: 'usdt',
      isNative: false,
      balance: '280.00'
    },
    {
      symbol: 'NOT',
      name: 'Notcoin',
      decimals: 9,
      address: 'EQAvlWFDxQRWejqQrqEcBtduWeqnhgcPgmjydJMo3XgFuNet',
      priceUSD: 0.0078,
      priceToman: 514,
      icon: 'not',
      isNative: false,
      balance: '45000'
    },
    {
      symbol: 'DOGS',
      name: 'DOGS Token',
      decimals: 9,
      address: 'EQCvxJy4eGOLyGcApbtNcVYGCd8AAURL3yPMAbptKitn7_2z',
      priceUSD: 0.00065,
      priceToman: 42.9,
      icon: 'dogs',
      isNative: false,
      balance: '120000'
    },
    {
      symbol: 'STON',
      name: 'STON.fi Token',
      decimals: 9,
      address: 'EQA2kCVNwVsilYfTqRIdbmBmOC05w4aabG6TrqqJrqO26OHt',
      priceUSD: 3.85,
      priceToman: 254100,
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
      priceUSD: 152.80,
      priceToman: 10084800,
      icon: 'sol',
      isNative: true,
      balance: '2.8450'
    },
    {
      symbol: 'USDT',
      name: 'Tether USD (SPL)',
      decimals: 6,
      address: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
      priceUSD: 1.00,
      priceToman: 66000,
      icon: 'usdt',
      isNative: false,
      balance: '550.00'
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      priceUSD: 1.00,
      priceToman: 66000,
      icon: 'usdc',
      isNative: false,
      balance: '120.00'
    },
    {
      symbol: 'JUP',
      name: 'Jupiter',
      decimals: 6,
      address: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
      priceUSD: 0.88,
      priceToman: 58080,
      icon: 'jup',
      isNative: false,
      balance: '350.00'
    },
    {
      symbol: 'RAY',
      name: 'Raydium',
      decimals: 6,
      address: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
      priceUSD: 2.15,
      priceToman: 141900,
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
      priceUSD: 2780.00,
      priceToman: 183480000,
      icon: 'eth',
      isNative: true,
      balance: '0.4500'
    },
    {
      symbol: 'USDT',
      name: 'Tether USD (ERC-20)',
      decimals: 6,
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      priceUSD: 1.00,
      priceToman: 66000,
      icon: 'usdt',
      isNative: false,
      balance: '750.00'
    },
    {
      symbol: 'USDC',
      name: 'USD Coin (ERC-20)',
      decimals: 6,
      address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
      priceUSD: 1.00,
      priceToman: 66000,
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
      priceToman: 4257000000,
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
      priceToman: 475200,
      icon: 'uni',
      isNative: false,
      balance: '25.00'
    }
  ],

  tron: [
    {
      symbol: 'TRX',
      name: 'TRON',
      decimals: 6,
      address: 'native',
      priceUSD: 0.165,
      priceToman: 10890,
      icon: 'trx',
      isNative: true,
      balance: '1420.00'
    },
    {
      symbol: 'USDT',
      name: 'Tether USD (TRC-20)',
      decimals: 6,
      address: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
      priceUSD: 1.00,
      priceToman: 66000,
      icon: 'usdt',
      isNative: false,
      balance: '400.00'
    },
    {
      symbol: 'BTT',
      name: 'BitTorrent (TRC-20)',
      decimals: 18,
      address: 'TAFjAVXVtbILFSSu36DmKn5eSJaqxGqtV6',
      priceUSD: 0.00000085,
      priceToman: 0.056,
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
      priceToman: 1584,
      icon: 'sun',
      isNative: false,
      balance: '0.00'
    }
  ]
};
