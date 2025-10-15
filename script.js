document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-menu a');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(10, 14, 39, 0.98)';
    } else {
      navbar.style.background = 'rgba(10, 14, 39, 0.95)';
    }
  });

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // ←--- only this block changed (preventDefault now only for hash/# links) --->
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // If it's an in-page anchor (starts with '#'), handle smooth scroll and prevent default.
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }

        // close mobile menu after clicking an anchor
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
      // If href is like "About.html" or any external/page link, do NOT preventDefault —
      // allow the browser to navigate normally.
    });
  });

  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        
        if (entry.target.classList.contains('skill-item')) {
          const progressBar = entry.target.querySelector('.skill-progress');
          if (progressBar) {
            const width = progressBar.style.width;
            progressBar.style.width = '0';
            setTimeout(() => {
              progressBar.style.width = width;
            }, 100);
          }
        }
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.service-card, .skill-item, .project-card, .blog-card, .tool-card');
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });
  
  animatedElements.forEach(el => {
    observer.observe(el);
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        const target = document.querySelector(href);
        const offsetTop = target.offsetTop - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
});
