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
import { toPersianDigits } from '../../utils/format';
import StarsInvoiceModal from '../stars/StarsInvoiceModal';
import { Stepper } from '@/components/ui/stepper';
import { Price } from '@/components/ui/price';

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
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center gap-1">
            <Clock size={13} />
            <span>در انتظار پرداخت</span>
          </span>
        );
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      
      {/* Search Header Card */}
      <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 shadow-xl">
        <div className="text-center max-w-md mx-auto space-y-2 mb-6">
          <h2 className="text-xl font-black text-foreground">سامانه هوشمند پیگیری سفارشات</h2>
          <p className="text-xs text-muted-foreground leading-relaxed font-normal">
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
              className="w-full pl-4 pr-11 py-3 rounded-xl bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent font-mono"
              dir="ltr"
            />
            <Search size={18} className="absolute right-4 top-3.5 text-muted-foreground" />
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-accent hover:bg-emerald-600 text-background font-bold text-sm transition-all shadow-sm shrink-0"
          >
            استعلام وضعیت
          </button>
        </form>

        {/* Not Found Alert */}
        {notFound && (
          <div className="mt-4 p-3.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-400 text-xs font-bold flex items-center gap-2 animate-fade-in">
            <AlertCircle size={16} />
            <span>سفارشی با این شناسه در سیستم یافت نشد. لطفاً از صحت حروف مطمئن شوید.</span>
          </div>
        )}
      </div>

      {/* Searched Order Result Card */}
      {searchedOrder && (
        <div className="bg-card border border-accent/40 rounded-2xl p-6 shadow-xl animate-fade-in space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-base font-black text-foreground">{searchedOrder.id}</span>
                {getStatusBadge(searchedOrder.status)}
              </div>
              <span className="text-xs text-muted-foreground mt-1 block">
                اکانت دریافت‌کننده: <strong className="text-foreground">{searchedOrder.username}</strong>
              </span>
            </div>

            <button
              type="button"
              onClick={() => setActiveInvoice(searchedOrder)}
              className="px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 border border-border text-xs font-bold text-foreground flex items-center gap-1.5 self-start transition-colors"
            >
              <span>مشاهده پیش‌فاکتور</span>
              <ExternalLink size={14} />
            </button>
          </div>

          {/* VibeFarsi RTL Stepper */}
          <div className="py-2">
            <Stepper
              current={searchedOrder.status === 'completed' ? 2 : searchedOrder.status === 'paid' ? 1 : 0}
              steps={[
                { label: 'ثبت فاکتور', description: 'انجام شد ✓' },
                { 
                  label: 'تایید تراکنش', 
                  description: searchedOrder.status === 'completed' || searchedOrder.status === 'paid' ? 'تایید شبکه ✓' : 'در انتظار واریز' 
                },
                { 
                  label: 'تحویل استارز', 
                  description: searchedOrder.status === 'completed' ? 'تکمیل شد 🎉' : 'پس از تایید' 
                }
              ]}
            />
          </div>
        </div>
      )}

      {/* Recent Orders List Card */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-lg space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <Clock size={16} className="text-accent" />
            <h3 className="text-sm font-bold text-foreground">سوابق سفارشات اخیر من</h3>
          </div>
          <span className="text-xs text-muted-foreground">{toPersianDigits(orders.length)} سفارش ثبت‌شده</span>
        </div>

        {orders.length > 0 ? (
          <div className="divide-y divide-border/60">
            {orders.map((ord) => (
              <div 
                key={ord.id}
                className="py-3.5 flex items-center justify-between gap-3 text-right hover:bg-secondary/40 p-2 rounded-xl transition-colors cursor-pointer"
                onClick={() => setActiveInvoice(ord)}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
                    <StarsIcon size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <strong className="text-sm font-mono text-foreground">{ord.id}</strong>
                      <span className="text-xs font-bold text-amber-400">{toPersianDigits(ord.stars)} Stars</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                      <span>برای: <span className="font-mono text-foreground">{ord.username}</span></span>
                      <span>•</span>
                      <Price amount={ord.pricing?.totalToman || 0} size="sm" />
                    </div>
                  </div>
                </div>

                <div className="text-left shrink-0">
                  {getStatusBadge(ord.status)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-10 text-center text-muted-foreground text-xs font-normal">
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
