import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Copy, 
  Check, 
  ArrowRight, 
  RefreshCw 
} from 'lucide-react';
import { StarsIcon } from '../Icons';
import { getOrderHistory } from '../../services/starsService';
import { toPersianDigits, formatToman } from '../../utils/format';
import StarsInvoiceModal from '../stars/StarsInvoiceModal';

export default function OrderTracker() {
  const [searchId, setSearchId] = useState('');
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeInvoice, setActiveInvoice] = useState(null);
  const [searchedOrder, setSearchedOrder] = useState(null);
  const [notFound, setNotFound] = useState(false);

  const loadHistory = () => {
    const list = getOrderHistory();
    setOrders(list);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    setNotFound(false);
    const id = searchId.trim().toUpperCase();
    if (!id) return;

    const found = orders.find(o => o.id.toUpperCase() === id);
    if (found) {
      setSearchedOrder(found);
    } else {
      setSearchedOrder(null);
      setNotFound(true);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center gap-1">
            <CheckCircle2 size={13} />
            <span>تکمیل و شارژ شده</span>
          </span>
        );
      case 'paid':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-sky-500/15 border border-sky-500/30 text-sky-400 flex items-center gap-1">
            <RefreshCw size={13} className="animate-spin" />
            <span>در حال تایید بلاکچین</span>
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/15 border border-amber-500/30 text-accent-gold flex items-center gap-1">
            <Clock size={13} />
            <span>در انتظار پرداخت</span>
          </span>
        );
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      
      {/* Search Header Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="text-center max-w-md mx-auto space-y-2 mb-6">
          <h2 className="text-xl font-black text-white">سامانه هوشمند پیگیری سفارشات</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            کد سفارش (Order ID) دریافتی هنگام خرید استارز یا سواپ را وارد کنید تا آخرین وضعیت انتقال استارز و تایید شبکه را به صورت زنده مشاهده نمایید.
          </p>
        </div>

        {/* Search Input Form */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="مثال: JS-STARS-491823"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              className="w-full pl-4 pr-11 py-3.5 rounded-2xl bg-dark-surface border border-dark-border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-accent-emerald font-mono"
              dir="ltr"
            />
            <Search size={18} className="absolute right-4 top-4 text-slate-400" />
          </div>

          <button
            type="submit"
            className="px-6 py-3.5 rounded-2xl bg-accent-emerald hover:bg-emerald-600 text-dark-bg font-bold text-sm transition-all shadow-glow-emerald shrink-0"
          >
            استعلام وضعیت
          </button>
        </form>

        {/* Not Found Alert */}
        {notFound && (
          <div className="mt-4 p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <AlertCircle size={16} />
            <span>سفارشی با این شناسه در سیستم یافت نشد. لطفاً از صحت حروف مطمئن شوید.</span>
          </div>
        )}
      </div>

      {/* Searched Order Result Card */}
      {searchedOrder && (
        <div className="glass-card rounded-3xl p-6 shadow-2xl border border-accent-emerald/40 animate-fadeIn space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-dark-border">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-base font-black text-white">{searchedOrder.id}</span>
                {getStatusBadge(searchedOrder.status)}
              </div>
              <span className="text-xs text-slate-400 mt-1 block">
                اکانت دریافت‌کننده: <strong className="text-slate-200">{searchedOrder.username}</strong>
              </span>
            </div>

            <button
              type="button"
              onClick={() => setActiveInvoice(searchedOrder)}
              className="px-4 py-2 rounded-xl bg-dark-surface hover:bg-dark-hover border border-dark-border text-xs font-bold text-slate-200 flex items-center gap-1.5 self-start transition-colors"
            >
              <span>مشاهده پیش‌فاکتور</span>
              <ExternalLink size={14} />
            </button>
          </div>

          {/* Stepper Timeline */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <span className="block font-bold mb-1">۱. ثبت فاکتور</span>
              <span className="text-[10px] text-slate-400">انجام شد ✓</span>
            </div>
            <div className={`p-3 rounded-xl border ${
              searchedOrder.status === 'completed' || searchedOrder.status === 'paid'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-dark-surface border-dark-border text-slate-500'
            }`}>
              <span className="block font-bold mb-1">۲. تایید تراکنش</span>
              <span className="text-[10px]">
                {searchedOrder.status === 'completed' || searchedOrder.status === 'paid' ? 'تایید شده ✓' : 'در انتظار واریز'}
              </span>
            </div>
            <div className={`p-3 rounded-xl border ${
              searchedOrder.status === 'completed'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-dark-surface border-dark-border text-slate-500'
            }`}>
              <span className="block font-bold mb-1">۳. تحویل استارز</span>
              <span className="text-[10px]">
                {searchedOrder.status === 'completed' ? 'تکمیل شد 🎉' : 'پس از تایید'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Recent Orders List Card */}
      <div className="glass-card rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-dark-border/60">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-accent-emerald" />
            <h3 className="text-sm font-bold text-white">سوابق سفارشات اخیر من</h3>
          </div>
          <span className="text-xs text-slate-500">{toPersianDigits(orders.length)} سفارش ثبت‌شده</span>
        </div>

        {orders.length > 0 ? (
          <div className="divide-y divide-dark-border/40">
            {orders.map((ord) => (
              <div 
                key={ord.id}
                className="py-3.5 flex items-center justify-between gap-3 text-right hover:bg-dark-surface/40 p-2 rounded-xl transition-colors cursor-pointer"
                onClick={() => setActiveInvoice(ord)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent-gold/15 border border-accent-gold/30 flex items-center justify-center text-accent-gold shrink-0">
                    <StarsIcon size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-sm font-mono text-white">{ord.id}</strong>
                      <span className="text-xs font-bold text-accent-gold">{toPersianDigits(ord.stars)} Stars</span>
                    </div>
                    <span className="text-xs text-slate-400 block mt-0.5">
                      برای: <span className="font-mono text-slate-300">{ord.username}</span> • {formatToman(ord.pricing?.totalToman)}
                    </span>
                  </div>
                </div>

                <div className="text-left shrink-0">
                  {getStatusBadge(ord.status)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-10 text-center text-slate-500 text-xs">
            هنوز سفارشی در این مرورگر ثبت نشده است. پس از خرید یا سواپ، سفارش‌ها در این بخش نمایش داده می‌شوند.
          </div>
        )}
      </div>

      {/* Invoice Modal Reopen */}
      <StarsInvoiceModal
        order={activeInvoice}
        isOpen={!!activeInvoice}
        onClose={() => setActiveInvoice(null)}
        onOrderUpdated={() => loadHistory()}
      />

    </div>
  );
}
