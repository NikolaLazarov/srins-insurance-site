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
  var hamburger = document.getElementById('hamburger');
  var burgerIcon = document.getElementById('burger-icon');
  var drawer = document.getElementById('mobile-drawer');
  var drawerClose = document.getElementById('drawer-close');
  var mobileLinks = drawer ? drawer.querySelectorAll('.mobile-link') : [];

  function openDrawer() {
    if (!drawer) return;
    drawer.classList.remove('closing');
    if (drawerClose) drawerClose.classList.remove('closing');
    drawer.classList.add('open');
    if (drawerClose) drawerClose.classList.add('open');
    document.body.style.overflow = 'hidden';
    mobileLinks.forEach(function (link, i) {
      link.style.transitionDelay = (i + 1) * 80 + 'ms';
      link.style.opacity = '1';
      link.style.transform = 'translateX(0)';
    });
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.add('closing');
    if (drawerClose) drawerClose.classList.add('closing');
    drawer.classList.remove('open');
    if (drawerClose) drawerClose.classList.remove('open');
    document.body.style.overflow = '';
    mobileLinks.forEach(function (link) {
      link.style.opacity = '';
      link.style.transform = '';
      link.style.transitionDelay = '';
    });
    setTimeout(function () {
      drawer.classList.remove('closing');
      if (drawerClose) drawerClose.classList.remove('closing');
    }, 400);
  }

  if (burgerIcon && drawer) {
    var toggle = document.querySelector('.hamburger');
    if (toggle) {
      toggle.addEventListener('click', function () {
        if (drawer.classList.contains('open')) closeDrawer();
        else openDrawer();
      });
    }
    mobileLinks.forEach(function (link) {
      link.addEventListener('click', closeDrawer);
    });
    if (drawerClose) {
      drawerClose.addEventListener('click', function (e) {
        if (e.target === drawerClose || e.target.closest('.x-close')) closeDrawer();
      });
      var xClose = drawerClose.querySelector('.x-close');
      if (xClose) xClose.addEventListener('click', closeDrawer);
    }
    drawer.addEventListener('click', function (e) {
      if (e.target === drawer) closeDrawer();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('open')) closeDrawer();
  });
}
