export const splashSessionScript = `
(function () {
  // The boot plays on every load, including refreshes - there is no
  // once-per-session gate. To restore one, set
  // document.documentElement.dataset.splash = 'seen' here when
  // sessionStorage already holds the key, add a CSS rule hiding
  // #splash for that attribute, and set window.__splashDone = true.
})();
`;

export const splashReleaseScript = `
(function () {
  var d = document.documentElement;
  var splash = document.getElementById('splash');

  // The hero waits for this before it starts typing. Window flag for a hero
  // that hydrates late, event for one that is already listening.
  function signalDone() {
    window.__splashDone = true;
    window.dispatchEvent(new Event('splashdone'));
  }

  if (!splash) { signalDone(); return; }

  var reduce = false;
  try { reduce = matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}
  // must match the CSS: --boot-lift + --boot-wipe
  var HOLD = reduce ? 560 : 3000;
  var done = false;

  // Keyboard containment without inert: inert on a React-rendered element is
  // reconciled away at hydration, and baking it into the HTML risks stranding
  // the page non-interactive if this script ever fails to run.
  function keepFocus(e) {
    if (done || !splash.contains(e.target)) {
      var btn = document.getElementById('splash-skip');
      if (!done && btn) { e.stopPropagation(); btn.focus(); }
    }
  }
  document.addEventListener('focusin', keepFocus, true);

  function release(moveFocus) {
    if (done) return;
    done = true;
    document.removeEventListener('focusin', keepFocus, true);
    d.dataset.splash = 'done';
    var live = document.getElementById('splash-status');
    if (live) live.textContent = 'Ready.';
    signalDone();
    if (moveFocus) {
      var skipLink = document.querySelector('a[href="#main"]');
      if (skipLink) skipLink.focus();
    }
  }

  var timer = setTimeout(function () { release(false); }, HOLD);

  function skip() {
    clearTimeout(timer);
    d.dataset.splash = 'skip';
    release(true);
  }

  var btn = document.getElementById('splash-skip');
  if (btn) btn.addEventListener('click', skip);
  document.addEventListener('keydown', function onKey(e) {
    if (e.key === 'Escape') { skip(); document.removeEventListener('keydown', onKey); }
  });
})();
`;
