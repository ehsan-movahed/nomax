# راه‌اندازی آزمایشی AR کافه آفتاب

شناسهٔ کسب‌وکار آزمایشی در Supabase:

`ar-demo-cafe-aftab-001`

## فایل‌های آماده

- `cafe-aftab-poster.png`: پوستر چاپی و تارگت تصویری
- `cafe-aftab-demo.mp4`: ویدئوی نمایشی ۶ ثانیه‌ای

این دو فایل در بستهٔ تحویلی این کار آماده شده‌اند؛ هنوز در Storage بارگذاری نشده‌اند.

## ساخت تارگت MindAR

1. پوستر PNG را در ابزار رسمی MindAR Target Compiler باز کنید:
   https://hiukim.github.io/mind-ar-js-doc/tools/compile/
2. تصویر را انتخاب و Compile کنید.
3. توزیع نقاط ویژگی را بررسی کنید و فایل واقعی `.mind` را دانلود کنید.
4. فایل `.mind` و MP4 و PNG را در bucket عمومی `ar-assets` در Supabase بارگذاری کنید.

## ثبت محتوای AR

پس از آپلود، URL عمومی هر فایل را بردارید و در SQL زیر جایگزین کنید:

```sql
insert into public.ar_content
  (business_id, target_url, video_url, poster_url, active)
values
  (
    'ar-demo-cafe-aftab-001',
    'PUBLIC_URL_TO_COMPILED_TARGET.mind',
    'PUBLIC_URL_TO_VIDEO.mp4',
    'PUBLIC_URL_TO_POSTER.png',
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

صفحهٔ `ar-demo.html?business_id=ar-demo-cafe-aftab-001` را روی HTTPS و با گوشی باز کنید، اجازهٔ دوربین بدهید و پوستر چاپ‌شده را مقابل دوربین بگیرید.

دکمهٔ AR در کارت نتایج کسب‌وکار به همین صفحه هدایت می‌کند. این تغییرات در PR آزمایشی هستند و تا ادغام، در نسخهٔ اصلی سایت منتشر نمی‌شوند.
