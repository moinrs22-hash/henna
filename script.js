/**
 * HENNA BY MANTASHA - LUXURY JAVASCRIPT CONTROLLER
 * Contact: +91 8104593452 | Location: Mumbai
 * Instagram: https://www.instagram.com/henna_by_mantasha_?stkn=NTJucHJyaHJtaGV3
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initNavbarScroll();
  initMobileMenu();
  initScrollReveal();
  initGallerySystem();
  initBookingCalculator();
  initTiltEffect();
});

/* ==========================================================================
   1. GOLDEN GLITTER & SHIMMER CANVAS
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(width < 768 ? 25 : 55, 60);
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.2 + 0.6,
      color: Math.random() > 0.3 ? '#f7e098' : '#d4af37',
      opacity: Math.random() * 0.7 + 0.2,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.5 - 0.15,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      angle: Math.random() * Math.PI * 2
    });
  }

  let mouseX = -1000;
  let mouseY = -1000;
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach((p) => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.angle += p.pulseSpeed;

      // Mouse gentle repulsion / twinkle
      const dx = mouseX - p.x;
      const dy = mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        p.x -= (dx / dist) * 1.2;
        p.y -= (dy / dist) * 1.2;
      }

      // Loop around screen
      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      const currentOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.angle));

      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = currentOpacity;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#d4af37';
      ctx.fill();
      ctx.restore();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. NAVBAR & MOBILE DRAWER
   ========================================================================== */
function initNavbarScroll() {
  const nav = document.getElementById('luxuryNav');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileNavDrawer');
  if (!menuBtn || !drawer) return;

  menuBtn.addEventListener('click', () => {
    drawer.classList.toggle('open');
    const isOpen = drawer.classList.contains('open');
    menuBtn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  });

  drawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
}

/* ==========================================================================
   3. SCROLL REVEAL (INTERSECTION OBSERVER)
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-item');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => observer.observe(el));
}

/* ==========================================================================
   4. CURATED GALLERY & VIDEO REELS
   ========================================================================== */
const GALLERY_MEDIA_ITEMS = [
  {
    id: 'm_1',
    type: 'photo',
    title: 'Royal Rose Backhand Mandala',
    category: 'arabic',
    url: 'images/backhand-roses-henna.jpg'
  },
  {
    id: 'm_2',
    type: 'photo',
    title: 'Delicate Floral Palm & Fingertip Vines',
    category: 'bridal',
    url: 'images/palm-floral-henna.jpg'
  },
  {
    id: 'm_3',
    type: 'photo',
    title: 'Signature Bridal Masterpiece Showcase',
    category: 'bridal',
    url: 'images/bridal-collage-henna.jpg'
  },
  {
    id: 'm_4',
    type: 'photo',
    title: 'Mantasha Signature Rose & Henna Pose',
    category: 'bridal',
    url: 'images/mantasha-artist.jpg'
  },
  {
    id: 'm_5',
    type: 'photo',
    title: 'Couture Rose Backhand Silhouette',
    category: 'siders',
    url: 'images/mantasha-aesthetic.jpg'
  },
  {
    id: 'm_6',
    type: 'video',
    title: 'Bridal Henna Cone Flow & Detail Reel',
    category: 'videos',
    url: 'vedio1.mp4'
  },
  {
    id: 'm_7',
    type: 'video',
    title: 'Signature Arabic Cone Flow Reel',
    category: 'videos',
    url: 'vedio2.mp4'
  },
  {
    id: 'm_8',
    type: 'photo',
    title: 'Dubai Gulf Floral Statement',
    category: 'arabic',
    url: 'img5.jpeg'
  },
  {
    id: 'm_9',
    type: 'photo',
    title: 'Intricate Bridal Feet Mehndi',
    category: 'bridal',
    url: 'img8.jpeg'
  }
];

let currentFilter = 'all';

function initGallerySystem() {
  // Clear any old test uploads from browser storage
  try {
    localStorage.removeItem('henna_by_mantasha_media');
  } catch (e) {}

  renderGalleryGrid();
  setupGalleryFilters();
  setupLightbox();
}

function renderGalleryGrid() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  const filtered =
    currentFilter === 'all'
      ? GALLERY_MEDIA_ITEMS
      : GALLERY_MEDIA_ITEMS.filter(
          (m) => m.category === currentFilter || (currentFilter === 'videos' && m.type === 'video')
        );

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
        <i class="fas fa-camera" style="font-size: 2.5rem; color: var(--gold-light); opacity: 0.5; margin-bottom: 12px; display: block;"></i>
        <h4 style="font-family: var(--font-royal); font-size: 1.3rem;">No media in this category</h4>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered
    .map((item) => {
      const isVid = item.type === 'video';

      return `
      <div class="gallery-card" data-id="${item.id}" data-type="${item.type}" data-url="${escapeHtml(item.url)}" data-title="${escapeHtml(item.title)}" data-category="${item.category}">
        <div class="gallery-media-wrapper">
          ${
            isVid
              ? `<video src="${escapeHtml(item.url)}" muted loop playsinline preload="metadata"></video>
                 <div class="video-play-indicator"><i class="fas fa-play"></i></div>`
              : `<img src="${escapeHtml(item.url)}" alt="${escapeHtml(item.title)}" loading="lazy" />`
          }
        </div>
        <div class="media-badge-pill">
          <i class="${isVid ? 'fas fa-video' : 'fas fa-camera'}"></i>
          <span>${isVid ? 'Video Reel' : item.category}</span>
        </div>
        <div class="gallery-card-overlay">
          <h4>${escapeHtml(item.title)}</h4>
          <p>${escapeHtml(item.category)} collection</p>
        </div>
      </div>
    `;
    })
    .join('');

  // Attach Lightbox click listeners
  grid.querySelectorAll('.gallery-card').forEach((card) => {
    card.addEventListener('click', () => {
      const type = card.getAttribute('data-type');
      const url = card.getAttribute('data-url');
      const title = card.getAttribute('data-title');
      const category = card.getAttribute('data-category');
      openLightbox({ type, url, title, category });
    });
  });
}

function setupGalleryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      renderGalleryGrid();
    });
  });
}

/* Lightbox Modal */
function setupLightbox() {
  const modal = document.getElementById('lightboxModal');
  const closeBtn = document.getElementById('closeLightboxBtn');
  if (!modal || !closeBtn) return;

  closeBtn.addEventListener('click', closeLightbox);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeLightbox();
    }
  });
}

function openLightbox(item) {
  const modal = document.getElementById('lightboxModal');
  const mediaContainer = document.getElementById('lightboxMediaContainer');
  const titleEl = document.getElementById('lightboxTitle');
  const inquireBtn = document.getElementById('lightboxInquireBtn');
  if (!modal || !mediaContainer) return;

  if (item.type === 'video') {
    mediaContainer.innerHTML = `<video src="${escapeHtml(item.url)}" controls autoplay loop playsinline style="max-height:70vh; width:100%;"></video>`;
  } else {
    mediaContainer.innerHTML = `<img src="${escapeHtml(item.url)}" alt="${escapeHtml(item.title)}" style="max-height:70vh; width:auto; margin:0 auto;" />`;
  }

  if (titleEl) {
    titleEl.textContent = item.title;
  }

  if (inquireBtn) {
    const text = encodeURIComponent(
      `Hi Mantasha! I loved this design from your website gallery: "${item.title}" (${item.category}). Could you share details & availability for Mumbai booking?`
    );
    inquireBtn.href = `https://wa.me/9180907053485?text=${text}`;
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  const mediaContainer = document.getElementById('lightboxMediaContainer');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
  if (mediaContainer) {
    mediaContainer.innerHTML = '';
  }
}

/* ==========================================================================
   5. INTERACTIVE BOOKING CALCULATOR & DIRECT WHATSAPP SENDER
   ========================================================================== */
function initBookingCalculator() {
  const form = document.getElementById('bookingCalculatorForm');
  if (!form) return;

  const serviceInputs = form.querySelectorAll('input[name="calcService"]');
  const peopleCountInput = document.getElementById('calcPeopleCount');
  const locationSelect = document.getElementById('calcLocationSelect');
  const dateInput = document.getElementById('calcDateInput');

  const summaryService = document.getElementById('summaryServiceName');
  const summaryLocation = document.getElementById('summaryLocationName');
  const summaryPeople = document.getElementById('summaryPeopleVal');
  const summaryEstimatedPrice = document.getElementById('summaryEstimatedPrice');
  const whatsappSubmitBtn = document.getElementById('btnSendBookingWhatsApp');

  const baseRates = {
    bridal_royal: { name: 'Royal Bridal Full Package', price: 9999 },
    engagement: { name: 'Engagement & Sangeet', price: 3499 },
    arabic: { name: 'Dubai & Arabic Gulf Style', price: 1999 },
    siders: { name: 'Minimalist / Siders Chic', price: 1199 },
    guest: { name: 'Family & Guest Mehndi Team', price: 4999 }
  };

  function recalculate() {
    let selectedKey = 'bridal_royal';
    serviceInputs.forEach((input) => {
      if (input.checked) selectedKey = input.value;
    });

    const serviceData = baseRates[selectedKey] || baseRates.bridal_royal;
    const people = parseInt(peopleCountInput.value, 10) || 1;
    const location = locationSelect.value || 'Mumbai';
    const dateVal = dateInput.value || 'Flexible';

    let total = serviceData.price;
    if (selectedKey === 'arabic' || selectedKey === 'siders') {
      total = serviceData.price * people;
    } else if (selectedKey === 'guest') {
      total = serviceData.price + (people > 5 ? (people - 5) * 600 : 0);
    }

    if (summaryService) summaryService.textContent = serviceData.name;
    if (summaryLocation) summaryLocation.textContent = location;
    if (summaryPeople) summaryPeople.textContent = `${people} Person${people > 1 ? 's' : ''}`;
    if (summaryEstimatedPrice) summaryEstimatedPrice.textContent = `₹${total.toLocaleString('en-IN')}+`;

    // Construct WhatsApp message
    const message = `✨ *HENNA BY MANTASHA - BOOKING INQUIRY* ✨
--------------------------------
Hello Mantasha! I would like to check your availability for an upcoming booking in Mumbai:

👑 *Service*: ${serviceData.name}
📍 *Location*: ${location}
📅 *Preferred Date*: ${dateVal}
👥 *Number of Persons*: ${people}
💰 *Estimated Budget*: ₹${total.toLocaleString('en-IN')}+

Please let me know if this date is available. Looking forward to your reply!`;

    if (whatsappSubmitBtn) {
      whatsappSubmitBtn.href = `https://wa.me/9180907053485?text=${encodeURIComponent(message)}`;
    }
  }

  serviceInputs.forEach((input) => input.addEventListener('change', recalculate));
  if (peopleCountInput) peopleCountInput.addEventListener('input', recalculate);
  if (locationSelect) locationSelect.addEventListener('change', recalculate);
  if (dateInput) dateInput.addEventListener('change', recalculate);

  // Initial calculation
  recalculate();
}

/* ==========================================================================
   6. 3D CARD TILT EFFECT (FOR LUXURY POLISH)
   ========================================================================== */
function initTiltEffect() {
  const cards = document.querySelectorAll('.service-card, .artist-portrait-card');
  if (window.innerWidth < 992) return;

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

/* Helper to prevent XSS in dynamic renders */
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
