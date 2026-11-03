document.addEventListener('DOMContentLoaded', () => {
  const root   = document.documentElement;
  const header = document.querySelector('.md-header');
  const drawer = document.getElementById('__drawer');

  // Light and dark mode toggle, remembered per browser
  const palette = document.querySelector('.md-palette');
  if (palette) {
    palette.addEventListener('click', () => {
      const scheme = root.getAttribute('data-md-color-scheme') === 'slate' ? 'default' : 'slate';
      root.setAttribute('data-md-color-scheme', scheme);
      try { localStorage.setItem('md-color-scheme', scheme); } catch (e) {}
    });
  }

  // Close the mobile drawer after picking a link
  document.querySelectorAll('.md-sidebar a').forEach(link => {
    link.addEventListener('click', () => { if (drawer) drawer.checked = false; });
  });

  // Swap the header title to the page title once the page heading scrolls away
  const h1 = document.querySelector('.md-content h1');
  const onScroll = () => {
    if (h1) header.classList.toggle('md-header--topic', h1.getBoundingClientRect().bottom < header.offsetHeight);
  };

  // Highlight the section of the page being read in the sidebar
  const tocLinks = Array.from(document.querySelectorAll('.md-nav--secondary .md-nav__link'));
  const targets  = tocLinks.map(link => document.getElementById(link.getAttribute('href').slice(1)));
  const onSpy = () => {
    let current = -1;
    targets.forEach((el, i) => {
      if (el && el.getBoundingClientRect().top <= header.offsetHeight + 40) current = i;
    });
    tocLinks.forEach((link, i) => {
      link.classList.toggle('md-nav__link--active', i === current);
      link.classList.toggle('md-nav__link--passed', i < current);
    });
  };

  // Project graphics: cycle through bundle cards and maps, and animate once in view
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cycle = (viz, navSel, slideSel, delay) => {
    const nav    = viz.querySelectorAll(navSel);
    const slides = viz.querySelectorAll(slideSel);
    let i = 0;
    const show = n => {
      nav.forEach((s, k) => s.classList.toggle('is-active', k === n));
      slides.forEach((d, k) => d.classList.toggle('is-active', k === n));
    };
    nav.forEach((s, k) => {
      s.addEventListener('mouseenter', () => { i = k; show(i); });
      s.addEventListener('click', () => { i = k; show(i); });
    });
    if (!reduceMotion) setInterval(() => { i = (i + 1) % nav.length; show(i); }, delay);
  };
  document.querySelectorAll('.viz-bundle').forEach(viz => cycle(viz, '.viz-bundle__steps li', '.viz-bundle__card', 4000));
  document.querySelectorAll('.viz-maps').forEach(viz => cycle(viz, '.viz-maps__names li', 'img', 3500));

  const animated = document.querySelectorAll('.viz-models');
  if (animated.length && 'IntersectionObserver' in window && !reduceMotion) {
    root.classList.add('js-viz');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.3 });
    animated.forEach(el => io.observe(el));
  }

  window.addEventListener('scroll', () => { onScroll(); onSpy(); }, { passive: true });
  onScroll();
  onSpy();
});
