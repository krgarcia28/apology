// ── Floating hearts background ──
const heartsBg = document.getElementById('heartsBg');
const heartEmojis = ['💕','💖','💗','💝','🌸','✨','🌹','🌸','🍀'];

for (let i = 0; i < 18; i++) {
  const h = document.createElement('span');
  h.className = 'heart-float';
  h.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  h.style.left = Math.random() * 100 + '%';
  h.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
  h.style.animationDuration = (6 + Math.random() * 10) + 's';
  h.style.animationDelay = (Math.random() * 10) + 's';
  heartsBg.appendChild(h);
}

// ── Set today's date on the letter ──
document.getElementById('letterDate').textContent =
  new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

// ── No button escape logic ──
let noCount = 0;
let yesButtonScale = 1;
const noBtn = document.getElementById('noBtn');
const noMessages = [
  "Sorry na Loveeeeeee 🥺",
  "Tampo pa dinnnnn? 👉👈",
  "aaaaaaaaaaaa My heart just broke a little 💔",
  "huhuhuhuhu Please… 🙏",
  "Okay but what if you said yes though",
  "The button is getting away from you for a reason 😅",
  "Okay I'll wait. I'm patient now. 🐢",
];

noBtn.addEventListener('mouseenter', () => {
  const margin = 20;
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = window.innerWidth - btnRect.width - margin;
  const maxY = window.innerHeight - btnRect.height - margin;

  const newX = margin + Math.random() * Math.max(0, maxX - margin);
  const newY = margin + Math.random() * Math.max(0, maxY - margin);

  noBtn.style.position = 'fixed';
  noBtn.style.left = newX + 'px';
  noBtn.style.top = newY + 'px';

  // Enlarge the Yes button progressively
  yesButtonScale += 0.15;
  const yesBtn = document.querySelector('.btn-yes');
  if (yesBtn) {
    yesBtn.style.transform = `scale(${yesButtonScale})`;
  }

  // Make noMessages font size responsive to Yes button size
  const noCounter = document.getElementById('noCounter');
  if (noCounter) {
    noCounter.style.fontSize = (1.1 * yesButtonScale) + 'rem';
  }

  noCount++;
  const msg = noMessages[Math.min(noCount - 1, noMessages.length - 1)];
  document.getElementById('noCounter').textContent = msg;
});

// ── Page navigation ──
function goTo(n) {
  document.querySelectorAll('.page').forEach((p, i) => {
    p.classList.toggle('active', i === n);
  });
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === n);
  });
  if (n === 3) launchConfetti();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Restart ──
function restart() {
  noCount = 0;
  document.getElementById('noCounter').textContent = '';
  noBtn.style.position = '';
  noBtn.style.left = '';
  noBtn.style.top = '';
  document.getElementById('confettiWrap').innerHTML = '';
  goTo(0);
}

// ── Confetti launcher ──
function launchConfetti() {
  const wrap = document.getElementById('confettiWrap');
  const colors = ['#f2a7b0','#d4637a','#c9a84c','#a8d8a8','#87ceeb','#dda0dd','#f9e87f'];

  for (let i = 0; i < 80; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.top = '0';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.width = (6 + Math.random() * 8) + 'px';
    piece.style.height = (6 + Math.random() * 8) + 'px';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    piece.style.animationDuration = (2 + Math.random() * 3) + 's';
    piece.style.animationDelay = (Math.random() * 1.5) + 's';
    wrap.appendChild(piece);
  }
}