# Vercel Logo Configuration

## Logo File Location
The logo file should be located at: `public/logo.png`

## Vercel Configuration
The `vercel.json` file includes:
- Route for `/logo.png`
- Cache headers for static assets
- Content-Type headers

## How to Add Logo

1. Place `logo.png` file in the `public/` folder
2. The file will be automatically copied to `dist/` during build
3. Vercel will serve it at `/logo.png`

## Testing Locally

Run `npm run build` and check `dist/logo.png` exists.

## Vercel Deployment

After deploying to Vercel:
1. Check that logo.png is in the build output
2. Visit `https://your-domain.vercel.app/logo.png`
3. Should return 200 status with image

## Troubleshooting

If logo doesn't appear:
1. Verify `public/logo.png` exists
2. Check build logs for asset copying
3. Test `/logo.png` URL directly
4. Check browser console for errors

