// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');
const pricingTabs = document.querySelectorAll('.pricing-tab');
const pricingPanels = document.querySelectorAll('.pricing-panel');

// ===== Navbar Scroll Effect =====
window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  if (currentScroll > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }

  // Active nav link based on scroll position
  const sections = document.querySelectorAll('section[id]');
  sections.forEach(section => {
    const top = section.offsetTop - 120;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');

    if (currentScroll >= top && currentScroll < bottom) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + id) {
          link.classList.add('active');
        }
      });
    }
  });
});

// ===== Mobile Menu Toggle =====
navToggle.addEventListener('click', () => {
  navToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// ===== Pricing Tabs =====
pricingTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    pricingTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    pricingPanels.forEach(panel => panel.classList.remove('active'));
    document.getElementById('panel-' + target).classList.add('active');
  });
});

// ===== Scroll Reveal Animation =====
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ===== Counter Animation =====
const counters = document.querySelectorAll('.stat-number');
let counterAnimated = false;

const animateCounters = () => {
  if (counterAnimated) return;

  counters.forEach(counter => {
    const target = parseInt(counter.dataset.count);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  });

  counterAnimated = true;
};

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) animateCounters();
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ===== Gallery Strip - Duplicate images for seamless loop =====
const galleryScroll = document.querySelector('.gallery-scroll');
if (galleryScroll) {
  const images = galleryScroll.innerHTML;
  galleryScroll.innerHTML = images + images;
}

// ===== Form Handling =====
const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(quoteForm);
    const data = Object.fromEntries(formData);

    const subject = encodeURIComponent('Quote Request - ' + (data.service || 'General'));
    const body = encodeURIComponent(
      `Name: ${data.firstName} ${data.lastName}\n` +
      `Email: ${data.email}\n` +
      `Phone: ${data.phone || 'Not provided'}\n` +
      `Service: ${data.service}\n` +
      `Vehicle/Machine: ${data.vehicle || 'Not specified'}\n\n` +
      `Message:\n${data.message}`
    );

    window.location.href = `mailto:shredshedrepairs@gmail.com?subject=${subject}&body=${body}`;

    const btn = quoteForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-check"></i> Opening Email Client...';
    btn.style.background = '#333';

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
    }, 3000);
  });
}

// ===== Smooth Parallax for Hero =====
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero-bg');
  if (hero) {
    const scrolled = window.scrollY;
    hero.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
});

// ===== Trigger initial reveals for elements already in viewport =====
window.addEventListener('load', () => {
  setTimeout(() => {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('active');
      }
    });
  }, 100);
});
