# راه‌اندازی آزمایشی AR کافه آفتاب

شناسهٔ کسب‌وکار آزمایشی در Supabase:

`ar-demo-cafe-aftab-001`

این رکورد صرفاً برای دموی AR تأیید شده است؛ هیچ کسب‌وکار واقعی یا دادهٔ مالک تغییر نکرده است.

## فایل‌های نهایی

- `cafe-aftab-poster.png`: پوستر چاپی و تارگت
- `targets.mind`: فایل واقعی MindAR، نسخهٔ v2، یک تصویر ۱۰۲۴×۱۵۳۶ و ۱۱ سطح matching
- `cafe-aftab-steam-motion.mp4`: ویدئوی ۶ ثانیه‌ای عمودی ۷۲۰×۱۰۸۰ با بخار متحرک و پوستر ثابت

ویدئوی بخار در ناحیهٔ فنجان متحرک است و نسبت تصویرش با پوستر ۲:۳ هماهنگ شده است. صفحهٔ AR نیز به‌روزرسانی شده تا ویدئو را با نسبت عمودی پوستر نمایش دهد.

## Storage

Bucket عمومی `ar-assets` ساخته شده است. سقف فایل ۲۰ مگابایت است و MIMEهای مجاز شامل `.mind`، MP4 و PNG هستند.

فایل‌ها باید در مسیرهای زیر قرار بگیرند:

- `ar-demo-cafe-aftab-001/targets.mind`
- `ar-demo-cafe-aftab-001/cafe-aftab-steam-motion.mp4`
- `ar-demo-cafe-aftab-001/cafe-aftab-poster.png`

تلاش برای آپلود مستقیم از این محیط به Supabase به‌دلیل در دسترس نبودن DNS/شبکهٔ خروجی ناموفق بود؛ فایل‌ها هنوز در Storage نیستند و URL عمومی معتبر ندارند.

## ثبت محتوای AR پس از آپلود

پس از آپلود، URLهای عمومی را در SQL زیر جایگزین کنید:

```sql
insert into public.ar_content
  (business_id, target_url, video_url, poster_url, active)
values
  (
    'ar-demo-cafe-aftab-001',
    'PUBLIC_URL_TO_TARGETS_MIND',
    'PUBLIC_URL_TO_STEAM_MOTION_MP4',
    'PUBLIC_URL_TO_POSTER_PNG',
    true
  )
on conflict (business_id) do update set
  target_url = excluded.target_url,
  video_url = excluded.video_url,
  poster_url = excluded.poster_url,
  active = true,
  updated_at = now();
```

## تست

پس از ثبت URLها، صفحهٔ `ar-demo.html?business_id=ar-demo-cafe-aftab-001` را روی HTTPS با گوشی باز کنید، اجازهٔ دوربین بدهید و پوستر را مقابل دوربین بگیرید. فایل ویدئو با همان نسبت ۲:۳ روی پوستر قرار می‌گیرد.

تغییرات رابط کاربری در PR آزمایشی هستند و تا ادغام و انتشار، در نسخهٔ اصلی سایت دیده نمی‌شوند.
