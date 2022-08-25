const canvas = document.querySelector('#container__canvas');
const brushBtn = document.querySelector('#btn__brush');
const eraserBtn = document.querySelector('#btn__eraser');
const clearBtn = document.querySelector('#btn__clear');
const oneColorBtn = document.querySelector('#btn__one-color');
const toolBtns = document.querySelectorAll('.btn-tool');
const colorPickers = document.querySelectorAll('.color-picker');

const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71'];
const squares = 500;

let currentTool = brushBtn;
let isPressed = false;
let singleColorMode = false;

// --------------------
// - functions declared
// --------------------

// color functions
function getRandomColor() {
	return colors[Math.floor(Math.random() * colors.length)];
}

function getToolColor(mode) {
	if (mode === false) {
		return getRandomColor()
	} else {
		return colors[0];
	}
}

function setColor(element, active) {
	if (active === true) {
		// const color = getRandomColor();
		const color = getToolColor(singleColorMode);
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

// color picker related
function setColorPickersColor() {
	const pickerArray = Array.from(colorPickers);

	for (let picker of pickerArray) {
		const i = pickerArray.indexOf(picker);
		picker.value = colors[i];
	}
}

colorPickers.forEach((elm) => {
	elm.addEventListener('change', (e) => {
		const index = e.target.id.slice(-1) - 1;
		const newClr = e.target.value;
		colors[index] = newClr;
	});
});

// tools functions
function showActiveTool(elm, array) {
	if (array) {
		array.forEach((item) => {
			item.classList.remove('active');
		});
	} else if (elm.classList.contains('active')) {
		elm.classList.remove('active');
		return;
	}
	elm.classList.add('active');
}

function setTool(tool) {
	currentTool = tool;
	showActiveTool(tool, toolBtns);
}

function useTool(elm, active) {
	if (currentTool == brushBtn) {
		setColor(elm, active);
	} else if (currentTool == eraserBtn) {
		removeColor(elm, active);
	}
}

function clearCanvas() {
	const squares = document.querySelectorAll('.square');
	for (let square of squares) {
		removeColor(square, true);
	}
}

function changeElmText(elm, string) {
	elm.textContent = string;
}

// target element
function findTarget(e, inputType) {
	const cords = { x: 0, y: 0 };

	if (inputType === 'touch') {
		cords.x = e.touches[0].clientX; // Horizontal
		cords.y = e.touches[0].clientY; // Vertical
	} else if (inputType === 'mouse') {
		cords.x = e.clientX; // Horizontal
		cords.y = e.clientY; // Vertical
	}
	return document.elementFromPoint(cords.x, cords.y);
}

function tggleElmArryVisAfterIdx(hide, startIdx = 0) {
	if (hide === true) {
		colorPickers.forEach((elm, idx) => {
			if (idx !== startIdx - 1) {
				elm.style.display = 'none';
			}
		});
	} else {
		colorPickers.forEach((elm, idx) => {
			if (idx !== startIdx - 1) {
				elm.style.removeProperty('display');
			}
		});
	}
}

// ------------------------------------
// Functions called and event listeners.
// ------------------------------------

// Dom creation
// Generate squares for canvas.
for (let i = 0; i < squares; i++) {
	const square = document.createElement('div');
	square.classList.add('square');

	canvas.appendChild(square);
}

// Set initial color pickers color to default color array.
setColorPickersColor();

// Add event listener to canvas.
// Mouse listeners.
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
	setTool(brushBtn);
});
eraserBtn.addEventListener('click', () => {
	setTool(eraserBtn);
});
clearBtn.addEventListener('click', () => {
	clearCanvas();
});

oneColorBtn.addEventListener('click', () => {
	if (singleColorMode === false) {
		singleColorMode = true;
		changeElmText(oneColorBtn, '5 Colors')
		tggleElmArryVisAfterIdx(true, 1);
		return;
	}
	singleColorMode = false;
	changeElmText(oneColorBtn, '1 Color')
	tggleElmArryVisAfterIdx(false);
});


// Dynamic fontsize

// function textSizeTargetWidth(target, elm, tweakNum) {
// 	const text = elm.textContent;
// 	const targetWidth = target.clientWidth
// 	const charCount = text.length
// 	const fontSize = `${(targetWidth / charCount) * tweakNum}px`
// 	elm.style.fontSize = fontSize;
// }
//
// const main = document.querySelector('main');
// const h1 = document.querySelector('h1');
// textSizeTargetWidth(main, h1, 1.38)
// window.addEventListener('resize', () => {
// 	textSizeTargetWidth(main, h1, 1.38)
// })