// Deck controller: scale-to-fit, keyboard/clicker nav, step reveals,
// presenter notes (N), copy-to-clipboard prompts, #slide deep links.

const stage = document.querySelector('.stage');
const slides = [...document.querySelectorAll('.slide')];
const progress = document.querySelector('.progress');
const notesPanel = document.querySelector('.notes-panel');
const toast = document.querySelector('.toast');

let current = 0;

/* ---------- Scale the 1920x1080 stage to the window ---------- */
function fit() {
  const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
  stage.style.transform = `scale(${s})`;
}
window.addEventListener('resize', fit);
fit();

/* ---------- Folio numbers ---------- */
slides.forEach((slide, i) => {
  const f = slide.querySelector('.folio');
  if (f) f.textContent = `${i + 1} / ${slides.length}`;
});

/* ---------- Steps ---------- */
const stepsOf = (slide) => [...slide.querySelectorAll('.step')];

function applyStep(el, on) {
  el.classList.toggle('is-shown', on);
  const target = el.dataset.target;
  const cls = el.dataset.class;
  if (target && cls) {
    slides[current].querySelectorAll(target).forEach((t) => t.classList.toggle(cls, on));
  }
}

function showAllSteps(slide) { stepsOf(slide).forEach((s) => applyStep(s, true)); }
function hideAllSteps(slide) { stepsOf(slide).forEach((s) => applyStep(s, false)); }

/* ---------- Slide enter hooks ---------- */
function onEnter(slide) {
  slide.querySelectorAll('.results').forEach((r) => {
    r.classList.remove('run');
    r.querySelectorAll('[data-value]').forEach((bar) => { bar.style.width = '0'; });
    requestAnimationFrame(() => {
      setTimeout(() => {
        r.querySelectorAll('[data-value]').forEach((bar) => {
          const pct = Math.min(100, (Number(bar.dataset.value) / Number(bar.dataset.max)) * 100);
          bar.style.width = pct + '%';
        });
        r.classList.add('run');
      }, 350);
    });
  });
  slide.querySelectorAll('.mini-bar [data-value]').forEach((bar) => {
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.width = Math.min(100, (Number(bar.dataset.value) / Number(bar.dataset.max)) * 100) + '%';
    }, 200);
  });
}

/* ---------- Navigation ---------- */
function go(index, { fromEnd = false } = {}) {
  index = Math.max(0, Math.min(slides.length - 1, index));
  slides[current].classList.remove('is-active');
  current = index;
  const slide = slides[current];
  if (fromEnd) showAllSteps(slide); else hideAllSteps(slide);
  slide.classList.add('is-active');
  window.scrollTo(0, 0);
  onEnter(slide);
  progress.style.width = ((current + 1) / slides.length) * 100 + '%';
  if (location.hash !== '#' + (current + 1)) history.replaceState(null, '', '#' + (current + 1));
  renderNotes();
}

function next() {
  const pending = stepsOf(slides[current]).find((s) => !s.classList.contains('is-shown'));
  if (pending) applyStep(pending, true);
  else go(current + 1);
}

function prev() {
  const shown = stepsOf(slides[current]).filter((s) => s.classList.contains('is-shown'));
  if (shown.length) applyStep(shown[shown.length - 1], false);
  else if (current > 0) go(current - 1, { fromEnd: true });
}

document.addEventListener('keydown', (e) => {
  if (e.target.closest?.('input, textarea, [contenteditable]')) return;
  switch (e.key) {
    case 'ArrowRight': case 'PageDown': case ' ': case 'Enter':
      if (e.key === 'Enter' && e.target.closest?.('button')) return;
      e.preventDefault(); next(); break;
    case 'ArrowLeft': case 'PageUp': case 'Backspace':
      e.preventDefault(); prev(); break;
    case 'Home': go(0); break;
    case 'End': go(slides.length - 1, { fromEnd: true }); break;
    case 'n': case 'N': notesPanel.classList.toggle('open'); renderNotes(); break;
    case 'f': case 'F':
      if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
      else document.exitFullscreen?.();
      break;
  }
});

// Click on the slide background advances (not on buttons or prompt text)
stage.addEventListener('click', (e) => {
  if (e.target.closest('button, a, pre, .prompt')) return;
  next();
});

// Touch swipe
let touchX = null;
stage.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
stage.addEventListener('touchend', (e) => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
  touchX = null;
});

window.addEventListener('hashchange', () => {
  const n = parseInt(location.hash.slice(1), 10);
  if (n && n - 1 !== current) go(n - 1);
});

/* ---------- Presenter notes ---------- */
function renderNotes() {
  if (!notesPanel.classList.contains('open')) return;
  const n = slides[current].querySelector('.notes');
  notesPanel.innerHTML = `<h5>Slide ${current + 1} of ${slides.length} · presenter notes (N to hide)</h5>` +
    (n ? n.innerHTML : '<p>No notes for this slide.</p>');
}

/* ---------- Copy prompt buttons ---------- */
function flash(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(flash.t);
  flash.t = setTimeout(() => toast.classList.remove('show'), 1600);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch { ok = false; }
    ta.remove();
    return ok;
  }
}

document.querySelectorAll('.copy-btn').forEach((btn) => {
  btn.addEventListener('click', async (e) => {
    e.stopPropagation();
    const pre = document.getElementById(btn.dataset.copy);
    const ok = await copyText(pre.innerText.trim());
    const label = btn.querySelector('.lbl');
    if (ok) {
      btn.classList.add('copied');
      label.textContent = 'Copied';
      flash('Prompt copied. Paste it into Bolt.new.');
      setTimeout(() => { btn.classList.remove('copied'); label.textContent = 'Copy prompt'; }, 1800);
    } else {
      flash('Select the prompt text and copy it by hand.');
    }
  });
});

/* ---------- Start ---------- */
const start = parseInt(location.hash.slice(1), 10);
go(start ? start - 1 : 0);
