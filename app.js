const items = [
  {
    id: 1,
    image: 'assets/image_01.jpg',
    classification: 'Real',
    confidence: 'High',
    probability: 11,
  },
  {
    id: 2,
    image: 'assets/image_02.jpg',
    classification: 'AI Generated',
    confidence: 'Low',
    probability: 54,
  },
  {
    id: 3,
    image: 'assets/image_03.jpg',
    classification: 'Real',
    confidence: 'High',
    probability: 2,
  },
  {
    id: 4,
    image: 'assets/image_04.jpg',
    classification: 'Digitally Edited',
    confidence: 'High',
    probability: 7,
  },
  {
    id: 5,
    image: 'assets/image_05.webp',
    classification: 'Digitally Edited',
    confidence: 'High',
    probability: 13,
  },
  {
    id: 6,
    image: 'assets/image_06.webp',
    classification: 'Real',
    confidence: 'Medium',
    probability: 23,
  },
  {
    id: 7,
    image: 'assets/image_07.jpg',
    classification: 'Digitally Edited',
    confidence: 'Low',
    probability: 40,
  },
  {
    id: 8,
    image: 'assets/image_08.jpg',
    classification: 'AI Generated',
    confidence: 'High',
    probability: 97,
  },
  {
    id: 9,
    image: 'assets/image_09.jpg',
    classification: 'Digitally Edited',
    confidence: 'High',
    probability: 3,
  },
  {
    id: 10,
    image: 'assets/image_10.jpg',
    classification: 'AI Generated',
    confidence: 'High',
    probability: 97,
  },
  {
    id: 11,
    image: 'assets/image_11.webp',
    classification: 'Digitally Edited',
    confidence: 'Medium',
    probability: 31,
  },
  {
    id: 12,
    image: 'assets/image_12.jpg',
    classification: 'Real',
    confidence: 'High',
    probability: 3,
  },
  {
    id: 13,
    image: 'assets/image_13.jpg',
    classification: 'Digitally Edited',
    confidence: 'High',
    probability: 2,
  },
  {
    id: 14,
    image: 'assets/image_14.jpg',
    classification: 'Digitally Edited',
    confidence: 'High',
    probability: 3,
  },
  {
    id: 15,
    image: 'assets/image_15.jpg',
    classification: 'Digitally Edited',
    confidence: 'High',
    probability: 2,
  },
  {
    id: 16,
    image: 'assets/image_16.jpg',
    classification: 'Real',
    confidence: 'Medium',
    probability: 21,
  },
];
let index = 0;
let answers = new Array(items.length).fill(null);

const start = document.getElementById('start');
const quiz = document.getElementById('quiz');
const results = document.getElementById('results');
const quizImage = document.getElementById('quizImage');
const counter = document.getElementById('counter');
const answered = document.getElementById('answered');
const progressBar = document.getElementById('progressBar');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const optionButtons = [...document.querySelectorAll('#options button')];

function show(section) {
  [start, quiz, results].forEach((el) => el.classList.add('hidden'));
  section.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderQuestion() {
  const item = items[index];
  quizImage.src = item.image;
  quizImage.alt = `Image ${index + 1} to classify`;
  counter.textContent = `Image ${index + 1} of ${items.length}`;
  answered.textContent = `${answers.filter(Boolean).length} answered`;
  progressBar.style.width = `${((index + 1) / items.length) * 100}%`;
  prevBtn.disabled = index === 0;
  nextBtn.textContent = index === items.length - 1 ? 'See results' : 'Next';
  nextBtn.disabled = !answers[index];

  optionButtons.forEach((btn) => {
    btn.classList.toggle('selected', btn.dataset.answer === answers[index]);
  });
}

optionButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    answers[index] = btn.dataset.answer;
    renderQuestion();
  });
});

document.getElementById('startBtn').addEventListener('click', () => {
  show(quiz);
  renderQuestion();
});

prevBtn.addEventListener('click', () => {
  if (index > 0) {
    index--;
    renderQuestion();
  }
});

nextBtn.addEventListener('click', () => {
  if (!answers[index]) return;
  if (index < items.length - 1) {
    index++;
    renderQuestion();
  } else {
    renderResults();
  }
});

document.getElementById('restartBtn').addEventListener('click', () => {
  index = 0;
  answers = new Array(items.length).fill(null);
  show(start);
});

function renderResults() {
  const score = items.reduce(
    (sum, item, i) => sum + (answers[i] === item.classification ? 1 : 0),
    0,
  );
  const percent = Math.round((score / items.length) * 100);
  document.getElementById('scoreHeading').textContent =
    `${score} / ${items.length}`;
  document.getElementById('scoreText').textContent =
    percent >= 80
      ? `Excellent match with TruthScan: ${percent}%.`
      : percent >= 55
        ? `Good result: ${percent}% of your answers matched TruthScan.`
        : `This was difficult: ${percent}% of your answers matched TruthScan.`;

  const grid = document.getElementById('resultGrid');
  grid.innerHTML = '';
  items.forEach((item, i) => {
    const correct = answers[i] === item.classification;
    const card = document.createElement('article');
    card.className = `result-card ${correct ? 'correct' : 'incorrect'}`;
    card.innerHTML = `
      <img src="${item.image}" alt="Image ${item.id}">
      <div class="result-meta">
        <span class="badge">${correct ? 'Match' : 'Different verdict'}</span><br>
        <strong>Image ${item.id}</strong><br>
        Your answer: ${answers[i]}<br>
        TruthScan: ${item.classification}<br>
        AI probability: ${item.probability}% · Confidence: ${item.confidence}
      </div>`;
    grid.appendChild(card);
  });

  show(results);
}

document.addEventListener('keydown', (event) => {
  if (quiz.classList.contains('hidden')) return;
  const keyMap = { 1: 'Real', 2: 'Digitally Edited', 3: 'AI Generated' };
  if (keyMap[event.key]) {
    answers[index] = keyMap[event.key];
    renderQuestion();
  } else if (event.key === 'ArrowLeft' && index > 0) {
    index--;
    renderQuestion();
  } else if (event.key === 'ArrowRight' && answers[index]) {
    nextBtn.click();
  }
});
