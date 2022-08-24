const canvas = document.querySelector('#container__canvas');
const brushBtn = document.querySelector('#btn__brush');
const eraserBtn = document.querySelector('#btn__eraser');
const clearBtn = document.querySelector('#btn__clear');
const colorPickers = document.querySelectorAll('.color-picker');

const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71'];
const squares = 500;

let currentTool = 'brush';
let isPressed = false;

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

// target element
function findTarget(e, inputType) {
	const cords = { x: 0, y: 0 }

	if (inputType === 'touch') {
		cords.x = e.touches[0].clientX; // Horizontal
		cords.y = e.touches[0].clientY; // Vertical
	} else if (inputType === 'mouse') {
		cords.x = e.clientX; // Horizontal
		cords.y = e.clientY; // Vertical
	}
	return document.elementFromPoint(cords.x, cords.y);
}

// color picker related
function setColorPickersColor() {
	const pickerArray = Array.from(colorPickers);

	for (let picker of pickerArray) {
		const i = pickerArray.indexOf(picker);
		picker.value = colors[i]
	}
}

colorPickers.forEach((elm) => {
	elm.addEventListener('change', (e) => {
		const index = (e.target.id.slice(-1) - 1);
		const newClr = e.target.value;
		colors[index] = newClr;
	})
})



// ------------------------------------
// functions called and event listeners
// ------------------------------------

// Generate squares for canvas.
for (let i = 0; i < squares; i++) {
	const square = document.createElement('div');
	square.classList.add('square');

	canvas.appendChild(square);
}

// set initial color picker colors to default color array
setColorPickersColor()

// Add event listener to canvas
// mouse listeners
canvas.addEventListener('mousedown', (e) => {
	e.preventDefault();
	isPressed = true;

	const target = findTarget(e, 'mouse');

	if (target.classList.contains('square')) {
		useTool(target, isPressed);
	}
});

canvas.addEventListener('mouseover', (e) => {
	const target = findTarget(e, 'mouse');

	if (target.classList.contains('square')) {
		useTool(target, isPressed);
	}
});

canvas.addEventListener('mouseup', () => {
	isPressed = false;
});

// touch listeners
canvas.addEventListener('touchstart', (e) => {
	isPressed = true;
	e.preventDefault();

	const target = findTarget(e, 'touch');

	if (target.classList.contains('square')) {
		useTool(target, isPressed);
	}
});

canvas.addEventListener('touchmove', (e) => {
	const target = findTarget(e, 'touch');

	if (target.classList.contains('square')) {
		useTool(target, isPressed);
	}
});

canvas.addEventListener('touchend', () => {
	isPressed = false;
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

// color pickers