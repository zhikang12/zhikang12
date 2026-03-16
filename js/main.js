// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');

  if (navToggle) {
    navToggle.addEventListener('click', function() {
      nav.classList.toggle('open');
      // Animate hamburger
      this.classList.toggle('active');
    });

    // Close nav when clicking a link (mobile)
    nav.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        nav.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  // Scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.pillar-card, .guideline-card, .team-card, .service-card, .research-item, .advocacy-card, .contact-card, .stat-item').forEach(function(el) {
    observer.observe(el);
  });

  // Smooth counter animation for stats
  function animateCounters() {
    document.querySelectorAll('.stat-number').forEach(function(counter) {
      var target = parseInt(counter.getAttribute('data-count'));
      if (!target) return;
      var duration = 2000;
      var start = 0;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = Math.floor(eased * target).toLocaleString();
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          counter.textContent = target.toLocaleString();
          var suffix = counter.getAttribute('data-suffix');
          if (suffix) counter.textContent += suffix;
        }
      }

      requestAnimationFrame(step);
    });
  }

  // Trigger counter animation when stats section is visible
  var statsSection = document.querySelector('.stats');
  if (statsSection) {
    var statsObserver = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) {
        animateCounters();
        statsObserver.unobserve(statsSection);
      }
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
  }

  // Active nav link highlight
  var currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach(function(link) {
    var href = link.getAttribute('href').split('/').pop();
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  // Newsletter form handling
  var newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      var input = this.querySelector('input');
      if (input.value) {
        alert('Thank you for subscribing! We will keep you updated.');
        input.value = '';
      }
    });
  }

  // Contact form handling
  var contactForm = document.querySelector('.contact-form form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for your message! We will get back to you soon.');
      this.reset();
    });
  }
});
