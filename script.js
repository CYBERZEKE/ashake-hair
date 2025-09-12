/* script.js — shared across pages */

/* PRODUCTS: 9 placeholders. Edit text/images/prices as needed.
   Ensure images exist in dammy-image/wig1.jpg ... wig9.jpg
*/
const products = [
  { id:1, img:'dammy-image/wig1.jpg', title:'Elegance Lace Wig', price:'₦45,000', desc:'Silky straight lace front for a natural hairline.' },
  { id:2, img:'dammy-image/wig2.jpg', title:'Glam Body Wave', price:'₦60,000', desc:'Voluminous waves with soft movement.' },
  { id:3, img:'dammy-image/wig3.jpg', title:'Sleek Straight', price:'₦55,000', desc:'Polished straight look, low maintenance.' },
  { id:4, img:'dammy-image/wig4.jpg', title:'Honey Blonde', price:'₦70,000', desc:'Bold blonde shade for standout style.' },
  { id:5, img:'dammy-image/wig5.jpg', title:'Shoulder Bob', price:'₦50,000', desc:'Easy everyday bob, chic and comfortable.' },
  { id:6, img:'dammy-image/wig6.jpg', title:'Curly Afro', price:'₦65,000', desc:'Full curly texture with natural sheen.' },
  { id:7, img:'dammy-image/wig7.jpg', title:'Long Sleek', price:'₦80,000', desc:'Long length, smooth finish for elegance.' },
  { id:8, img:'dammy-image/wig8.jpg', title:'Color Blend', price:'₦75,000', desc:'Trendy color blend for modern looks.' },
  { id:9, img:'dammy-image/wig9.jpg', title:'Premium Lace Front', price:'₦90,000', desc:'Top-tier lace front crafted for comfort.' }
];

/* Render product cards into an element by id */
function renderProducts(gridId, limit = null){
  const grid = document.getElementById(gridId);
  if(!grid) return;
  grid.innerHTML = '';
  const list = (limit && limit>0) ? products.slice(0, limit) : products;
  list.forEach((p, idx) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}">
      <div class="product-body">
        <h3>${p.title}</h3>
        <p class="price">${p.price}</p>
        <p class="desc">${p.desc}</p>
        <a class="order-btn" href="#" data-index="${idx}">Order Now</a>
      </div>
    `;
    grid.appendChild(card);
  });
}

/* Modal handling */
const modal = () => document.getElementById('productModal');
const modalImage = () => document.getElementById('modalImage');
const modalTitle = () => document.getElementById('modalTitle');
const modalPrice = () => document.getElementById('modalPrice');
const modalDesc = () => document.getElementById('modalDesc');
const modalWhats = () => document.getElementById('modalWhatsApp');

function openModal(index){
  const p = products[index];
  if(!p) return;
  if(modalImage()) modalImage().src = p.img;
  if(modalTitle()) modalTitle().innerText = p.title;
  if(modalPrice()) modalPrice().innerText = p.price;
  if(modalDesc()) modalDesc().innerText = p.desc;

  // WhatsApp link — replace YOUR_NUMBER with your number (no +)
  const placeholderNumber = 'YOUR_NUMBER';
  const message = `Hello Ashake Oju-oge, I am interested in the ${p.title} (${p.price})`;
  const link = `https://wa.me/${placeholderNumber}?text=${encodeURIComponent(message)}`;
  if(modalWhats()) modalWhats().href = link;

  const m = modal();
  if(m){ m.style.display = 'flex'; m.setAttribute('aria-hidden','false'); }
}

function closeModal(){
  const m = modal();
  if(m){ m.style.display = 'none'; m.setAttribute('aria-hidden','true'); }
}

/* Init on DOM ready */
document.addEventListener('DOMContentLoaded', () => {
  // Render featured (3) and full grid (9)
  renderProducts('featured-grid', 3);
  renderProducts('product-grid');

  // Delegate order buttons to open modal
  document.body.addEventListener('click', (e) => {
    const order = e.target.closest('.order-btn');
    if(order){
      e.preventDefault();
      const idx = parseInt(order.getAttribute('data-index'),10);
      if(!isNaN(idx)) openModal(idx);
    }
    if(e.target.matches('.modal-close') || e.target.matches('#modalClose') || e.target.matches('#modalClose2') || e.target.matches('#modalCloseBtn') || e.target.matches('#modalCloseBtn2')){
      closeModal();
    }
  });

  // Clicking outside modal to close
  window.addEventListener('click', (e) => {
    const m = modal();
    if(m && e.target === m) closeModal();
  });

  // Hamburger toggles
  const hambs = document.querySelectorAll('.hamburger');
  hambs.forEach(h => {
    h.addEventListener('click', () => {
      const nav = h.previousElementSibling;
      if(nav){
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
      }
    });
  });
});
// Find the grid container
const grid = document.getElementById("product-grid");

// Check if products exist (prevents errors on other pages)
if (grid && typeof products !== "undefined") {
  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p class="price">₦${product.price.toLocaleString()}</p>
      <p class="desc">${product.desc}</p>
      <a href="#" class="order-btn">Order Now</a>
    `;
    grid.appendChild(card);
  });
}
