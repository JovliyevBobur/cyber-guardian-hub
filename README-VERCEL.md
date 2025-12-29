# Vercel Deployment Guide - Logo Configuration

## Logo Setup for Vercel

### 1. Logo File Location
Ensure `logo.png` exists in the `public/` folder:
```bash
public/logo.png
```

### 2. Vercel Configuration Files

#### vercel.json
- Contains routes for `/logo.png`
- Sets cache headers for static assets
- Configures build output directory

#### public/_headers
- Netlify/Vercel headers file
- Sets cache control for logo.png

#### public/_redirects
- Ensures logo.png is accessible

### 3. Build Process

When you deploy to Vercel:
1. Vite builds the app to `dist/` folder
2. Files from `public/` are copied to `dist/`
3. Vercel serves static files with proper headers

### 4. Testing Logo

#### Local Testing
```bash
npm run build
# Check dist/logo.png exists
npm run preview
# Visit http://localhost:4173/logo.png
```

#### Vercel Testing
After deployment:
- Visit: `https://your-app.vercel.app/logo.png`
- Should return 200 status with image
- Check browser console for any 404 errors

### 5. Logo Usage in Code

The logo is referenced as `/logo.png` in:
- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`
- `src/components/HeroSection.tsx`
- `index.html` (meta tags)

### 6. Troubleshooting

#### Logo Not Showing?
1. ✅ Check `public/logo.png` exists
2. ✅ Verify build includes logo: `npm run build && ls dist/logo.png`
3. ✅ Check Vercel build logs
4. ✅ Test URL directly: `/logo.png`
5. ✅ Check browser console for errors
6. ✅ Verify `vercel.json` routes are correct

#### Common Issues

**404 Error for logo.png**
- Ensure logo.png is in `public/` folder
- Check `vercel.json` routes configuration
- Verify build copied logo to `dist/`

**Logo Not Caching**
- Check `vercel.json` headers section
- Verify Cache-Control headers are set

**Wrong Content-Type**
- Check `vercel.json` Content-Type header
- Ensure file extension matches type

### 7. Environment Variables

Set in Vercel dashboard:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

### 8. Deployment Steps

1. Push code to Git repository
2. Connect repository to Vercel
3. Vercel will auto-detect Vite
4. Build will run automatically
5. Check deployment logs for errors

### 9. File Structure

```
project-root/
├── public/
│   ├── logo.png          ← Logo file here
│   ├── favicon.ico
│   ├── _headers          ← Vercel headers
│   └── _redirects         ← Vercel redirects
├── vercel.json           ← Vercel config
├── vite.config.ts        ← Vite config
└── dist/                 ← Build output (auto-generated)
    └── logo.png          ← Copied from public/
```

### 10. Quick Fix Commands

```bash
# Copy logo to public if missing
cp logo.png public/logo.png

# Build and test locally
npm run build
npm run preview

# Check if logo is in build
ls dist/logo.png
```

