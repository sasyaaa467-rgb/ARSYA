/**
 * Portofolio Siti Rizquna Zulia Arsya
 * JavaScript Interactivity & Dynamic Features
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const navbar = document.getElementById('navbar');
  const navMenu = document.getElementById('nav-menu');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const hamburgerIcon = document.getElementById('hamburger-icon');
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const contactForm = document.getElementById('contact-form');
  const toastBox = document.getElementById('toast-notification');
  const toastMessage = document.getElementById('toast-message');

  /* ===================================================
     1. THEME TOGGLE (DARK / LIGHT MODE)
     =================================================== */
  const savedTheme = localStorage.getItem('arsya_portfolio_theme') || 'dark';
  applyTheme(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    localStorage.setItem('arsya_portfolio_theme', newTheme);
    showToast(`Tema beralih ke mode ${newTheme === 'dark' ? 'gelap' : 'terang'}`);
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      themeIcon.className = 'fa-solid fa-moon';
      themeToggleBtn.title = 'Ubah ke Mode Terang';
    } else {
      themeIcon.className = 'fa-solid fa-sun';
      themeToggleBtn.title = 'Ubah ke Mode Gelap';
    }
  }

  /* ===================================================
     2. NAVBAR SCROLL EFFECT
     =================================================== */
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* ===================================================
     3. MOBILE NAVIGATION DRAWER
     =================================================== */
  hamburgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    if (navMenu.classList.contains('open')) {
      hamburgerIcon.className = 'fa-solid fa-xmark';
    } else {
      hamburgerIcon.className = 'fa-solid fa-bars';
    }
  });

  // Close mobile menu on nav link click
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburgerIcon.className = 'fa-solid fa-bars';
    });
  });

  /* ===================================================
     4. ACTIVE NAV LINK ON SCROLL (INTERSECTION OBSERVER)
     =================================================== */
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  /* ===================================================
     5. PORTFOLIO FILTERING
     =================================================== */
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  /* ===================================================
     6. CONTACT FORM INTERACTIVITY & WHATSAPP REDIRECT
     =================================================== */
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('sender-name').value.trim();
      const subject = document.getElementById('sender-subject').value.trim();
      const message = document.getElementById('sender-message').value.trim();

      if (!name || !subject || !message) {
        showToast('Mohon lengkapi semua kolom formulir!');
        return;
      }

      // Format WhatsApp Message
      const waNumber = '6288290773644';
      const formattedMessage = `Halo Siti Rizquna Zulia Arsya,%0A%0A` +
        `*Nama:* ${encodeURIComponent(name)}%0A` +
        `*Keperluan:* ${encodeURIComponent(subject)}%0A` +
        `*Pesan:*%0A${encodeURIComponent(message)}%0A%0A` +
        `_(Pesan dikirim melalui Portofolio Web Arsya)_`;

      const waUrl = `https://wa.me/${waNumber}?text=${formattedMessage}`;

      showToast('Meneruskan pesan Anda ke WhatsApp Arsya...');

      setTimeout(() => {
        window.open(waUrl, '_blank');
        contactForm.reset();
      }, 700);
    });
  }

  /* ===================================================
     7. TOAST NOTIFICATION HELPER
     =================================================== */
  let toastTimeout;
  function showToast(msg, duration = 3000) {
    if (!toastBox) return;
    toastMessage.textContent = msg;
    toastBox.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastBox.classList.remove('show');
    }, duration);
  }
});
