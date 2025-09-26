// script.js - dynamic product renderer and small UX helpers
document.addEventListener('DOMContentLoaded', () => {
  // Render products if PRODUCTS is defined
  if (typeof PRODUCTS !== 'undefined' && Array.isArray(PRODUCTS)) {
    const grid = document.getElementById('productGrid');
    if (grid) {
      grid.innerHTML = '';
      PRODUCTS.forEach((p, i) => {
        const card = document.createElement('article');
        card.className = 'product-card';
        card.innerHTML = `
          <a class="product-media" href="product.html?i=${i}" aria-label="${p.name} image">
            <img src="${p.image}" alt="${p.name}" loading="lazy">
          </a>
          <div class="product-body">
            <div>
              <h3>${p.name}</h3>
              <p class="price">₦${numberWithCommas(p.price)}</p>
              <p class="desc">${p.short}</p>
            </div>
            <div class="order-row">
              <a class="order-btn" target="_blank" rel="noopener" href="${getWhatsappLink(p)}">Order Now</a>
              <small style="color:var(--muted)">SKU: ${p.sku || '—'}</small>
            </div>
          </div>
        `;
        grid.appendChild(card);
      });
    }
  }
});

// Format numbers with commas
function numberWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Build a WhatsApp order link; uses a default number if product specific not provided
function getWhatsappLink(product){
  const baseNumber = product.whatsapp || '2348169927542'; // fallback number (Nigeria)
  const text = encodeURIComponent(`${product.name} - ₦${product.price}. I'm interested. Please send details.`);
  return `https://wa.me/${baseNumber}?text=${text}`;
}
// Handle review form submission
const reviewForm = document.getElementById('reviewForm');
const reviewsList = document.getElementById('reviews-list');

if (reviewForm) {
  reviewForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    const rating = document.getElementById('rating').value;

    // Create new review card
    const newReview = document.createElement('div');
    newReview.classList.add('review-card');
    newReview.innerHTML = `
      <p class="review-text">“${message}”</p>
      <p class="review-author">— ${name}</p>
      <p class="review-rating">${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}</p>
    `;

    // Add to top of reviews list
    reviewsList.prepend(newReview);

    // Reset form
    reviewForm.reset();
  });
}
const API_URL = "mailto:horlarewajus107@gmail.com"; // paste your URL

// Submit review
if (reviewForm) {
  reviewForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;
    const rating = document.getElementById("rating").value;

    await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify({ name, message, rating }),
      headers: { "Content-Type": "application/json" }
    });

    alert("Review submitted!");
    reviewForm.reset();
    loadReviews();
  });
}

// Load reviews
async function loadReviews() {
  reviewsList.innerHTML = "";
  const res = await fetch(API_URL);
  const data = await res.json();

  data.reverse().forEach((review) => {
    const reviewCard = document.createElement("div");
    reviewCard.classList.add("review-card");
    reviewCard.innerHTML = `
      <p class="review-text">“${review.message}”</p>
      <p class="review-author">— ${review.name}</p>
      <p class="review-rating">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</p>
    `;
    reviewsList.appendChild(reviewCard);
  });
}

if (reviewsList) loadReviews();
