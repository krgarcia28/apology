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

// ── Dani Polaroid Photocard Logic ──
const photocardImages = [
  { src: 'dani-images/dani1.png', caption: 'My Lovee #1' },
  { src: 'dani-images/dani2.png', caption: 'My Lovee #2' },
  { src: 'dani-images/dani3.png', caption: 'My Lovee #3' },
  { src: 'dani-images/dani4.png', caption: 'My Lovee #4' },
  { src: 'dani-images/dani5.png', caption: 'My Lovee #5' },
  { src: 'dani-images/dani6.png', caption: 'My Lovee #6' },
  { src: 'dani-images/dani7.png', caption: 'My Lovee #7' },
  { src: 'dani-images/dani8.png', caption: 'My Lovee #8' },
];

function randomPolaroidPositions(count, containerW, containerH) {
  // Scatter polaroids only on the left and right sides, avoid center and main content
  const margin = 1; // Minimum margin from edges
  const width = 110, height = 130;
  const minDist = 40; // Minimum distance between polaroid centers
  const centerGap = 0.28; // Fraction of width to leave as center gap (e.g. 0.28 = 28%)
  const positions = [];

  // Define main content no-go zones (hardcoded for this layout)
  // Each zone: {left, top, right, bottom} relative to container
  // Example: center vertical band, and letter-card/question-wrap/promise-box
  const noGoZones = [
    // Center vertical band
    {
      left: containerW * (0.5 - centerGap / 2) - 20,
      top: 0,
      right: containerW * (0.5 + centerGap / 2) + 20,
      bottom: containerH
    },
    // Letter card (page 1)
    {
      left: containerW * 0.5 - 300,
      top: 120,
      right: containerW * 0.5 + 300,
      bottom: 420
    },
    // Question wrap (page 2)
    {
      left: containerW * 0.5 - 240,
      top: 120,
      right: containerW * 0.5 + 240,
      bottom: 420
    },
    // Promise box (page 3)
    {
      left: containerW * 0.5 - 220,
      top: 320,
      right: containerW * 0.5 + 220,
      bottom: 600
    }
  ];

  function overlapsNoGoZone(left, top, width, height) {
    const right = left + width;
    const bottom = top + height;
    for (const zone of noGoZones) {
      if (
        left < zone.right &&
        right > zone.left &&
        top < zone.bottom &&
        bottom > zone.top
      ) {
        return true;
      }
    }
    return false;
  }

  for (let i = 0; i < count; i++) {
    let tries = 0;
    let left, top, angle, overlaps;
    do {
      // Decide left or right side
      const side = Math.random() < 0.5 ? 'left' : 'right';
      if (side === 'left') {
        left = margin + Math.random() * ((containerW * (0.5 - centerGap / 2)) - width - margin);
      } else {
        left = containerW * (0.5 + centerGap / 2) + Math.random() * ((containerW * (0.5 - centerGap / 2)) - width - margin);
      }
      top = margin + Math.random() * (containerH - height - margin * 2);
      angle = (Math.random() - 0.5) * 18; // -9deg to +9deg
      overlaps = false;
      // Check overlap with other polaroids
      for (let j = 0; j < positions.length; j++) {
        const dx = (left + width / 2) - (positions[j].left + width / 2);
        const dy = (top + height / 2) - (positions[j].top + height / 2);
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < Math.max(width, height) - minDist) {
          overlaps = true;
          break;
        }
      }
      // Check overlap with no-go zones
      if (!overlaps && overlapsNoGoZone(left, top, width, height)) {
        overlaps = true;
      }
      tries++;
    } while (overlaps && tries < 50);
    positions.push({ left, top, angle });
    attempts += tries;
  }
  return positions;
}

function renderPolaroids(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  // Clear previous
  container.innerHTML = '';
  // Get container size
  const parent = container.parentElement;
  const containerW = parent.offsetWidth;
  const containerH = parent.offsetHeight;
  const positions = randomPolaroidPositions(photocardImages.length, containerW, containerH);
  photocardImages.forEach((img, i) => {
    const polaroid = document.createElement('div');
    polaroid.className = 'polaroid';
    polaroid.style.left = positions[i].left + 'px';
    polaroid.style.top = positions[i].top + 'px';
    polaroid.style.setProperty('--angle', positions[i].angle + 'deg');
    // Image
    const image = document.createElement('img');
    image.className = 'polaroid-img';
    image.src = img.src;
    image.alt = img.caption;
    polaroid.appendChild(image);
    // Caption
    const caption = document.createElement('div');
    caption.className = 'polaroid-caption';
    caption.textContent = img.caption;
    polaroid.appendChild(caption);
    container.appendChild(polaroid);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  renderPolaroids('polaroidContainer');
  renderPolaroids('polaroidContainer2');
});

// Re-render polaroids in random positions every time the page is shown
const origGoTo = goTo;
goTo = function(n) {
  origGoTo(n);
  if (n === 2) renderPolaroids('polaroidContainer');
  if (n === 3) renderPolaroids('polaroidContainer2');
};
