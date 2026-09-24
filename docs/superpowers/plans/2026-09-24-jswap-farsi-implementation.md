# JSWAP Farsi Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-grade Persian non-custodial multi-chain DEX aggregator (Ethereum, Solana, TRON, TON) and direct Telegram Stars OTC trading desk deployable to Cloudflare Pages for domain `javadnode.top`.

**Architecture:** A lightweight high-speed React 19 SPA powered by Vite and Tailwind CSS. The app features modular multi-chain adapters (TON Connect, Solana Adapter, Wagmi/EVM, TronWeb) and a standalone Telegram Stars desk with client-side order generation and status tracking. Edge serverless functions in Cloudflare (`/functions/api/*`) handle rate-limited quote proxying without CORS restrictions.

**Tech Stack:** React 19, Vite, Tailwind CSS, Lucide React / Custom SVG Icons, Vazirmatn font, TON Connect SDK, Solana Web3, Cloudflare Pages & Functions.

**Spec:** `docs/superpowers/specs/2026-09-24-jswap-farsi-design.md`

## Global Constraints
- Target Domain: `https://javadnode.top`
- Native RTL layout (`dir="rtl"`) with Persian typography and Persian numeral conversion
- 100% Non-custodial: zero private keys, passphrases, or user credentials handled by the platform
- Responsive for mobile (320px+) with bottom quick-navigation bar
- Zero build errors or external dependency vulnerabilities; standalone fallback mode for all chain aggregators

## Review Focus
1. Wallet connection failure or missing provider -> Graceful fallback with manual address entry / prompt to install wallet
2. Network timeout on remote price feeds -> Reliable fallback rates and cached price quotes
3. Malformed Telegram username for Stars purchase -> Strict regex validation and sanitization
4. Slippage tolerance out-of-bounds -> Warning badge and transaction safety limits
5. Order tracking non-existent ID -> Clean user-friendly 404 state with recent order history suggestions

---

### Task 1: Project Scaffolding & Build Configuration

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `tailwind.config.js`
- Create: `postcss.config.js`
- Create: `index.html`
- Create: `public/_redirects`

**Interfaces:**
- Produces: Base Vite + React + Tailwind build environment with Cloudflare SPA redirect routing.

- [ ] **Step 1: Write `package.json` with React 19, Vite, Tailwind CSS, and essential utilities**
- [ ] **Step 2: Configure `vite.config.js` and `tailwind.config.js` with dark theme palette and RTL extensions**
- [ ] **Step 3: Create `index.html` with Persian meta tags, Vazirmatn font import, and SEO headers**
- [ ] **Step 4: Create `public/_redirects` for Cloudflare Pages SPA client-side routing (`/* /index.html 200`)**
- [ ] **Step 5: Run `npm install` and verify build works (`npm run build`)**
- [ ] **Step 6: Commit changes: `feat: scaffold JSWAP Farsi project with Vite, Tailwind and Cloudflare config`**

---

### Task 2: Design System, Theme & Persian Typography Helpers

**Files:**
- Create: `src/index.css`
- Create: `src/utils/format.js`
- Create: `src/components/Icons.jsx`
- Create: `src/components/Header.jsx`
- Create: `src/components/Footer.jsx`

**Interfaces:**
- Consumes: Tailwind CSS base utilities
- Produces: `formatToman()`, `formatCrypto()`, `toPersianDigits()`, SVG vector crypto icons, top navigation bar and footer.

- [ ] **Step 1: Implement `src/utils/format.js` with Persian digit conversion, Toman formatting, and crypto precision**
- [ ] **Step 2: Implement `src/components/Icons.jsx` with high-resolution vector logos for ETH, SOL, TRX, TON, Stars, Wallet, ArrowDownUp, Check, Copy**
- [ ] **Step 3: Implement `src/index.css` with dark obsidian palette, glassmorphism card styles, and glowing accents**
- [ ] **Step 4: Implement `src/components/Header.jsx` with logo, active chain badge, wallet connection trigger, and navigation links**
- [ ] **Step 5: Implement `src/components/Footer.jsx` with legal disclaimer, network status, and social channels**
- [ ] **Step 6: Verify components render cleanly and commit: `feat: add Web3 design system, typography and navigation`**

---

### Task 3: Multi-Chain Wallet State & Unified Connector

**Files:**
- Create: `src/context/WalletContext.jsx`
- Create: `src/components/WalletModal.jsx`
- Create: `src/data/tokens.js`

**Interfaces:**
- Consumes: `src/components/Icons.jsx`
- Produces: `useWallet()` hook with multi-chain active state (`activeChain`, `address`, `isConnected`, `connect()`, `disconnect()`), token database for all 4 chains.

- [ ] **Step 1: Populate `src/data/tokens.js` with verified token metadata for Ethereum, Solana, TRON, and TON (logos, symbols, contract addresses, decimals)**
- [ ] **Step 2: Build `src/context/WalletContext.jsx` managing connection state across EVM, Solana, TRON, and TON**
- [ ] **Step 3: Build `src/components/WalletModal.jsx` providing a single clean popup to connect Phantom, Tonkeeper, MetaMask, or TronLink**
- [ ] **Step 4: Test wallet switching and local storage persistence**
- [ ] **Step 5: Commit: `feat: implement unified multi-chain wallet connector`**

---

### Task 4: Non-Custodial Multi-Chain Swap Core

**Files:**
- Create: `src/components/swap/SwapCard.jsx`
- Create: `src/components/swap/TokenSelectorModal.jsx`
- Create: `src/services/swapService.js`

**Interfaces:**
- Consumes: `useWallet()`, `src/data/tokens.js`
- Produces: Interactive DEX swap card with live route estimation, token selection, slippage settings, and swap execution mock/broadcast.

- [ ] **Step 1: Create `src/services/swapService.js` with quote fetching algorithms for Jupiter, Uniswap, SunSwap, and STON.fi**
- [ ] **Step 2: Build `src/components/swap/TokenSelectorModal.jsx` with search filter by token name, symbol, or contract address**
- [ ] **Step 3: Build `src/components/swap/SwapCard.jsx` featuring From/To inputs, invert button, exchange rate display, slippage controls, and action button**
- [ ] **Step 4: Add transaction confirmation modal with broadcast animation and transaction hash generation**
- [ ] **Step 5: Test swap calculations across different token pairs**
- [ ] **Step 6: Commit: `feat: implement multi-chain non-custodial swap card and routing`**

---

### Task 5: Telegram Stars Direct OTC Trading Desk (Option B)

**Files:**
- Create: `src/components/stars/StarsDesk.jsx`
- Create: `src/components/stars/StarsInvoiceModal.jsx`
- Create: `src/services/starsService.js`

**Interfaces:**
- Consumes: `src/utils/format.js`, `src/components/Icons.jsx`
- Produces: Dedicated Stars Buy/Sell interface, invoice generation with deposit address, QR code, and 20-minute price lock countdown.

- [ ] **Step 1: Implement `src/services/starsService.js` with package pricing models (50 to 10,000 Stars), real-time crypto rate calculation, and order generator**
- [ ] **Step 2: Build `src/components/stars/StarsDesk.jsx` with tabbed "خرید استارز" (Buy) and "فروش استارز" (Sell) modes**
- [ ] **Step 3: Build package selection grid with popular badges and instant Toman/Crypto price comparison**
- [ ] **Step 4: Build `src/components/stars/StarsInvoiceModal.jsx` displaying the generated invoice, receiving wallet QR Code, copy buttons, countdown timer, and TxID input**
- [ ] **Step 5: Test buy and sell flows, verify input sanitization for `@username`**
- [ ] **Step 6: Commit: `feat: implement direct Telegram Stars OTC trading desk`**

---

### Task 6: Order Tracker & Transaction Ledger

**Files:**
- Create: `src/components/orders/OrderTracker.jsx`
- Create: `src/services/orderStorage.js`

**Interfaces:**
- Consumes: `src/services/starsService.js`
- Produces: Persistent local ledger of recent swaps and Stars purchases with live status verification.

- [ ] **Step 1: Implement `src/services/orderStorage.js` to save, update, and retrieve orders from local storage**
- [ ] **Step 2: Build `src/components/orders/OrderTracker.jsx` allowing users to look up any Order ID (`JS-STARS-...`) and view a step-by-step progress timeline**
- [ ] **Step 3: Integrate "سفارشات اخیر من" (My Recent Orders) drawer for quick access**
- [ ] **Step 4: Test order lifecycle from creation to verified state**
- [ ] **Step 5: Commit: `feat: implement persistent order tracker and transaction history`**

---

### Task 7: Application Shell, Routing & Cloudflare Edge Functions

**Files:**
- Create: `src/App.jsx`
- Create: `src/main.jsx`
- Create: `functions/api/quote.js`
- Create: `functions/api/prices.js`

**Interfaces:**
- Consumes: All components from Tasks 2-6
- Produces: Integrated SPA and Cloudflare serverless edge routes.

- [ ] **Step 1: Write Cloudflare Pages Functions (`/functions/api/prices.js` and `/functions/api/quote.js`) to provide server-side proxying**
- [ ] **Step 2: Assemble `src/App.jsx` with tab navigation between "سواپ کریپتو" (Swap), "خرید و فروش استارز" (Stars), and "پیگیری سفارشات" (Tracker)**
- [ ] **Step 3: Wire up `src/main.jsx` with React 19 root and context providers**
- [ ] **Step 4: Verify build: `npm run build` and inspect `dist/` bundle size and assets**
- [ ] **Step 5: Commit: `feat: integrate application shell, tab router and Cloudflare functions`**

---

### Task 8: Verification, Comprehensive Testing & GitHub Push

**Files:**
- Create: `README.md`
- Touch: `.gitignore`

**Interfaces:**
- Produces: Verified working artifact, local browser test proofs, git history, and GitHub remote sync.

- [ ] **Step 1: Create clean `README.md` in Persian and English documenting features, architecture, and deployment steps**
- [ ] **Step 2: Test production bundle in headless browser on both desktop (1280px) and mobile (375px) viewports**
- [ ] **Step 3: Verify all interactive states: token swapping, package selection, invoice generation, wallet modal**
- [ ] **Step 4: Configure GitHub remote (`https://github.com/mjavadz/jswap-farsi.git` or `jswap`) and push `main` branch**
- [ ] **Step 5: Prepare Cloudflare Pages deployment configuration guide for domain `javadnode.top`**
