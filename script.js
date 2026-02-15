/**
 * SR Ins - header, mobile drawer, scroll (Lenis – като ACM)
 */
var isAnchorScrolling = false;
var lenis;

document.addEventListener('DOMContentLoaded', function () {
  initializeApp();
});

function initializeApp() {
  initSmoothScroll();
  initMobileDrawer();
  initHeaderScroll();
  initScrollAnimations();
}

function initHeaderScroll() {
  var header = document.getElementById('main-header');
  if (!header) return;
  var lastScrollY = window.scrollY;
  function onScrollMobile() {
    var currentY = window.scrollY;
    var isScrollingDown = currentY > lastScrollY;
    var passedHeader = currentY > 10;
    if (isScrollingDown && passedHeader && !isAnchorScrolling) {
      header.classList.add('hide');
    } else {
      header.classList.remove('hide');
    }
    lastScrollY = currentY;
  }
  function handleScroll() {
    if (window.innerWidth <= 925) {
      onScrollMobile();
    } else {
      header.classList.remove('hide');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', function () {
    header.classList.remove('hide');
    handleScroll();
  });
  handleScroll();
}

function initSmoothScroll() {
  lenis = new Lenis({
    duration: 1,
    easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2 
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    var header = document.getElementById('main-header');
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        var headerHeight = header ? header.offsetHeight : 0;
        lenis.scrollTo(target, {
          offset: -(headerHeight + 10),
          duration: 1.5
        });
        isAnchorScrolling = true;
      }
      setTimeout(function () {
        isAnchorScrolling = false;
      }, 3000);
    });
  });
}

function initMobileDrawer() {
  var header = document.getElementById('main-header');
  var burgerIcon = document.getElementById('burger-icon');
  var drawer = document.getElementById('mobile-drawer');
  var drawerClose = document.getElementById('drawer-close');
  var mobileLinks = drawer ? drawer.querySelectorAll('.mobile-link') : [];

  if (!burgerIcon || !drawer) return;

  function openDrawer() {
    drawer.classList.add('open');
    if (drawerClose) drawerClose.classList.add('open');
    document.body.style.overflow = 'hidden';
    mobileLinks.forEach(function (link, i) {
      link.style.transitionDelay = (i + 1) * 200 + 'ms';
      link.style.opacity = '1';
      link.style.transform = 'translateX(0)';
    });
  }

  function closeDrawer() {
    drawer.classList.remove('animate__fadeInLeft');
    drawer.classList.add('animate__fadeOutLeft');
    if (drawerClose) {
      drawerClose.classList.remove('animate__fadeInLeft');
      drawerClose.classList.add('animate__fadeOutLeft');
    }
    setTimeout(function () {
      drawer.classList.remove('open');
      if (drawerClose) drawerClose.classList.remove('open');
      document.body.style.overflow = '';
      if (header) header.classList.remove('hide');
      drawer.classList.remove('animate__fadeOutLeft');
      drawer.classList.add('animate__fadeInLeft');
      if (drawerClose) {
        drawerClose.classList.remove('animate__fadeOutLeft');
        drawerClose.classList.add('animate__fadeInLeft');
      }
      mobileLinks.forEach(function (link) {
        link.style.opacity = '';
        link.style.transform = '';
        link.style.transitionDelay = '';
      });
    }, 200);
  }

  burgerIcon.addEventListener('click', function (e) {
    e.stopPropagation();
    if (drawer.classList.contains('open')) closeDrawer();
    else openDrawer();
  });

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', closeDrawer);
  });

  if (drawerClose) {
    var xClose = drawerClose.querySelector('.x-close');
    if (xClose) xClose.addEventListener('click', closeDrawer);
  }

  drawer.addEventListener('click', function (e) {
    if (e.target === drawer) closeDrawer();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
  });
}

function initScrollAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo('.service-card', { y: 60, opacity: 0 }, {
    y: 0,
    opacity: 1,
    duration: 0.7,
    stagger: 0.12,
    ease: 'power3.out',
    clearProps: 'transform,opacity',
    scrollTrigger: { trigger: '.services-grid', start: 'top 85%' }
  });

  gsap.utils.toArray('.section-title').forEach(function (title) {
    gsap.fromTo(title, { y: 40, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: { trigger: title, start: 'top 90%' }
    });
  });

  gsap.fromTo('.about-us-value', { y: 50, opacity: 0 }, {
    y: 0,
    opacity: 1,
    duration: 0.7,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.about-us-values', start: 'top 85%' }
  });

  gsap.fromTo('.contact-item', { x: -30, opacity: 0 }, {
    x: 0,
    opacity: 1,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.contact-home-info', start: 'top 85%' }
  });

  gsap.fromTo('.complaints-cta-strip', { y: 30, opacity: 0 }, {
    y: 0,
    opacity: 1,
    duration: 0.7,
    ease: 'power2.out',
    scrollTrigger: { trigger: '.complaints-cta-strip', start: 'top 90%' }
  });
}
