Vercel deploy va public fayllarni xizmatga olish bo'yicha eslatma

Muammo: Saytdagi rasm (masalan, `favicon.ico` yoki `placeholder.svg`) Vercel serverida ochmayapti — brauzer rasm topa olmayapti yoki 404 qaytarilmoqda.

Eslatma: Vite + public papkasi
- Vite loyihalarida `public/` papkasiga qo'yilgan fayllar build jarayonida ildiz (`/`) ostida ko'rinadi: `/favicon.ico`, `/placeholder.svg` va h.k.
- Vercel standart holatda `public/` fayllarini to'g'ri xizmatga oladi. Lekin ba'zi hollarda routing yoki build konfiguratsiyalari noto'g'ri bo'lsa rasm topilmasligi mumkin.

Tavsiya qilingan tekshiruv va qadamlar

1) `vercel.json` faylini qo'shish (men repository ga qo'shdim)
   - Bu fayl serverga qanday route va headers kerakligini aniq ko'rsatadi.
   - `favicon.ico` va `placeholder.svg` uchun alohida rejalar qo'yildi va cache sozlamalari berildi.

2) package.json va build script tekshiruvi
   - `package.json` faylida `build` skripti mavjudligini tekshiring. Vite loyihasi uchun odatda: `vite build` yoki `npm run build` natijasida `dist/` -ga chiqishi kerak.
   - Agar loyihangiz `dist` dan boshqa papkaga build qilinsa (`build`, `public` kabi), `vercel.json` ichidagi `distDir` maydonini moslashtiring.

3) Vercel deploy logs (kengaytirilgan tekshiruv)
   - Vercel dashboard -> Deployments -> oxirgi deploy -> View Build Logs.
   - Agar 404 yoki fayl topilmayapti deb bo'lsa, logs ichida `vercel` build qayerga fayllarni joylagani ko'rsin.

4) Local build va test
   - Mahalliyda quyidagi buyruqlarni ishga tushiring (PowerShell):
     ```powershell
     npm install
     npm run build
     # keyin local server bilan tekshirish uchun
     npm run preview
     ```
   - Brauzerda `http://localhost:4173` (yoki `npm run preview` qaytargan port) ochib `/favicon.ico` va `/placeholder.svg` ga bevosita kiring: `http://localhost:4173/favicon.ico`.

5) Agar rasm 404 qaytarsa
   - `dist/` (yoki build papkangiz) ichini tekshiring — `favicon.ico` va `placeholder.svg` fayllari build ichida bormi.
   - Agar yo'q bo'lsa, `public/` papkaga fayllarni qo'ying yoki build konfiguratsiyasini tekshiring.

6) Vercel static files caching
   - Agar faylni o'zgartirgandan keyin eskisini ko'rsatayotgan bo'lsa, Vercel cache yoki brauzer cache sabab bo'lishi mumkin. Deployni qayta ishga tushiring yoki Cache-Control header ni yangilang.

Qisqacha: men `vercel.json` faylini qo'shdim, test qiling:
- Vercel dashboard orqali yangi deploy yarating yoki `git push` bilan trigga ulang.
- Deploy logs ni ko'rib chiqing va `favicon.ico` yoki `placeholder.svg` mavjudligini tekshiring.

Agar xato chiqqan bo'lsa, menga deploy logs ichidagi error paragraphini yuboring — men ko'proq aniq sababni topib beraman.
