# JSWAP Farsi — Multi-Chain Non-Custodial DEX & Direct Telegram Stars Desk

**Document Version:** 1.0.0  
**Date:** 2026-09-24  
**Project:** JSWAP Farsi (`jswap-farsi`)  
**Production Domain:** `https://javadnode.top`  
**Deployment Target:** Cloudflare Pages (SPA + Cloudflare Edge Functions)  
**Author:** Javad (`mjavadz`) & Hermes Agent  

---

## 1. Executive Summary & Product Vision

JSWAP Farsi is a modern, high-performance, non-custodial decentralized cryptocurrency swap aggregator and Telegram Stars trading desk specifically tailored for the Persian-speaking crypto and Telegram community. It addresses the fragmentation of Web3 wallets across disparate chains by uniting four key networks (**Ethereum / EVM**, **Solana**, **TRON**, and **The Open Network / TON**) under an intuitive Persian RTL interface, while offering a direct OTC exchange for Telegram Stars.

### Core Value Propositions:
1. **100% Non-Custodial Swap:** Users maintain complete custody of their private keys and assets; swaps execute directly via decentralized liquidity routers (Uniswap, Jupiter, SunSwap, STON.fi/DeDust).
2. **Direct Telegram Stars Trading Desk:** Instant buy and sell desk for Telegram Stars with crypto settlement (TON, USDT-TRC20, SOL, TRX) without KYC or credit card restrictions.
3. **Persian-First Luxury Web3 Experience:** Flawless RTL layout using Vazirmatn typography, responsive dark mode, real-time Toman/Dollar valuation, and zero clutter.
4. **Resilient Edge Architecture:** Hosted on Cloudflare Pages with edge serverless functions to proxy DEX APIs, bypassing Iranian regional censorship, Geo-IP restrictions, and browser CORS barriers.

---

## 2. Technical Architecture & Tech Stack

```
+-------------------------------------------------------------------------+
|                           User Client (Browser)                        |
|                                                                         |
|  [ React 19 + Vite ]  [ TailwindCSS + Lucide Icons ]  [ Vazirmatn RTL ] |
|                                                                         |
|  +--------------------+---------------------+------------------------+  |
|  | Multi-Chain Swap   | Telegram Stars Desk | Order & Tx Ledger      |  |
|  +--------------------+---------------------+------------------------+  |
|  | Web3 Providers:                                                   |  |
|  |   - EVM: Wagmi / viem (MetaMask, Rabby)                            |  |
|  |   - Solana: @solana/web3.js & Wallet Adapter (Phantom, Solflare)    |  |
|  |   - TRON: TronWeb / TronLink Adapter                               |  |
|  |   - TON: @tonconnect/ui-react (Tonkeeper, Telegram Wallet)          |  |
|  +--------------------+---------------------+------------------------+  |
+------------------------------------+------------------------------------+
                                     |
                                     | HTTPS (Edge Routing)
                                     v
+------------------------------------+------------------------------------+
|                   Cloudflare Pages & Edge Functions                     |
|                                                                         |
|  - Static Assets Hosting (CDN, Global Edge Caching)                    |
|  - Custom Domain: javadnode.top (Universal SSL / TLS 1.3)              |
|  - Functions Proxy:                                                     |
|      /api/dex/quote -> Proxies Jupiter v6, 1inch, DeDust, SunSwap       |
|      /api/prices     -> CoinGecko / Binance ticker feed                 |
|      /api/stars/*    -> Telegram Stars order rate & verification engine |
+-------------------------------------------------------------------------+
```

### Core Technologies:
- **Build & Framework:** Vite 6 / React 19 (ESModules, Tree-shaking, Fast Refresh).
- **Styling:** Tailwind CSS with customized dark metallic theme (`#0B0F17`, `#111827`, `#F59E0B`, `#10B981`) and full RTL support.
- **State & Storage:** React Context + `zustand` + LocalStorage / IndexedDB for local persistence.
- **APIs & Data Feeds:**
  - Solana: Jupiter Aggregator API v6 (`https://quote-api.jup.ag/v6`).
  - EVM: 0x Swap API / 1inch / Uniswap v3 subgraphs.
  - TON: STON.fi API / TonAPI (`https://tonapi.io`).
  - TRON: SunSwap SDK / Trongrid.
  - Price Feeds: CoinGecko API & Binance Ticker WebSocket.

---

## 3. Functional Requirements

### 3.1. Multi-Chain Non-Custodial Swap Module
- **Chain Selector:** Switch between Ethereum (ERC-20), Solana (SPL), TRON (TRC-20), and TON (Jettons) with one tap.
- **Token Directory:** Pre-loaded verified tokens list per chain (ETH, USDT, USDC, WBTC, SOL, JUP, RAY, TRX, TON, NOT, DOGS, HMSTR).
- **Custom Token Import:** Ability to paste any token contract / mint address and load metadata (symbol, decimals, balance).
- **Best Route Aggregation:** Real-time quote retrieval showing estimated output, slippage tolerance (0.1%, 0.5%, 1%, custom), minimum received, and estimated network gas fee.
- **Transaction Flow:**
  - Token approval (Approve / Permit2) when necessary on EVM.
  - Single-click Swap confirmation in the user's active wallet.
  - Live modal tracker showing Broadcast -> Pending Confirmation -> Success with explorer link.

### 3.2. Telegram Stars Trading Desk (OTC Option B)
- **Mode 1: Buy Stars (خرید استارز با کریپتو):**
  - Package Selector: 50, 100, 250, 500, 1,000, 2,500, 5,000, 10,000 Stars.
  - Telegram Username input with live validation (`@username`).
  - Currency selection for payment: TON, USDT (TRC-20), SOL, or TRX.
  - Live Toman & USD pricing with fair algorithmic discount vs official in-app rates.
  - Generated Invoice screen:
    - Unique Order Reference (e.g. `JS-STARS-89124`).
    - Dedicated receiving deposit address + QR Code.
    - 20-minute price lock countdown timer.
    - Automatic / Manual Transaction Hash submission for verification.
- **Mode 2: Sell Stars (فروش استارز به پلتفرم):**
  - Stars quantity input (minimum 100 Stars).
  - Payout destination address (TON or USDT TRC20).
  - Interactive transfer guide (link to bot / gift transfer).
  - Payout receipt confirmation with tracking status.
- **Live Order Status Tracker:**
  - Search any Order ID to view current status (`در انتظار واریز`, `تایید تراکنش`, `در حال انتقال استارز`, `تکمیل شده`).

### 3.3. Multi-Wallet Hub & Unified Header
- **Universal Connect Button:** Displays active chain and wallet status.
- **Account Drawer:** Shows wallet address (shortened with copy button), balances across all supported chains, and recent local transaction history.
- **Disconnect & Switch:** Seamless switching between multiple wallets without browser reload.

---

## 4. UI/UX Design Specifications
- **Theme:** Cyberpunk / Deep Obsidian dark palette with emerald accents (`#10B981`) and gold badges (`#F59E0B`).
- **Direction:** Native `dir="rtl"` with Persian labels, Persian digits conversion (`toPersianDigits`), and Toman currency formatting.
- **Mobile Responsive:** Fluid layout on 320px+ viewports with bottom navigation bar for handheld devices.

---

## 5. Security & Risk Mitigation
- **Strict Non-Custodial Rule:** Private keys, seed phrases, or wallet secrets are NEVER requested, handled, or stored.
- **CORS & Rate-Limiting Protection:** Edge functions in Cloudflare handle external API calls with request caching to prevent rate-limiting and IP bans.
- **Sanitized Inputs:** Strict regex validation on Telegram handles, crypto addresses, and transaction hashes.
