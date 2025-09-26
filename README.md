# Ashake Oju-oge — Mini Website

This is a small, static website template for **Ashake Oju-oge** (luxury wig brand). The design uses a gold-highlight theme to emphasize brand strength.

## What is included
- `index.html` — Home / hero / features
- `shop.html` — Shop page (products injected dynamically)
- `about.html` — About page
- `contact.html` — Contact page with WhatsApp quick-send
- `style.css` — All styles (gold theme)
- `products.js` — Product data (editable). Change names, prices, images, SKUs here.
- `script.js` — Simple loader that reads `PRODUCTS` and renders the shop grid.
- `dammy-image/` — Small set of SVG placeholders for product images and hero

## How to edit products
Open `products.js` and edit the `PRODUCTS` array. Each product object supports:
- `name` (string)
- `price` (number, in NGN)
- `short` (string) — short description
- `image` (string) — path to image file (replace with real JPEG/PNG)
- `sku` (string) — optional
- `whatsapp` (string) — optional override WhatsApp number in international format (no +). Example: '2348012345678'

After editing `products.js`, reload `shop.html` in your browser.

## Order flow
Clicking **Order Now** opens WhatsApp chat with a prefilled message. The fallback WhatsApp number used by default is `+234 904 298 8669`. Replace in `script.js` if needed.

## Deployment
This is a static site — upload to any static host (Netlify, Vercel, GitHub Pages, Surge) or serve with a simple static server.

## Notes
- Replace the SVG placeholders in `dammy-image/` with real product photos for best effect.
- The style is mobile responsive and uses a 3-column grid on wide screens.

Enjoy — and tell me if you want a built production-ready bundle (minified CSS/JS) or a small admin UI to update products in-browser.
