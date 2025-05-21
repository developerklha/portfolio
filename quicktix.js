document.addEventListener('DOMContentLoaded', function() {
  // Header scroll effect
  const header = document.querySelector('.main-header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Scroll reveal animations
  const fadeElems = document.querySelectorAll('.section-title, .overview-image, .persona-image, .wireframe-image, .finding-card, .accessibility-card, .prototype-image');
  
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in', 'active');
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });
  
  fadeElems.forEach(elem => {
    elem.classList.add('fade-in');
    fadeInObserver.observe(elem);
  });
});