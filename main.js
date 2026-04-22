// Entry point for interactive elements later
console.log('Portfolio initialized.');

// Optional: Smooth scroll adjustment for navbar height
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    if(this.getAttribute('href') !== '#') {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});
