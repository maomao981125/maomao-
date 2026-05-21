const themeToggle = document.getElementById('themeToggle');
if (themeToggle) themeToggle.addEventListener('click', () => document.body.classList.toggle('dark'));

// 範例卡片資料
const cards = [
  {
    word: 'abundant',
    pos: 'adj.',
    translation: '豐富的；充足的',
    example: 'The region is abundant in natural resources.',
    root: 'ab- (away) + und (wave) → 源源不絕、充足'
  },
  {
    word: 'catalyst',
    pos: 'n.',
    translation: '催化劑；促進因素',
    example: 'Her speech acted as a catalyst for change.',
    root: 'cata- (down) + lyst (loose) → 引發反應'
  },
  {
    word: 'precise',
    pos: 'adj.',
    translation: '精確的；準確的',
    example: 'The measurements need to be precise.',
    root: 'pre- (before) + cise (cut) → 切割到位，精準'
  }
];

let current = 0;
const flipCard = document.getElementById('flipCard');
const flipInner = document.getElementById('flipInner');
const wordText = document.getElementById('wordText');
const posEl = document.getElementById('pos');
const translationEl = document.getElementById('translation');
const exampleEl = document.getElementById('example');
const rootEl = document.getElementById('rootAnalysis');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function renderCard(idx){
  const c = cards[idx];
  wordText.textContent = c.word;
  posEl.textContent = c.pos;
  translationEl.textContent = c.translation;
  exampleEl.textContent = `例句：${c.example}`;
  rootEl.textContent = `字根分析：${c.root}`;
  // reset to front
  flipInner.classList.remove('is-flipped');
  flipCard.setAttribute('aria-pressed', 'false');
}

function prev(){ current = (current - 1 + cards.length) % cards.length; renderCard(current); }
function next(){ current = (current + 1) % cards.length; renderCard(current); }

flipCard.addEventListener('click', () => {
  flipInner.classList.toggle('is-flipped');
  const pressed = flipCard.getAttribute('aria-pressed') === 'true';
  flipCard.setAttribute('aria-pressed', String(!pressed));
});

prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prev(); });
nextBtn.addEventListener('click', (e) => { e.stopPropagation(); next(); });

// keyboard support: left/right for navigation, space to flip
flipCard.addEventListener('keydown', (e) => {
  if (e.code === 'Space') { e.preventDefault(); flipInner.classList.toggle('is-flipped'); }
  if (e.key === 'ArrowLeft') prev();
  if (e.key === 'ArrowRight') next();
});

// initial render
renderCard(current);
