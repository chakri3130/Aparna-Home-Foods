// ============================================
// APARNA HOME FOODS - JAVASCRIPT
// Interactive functionality for the website
// ============================================

// ============================================
// MOBILE NAVIGATION TOGGLE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
      
      // Animate hamburger menu
      const spans = navToggle.querySelectorAll('span');
      navToggle.classList.toggle('active');
      
      // Prevent body scroll when menu is open
      if (navMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
    
    // Close menu when clicking on a nav link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    });
  }
});

// ============================================
// STICKY HEADER ON SCROLL
// ============================================
window.addEventListener('scroll', function() {
  const header = document.getElementById('header');
  
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Only prevent default for internal anchors, not #
    if (href !== '#' && href.length > 1) {
      const target = document.querySelector(href);
      
      if (target) {
        e.preventDefault();
        const headerOffset = 80; // Account for fixed header
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// ============================================
// CONTACT FORM - WHATSAPP INTEGRATION
// ============================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Validate inputs
    if (!name || !phone || !message) {
      alert('Please fill in all fields');
      return;
    }
    
    // Create WhatsApp message
    const whatsappMessage = `Hi! My name is ${name}.\n\nPhone: ${phone}\n\nMessage: ${message}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/919876543210?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
    
    // Reset form
    contactForm.reset();
  });
}

// ============================================
// LAZY LOADING FOR IMAGES
// ============================================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        
        // If image has data-src, load it
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        
        img.classList.add('fade-in');
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px'
  });

  // Observe all images
  document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
  });
}

// ============================================
// FADE IN ANIMATIONS ON SCROLL
// ============================================
if ('IntersectionObserver' in window) {
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  // Observe elements with fade-in class that don't have it applied yet
  document.querySelectorAll('.card, .product-card, .testimonial, .benefit-item').forEach(el => {
    fadeObserver.observe(el);
  });
}

// ============================================
// TRACK WHATSAPP CLICKS (ANALYTICS)
// ============================================
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
  link.addEventListener('click', function() {
    // Simple analytics tracking
    console.log('WhatsApp button clicked:', this.getAttribute('href'));
    
    // You can integrate with Google Analytics or other tracking here
    if (typeof gtag !== 'undefined') {
      gtag('event', 'whatsapp_click', {
        'event_category': 'engagement',
        'event_label': this.innerText || 'WhatsApp Button'
      });
    }
  });
});

// ============================================
// ACTIVE NAV LINK HIGHLIGHTING
// ============================================
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    
    if (linkPage === currentPage || 
        (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Set active link on page load
setActiveNavLink();

// ============================================
// CONSOLE BRANDING
// ============================================
console.log('%c🌿 Aparna Home Foods', 'color: #6B4423; font-size: 24px; font-weight: bold;');
console.log('%cA 35+ year legacy of traditional homemade foods', 'color: #7A9D54; font-size: 14px;');
console.log('%cWebsite built with ❤️ for tradition', 'color: #D4AF37; font-size: 12px;');

// ============================================
// PERFORMANCE MONITORING
// ============================================
window.addEventListener('load', function() {
  // Log page load time
  const loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
  console.log(`Page loaded in ${loadTime}ms`);
  
  // Warn if load time is slow
  if (loadTime > 3000) {
    console.warn('Page load time is slower than expected. Consider optimizing images.');
  }
});
