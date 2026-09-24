// Telegram Stars OTC Desk Pricing & Service
import { getTokenPrice } from './priceService';

export const STARS_PACKAGES = [
  { stars: 50, badge: 'شروع', popular: false },
  { stars: 100, badge: 'پایه', popular: false },
  { stars: 250, badge: 'اقتصادی', popular: false },
  { stars: 500, badge: 'محبوب‌ترین', popular: true },
  { stars: 1000, badge: 'ویژه', popular: true },
  { stars: 2500, badge: 'تخفیف ۳٪', popular: false },
  { stars: 5000, badge: 'تخفیف ۵٪', popular: false },
  { stars: 10000, badge: 'تخفیف ۷٪', popular: false },
];

// 1 Star price in USD & Toman
export const STAR_BASE_USD = 0.015;
export const TOMAN_PER_USD = 66000;

export const PAYMENT_METHODS = [
  { id: 'ton', name: 'شبکه تون (TON)', symbol: 'TON', network: 'TON Network', icon: 'ton', address: 'EQCD39VS5jcptHL8vMjEXrzGaRcCVYto7HUn4bpAOg8xqB2N' },
  { id: 'usdt_trc20', name: 'تتر ترون (USDT TRC-20)', symbol: 'USDT', network: 'TRON TRC-20', icon: 'usdt', address: 'TMuA6YqfCeX8EhbfYg5y7SNNGLqxUX8e89' },
  { id: 'sol', name: 'سولانا (SOL)', symbol: 'SOL', network: 'Solana Network', icon: 'sol', address: '7XwP6fC9dGkPZ91e2K5yBqJ8fG9m82La9Dk4eM5b6P81' },
  { id: 'trx', name: 'ترون (TRX)', symbol: 'TRX', network: 'TRON Mainnet', icon: 'trx', address: 'TMuA6YqfCeX8EhbfYg5y7SNNGLqxUX8e89' },
];

export function calculateStarsPrice(starsCount, methodId = 'ton') {
  const count = Number(starsCount) || 100;
  
  // Volume discount tiers
  let discount = 0;
  if (count >= 10000) discount = 0.07;
  else if (count >= 5000) discount = 0.05;
  else if (count >= 2500) discount = 0.03;

  const totalUSD = count * STAR_BASE_USD * (1 - discount);
  const totalToman = Math.round(totalUSD * TOMAN_PER_USD);

  // Crypto conversion using live market prices
  let cryptoAmount = 0;
  const tonPrice = getTokenPrice('ton') || 1.60;
  const solPrice = getTokenPrice('sol') || 117.10;
  const trxPrice = getTokenPrice('trx') || 0.34;

  if (methodId === 'ton') {
    cryptoAmount = Number((totalUSD / tonPrice).toFixed(3));
  } else if (methodId === 'usdt_trc20') {
    cryptoAmount = Number(totalUSD.toFixed(2));
  } else if (methodId === 'sol') {
    cryptoAmount = Number((totalUSD / solPrice).toFixed(4));
  } else if (methodId === 'trx') {
    cryptoAmount = Number((totalUSD / trxPrice).toFixed(1));
  }

  return {
    stars: count,
    totalUSD: totalUSD.toFixed(2),
    totalToman,
    cryptoAmount,
    unitPriceToman: Math.round(totalToman / count),
    discountPercent: Math.round(discount * 100)
  };
}

export function createStarsOrder({ type = 'buy', stars, username, methodId, payoutAddress = '' }) {
  const method = PAYMENT_METHODS.find(m => m.id === methodId) || PAYMENT_METHODS[0];
  const pricing = calculateStarsPrice(stars, methodId);
  const orderId = `JS-STARS-${Math.floor(100000 + Math.random() * 900000)}`;

  const order = {
    id: orderId,
    type, // 'buy' | 'sell'
    stars: Number(stars),
    username: username.startsWith('@') ? username : `@${username}`,
    method,
    pricing,
    depositAddress: method.address,
    payoutAddress: payoutAddress || null,
    status: 'pending_payment', // 'pending_payment' | 'paid' | 'processing' | 'completed' | 'cancelled'
    createdAt: Date.now(),
    expiresAt: Date.now() + 20 * 60 * 1000, // 20 minutes
    txHash: null
  };

  saveOrderToHistory(order);
  return order;
}

const STORAGE_ORDERS_KEY = 'jswap_stars_orders';

export function getOrderHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_ORDERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveOrderToHistory(order) {
  try {
    const list = getOrderHistory();
    const updated = [order, ...list.filter(o => o.id !== order.id)].slice(0, 50);
    localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving order', e);
  }
}

export function updateOrderStatus(orderId, status, txHash = null) {
  try {
    const list = getOrderHistory();
    const idx = list.findIndex(o => o.id === orderId);
    if (idx !== -1) {
      list[idx].status = status;
      if (txHash) list[idx].txHash = txHash;
      list[idx].updatedAt = Date.now();
      localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(list));
      return list[idx];
    }
  } catch (e) {
    console.error('Error updating order', e);
  }
  return null;
}
