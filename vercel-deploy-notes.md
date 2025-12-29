# Vercel Deploy Qo'llanmasi

## Public Fayllarni Xizmatga Olish

Vite loyihalarida `public/` papkasiga qo'yilgan fayllar build jarayonida ildiz (`/`) ostida ko'rinadi: `/favicon.ico`, `/logo.png` va h.k.

## Vercel Deploy Qadamlari

### 1. Environment Variables

Vercel dashboardda quyidagi environment variables ni sozlang:
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Supabase anon/public key

### 2. Build Settings

Vercel avtomatik ravishda quyidagilarni aniqlaydi:
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 3. Static Files

`vercel.json` fayli quyidagi static fayllarni to'g'ri xizmatga oladi:
- `/favicon.ico`
- `/logo.png`
- Boshqa public fayllar

### 4. Routing

SPA routing uchun barcha route'lar `/index.html` ga yo'naltiriladi.

## Local Test

Mahalliy test qilish:

```bash
npm install
npm run build
npm run preview
```

Brauzerda `http://localhost:4173` ni ochib tekshiring.

## Muammolarni Hal Qilish

### Static fayllar ko'rinmayapti

1. `dist/` papkasida fayllar mavjudligini tekshiring
2. `public/` papkasida fayllar mavjudligini tekshiring
3. Vercel deploy logs ni ko'rib chiqing

### Cache muammosi

Agar eski fayllar ko'rsatilsa:
1. Vercel cache ni tozalang
2. Brauzer cache ni tozalang (Ctrl+Shift+R)
3. Yangi deploy qiling
