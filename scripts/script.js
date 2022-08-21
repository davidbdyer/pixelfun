const canvas = document.querySelector('#container__canvas');
const brushBtn = document.querySelector('#btn__brush');
const eraserBtn = document.querySelector('#btn__eraser');
const clearBtn = document.querySelector('#btn__clear');

const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71'];
const squares = 500;

let currentTool = 'brush';
let isPressed = false;

// Generate squares for canvas.
for (let i = 0; i < squares; i++) {
	const square = document.createElement('div');
	square.classList.add('square');

	canvas.appendChild(square);
}

// Add event listener to canvas
canvas.addEventListener('mousedown', (e) => {
	e.preventDefault();
	isPressed = true;

	const x = e.clientX; // Horizontal
	const y = e.clientY; // Vertical
	const target = document.elementFromPoint(x, y);

	if (target.classList.contains('square')) {
		useTool(target, isPressed);
	}
});
canvas.addEventListener('mouseup', () => {
	isPressed = false;
});
canvas.addEventListener('touchstart', (e) => {
	e.preventDefault();
	isPressed = true;

	const x = e.touches[0].clientX; // Horizontal
	const y = e.touches[0].clientY; // Vertical
	const target = document.elementFromPoint(x, y);

	if (target.classList.contains('square')) {
		useTool(target, isPressed);
	}
});

canvas.addEventListener('touchend', () => {
	isPressed = false;
});

canvas.addEventListener('touchmove', (e) => {
	const x = e.touches[0].clientX; // Horizontal
	const y = e.touches[0].clientY; // Vertical
	const target = document.elementFromPoint(x, y);

	if (target.classList.contains('square')) {
		useTool(target, isPressed);
	}
});

canvas.addEventListener('mouseover', (e) => {
	const x = e.clientX; // Horizontal
	const y = e.clientY; // Vertical
	const target = document.elementFromPoint(x, y);

	if (target.classList.contains('square')) {
		useTool(target, isPressed);
	}
});







// Controls
brushBtn.addEventListener('click', () => {
	setTool('brush');
});
eraserBtn.addEventListener('click', () => {
	setTool('eraser');
});
clearBtn.addEventListener('click', () => {
	clearCanvas();
});

// --------------------
// - functions declared
// --------------------
function setColor(element, active) {
	if (active === true) {
		const color = getRandomColor();
		element.style.background = color;
		element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
	}
}

function removeColor(element, active) {
	if (active === true) {
		element.style.background = '#1d1d1d';
		element.style.boxShadow = '0 0 2px #000';
	}
}

function getRandomColor() {
	return colors[Math.floor(Math.random() * colors.length)];
}

function setTool(tool) {
	currentTool = tool;
}

function useTool(elm, active) {
	if (currentTool == 'brush') {
		setColor(elm, active);
	} else if (currentTool == 'eraser') {
		removeColor(elm, active);
	}
}

function clearCanvas() {
	const squares = document.querySelectorAll('.square');
	for (let square of squares) {
		removeColor(square, true);
	}
}