# Vercel Deployment Notes

## Static Assets Configuration

### Logo Files
- `public/logo.png` - Main logo file
- `public/favicon.ico` - Favicon

### Vercel Configuration Files

1. **vercel.json** - Main Vercel configuration
   - Routes for logo.png and favicon.ico
   - Cache headers for static assets
   - Build configuration

2. **public/_headers** - Netlify/Vercel headers
   - Cache control for static assets
   - Content-Type headers

3. **public/_redirects** - Redirects configuration
   - Ensures logo.png is accessible

### Build Process

1. Vite builds the application to `dist/` folder
2. Static assets from `public/` are copied to `dist/`
3. Vercel serves static files with proper headers

### Environment Variables

Make sure to set these in Vercel dashboard:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

### Logo Paths

The logo is referenced as `/logo.png` in:
- `src/components/Navbar.tsx`
- `src/components/Footer.tsx`
- `src/components/HeroSection.tsx`
- `index.html` (meta tags)

### Troubleshooting

If logo doesn't appear:
1. Check that `logo.png` exists in `public/` folder
2. Verify `vercel.json` routes are correct
3. Check browser console for 404 errors
4. Ensure build includes public assets

### Cache Busting

Static assets use immutable cache headers:
- `Cache-Control: public, max-age=31536000, immutable`
- To force refresh, change filename or add query parameter
