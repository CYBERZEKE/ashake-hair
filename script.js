// ============================================
// ASHAKE HAIRMPIRE - MAIN JAVASCRIPT FILE
// ============================================

// ============================================
// MOBILE MENU TOGGLE
// ============================================
function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      
      // Animate hamburger icon
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = navLinks.classList.contains('active') 
        ? 'rotate(45deg) translate(5px, 5px)' 
        : 'none';
      spans[1].style.opacity = navLinks.classList.contains('active') ? '0' : '1';
      spans[2].style.transform = navLinks.classList.contains('active') 
        ? 'rotate(-45deg) translate(7px, -6px)' 
        : 'none';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.nav') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove('active');
          const spans = menuToggle.querySelectorAll('span');
          spans[0].style.transform = 'none';
          spans[1].style.opacity = '1';
          spans[2].style.transform = 'none';
        }
      });
    });
  }
}

// ============================================
// PRODUCT MANAGEMENT & DISPLAY
// ============================================

// Format currency (Naira)
function formatPrice(price) {
  return '₦' + price.toLocaleString('en-NG');
}

// Create WhatsApp order link
function createWhatsAppLink(product) {
  const message = `Hello Ashake Hairmpire! I'm interested in ordering:\n\n` +
    `*${product.name}* (${product.sku})\n` +
    `Price: ${formatPrice(product.price)}\n\n` +
    `${product.short}\n\n` +
    `Please send me more details!`;
  
  return `https://wa.me/2349042988669?text=${encodeURIComponent(message)}`;
}

// Create product card HTML
function createProductCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card fade-in';
  card.dataset.price = product.price;
  card.dataset.name = product.name;
  
  card.innerHTML = `
    <div class="product-image">
      <img src="${product.image}" alt="${product.name}" loading="lazy">
    </div>
    <div class="product-details">
      <div class="product-name">${product.name}</div>
      <div class="product-sku">${product.sku}</div>
      <p class="product-description">${product.short}</p>
      <div class="product-price">${formatPrice(product.price)}</div>
      <a href="${createWhatsAppLink(product)}" 
         target="_blank" 
         rel="noopener" 
         class="btn btn-primary">
        Order on WhatsApp
      </a>
    </div>
  `;
  
  return card;
}

// Display products
function displayProducts(productsToShow) {
  const productGrid = document.getElementById('productGrid');
  if (!productGrid) return;

  productGrid.innerHTML = '';
  
  if (productsToShow.length === 0) {
    productGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
        <p style="font-size: 1.25rem; color: var(--text-medium);">
          No products found matching your criteria.
        </p>
      </div>
    `;
    return;
  }

  productsToShow.forEach((product, index) => {
    const card = createProductCard(product);
    card.style.animationDelay = `${index * 0.1}s`;
    productGrid.appendChild(card);
  });
}

// Filter products by price range
function filterByPrice(products, priceRange) {
  if (priceRange === 'all') return products;

  const [min, max] = priceRange.split('-').map(Number);
  
  return products.filter(product => {
    if (max) {
      return product.price >= min && product.price <= max;
    } else {
      return product.price >= min;
    }
  });
}

// Sort products
function sortProducts(products, sortBy) {
  const sorted = [...products];
  
  switch (sortBy) {
    case 'price-low':
      return sorted.sort((a, b) => a.price - b.price);
    case 'price-high':
      return sorted.sort((a, b) => b.price - a.price);
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case 'featured':
    default:
      return sorted;
  }
}

// Initialize shop page
function initShopPage() {
  if (typeof PRODUCTS === 'undefined') return;

  const sortSelect = document.getElementById('sort-select');
  const priceFilter = document.getElementById('price-filter');

  // Initial display
  displayProducts(PRODUCTS);

  // Apply filters and sorting
  function applyFiltersAndSort() {
    const sortValue = sortSelect?.value || 'featured';
    const priceValue = priceFilter?.value || 'all';

    let filtered = filterByPrice(PRODUCTS, priceValue);
    let sorted = sortProducts(filtered, sortValue);
    
    displayProducts(sorted);
  }

  // Event listeners
  sortSelect?.addEventListener('change', applyFiltersAndSort);
  priceFilter?.addEventListener('change', applyFiltersAndSort);
}

// ============================================
// REVIEW SYSTEM
// ============================================

// In-memory review storage
let customerReviews = [
  {
    name: "Sarah O.",
    location: "Lagos",
    rating: 5,
    message: "Absolutely love my wig! The texture feels so natural and I get compliments everywhere I go. Worth every penny!",
    date: new Date("2025-09-15")
  },
  {
    name: "Amaka N.",
    location: "Abuja",
    rating: 5,
    message: "The quality exceeded my expectations. The hairline is so realistic, no one can tell it's a wig. Amazing!",
    date: new Date("2025-09-20")
  },
  {
    name: "Tunde K.",
    location: "Ibadan",
    rating: 5,
    message: "Customer service was excellent. They helped me choose the right style and delivered quickly. Highly recommend!",
    date: new Date("2025-09-25")
  }
];

// Generate star rating HTML
function generateStars(rating) {
  const fullStars = '★'.repeat(rating);
  const emptyStars = '☆'.repeat(5 - rating);
  return fullStars + emptyStars;
}

// Render all reviews
function renderReviews() {
  const reviewsList = document.getElementById('reviews-list');
  if (!reviewsList) return;

  // Sort reviews by date (newest first)
  const sortedReviews = [...customerReviews].sort((a, b) => b.date - a.date);

  // Clear existing reviews
  reviewsList.innerHTML = '';

  // Render each review
  sortedReviews.forEach((review, index) => {
    const reviewCard = document.createElement('div');
    reviewCard.className = 'review-card fade-in';
    reviewCard.style.animationDelay = `${index * 0.1}s`;
    
    reviewCard.innerHTML = `
      <div class="review-rating">${generateStars(review.rating)}</div>
      <p class="review-text">"${review.message}"</p>
      <div class="review-author">
        <strong>${review.name}</strong>
        ${review.location ? `<span>${review.location}</span>` : ''}
      </div>
    `;
    
    reviewsList.appendChild(reviewCard);
  });
}

// Handle review form submission
function initReviewForm() {
  const reviewForm = document.getElementById('reviewForm');
  if (!reviewForm) return;

  reviewForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('review-name').value;
    const location = document.getElementById('review-location').value;
    const rating = parseInt(document.getElementById('review-rating').value);
    const message = document.getElementById('review-message').value;

    // Create star rating for WhatsApp
    const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);

    // Format WhatsApp message
    let waMessage = `*New Review Submission*\n\n`;
    waMessage += `*Name:* ${name}\n`;
    if (location) {
      waMessage += `*Location:* ${location}\n`;
    }
    waMessage += `*Rating:* ${stars} (${rating}/5)\n\n`;
    waMessage += `*Review:*\n${message}`;

    // Send to WhatsApp
    const waLink = 'https://wa.me/2349042988669?text=' + encodeURIComponent(waMessage);
    window.open(waLink, '_blank');

    // Add review to the page immediately
    const newReview = {
      name: name,
      location: location || null,
      rating: rating,
      message: message,
      date: new Date()
    };
    
    customerReviews.unshift(newReview); // Add to beginning of array
    renderReviews(); // Re-render all reviews

    // Show success message
    document.querySelector('.review-form').style.display = 'none';
    document.getElementById('review-success').style.display = 'block';

    // Reset form
    reviewForm.reset();

    // Hide success and show form again after 5 seconds
    setTimeout(() => {
      document.querySelector('.review-form').style.display = 'block';
      document.getElementById('review-success').style.display = 'none';
    }, 5000);

    // Scroll to the reviews list
    setTimeout(() => {
      const reviewsList = document.getElementById('reviews-list');
      if (reviewsList) {
        reviewsList.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  });
}

// ============================================
// CONTACT FORM HANDLER
// ============================================
function handleContactForm(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value;
  const email = form.email.value;
  const phone = form.phone.value;
  const message = form.message.value;

  let waMessage = `*New Contact Form Submission*\n\n`;
  waMessage += `*Name:* ${name}\n`;
  waMessage += `*Email:* ${email}\n`;
  if (phone) {
    waMessage += `*Phone:* ${phone}\n`;
  }
  waMessage += `\n*Message:*\n${message}`;

  const waLink = 'https://wa.me/2349042988669?text=' + encodeURIComponent(waMessage);
  window.open(waLink, '_blank');

  // Reset form
  form.reset();
  
  // Show success message (you can add a success div in HTML)
  alert('Thank you for your message! We will get back to you soon.');
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements that should animate on scroll
  document.querySelectorAll('.feature-card, .testimonial-card, .product-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ============================================
// HEADER SCROLL EFFECT
// ============================================
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
  });
}

// ============================================
// INITIALIZE ALL FUNCTIONS ON PAGE LOAD
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  // Initialize mobile menu
  initMobileMenu();
  
  // Initialize shop page (if products exist)
  initShopPage();
  
  // Initialize review system
  renderReviews();
  initReviewForm();
  
  // Initialize smooth scroll
  initSmoothScroll();
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Initialize header scroll effect
  initHeaderScroll();
  
  // Add fade-in class to main content
  document.querySelector('main')?.classList.add('fade-in');
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Format date
function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
}

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ============================================
// EXPORT FOR CONTACT FORM (if needed in HTML)
// ============================================
window.handleContactForm = handleContactForm;