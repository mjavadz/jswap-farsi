# JSWAP Farsi (جِی‌سواپ فارسی) ⚡

> **صرافی غیرحضانتی چندزنجیره‌ای (Multi-Chain DEX) و میز اختصاصی مبادله استارز تلگرام**  
> دامنه رسمی: [https://javadnode.top](https://javadnode.top)

---

## 🌟 قابلیت‌های کلیدی

1. **سواپ ۱۰۰٪ غیرحضانتی (Non-Custodial):**
   - هیچ کلید خصوصی یا دارایی توسط پلتفرم ذخیره نمی‌شود؛ کاربر با کیف‌پول شخصی تراکنش‌ها را مستقیماً در استخرهای نقدینگی امضا می‌کند.
   - **پوشش ۴ زنجیره برتر:**
     - 💎 **شبکه تون (The Open Network / TON):** استخرهای STON.fi و DeDust
     - 🟣 **سولانا (Solana):** روتینگ پرسرعت Jupiter v6
     - 🔷 **اتریوم (Ethereum / EVM):** روتر هوشمند Uniswap v3 و 1inch
     - 🔴 **ترون (TRON):** پروتکل نقدینگی SunSwap v2
2. **میز مستقیم استارز تلگرام (Telegram Stars Desk):**
   - خرید استارز تلگرام بدون نیاز به کارت بانکی یا احراز هویت با پرداخت مستقیم ارزهای TON, USDT, SOL, TRX.
   - فروش و نقد کردن استارز و دریافت معادل کریپتو در کیف‌پول شخصی.
   - صدور پیش‌فاکتور آنی همراه با آدرس واریز، QR Code و تایمر ۲۰ دقیقه‌ای قفل نرخ.
3. **سامانه رهگیری لحظه‌ای سفارشات (Order Tracker):**
   - ذخیره تاریخچه سفارش‌ها در حافظه مرورگر و امکان پیگیری وضعیت مرحله‌به‌مرحله با شناسه سفارش (`JS-STARS-...`).
4. **طراحی لوکس کریپتویی به زبان فارسی (RTL):**
   - تایپوگرافی رسمی وزیرمتن (Vazirmatn)، تم تیره سایبرپانک با رنگ‌های زمردی و طلایی، واکنش‌گرا برای تمامی گوشی‌ها و تبلت‌ها.

---

## 🛠️ ساختار فنی (Tech Stack)

* **فرانت‌اند:** React 19 + Vite 6 + Tailwind CSS
* **آیکون‌ها:** Lucide React + آیکون‌های وکتور اختصاصی شبکه‌های بلاکچین
* **معماری ابری:** Cloudflare Pages با توابع لبه‌ای (Cloudflare Functions) جهت پروکسی امن APIها بدون مشکل CORS و تحریم

---

## 🚀 راهنمای راه‌اندازی و توسعه محلی

```bash
# کلون پروژه
git clone https://github.com/mjavadz/jswap-farsi.git
cd jswap-farsi

# نصب پکیج‌ها
npm install

# اجرای سرور توسعه محلی
npm run dev

# ساخت نسخه پروداکشن
npm run build
```

---

## 🌐 نحوه دیپلوی روی Cloudflare Pages و اتصال به `javadnode.top`

1. وارد داشبورد کلودفلر ([dash.cloudflare.com](https://dash.cloudflare.com)) شوید.
2. به بخش **Workers & Pages ➔ Create application ➔ Pages ➔ Connect to Git** بروید.
3. ریپازیتوری `mjavadz/jswap-farsi` را انتخاب کنید.
4. تنظیمات بیلد را به صورت زیر قرار دهید:
   * **Framework preset:** `Vite`
   * **Build command:** `npm run build`
   * **Build output directory:** `dist`
5. پس از دیپلوی، به تب **Custom domains** بروید و دامنه `javadnode.top` را اضافه کنید؛ کلودفلر به صورت خودکار گواهینامه SSL رایگان Universal را فعال می‌کند.
