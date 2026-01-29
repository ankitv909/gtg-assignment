const qs = (s, r = document) => r.querySelector(s);
const qsa = (s, r = document) => Array.from(r.querySelectorAll(s));

/* HEADER SEARCH*/
(() => {
  const wrap = qs('[data-search-wrap]');
  const btn = qs('[data-search-btn]');
  const form = qs('[data-search-form]');
  const input = qs('[data-search-input]');
  const close = qs('[data-search-close]');

  if (!wrap || !btn || !form || !input || !close) return;

  const open = () => {
    form.hidden = false;
    btn.style.display = 'none';
    requestAnimationFrame(() => input.focus());
  };

  const hide = () => {
    form.hidden = true;
    btn.style.display = '';
    btn.focus();
  };

  btn.addEventListener('click', open);
  close.addEventListener('click', hide);

  // click outside closes
  document.addEventListener('click', (e) => {
    if (!wrap.contains(e.target) && !form.hidden) hide();
  });

  // ESC closes
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !form.hidden) hide();
  });

  // Enter submits
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Search:', input.value);
    hide();
  });
})();




/* Hamburger */
(() => {
  const btn = qs('[data-hamburger]');
  const mobile = qs('[data-mobile]');
  if (!btn || !mobile) return;

  const setOpen = (open) => {
    btn.setAttribute('aria-expanded', String(open));
    mobile.hidden = !open;
  };

  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    setOpen(!open);
  });

  qsa('a', mobile).forEach((a) => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
})();

/* Gallery: arrows + dots + thumbs */
(() => {
  const root = qs('[data-gallery]');
  if (!root) return;

  const main = qs('[data-g-main]', root);
  const dotsWrap = qs('[data-g-dots]', root);
  const prev = qs('[data-g-prev]', root);
  const next = qs('[data-g-next]', root);
  const thumbs = qs('[data-g-thumbs]', root);

  const slides = [
    { src: './assets/img/slider-1.png', alt: 'GTG slider 1' },
    { src: './assets/img/slider-2.png', alt: 'GTG slider 2' },
    { src: './assets/img/slider-3.png', alt: 'GTG slider 3' },
    { src: './assets/img/slider-4.png', alt: 'GTG slider 4' },
    { src: './assets/img/slider-5.png', alt: 'GTG slider 5' },
    { src: './assets/img/slider-1.png', alt: 'GTG slider 6' },
    { src: './assets/img/slider-2.png', alt: 'GTG slider 7' },
    { src: './assets/img/slider-3.png', alt: 'GTG slider 8' },
  ];

  let idx = 0;

  const renderDots = () => {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = slides
      .map(
        (_, i) =>
          `<button class="dot ${i === idx ? 'is-active' : ''}" type="button" data-dot="${i}" aria-label="Go to image ${
            i + 1
          }"></button>`
      )
      .join('');

    qsa('[data-dot]', dotsWrap).forEach((b) => b.addEventListener('click', () => go(+b.dataset.dot)));
  };

  const syncThumbs = () => {
    if (!thumbs) return;
    qsa('[data-thumb]', thumbs).forEach((b) => {
      const i = +b.dataset.thumb;
      b.classList.toggle('is-active', i === idx);
    });
  };

  const go = (i) => {
    idx = (i + slides.length) % slides.length;

    if (main) {
      main.src = slides[idx].src;
      main.alt = slides[idx].alt;
    }

    renderDots();
    syncThumbs();
  };

  prev?.addEventListener('click', () => go(idx - 1));
  next?.addEventListener('click', () => go(idx + 1));

  if (thumbs) {
    qsa('[data-thumb]', thumbs).forEach((b) => b.addEventListener('click', () => go(+b.dataset.thumb)));
  }

  go(0);
})();

(() => {
  const add = qs('[data-add]');
  if (!add) return;

  const plansRoot = qs('[data-plans]') || document;

  const purchase = qsa('input[name="purchase"]', plansRoot);

  const fragrance = qsa('input[name="fragrance"]', plansRoot);
  const fragrance1 = qsa('input[name="fragrance1"]', plansRoot);
  const fragrance2 = qsa('input[name="fragrance2"]', plansRoot);

  const singlePanel = qs('[data-panel="single-subscription"]', plansRoot);
  const doublePanel = qs('[data-panel="double-subscription"]', plansRoot);

  const map = {
    "original_one-time": "https://example.com/cart?f=original&p=one-time",
    "original_single-subscription": "https://example.com/cart?f=original&p=single",
    "original_double-subscription": "https://example.com/cart?f=original&p=double",

    "lily_one-time": "https://example.com/cart?f=lily&p=one-time",
    "lily_single-subscription": "https://example.com/cart?f=lily&p=single",
    "lily_double-subscription": "https://example.com/cart?f=lily&p=double",

    "rose_one-time": "https://example.com/cart?f=rose&p=one-time",
    "rose_single-subscription": "https://example.com/cart?f=rose&p=single",
    "rose_double-subscription": "https://example.com/cart?f=rose&p=double",
  };

  const getChecked = (list, fallback) => list.find((x) => x.checked)?.value || fallback;

  const setPanel = (p) => {
    if (singlePanel) singlePanel.hidden = !(p === 'single-subscription' || p === 'one-time');
    if (doublePanel) doublePanel.hidden = p !== 'double-subscription';
  };

  const update = () => {
    const p = getChecked(purchase, 'single-subscription');
    setPanel(p);

    if (p === 'double-subscription') {
      const f1 = getChecked(fragrance1, 'original');
      const f2 = getChecked(fragrance2, 'original');
      add.href = `https://example.com/cart?p=double&f1=${encodeURIComponent(f1)}&f2=${encodeURIComponent(f2)}`;
      return;
    }

    const f = getChecked(fragrance, 'original');
    add.href = map[`${f}_${p}`] || '#';
  };

  [...purchase, ...fragrance, ...fragrance1, ...fragrance2].forEach((r) => {
    r.addEventListener('change', update);
  });

  update();
})();

/* Accordion - collection */
(() => {
  const root = qs('[data-acc]');
  if (!root) return;

  const items = qsa('.acc-item', root);

  items.forEach((item) => {
    const btn = qs('[data-acc-btn]', item);
    const body = qs('[data-acc-body]', item);
    const icon = qs('.acc-icon', item);
    if (!btn || !body || !icon) return;

    btn.addEventListener('click', () => {
      const open = btn.getAttribute('aria-expanded') === 'true';

      items.forEach((it) => {
        const b = qs('[data-acc-btn]', it);
        const bo = qs('[data-acc-body]', it);
        const ic = qs('.acc-icon', it);
        if (!b || !bo || !ic) return;
        b.setAttribute('aria-expanded', 'false');
        bo.hidden = true;
        ic.textContent = '+';
        it.classList.remove('is-open');
      });

      if (!open) {
        btn.setAttribute('aria-expanded', 'true');
        body.hidden = false;
        icon.textContent = '−';
        item.classList.add('is-open');
      }
    });
  });
})();

/* Count up when stats bar enters viewport */
(() => {
  const section = qs('[data-count-section]');
  if (!section) return;

  const nums = qsa('[data-count]', section);
  let done = false;

  const animate = (el, to, dur = 900) => {
    const start = performance.now();
    const from = 0;

    const tick = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(from + (to - from) * eased);
      if (p < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver(
    (entries) => {
      if (done) return;
      if (!entries[0].isIntersecting) return;
      done = true;
      nums.forEach((el) => animate(el, Number(el.dataset.count || 0)));
      io.disconnect();
    },
    { threshold: 0.25 }
  );

  io.observe(section);
})();