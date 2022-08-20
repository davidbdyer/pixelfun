const canvas = document.querySelector('#container__canvas');
const brushBtn = document.querySelector('#btn__brush')
const eraserBtn = document.querySelector('#btn__eraser')
const clearBtn = document.querySelector('#btn__clear')


const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71'];
const squares = 500;

let currentTool = 'brush';
let isPressed = false;

// Generate buttons and add event listener to squares
for (let i = 0; i < squares; i++) {
  const square = document.createElement('div');
  square.classList.add('square');

  square.addEventListener('mouseover', () => {
    if (currentTool == 'brush') {
      setColor(square, isPressed)
    } else if (currentTool == 'eraser') {
      removeColor(square, isPressed)
    }
  });

  square.addEventListener('mousedown', () => {
    isPressed = true;
    if (currentTool == 'brush') {
      setColor(square, isPressed)
    } else if (currentTool == 'eraser') {
      removeColor(square, isPressed)
    }
  });

  canvas.appendChild(square);
}

// Add event listener to canvas
canvas.addEventListener('mousedown', (e) => {
  e.preventDefault();
  isPressed = true;
});
canvas.addEventListener('mouseup', (e) => {
  e.preventDefault();
  isPressed = false;
});

// Controls
brushBtn.addEventListener('click', () => { setTool('brush') })
eraserBtn.addEventListener('click', () => { setTool('eraser') })
clearBtn.addEventListener('click', () => { clearCanvas() })

// --------------------
// - functions declared
// --------------------
function setColor(element, pressed) {
  if (pressed === true) {
    const color = getRandomColor();
    element.style.background = color;
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
  }
}

function removeColor(element, pressed) {
  if (pressed === true) {
    element.style.background = '#1d1d1d';
    element.style.boxShadow = '0 0 2px #000';
  }
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function setTool(tool) {
  currentTool = tool
}

function clearCanvas() {
  const squares = document.querySelectorAll('.square');
  for (let square of squares) {
    removeColor(square, true)
  }
}