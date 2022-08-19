const drawing = document.getElementById('container__drawing');
const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71'];
const squares = 500;

let isPressed = { left: false, right: false, };

// create squares for drawing
// trigger functions
for (let i = 0; i < squares; i++) {
  const square = document.createElement('div');
  square.classList.add('square');

  drawing.addEventListener('mousedown', (e) => {
    e.preventDefault();
    if (e.button == 0) {
      isPressed.left = true;
    } else if (e.button == 2) {
      isPressed.right = true;
    }
  });

  square.addEventListener('mouseover', () => {
    setColor(square, isPressed)
    removeColor(square, isPressed)
  });

  square.addEventListener('mousedown', (e) => {
    if (e.button == 0) {
      isPressed.left = true;
      setColor(square, isPressed)
    } else if (e.button == 2) {
      isPressed.right = true;
      removeColor(square, isPressed)
    }
  });

  drawing.addEventListener('mouseup', (e) => {
    e.preventDefault();
    isPressed.left = false;
    isPressed.right = false;
  });

  drawing.addEventListener('contextmenu', (e) => {
    e.preventDefault();

  });

  drawing.appendChild(square);
}

// --------------------
// functions declared
// --------------------
function setColor(element, pressed) {
  if (pressed.left === true) {
    const color = getRandomColor();
    element.style.background = color;
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
  }
}

function removeColor(element, pressed) {
  if (pressed.right === true) {
    element.style.background = '#1d1d1d';
    element.style.boxShadow = '0 0 2px #000';
  }
}

function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}