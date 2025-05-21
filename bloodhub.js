document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  initScrollEffects();
  initSlideshows();
  initAnimations();
  initMobileNav();
  initSmoothScrolling();
  convertSectionsToSlideshows();
});

// Handle scroll effects
function initScrollEffects() {
  const header = document.querySelector('header');
  const revealElements = document.querySelectorAll('.reveal');
  
  window.addEventListener('scroll', function() {
    // Sticky header
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Reveal elements on scroll
    revealElements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementTop < windowHeight - 100) {
        element.classList.add('active');
      }
    });
  });
  
  // Trigger initial scroll to activate elements already in view
  window.dispatchEvent(new Event('scroll'));
}

// Initialize slideshows
function initSlideshows() {
  const slideshows = document.querySelectorAll('.slideshow-container');
  
  slideshows.forEach((slideshow, index) => {
    const slides = slideshow.querySelector('.slideshow');
    const slideItems = slideshow.querySelectorAll('.slide');
    const dotsContainer = slideshow.querySelector('.slideshow-nav');
    const prevBtn = slideshow.querySelector('.slideshow-prev');
    const nextBtn = slideshow.querySelector('.slideshow-next');
    
    let currentSlide = 0;
    
    // Create dots if they don't exist
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      slideItems.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('slideshow-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      });
    }
    
    // Set up navigation buttons
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slideItems.length) % slideItems.length;
        updateSlideshow();
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slideItems.length;
        updateSlideshow();
      });
    }
    
    // Auto play slideshow
    const autoplayInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % slideItems.length;
      updateSlideshow();
    }, 5000);
    
    // Pause on hover
    slideshow.addEventListener('mouseenter', () => {
      clearInterval(autoplayInterval);
    });
    
    slideshow.addEventListener('mouseleave', () => {
      clearInterval(autoplayInterval);
      // Start auto play again
      setInterval(() => {
        currentSlide = (currentSlide + 1) % slideItems.length;
        updateSlideshow();
      }, 5000);
    });
    
    // Go to specific slide
    function goToSlide(index) {
      currentSlide = index;
      updateSlideshow();
    }
    
    // Update slideshow position
    function updateSlideshow() {
      slides.style.transform = `translateX(-${currentSlide * 100}%)`;
      
      // Update dots
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.slideshow-dot');
        dots.forEach((dot, i) => {
          if (i === currentSlide) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }
    }
  });
}

// Initialize animations
function initAnimations() {
  // Add animation classes to elements
  const sectionTitles = document.querySelectorAll('.section-title');
  const overviewContent = document.querySelector('.overview-content');
  const personaImages = document.querySelectorAll('.persona-image');
  const findingCards = document.querySelectorAll('.finding-card');
  
  // Add animation classes
  sectionTitles.forEach(title => {
    title.classList.add('reveal');
  });
  
  if (overviewContent) {
    overviewContent.classList.add('reveal');
  }
  
  personaImages.forEach((image, index) => {
    image.classList.add('reveal');
    image.style.animationDelay = `${index * 0.2}s`;
  });
  
  findingCards.forEach((card, index) => {
    card.classList.add('reveal');
    card.style.animationDelay = `${index * 0.2}s`;
  });
}

// Mobile navigation
function initMobileNav() {
  const navToggle = document.createElement('div');
  navToggle.classList.add('nav-toggle');
  navToggle.innerHTML = '<span></span><span></span><span></span>';
  
  const navContainer = document.querySelector('.nav-container');
  const navLinks = document.querySelector('.nav-links');
  
  if (navContainer && navLinks) {
    navContainer.insertBefore(navToggle, navLinks);
    
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }
  
  // Add mobile nav styles
  const style = document.createElement('style');
  style.textContent = `
    @media (max-width: 768px) {
      .nav-links {
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        background-color: #fff;
        flex-direction: column;
        padding: 20px 0;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        clip-path: circle(0% at 100% 0);
        transition: all 0.4s ease-out;
        opacity: 0;
        visibility: hidden;
      }
      
      .nav-links.active {
        clip-path: circle(150% at 100% 0);
        opacity: 1;
        visibility: visible;
      }
      
      .nav-links li {
        margin: 10px 0;
      }
      
      .nav-toggle {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 30px;
        height: 22px;
        cursor: pointer;
      }
      
      .nav-toggle span {
        display: block;
        width: 100%;
        height: 3px;
        background-color: var(--primary-color);
        transition: all 0.3s ease;
      }
      
      .nav-toggle.active span:nth-child(1) {
        transform: translateY(9px) rotate(45deg);
      }
      
      .nav-toggle.active span:nth-child(2) {
        opacity: 0;
      }
      
      .nav-toggle.active span:nth-child(3) {
        transform: translateY(-9px) rotate(-45deg);
      }
      
      .dropdown-menu {
        position: static;
        opacity: 1;
        visibility: visible;
        transform: none;
        width: 100%;
        box-shadow: none;
        padding: 0;
        margin-top: 10px;
        background-color: var(--light-gray);
      }
      
      .dropdown-menu li {
        padding: 8px 30px;
      }
    }
  `;
  
  document.head.appendChild(style);
}

// Smooth scrolling
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');
  
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
        
        window.scrollTo({
          top: offsetTop - 80, // Account for fixed header
          behavior: 'smooth'
        });
      }
    });
  });
}

// Convert certain sections to slideshows
function convertSectionsToSlideshows() {
  // Convert persona images to slideshow
  convertToSlideshow('.persona-images', '.persona-image');
  
  // Convert mockup before/after to slideshow
  convertToSlideshow('.mockup-column', '.mockup-image');
}

function convertToSlideshow(containerSelector, slideSelector) {
  const container = document.querySelector(containerSelector);
  
  if (container) {
    const slides = container.querySelectorAll(slideSelector);
    
    if (slides.length > 1) {
      // Create slideshow structure
      const slideshowContainer = document.createElement('div');
      slideshowContainer.classList.add('slideshow-container');
      
      const slideshow = document.createElement('div');
      slideshow.classList.add('slideshow');
      
      const navDots = document.createElement('div');
      navDots.classList.add('slideshow-nav');
      
      const prevBtn = document.createElement('div');
      prevBtn.classList.add('slideshow-prev');
      prevBtn.innerHTML = '&#10094;';
      
      const nextBtn = document.createElement('div');
      nextBtn.classList.add('slideshow-next');
      nextBtn.innerHTML = '&#10095;';
      
      // Wrap each slide in a slide container
      slides.forEach(slide => {
        const slideContainer = document.createElement('div');
        slideContainer.classList.add('slide');
        
        // Clone the slide and append to the new container
        const clonedSlide = slide.cloneNode(true);
        slideContainer.appendChild(clonedSlide);
        
        // Add the slide to the slideshow
        slideshow.appendChild(slideContainer);
      });
      
      // Build the slideshow structure
      slideshowContainer.appendChild(slideshow);
      slideshowContainer.appendChild(prevBtn);
      slideshowContainer.appendChild(nextBtn);
      slideshowContainer.appendChild(navDots);
      
      // Replace the original container with the slideshow
      container.parentNode.replaceChild(slideshowContainer, container);
    }
  }
}

// Add parallax effect to cover section
window.addEventListener('scroll', function() {
  const coverSection = document.querySelector('.cover-section');
  const coverPhoto = document.querySelector('.cover-photo');
  
  if (coverSection && coverPhoto) {
    const scrollPosition = window.pageYOffset;
    const speed = 0.5;
    
    coverPhoto.style.transform = `translateY(${scrollPosition * speed}px)`;
  }
});

// Add animation to section titles
document.addEventListener('scroll', function() {
  const titles = document.querySelectorAll('.section-title');
  
  titles.forEach(title => {
    const titleTop = title.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (titleTop < windowHeight - 50) {
      title.classList.add('reveal-title');
    }
  });
});

// // Add before/after image comparison slider
// function initBeforeAfterSliders() {
//   const sliders = document.querySelectorAll('.before-after-container');
  
//   sliders.forEach(slider => {
//     const before = slider.querySelector('.before-image');
//     const after = slider.querySelector('.after-image');
//     const resizer = slider.querySelector('.resizer');
    
//     let isResizing = false;
    
//     // Set initial position
//     resizer.style.left = '50%';
//     after.style.width = '50%';
    
//     // Add mouse events
//     resizer.addEventListener('mousedown', function(e) {
//       isResizing = true;
//       e.preventDefault();
//     });
    
//     document.addEventListener('mouseup', function() {
//       isResizing = false;
//     });
    
    