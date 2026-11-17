# راه‌اندازی آزمایشی AR کافه آفتاب

شناسهٔ کسب‌وکار آزمایشی در Supabase:

`ar-demo-cafe-aftab-001`

این رکورد صرفاً برای دموی AR تأیید شده است؛ هیچ کسب‌وکار واقعی یا دادهٔ مالک تغییر نکرده است.

## فایل‌ها و Storage

Bucket عمومی `ar-assets` ساخته شده است. سقف فایل ۲۰ مگابایت است و MIMEهای مجاز شامل `.mind`، MP4 و PNG هستند.

مسیر پیشنهادی فایل‌ها در Storage:

- `ar-demo-cafe-aftab-001/targets.mind`
- `ar-demo-cafe-aftab-001/cafe-aftab-demo.mp4`
- `ar-demo-cafe-aftab-001/cafe-aftab-poster.png`

فایل‌های محلی آماده‌اند، اما هنوز به Storage منتقل نشده‌اند؛ در نتیجه URL عمومی معتبر برای آن‌ها وجود ندارد.

## تارگت MindAR

فایل `targets.mind` که ارائه شد از نظر ساختار MessagePack و نسخهٔ v2 قابل خواندن است و یک تصویر ۱۰۲۴×۱۵۳۶ با ۱۱ سطح matching دارد. این اعتبارسنجی ساختاری است و جای تست تشخیص واقعی روی گوشی را نمی‌گیرد.

## ثبت محتوای AR پس از آپلود

URLهای عمومی فایل‌های آپلودشده را در SQL زیر جایگزین کنید:

```sql
insert into public.ar_content
  (business_id, target_url, video_url, poster_url, active)
values
  (
    'ar-demo-cafe-aftab-001',
    'PUBLIC_URL_TO_TARGETS_MIND',
    'PUBLIC_URL_TO_VIDEO_MP4',
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

پس از ثبت URLها، صفحهٔ `ar-demo.html?business_id=ar-demo-cafe-aftab-001` را روی HTTPS با گوشی باز کنید، اجازهٔ دوربین بدهید و پوستر را مقابل دوربین بگیرید. تا قبل از آپلود فایل‌ها و ثبت `ar_content`، صفحه به‌درستی پیام «محتوای AR فعال نیست» نشان می‌دهد.

تغییرات رابط کاربری در PR آزمایشی هستند و تا ادغام و انتشار، در نسخهٔ اصلی سایت دیده نمی‌شوند.
