const canvas = document.querySelector("#jsCanvas");
const colors = document.getElementsByClassName("jsColor");
const range = document.querySelector('#jsRange');
const mode = document.getElementById('jsMode');
const save = document.getElementById('jsSave');

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

const ctx = canvas.getContext('2d');


console.log(Array.from(colors));
console.log(colors);


canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPaining() {
    painting = false;
}
function startPainting() {
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseDown(event){
    startPainting();
}

function onMouseUp(event) {
    stopPaining();
}

function handleColorClick(event) {
    ctx.strokeStyle = event.target.style.backgroundColor;
    ctx.fillStyle = event.target.style.backgroundColor;
    // console.log(event.target.style.backgroundColor);
}

function handleRangeChange(event) {
    console.log(event);
    ctx.lineWidth = event.target.value;
}

function handleModeChange(event) {
    if(!filling){
        filling = true;
        mode.innerText = 'Paint';
    }else{
        filling = false;
        mode.innerText = 'Fill';
    }
}

function handleCanvasClick(event) {
    if(filling)
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function handleCM(event) {
    event.preventDefault();
}

function handleSaveClick() {
    const image = canvas.toDataURL("image/jpeg");
    const a = document.createElement('a');
    a.href = image;
    a.download = "paintJS";
    a.click();
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mouseleave", stopPaining);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener('contextmenu', handleCM);
}

Array.from(colors).forEach(color => color.addEventListener('click', handleColorClick));

if(range){
    range.addEventListener('input', handleRangeChange);
}
if(mode){
    mode.addEventListener('click', handleModeChange);
}
if(save){
    save.addEventListener('click', handleSaveClick)
}