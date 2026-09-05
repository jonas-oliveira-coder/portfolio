// Entry point for interactive elements
console.log('Portfolio initialized.');

// Smooth scroll adjustment for navbar height
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    if(this.getAttribute('href') !== '#') {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target) {
          target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Scroll Reveal Animations
const revealElements = document.querySelectorAll('.reveal');

const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
});

revealElements.forEach(el => {
    scrollObserver.observe(el);
});

// Theme Toggle Logic
const themeBtn = document.getElementById('theme-toggle');
const sunIcon = document.querySelector('.sun-icon');
const moonIcon = document.querySelector('.moon-icon');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.querySelector('.nav-links.mobile-menu');

// Certificate filters
const filterButtons = document.querySelectorAll('.filter-btn');
const certificateCards = document.querySelectorAll('.certificate-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedFilter = button.dataset.filter;

        filterButtons.forEach(filterButton => filterButton.classList.remove('active'));
        button.classList.add('active');

        certificateCards.forEach(card => {
            const shouldShow = selectedFilter === 'all' || card.dataset.category === selectedFilter;
            card.classList.toggle('is-hidden', !shouldShow);
        });
    });
});

const savedTheme = localStorage.getItem('theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'light' || (!savedTheme && !systemDark)) {
    document.documentElement.setAttribute('data-theme', 'light');
    if(sunIcon) sunIcon.style.display = 'none';
    if(moonIcon) moonIcon.style.display = 'block';
} else {
    if(sunIcon) sunIcon.style.display = 'block';
    if(moonIcon) moonIcon.style.display = 'none';
}

if(themeBtn) {
    themeBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'light') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }
    });
}

// Mobile Menu Toggle
if(mobileMenuBtn && navLinks) {
    const navbar = document.querySelector('.navbar');
    mobileMenuBtn.addEventListener('click', () => {
        navbar.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
        });
    });
}

// Carousel & Lightbox Logic
const track = document.getElementById('central-carousel');
if (track) {
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-btn.next');
    const prevButton = document.querySelector('.carousel-btn.prev');
    const dotsNav = document.querySelector('.carousel-dots');
    const dots = dotsNav ? Array.from(dotsNav.children) : [];

    let currentSlideIndex = 0;

    const updateCarousel = (index) => {
        track.style.transform = `translateX(-${index * 100}%)`;
        if(dots.length > 0) {
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
        }
    };

    if(nextButton) {
        nextButton.addEventListener('click', () => {
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            updateCarousel(currentSlideIndex);
        });
    }

    if(prevButton) {
        prevButton.addEventListener('click', () => {
            currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
            updateCarousel(currentSlideIndex);
        });
    }

    if(dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlideIndex = index;
                updateCarousel(currentSlideIndex);
            });
        });
    }

    // Auto-play
    let autoSlide = setInterval(() => {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        updateCarousel(currentSlideIndex);
    }, 4000);

    track.addEventListener('mouseenter', () => clearInterval(autoSlide));
    track.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            updateCarousel(currentSlideIndex);
        }, 4000);
    });

    // Lightbox Logic
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');

    let lightboxIndex = 0;

    const updateLightbox = (index) => {
        lightboxIndex = index;
        lightboxImg.src = slides[index].src;
    };

    if (lightbox && lightboxImg) {
        slides.forEach((slide, index) => {
            slide.addEventListener('click', () => {
                lightbox.style.display = 'flex';
                updateLightbox(index);
                document.documentElement.classList.add('no-scroll');
                document.body.classList.add('no-scroll');
            });
        });

        const closeLightbox = () => {
            lightbox.style.display = 'none';
            document.documentElement.classList.remove('no-scroll');
            document.body.classList.remove('no-scroll');
        };

        if(lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        
        if(lightboxPrev) {
            lightboxPrev.addEventListener('click', (e) => {
                e.stopPropagation();
                lightboxIndex = (lightboxIndex - 1 + slides.length) % slides.length;
                updateLightbox(lightboxIndex);
            });
        }

        if(lightboxNext) {
            lightboxNext.addEventListener('click', (e) => {
                e.stopPropagation();
                lightboxIndex = (lightboxIndex + 1) % slides.length;
                updateLightbox(lightboxIndex);
            });
        }

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.classList.contains('lightbox')) {
                closeLightbox();
            }
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (lightbox.style.display === 'flex') {
                if (e.key === 'ArrowRight') updateLightbox((lightboxIndex + 1) % slides.length);
                if (e.key === 'ArrowLeft') updateLightbox((lightboxIndex - 1 + slides.length) % slides.length);
                if (e.key === 'Escape') closeLightbox();
            }
        });

        // Swipe support inside Lightbox
        let lbStartX = 0;
        lightbox.addEventListener('touchstart', e => lbStartX = e.changedTouches[0].clientX, {passive: true});
        lightbox.addEventListener('touchend', e => {
            let endX = e.changedTouches[0].clientX;
            const diff = lbStartX - endX;
            if (Math.abs(diff) > 40) {
                if (diff > 0) updateLightbox((lightboxIndex + 1) % slides.length);
                else updateLightbox((lightboxIndex - 1 + slides.length) % slides.length);
            }
        }, {passive: true});
    }

    // Carousel Swipe support
    let touchStartX = 0;
    track.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX, {passive: true});
    track.addEventListener('touchend', e => {
        let touchEndX = e.changedTouches[0].screenX;
        if (touchStartX - touchEndX > 50) {
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            updateCarousel(currentSlideIndex);
        } else if (touchEndX - touchStartX > 50) {
            currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
            updateCarousel(currentSlideIndex);
        }
    }, {passive: true});
}

// Parallax slight effect
document.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.bg-shape');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 20;
        shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});
