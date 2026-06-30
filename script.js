const grid = document.getElementById("grid");
const colorPicker = document.getElementById("colorPicker");
const canvasSize = document.getElementById("canvasSize");
 
let tool = "draw";
let currentColor = "#ff0000";
let zoom = 1;
let mouseDown = false;
 
document.body.onmousedown = () => mouseDown = true;
document.body.onmouseup = () => mouseDown = false;
 
// ---------- Crear lienzo ----------
 
function createGrid(){
 
    const size = parseInt(canvasSize.value);
 
    grid.innerHTML = "";
 
    grid.style.gridTemplateColumns = `repeat(${size},20px)`;
 
    document.getElementById("canvasInfo").textContent =
        `${size} × ${size}`;
 
    document.getElementById("pixelCount").textContent =
        size*size;
 
    for(let i=0;i<size*size;i++){
 
        const pixel = document.createElement("div");
 
        pixel.className = "pixel";
 
        pixel.dataset.color = "#ffffff";
 
        pixel.addEventListener("mousedown",()=>paint(pixel));
 
        pixel.addEventListener("mouseover",()=>{
 
            if(mouseDown)
                paint(pixel);
 
        });
 
        grid.appendChild(pixel);
 
    }
 
}
 
// ---------- Pintar ----------
 
function paint(pixel){
 
    if(tool==="draw"){
 
        pixel.style.background = currentColor;
        pixel.dataset.color = currentColor;
 
    }
 
    if(tool==="eraser"){
 
        pixel.style.background = "#ffffff";
        pixel.dataset.color = "#ffffff";
 
    }
 
}
 
// ---------- Herramientas ----------
 
function setTool(name){
 
    tool = name;
 
    document.getElementById("toolName").textContent =
        name.charAt(0).toUpperCase()+name.slice(1);
 
}
 
// ---------- Cubeta ----------
 
function bucketFill(){
 
    document.querySelectorAll(".pixel").forEach(pixel=>{
 
        pixel.style.background = currentColor;
        pixel.dataset.color = currentColor;
 
    });
 
}
 
// ---------- Limpiar ----------
 
function clearCanvas(){
 
    document.querySelectorAll(".pixel").forEach(pixel=>{
 
        pixel.style.background = "#ffffff";
        pixel.dataset.color = "#ffffff";
 
    });
 
}
 
// ---------- Color ----------
 
colorPicker.addEventListener("input",()=>{
 
    currentColor = colorPicker.value;
 
});
 
// ---------- Paleta ----------
 
document.querySelectorAll(".swatch").forEach(swatch=>{
 
    swatch.style.background =
        swatch.dataset.color;
 
    swatch.onclick = ()=>{
 
        currentColor = swatch.dataset.color;
 
        colorPicker.value = currentColor;
 
    }
 
});
 
// ---------- Tamaño ----------
 
document.getElementById("applySize").onclick = createGrid;
 
// ---------- Zoom ----------
 
document.getElementById("zoomPlus").onclick = ()=>{
 
    zoom += 0.1;
 
    grid.style.transform =
        `scale(${zoom})`;
 
    document.getElementById("zoomValue").textContent =
        Math.round(zoom*100)+"%";
 
}
 
document.getElementById("zoomMinus").onclick = ()=>{
 
    if(zoom>0.3){
 
        zoom -= 0.1;
 
        grid.style.transform =
            `scale(${zoom})`;
 
        document.getElementById("zoomValue").textContent =
            Math.round(zoom*100)+"%";
 
    }
 
}
 
// ---------- Botones ----------
 
document.getElementById("drawTool").onclick=()=>setTool("draw");
document.getElementById("eraserTool").onclick=()=>setTool("eraser");
document.getElementById("bucketTool").onclick=bucketFill;
document.getElementById("clearTool").onclick=clearCanvas;
 
// ---------- Estado del ratón ----------
 
grid.addEventListener("mousemove",(e)=>{
 
    document.getElementById("mousePos").textContent =
        `${e.offsetX}, ${e.offsetY}`;
 
});
 
// ---------- Funciones futuras ----------
 
function undo(){}
 
function redo(){}
 
// ---------- Iniciar ----------
 
createGrid();
 
