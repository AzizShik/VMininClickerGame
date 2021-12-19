const startBtn = document.querySelector('.btn');
const input = document.querySelector('.input-number');
const timeSpan = document.getElementById('timeSpan');
const board = document.querySelector('.board');
const title = document.querySelector('.title');
const scoreEl = document.querySelector('.score');

let hexColor = '#';
let score = 0;
let time = parseFloat(timeSpan.textContent);

const arrHex = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
];

function getRandomColor() {
  for (let i = 0; i < 6; i++) {
    hexColor += arrHex[getRandomNum(0, 15)];
  }
  return hexColor;
}


function gameTime() {
  timeSpan.textContent = parseFloat(input.value).toFixed(1);
  time = parseFloat(timeSpan.textContent);
}

gameTime();

function timeDecrease() {
  const interval = setInterval(() => {
    if (time <= 0.1) {
      time = 0.0;
      timeSpan.textContent = time.toFixed(1);
      gameOver();
      clearInterval(interval);
    } else {
      time = time - 0.1;
      timeSpan.textContent = time.toFixed(1);
    }
  }, 100);
}

function startGame() {
  gameTime();
  title.classList.remove('hide');
  scoreEl.classList.add('hide');
  startBtn.classList.remove('show');
  startBtn.classList.add('hide');
  input.disabled = 'true';
  input.style.cursor = 'no-drop';
  timeDecrease();
  renderBox();
}

function renderBox() {
  const box = document.createElement('button');
  box.classList.add('box-point');
  const coordinate = board.getBoundingClientRect();

  const maxTop = coordinate.height;
  const maxLeft = coordinate.width;

  box.style.width = getRandomNum(15, 100) + 'px';
  box.style.height = getRandomNum(15, 100) + 'px';
  box.style.borderRadius = getRandomNum(20, 100) + '%';
  box.style.cursor = 'pointer';
  box.style.background = getRandomColor();
  const positionLeft = getRandomNum(0, maxLeft - parseFloat(box.style.width));
  const positionTop = getRandomNum(0, maxTop - parseFloat(box.style.height));

  box.style.position = 'absolute';
  box.style.top = positionTop + 'px';
  box.style.left = positionLeft + 'px';
  board.append(box);
  hexColor = '#';
  clickBox(box);
}

function clickBox(el) {
  el.addEventListener('click', () => {
    el.classList.add('hide');
    score++;
    el.remove();
    if(time > 0.1) {
      renderBox();
    } 
  });
}

function gameOver() {
  const boxes = document.querySelectorAll('.box-point');
  boxes.forEach(box => {
    box.remove();
  });
  startBtn.classList.add('show');
  startBtn.innerHTML = ` Restart <i class="fas fa-redo"></i>`;
  input.removeAttribute('disabled');
  input.style.cursor = 'pointer';
  title.classList.add('hide');
  scoreEl.classList.remove('hide');
  scoreEl.innerHTML = `<i class="fas fa-trophy"></i> Ваш результат: ${score} <i class="far fa-hand-point-up"></i>`;

  score = 0;
}

function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}



input.addEventListener('input', gameTime);
startBtn.addEventListener('click', startGame);