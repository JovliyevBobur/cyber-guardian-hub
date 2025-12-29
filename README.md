# CyberSafe Edu - Kiber Xavfsizlik Platformasi

Zamonaviy kiber tahdidlardan himoyalanish, internet xavfsizligi va ma'lumotlaringizni saqlash bo'yicha bilimlarni egallash uchun professional platforma.

## 🚀 Texnologiyalar

Bu loyiha quyidagi texnologiyalar bilan yaratilgan:

- **Vite** - Zamonaviy build tool
- **React 18** - UI kutubxonasi
- **TypeScript** - Type-safe dasturlash
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Yuqori sifatli React komponentlari
- **React Router** - SPA routing
- **Supabase** - Backend va Authentication
- **React Query** - Server state management

## 📋 Talablar

- Node.js 18+ 
- npm yoki yarn

## 🛠️ O'rnatish

```bash
# 1. Repository ni klonlash
git clone <repository-url>

# 2. Loyiha papkasiga o'tish
cd cyber-guardian-hub

# 3. Dependencies ni o'rnatish
npm install

# 4. Environment variables ni sozlash
# .env fayl yarating va quyidagilarni qo'shing:
# VITE_SUPABASE_URL=your_supabase_url
# VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key
```

## 🏃 Development

Development serverini ishga tushirish:

```bash
npm run dev
```

Brauzerda oching: `http://localhost:8080`

## 📦 Build

Production build yaratish:

```bash
npm run build
```

Build fayllar `dist/` papkasida yaratiladi.

## 🧪 Preview

Build qilingan loyihani preview qilish:

```bash
npm run preview
```

## 📁 Loyiha Strukturasi

```
cyber-guardian-hub/
├── public/          # Static fayllar
├── src/
│   ├── components/  # React komponentlari
│   ├── contexts/    # Context providers
│   ├── hooks/       # Custom hooks
│   ├── integrations/# External integrations (Supabase)
│   ├── lib/         # Utility funksiyalar
│   ├── pages/       # Sahifa komponentlari
│   └── main.tsx     # Entry point
├── supabase/        # Supabase konfiguratsiyasi
└── package.json     # Dependencies
```

## 🌐 Sahifalar

- `/` - Bosh sahifa
- `/about` - Biz haqimizda
- `/education` - O'quv bo'limi
- `/games` - O'yinlar
- `/contact` - Aloqa
- `/auth` - Kirish/Ro'yxatdan o'tish
- `/admin` - Admin paneli

## 🔐 Authentication

Loyiha Supabase Authentication dan foydalanadi. Foydalanuvchilar:
- Ro'yxatdan o'tishi mumkin
- Tizimga kirishi mumkin
- Profil ma'lumotlarini yangilashi mumkin

## 🎨 Dizayn

- Dark/Light mode qo'llab-quvvatlanadi
- Responsive dizayn (mobile-first)
- Modern UI/UX
- Animatsiyalar va transitions

## 📝 Kod Standartlari

- ESLint - Code linting
- TypeScript - Type safety
- Prettier (recommended) - Code formatting

## 🚢 Deploy

### Vercel

1. GitHub repository ni Vercel ga ulang
2. Environment variables ni sozlang
3. Deploy qiling

### Boshqa Platformalar

Loyiha har qanday static hosting platformasida deploy qilinishi mumkin:
- Netlify
- GitHub Pages
- Cloudflare Pages
- va boshqalar

## 📄 License

Bu loyiha ochiq manba kod sifatida taqdim etilgan.

## 👥 Mualliflar

CyberSafe Edu Team

## 📞 Aloqa

- Email: jbobur005@gmail.com
- Telefon: +998 93 005 42 87
- Manzil: Xorazm, O'zbekiston

---

© 2026 CyberSafe Edu. Barcha huquqlar himoyalangan.
