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

  window.addEventListener('scroll', () => { onScroll(); onSpy(); }, { passive: true });
  onScroll();
  onSpy();
});
