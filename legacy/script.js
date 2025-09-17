const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const yearEl = document.getElementById('year');

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

const revealEls = document.querySelectorAll('.about-card, .service-card, .insight-card, .timeline .content, .timeline .marker');
revealEls.forEach((el) => observer.observe(el));

const heroCards = document.querySelectorAll('.hero-card, .badge, .hero-text');
heroCards.forEach((el, index) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  setTimeout(() => {
    el.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, 200 + index * 120);
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const targetId = anchor.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;
    event.preventDefault();
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.classList.add('submitted');
    form.reset();
    alert('Thanks for reaching out! We will be in touch within one business day.');
  });
}
