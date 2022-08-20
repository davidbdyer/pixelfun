const canvas=document.querySelector("#container__canvas"),brushBtn=document.querySelector("#btn__brush"),eraserBtn=document.querySelector("#btn__eraser"),clearBtn=document.querySelector("#btn__clear"),colors=["#e74c3c","#8e44ad","#3498db","#e67e22","#2ecc71"],squares=500;let currentTool="brush",isPressed=!1;for(let e=0;e<500;e++){const e=document.createElement("div");e.classList.add("square"),e.addEventListener("mouseover",(()=>{"brush"==currentTool?setColor(e,isPressed):"eraser"==currentTool&&removeColor(e,isPressed)})),e.addEventListener("mousedown",(()=>{isPressed=!0,"brush"==currentTool?setColor(e,isPressed):"eraser"==currentTool&&removeColor(e,isPressed)})),canvas.appendChild(e)}function setColor(e,r){if(!0===r){const r=getRandomColor();e.style.background=r,e.style.boxShadow=`0 0 2px ${r}, 0 0 10px ${r}`}}function removeColor(e,r){!0===r&&(e.style.background="#1d1d1d",e.style.boxShadow="0 0 2px #000")}function getRandomColor(){return colors[Math.floor(Math.random()*colors.length)]}function setTool(e){currentTool=e}function clearCanvas(){const e=document.querySelectorAll(".square");for(let r of e)removeColor(r,!0)}canvas.addEventListener("mousedown",(e=>{e.preventDefault(),isPressed=!0})),canvas.addEventListener("mouseup",(e=>{e.preventDefault(),isPressed=!1})),brushBtn.addEventListener("click",(()=>{setTool("brush")})),eraserBtn.addEventListener("click",(()=>{setTool("eraser")})),clearBtn.addEventListener("click",(()=>{clearCanvas()}));