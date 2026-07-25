/* =====================================================================
   Flowers by Me — site behavior
   No dependencies. Every module guards its own elements, so removing a
   section from index.html won't break the rest of the page.
   ===================================================================== */
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------
     Header: solid background once the hero is behind us
     ------------------------------------------------------------------ */
  (function stickyHeader() {
    var header = document.getElementById('siteHeader');
    if (!header) return;

    var ticking = false;

    function update() {
      header.classList.toggle('is-stuck', window.scrollY > 40);
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }, { passive: true });

    update();
  })();

  /* ------------------------------------------------------------------
     Mobile navigation
     ------------------------------------------------------------------ */
  (function mobileNav() {
    var header = document.getElementById('siteHeader');
    var toggle = document.getElementById('navToggle');
    var nav = document.getElementById('primaryNav');
    if (!header || !toggle || !nav) return;

    function setOpen(open) {
      header.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Any nav link closes the menu — anchors keep you on the same page.
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.classList.contains('is-open')) {
        setOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener('click', function (e) {
      if (!header.contains(e.target)) setOpen(false);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) setOpen(false);
    });
  })();

  /* ------------------------------------------------------------------
     Scroll reveal (CSS does the animating; this only flips a class)
     ------------------------------------------------------------------ */
  (function scrollReveal() {
    var items = document.querySelectorAll('.reveal');
    if (!items.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    items.forEach(function (el) { observer.observe(el); });
  })();

  /* ------------------------------------------------------------------
     Gallery: category filter + lightbox
     ------------------------------------------------------------------ */
  (function gallery() {
    var grid = document.getElementById('galleryGrid');
    var lightbox = document.getElementById('lightbox');
    if (!grid || !lightbox) return;

    var tiles = Array.prototype.slice.call(grid.querySelectorAll('.tile'));
    var chips = Array.prototype.slice.call(document.querySelectorAll('.chip'));
    var emptyMsg = document.getElementById('galleryEmpty');

    var lbImage = document.getElementById('lbImage');
    var lbCaption = document.getElementById('lbCaption');
    var lbCount = document.getElementById('lbCount');
    var btnClose = document.getElementById('lbClose');
    var btnPrev = document.getElementById('lbPrev');
    var btnNext = document.getElementById('lbNext');

    // Only the tiles currently visible are navigable in the lightbox.
    var activeTiles = tiles.slice();
    var currentIndex = 0;
    var lastFocused = null;

    /* -- Filtering -- */
    function applyFilter(category) {
      activeTiles = [];

      tiles.forEach(function (tile) {
        var match = category === 'all' || tile.dataset.category === category;
        tile.hidden = !match;
        if (match) activeTiles.push(tile);
      });

      // Keep data-index in sync with the visible set so arrows never jump to a hidden photo.
      activeTiles.forEach(function (tile, i) {
        tile.querySelector('.tile__btn').dataset.index = String(i);
      });

      if (emptyMsg) emptyMsg.hidden = activeTiles.length > 0;
    }

    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) {
          var isActive = c === chip;
          c.classList.toggle('is-active', isActive);
          c.setAttribute('aria-pressed', String(isActive));
        });
        applyFilter(chip.dataset.filter);
      });
    });

    applyFilter('all');

    /* -- Lightbox -- */

    // picsum serves any size; ask for a larger crop at the same aspect ratio.
    function upscale(src) {
      return src.replace(/\/(\d+)\/(\d+)(\?.*)?$/, function (_, w, h, query) {
        var width = parseInt(w, 10);
        var height = parseInt(h, 10);
        var scale = 1400 / Math.max(width, height);
        if (scale <= 1) return '/' + width + '/' + height + (query || '');
        return '/' + Math.round(width * scale) + '/' + Math.round(height * scale) + (query || '');
      });
    }

    function render(index) {
      var tile = activeTiles[index];
      if (!tile) return;

      var img = tile.querySelector('img');
      var catEl = tile.querySelector('.tile__cat');
      var captionEl = tile.querySelector('.tile__caption');

      // The caption node contains the category span plus the title text.
      var title = captionEl
        ? captionEl.textContent.replace(catEl ? catEl.textContent : '', '').trim()
        : '';
      var category = catEl ? catEl.textContent.trim() : '';

      currentIndex = index;
      lbImage.src = upscale(img.src);
      lbImage.alt = img.alt;
      lbCaption.textContent = category ? category + ' — ' + title : title;
      lbCount.textContent = (index + 1) + ' / ' + activeTiles.length;

      // Preload neighbours so arrow-key browsing doesn't flash empty.
      [index - 1, index + 1].forEach(function (i) {
        var neighbour = activeTiles[(i + activeTiles.length) % activeTiles.length];
        if (neighbour && neighbour !== tile) {
          var preload = new Image();
          preload.src = upscale(neighbour.querySelector('img').src);
        }
      });
    }

    function step(delta) {
      if (!activeTiles.length) return;
      render((currentIndex + delta + activeTiles.length) % activeTiles.length);
    }

    function open(index) {
      lastFocused = document.activeElement;
      lightbox.hidden = false;
      render(index);
      document.body.style.overflow = 'hidden';
      // Next frame, so the opacity transition actually runs.
      window.requestAnimationFrame(function () { lightbox.classList.add('is-open'); });
      btnClose.focus();
    }

    function close() {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';

      var finish = function () {
        lightbox.hidden = true;
        // removeAttribute, not src = '' — an empty src makes the browser
        // re-request the current page as if it were an image.
        lbImage.removeAttribute('src');
        lbImage.alt = '';
        if (lastFocused && document.contains(lastFocused)) lastFocused.focus();
      };

      if (prefersReducedMotion) finish();
      else window.setTimeout(finish, 300);
    }

    grid.addEventListener('click', function (e) {
      var btn = e.target.closest('.tile__btn');
      if (btn) open(parseInt(btn.dataset.index, 10) || 0);
    });

    btnPrev.addEventListener('click', function () { step(-1); });
    btnNext.addEventListener('click', function () { step(1); });
    btnClose.addEventListener('click', close);

    lightbox.addEventListener('click', function (e) {
      if (e.target.hasAttribute('data-close')) close();
    });

    document.addEventListener('keydown', function (e) {
      if (lightbox.hidden) return;

      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); return; }
      if (e.key === 'ArrowRight') { e.preventDefault(); step(1); return; }

      // Keep Tab inside the dialog while it's modal.
      if (e.key === 'Tab') {
        var focusable = [btnClose, btnPrev, btnNext].filter(function (el) {
          return el && el.offsetParent !== null;
        });
        if (!focusable.length) return;

        var first = focusable[0];
        var last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (focusable.indexOf(document.activeElement) === -1) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    /* -- Swipe -- */
    var touchStartX = 0;
    var touchStartY = 0;

    lightbox.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].clientX;
      touchStartY = e.changedTouches[0].clientY;
    }, { passive: true });

    lightbox.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - touchStartX;
      var dy = e.changedTouches[0].clientY - touchStartY;

      // Horizontal intent only — don't hijack a vertical scroll gesture.
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
        step(dx < 0 ? 1 : -1);
      }
    }, { passive: true });
  })();

  /* ------------------------------------------------------------------
     Contact / order form
     ------------------------------------------------------------------ */
  (function orderForm() {
    var form = document.getElementById('orderForm');
    if (!form) return;

    var status = document.getElementById('formStatus');
    var SHOP_EMAIL = 'hello@flowersbyme.example';   // <- swap for the real inbox

    var rules = {
      name: function (v) {
        if (!v.trim()) return 'Please tell us your name.';
        if (v.trim().length < 2) return 'That looks a little short — full name, please.';
        return '';
      },
      email: function (v) {
        if (!v.trim()) return 'We need an email to reply to.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())) return 'That email address looks incomplete.';
        return '';
      },
      phone: function (v) {
        if (!v.trim()) return '';                    // optional
        if ((v.replace(/\D/g, '')).length < 10) return 'Please include the area code, or leave this blank.';
        return '';
      },
      date: function (v) {
        if (!v) return 'When do you need these?';
        var picked = new Date(v + 'T00:00:00');
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        if (isNaN(picked.getTime())) return 'That date didn’t read correctly.';
        if (picked < today) return 'Please choose today or a date ahead.';
        return '';
      },
      message: function (v) {
        if (!v.trim()) return 'A sentence or two is plenty.';
        if (v.trim().length < 10) return 'Tell us a bit more so we can quote it properly.';
        return '';
      }
    };

    function fieldOf(input) { return input.closest('.field'); }

    function showError(input, message) {
      var field = fieldOf(input);
      var errorEl = document.getElementById(input.id + '-error');

      if (message) {
        field.classList.add('has-error');
        input.setAttribute('aria-invalid', 'true');
        if (errorEl) errorEl.textContent = message;
      } else {
        field.classList.remove('has-error');
        input.removeAttribute('aria-invalid');
        if (errorEl) errorEl.textContent = '';
      }
    }

    function validate(input) {
      var rule = rules[input.name];
      if (!rule) return true;

      var message = rule(input.value);
      showError(input, message);
      return !message;
    }

    Object.keys(rules).forEach(function (name) {
      var input = form.elements[name];
      if (!input) return;

      input.addEventListener('blur', function () { validate(input); });

      // Once a field has been flagged, correct it live rather than waiting for resubmit.
      input.addEventListener('input', function () {
        if (fieldOf(input).classList.contains('has-error')) validate(input);
      });
    });

    function setStatus(message, type) {
      if (!status) return;
      status.textContent = message;
      status.className = 'form__status' + (type ? ' is-' + type : '');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var firstInvalid = null;

      Object.keys(rules).forEach(function (name) {
        var input = form.elements[name];
        if (input && !validate(input) && !firstInvalid) firstInvalid = input;
      });

      if (firstInvalid) {
        setStatus('Almost — a couple of fields need another look.', 'error');
        firstInvalid.focus();
        return;
      }

      var data = {
        name: form.elements.name.value.trim(),
        email: form.elements.email.value.trim(),
        phone: form.elements.phone.value.trim() || '(not given)',
        date: form.elements.date.value,
        occasion: form.elements.occasion.value,
        message: form.elements.message.value.trim()
      };

      // No backend on a static site — log the payload and hand off to the mail client.
      // Replace this block with a fetch() to Formspree / Netlify Forms / your own endpoint.
      console.log('[Flowers by Me] inquiry submitted:', data);

      var subject = 'Flower inquiry — ' + data.occasion + ' — ' + data.date;
      var body = [
        'Name: ' + data.name,
        'Email: ' + data.email,
        'Phone: ' + data.phone,
        'Date needed: ' + data.date,
        'Occasion: ' + data.occasion,
        '',
        data.message
      ].join('\n');

      window.location.href = 'mailto:' + SHOP_EMAIL +
        '?subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      setStatus(
        'Thanks, ' + data.name.split(' ')[0] + ' — your email app should be opening with the details filled in. ' +
        'Hit send and we’ll reply within one business day. In a hurry? Call (307) 555-0148.',
        'success'
      );

      form.reset();
      Object.keys(rules).forEach(function (name) {
        var input = form.elements[name];
        if (input) showError(input, '');
      });
    });

    // Don't offer past dates in the native picker.
    var dateInput = form.elements.date;
    if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];
  })();

  /* ------------------------------------------------------------------
     Footer year
     ------------------------------------------------------------------ */
  (function currentYear() {
    var el = document.getElementById('year');
    if (el) el.textContent = String(new Date().getFullYear());
  })();
})();
